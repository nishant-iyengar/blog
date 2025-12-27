package api

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"

	"blog/backend/ai-tank/training"
	"blog/backend/ai-tank/types"
)

// LogEntry represents a single log entry
type LogEntry struct {
	Timestamp time.Time `json:"timestamp"`
	Level     string    `json:"level"` // "info", "error", "warning", "success"
	Message   string    `json:"message"`
}

// Server provides HTTP endpoints for monitoring training
type Server struct {
	trainer         *training.Trainer
	supabaseStorage *SupabaseStorage // For saving demonstrations
	port            int
	logs            []LogEntry
	logMu           sync.RWMutex
	maxLogs         int
	httpServer      *http.Server
	mu              sync.Mutex
}

// Global log buffer for capturing logs
var globalLogBuffer *Server

// initLogBuffer initializes the global log buffer
func initLogBuffer(server *Server) {
	globalLogBuffer = server
}

// AddLog adds a log entry to the buffer
func AddLog(level, message string) {
	if globalLogBuffer != nil {
		globalLogBuffer.addLog(level, message)
	}
}

func (s *Server) addLog(level, message string) {
	s.logMu.Lock()
	defer s.logMu.Unlock()

	entry := LogEntry{
		Timestamp: time.Now(),
		Level:     level,
		Message:   message,
	}

	s.logs = append(s.logs, entry)

	// Keep only the most recent logs
	// Use circular buffer approach to avoid memory leaks
	if len(s.logs) > s.maxLogs {
		// Copy the last maxLogs entries to a new slice to free old memory
		// This ensures old entries are garbage collected
		newLogs := make([]LogEntry, s.maxLogs)
		copy(newLogs, s.logs[len(s.logs)-s.maxLogs:])
		s.logs = newLogs
	}
}

// NewServer creates a new monitoring server
// supabaseStorage is required for saving demonstrations - will error if nil when demonstrations endpoint is called
func NewServer(trainer *training.Trainer, port int, supabaseStorage *SupabaseStorage) *Server {
	server := &Server{
		trainer:         trainer,
		supabaseStorage: supabaseStorage,
		port:            port,
		logs:            make([]LogEntry, 0),
		maxLogs:         200, // Keep last 200 log entries
	}
	initLogBuffer(server)
	return server
}

// Start starts the HTTP server
func (s *Server) Start() error {
	mux := http.NewServeMux()

	// API endpoints
	mux.HandleFunc("/api/stats", s.handleStats)
	mux.HandleFunc("/api/model", s.handleModelInfo)
	mux.HandleFunc("/api/health", s.handleHealth)
	mux.HandleFunc("/api/logs", s.handleLogs)
	mux.HandleFunc("/api/debug/simulation", s.handleDebugSimulation)
	mux.HandleFunc("/api/demonstrations", s.handleDemonstrations)

	// Dashboard UI (includes simulation viewer)
	mux.HandleFunc("/", s.handleDashboard)

	addr := fmt.Sprintf(":%d", s.port)
	log.Printf("Starting training dashboard server on http://localhost%s", addr)
	log.Printf("Dashboard available at http://localhost%s", addr)

	s.mu.Lock()
	s.httpServer = &http.Server{
		Addr:    addr,
		Handler: mux,
	}
	s.mu.Unlock()

	return s.httpServer.ListenAndServe()
}

// Shutdown gracefully shuts down the HTTP server
func (s *Server) Shutdown(ctx context.Context) error {
	s.mu.Lock()
	server := s.httpServer
	s.mu.Unlock()

	if server == nil {
		return nil
	}

	return server.Shutdown(ctx)
}

// handleStats returns current training statistics
func (s *Server) handleStats(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	stats := s.trainer.GetStats()

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(stats)
}

// handleModelInfo returns model information
func (s *Server) handleModelInfo(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	weights := s.trainer.GetModelWeights()

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(map[string]interface{}{
		"layers":   weights.Layers,
		"metadata": weights.Metadata,
	})
}

// handleHealth returns server health status
func (s *Server) handleHealth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":    "healthy",
		"timestamp": time.Now().UTC().Format(time.RFC3339),
	})
}

// handleLogs returns recent log entries
func (s *Server) handleLogs(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	s.logMu.RLock()
	logs := make([]LogEntry, len(s.logs))
	copy(logs, s.logs)
	s.logMu.RUnlock()

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(map[string]interface{}{
		"logs":  logs,
		"count": len(logs),
	})
}

// handleDebugSimulation streams a single simulation step-by-step using Server-Sent Events
func (s *Server) handleDebugSimulation(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Set up SSE headers
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Create context for the simulation
	ctx := r.Context()

	// Run debug simulation
	stepChan := s.trainer.RunDebugSimulation(ctx)

	// Stream steps as they come
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming not supported", http.StatusInternalServerError)
		return
	}

	// Send initial connection message
	fmt.Fprintf(w, "data: %s\n\n", `{"type":"connected","message":"Starting continuous simulation stream..."}`)
	flusher.Flush()

	gameNumber := 0
	gameReward := 0.0
	tickCount := 0

	for step := range stepChan {
		tickCount++
		gameReward += step.Reward

		// Debug: Log first few ticks to verify data
		if tickCount <= 3 {
			if step.GameState != nil {
				log.Printf("Debug tick %d: AI Tank at (%.2f, %.2f, angle=%.2f), Enemy at (%.2f, %.2f, angle=%.2f), Bullets: %d, Barriers: %d",
					tickCount,
					step.GameState.AITank.X, step.GameState.AITank.Y, step.GameState.AITank.Angle,
					step.GameState.EnemyTank.X, step.GameState.EnemyTank.Y, step.GameState.EnemyTank.Angle,
					len(step.GameState.Bullets), len(step.GameState.Barriers))
			}
		}

		// Create response with game state for visualization
		response := map[string]interface{}{
			"type":          "tick",
			"gameState":     step.GameState,
			"gameNumber":    gameNumber,
			"tickCount":     tickCount,
			"currentReward": step.Reward,
			"totalReward":   gameReward,
			"averageReward": gameReward / float64(tickCount),
			"done":          step.Done,
		}

		jsonData, err := json.Marshal(response)
		if err != nil {
			log.Printf("Error marshaling debug step: %v", err)
			continue
		}

		// Send as SSE event
		fmt.Fprintf(w, "data: %s\n\n", string(jsonData))
		flusher.Flush()

		// If game ended, send game end message and reset for next game
		if step.Done {
			gameEndResponse := map[string]interface{}{
				"type":          "gameEnd",
				"gameNumber":    gameNumber,
				"totalReward":   gameReward,
				"averageReward": gameReward / float64(tickCount),
			}
			jsonData, _ := json.Marshal(gameEndResponse)
			fmt.Fprintf(w, "data: %s\n\n", string(jsonData))
			flusher.Flush()

			// Reset for next game
			gameNumber++
			gameReward = 0.0
			tickCount = 0
		}
	}

	// Send completion message if channel closes
	fmt.Fprintf(w, "data: %s\n\n", `{"type":"complete","message":"Stream ended"}`)
	flusher.Flush()
}

// handleDemonstrations handles saving human demonstrations to Supabase
func (s *Server) handleDemonstrations(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method == http.MethodPost {
		// Hard error if Supabase is not initialized
		if s.supabaseStorage == nil {
			errorMsg := "Supabase storage not initialized - cannot save demonstrations"
			log.Printf("ERROR: %s", errorMsg)
			AddLog("error", errorMsg)
			http.Error(w, errorMsg, http.StatusInternalServerError)
			return
		}

		var req struct {
			Steps     []map[string]interface{} `json:"steps"`
			IsDefault bool                     `json:"isDefault"`
			Metadata  map[string]interface{}   `json:"metadata"`
		}

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			errorMsg := fmt.Sprintf("Invalid request: %v", err)
			log.Printf("ERROR: %s", errorMsg)
			http.Error(w, errorMsg, http.StatusBadRequest)
			return
		}

		// Convert steps to types.Step format
		steps := make([]types.Step, 0, len(req.Steps))
		for _, stepMap := range req.Steps {
			step := types.Step{}

			// Extract state
			if stateVal, ok := stepMap["state"]; ok {
				if stateSlice, ok := stateVal.([]interface{}); ok {
					step.State = make([]float64, len(stateSlice))
					for i, v := range stateSlice {
						if f, ok := v.(float64); ok {
							step.State[i] = f
						}
					}
				}
			}

			// Extract action
			if actionVal, ok := stepMap["action"]; ok {
				if actionFloat, ok := actionVal.(float64); ok {
					step.Action = int(actionFloat)
				}
			}

			// Extract reward (required for Step type)
			// For human demonstrations, default to 0.1 (small positive reward for imitation learning)
			if rewardVal, ok := stepMap["reward"]; ok {
				if rewardFloat, ok := rewardVal.(float64); ok {
					step.Reward = rewardFloat
				} else {
					step.Reward = 0.1 // Default for imitation learning
				}
			} else {
				step.Reward = 0.1 // Default for imitation learning if not provided
			}

			// Extract nextState
			if nextStateVal, ok := stepMap["nextState"]; ok {
				if nextStateSlice, ok := nextStateVal.([]interface{}); ok {
					step.NextState = make([]float64, len(nextStateSlice))
					for i, v := range nextStateSlice {
						if f, ok := v.(float64); ok {
							step.NextState[i] = f
						}
					}
				}
			}

			// Extract done
			if doneVal, ok := stepMap["done"]; ok {
				if doneBool, ok := doneVal.(bool); ok {
					step.Done = doneBool
				}
			}

			steps = append(steps, step)
		}

		// Prepare metadata with defaults
		metadata := req.Metadata
		if metadata == nil {
			metadata = make(map[string]interface{})
		}
		if _, ok := metadata["timestamp"]; !ok {
			metadata["timestamp"] = time.Now().UTC().Format(time.RFC3339)
		}
		if _, ok := metadata["episodeLength"]; !ok {
			metadata["episodeLength"] = len(steps)
		}

		// Save to Supabase
		err := s.supabaseStorage.SaveDemonstration(steps, metadata, req.IsDefault)
		if err != nil {
			errorMsg := fmt.Sprintf("Failed to save demonstration to Supabase: %v", err)
			log.Printf("ERROR: %s", errorMsg)
			AddLog("error", errorMsg)
			http.Error(w, errorMsg, http.StatusInternalServerError)
			return
		}

		successMsg := fmt.Sprintf("✅ Saved %d demonstration steps to Supabase (isDefault: %v)", len(steps), req.IsDefault)
		log.Printf(successMsg)
		AddLog("success", successMsg)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"status":  "saved",
			"steps":   len(steps),
			"message": successMsg,
		})
	} else if r.Method == http.MethodGet {
		// Return available demonstrations count or info
		w.Header().Set("Content-Type", "application/json")
		if s.supabaseStorage == nil {
			json.NewEncoder(w).Encode(map[string]interface{}{
				"message": "Demonstration API - Supabase not initialized",
				"error":   "Supabase storage not configured",
			})
		} else {
			json.NewEncoder(w).Encode(map[string]interface{}{
				"message": "Demonstration API - use POST to save demonstrations",
				"status":  "ready",
			})
		}
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// handleDashboard serves the dashboard HTML
func (s *Server) handleDashboard(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	fmt.Fprint(w, dashboardHTML)
}

const dashboardHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tank Trouble AI Training Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header h1 {
            color: #333;
            margin-bottom: 10px;
        }
        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
            animation: pulse 2s infinite;
        }
        .status-indicator.active {
            background: #10b981;
        }
        .status-indicator.inactive {
            background: #ef4444;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .stat-card h3 {
            color: #666;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 10px;
        }
        .stat-value {
            font-size: 32px;
            font-weight: bold;
            color: #333;
        }
        .stat-label {
            font-size: 12px;
            color: #999;
            margin-top: 5px;
        }
        .game-container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .game-container h2 {
            color: #333;
            margin-bottom: 15px;
        }
        .game-canvas-wrapper {
            background: #1a1a1a;
            border-radius: 8px;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #gameCanvas {
            border: 2px solid #333;
            background: #0a0a0a;
        }
        .game-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
            margin-top: 15px;
            padding: 15px;
            background: #f5f5f5;
            border-radius: 5px;
        }
        .game-info-item {
            text-align: center;
        }
        .game-info-label {
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
        }
        .game-info-value {
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }
        .refresh-btn {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            margin-top: 10px;
        }
        .refresh-btn:hover {
            background: #2563eb;
        }
        .auto-refresh {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 10px;
        }
        .auto-refresh input[type="checkbox"] {
            width: 18px;
            height: 18px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>
                <span class="status-indicator active" id="statusIndicator"></span>
                Tank Trouble AI Training Dashboard
            </h1>
            <p style="color: #666; margin-top: 5px;">
                Real-time monitoring of DQN training progress
            </p>
        </div>

        <div class="stats-grid" id="statsGrid">
            <div class="stat-card">
                <h3>Episodes</h3>
                <div class="stat-value" id="episodes">0</div>
                <div class="stat-label">Total training episodes</div>
            </div>
            <div class="stat-card">
                <h3>Average Reward</h3>
                <div class="stat-value" id="avgReward">0.00</div>
                <div class="stat-label">Mean reward per episode</div>
            </div>
            <div class="stat-card">
                <h3>Loss</h3>
                <div class="stat-value" id="loss">0.0000</div>
                <div class="stat-label">Current training loss</div>
            </div>
            <div class="stat-card">
                <h3>Epsilon</h3>
                <div class="stat-value" id="epsilon">1.000</div>
                <div class="stat-label">Exploration rate</div>
            </div>
            <div class="stat-card">
                <h3>Total Reward</h3>
                <div class="stat-value" id="totalReward">0.00</div>
                <div class="stat-label">Cumulative reward</div>
            </div>
            <div class="stat-card">
                <h3>Last Update</h3>
                <div class="stat-value" id="lastUpdate" style="font-size: 16px;">Never</div>
                <div class="stat-label">Time of last update</div>
            </div>
        </div>

        <div class="game-container">
            <h2>Live Game Simulation</h2>
            <p style="color: #666; font-size: 14px; margin-top: -5px; margin-bottom: 15px;">
                Watch the AI tanks play in real-time. Games automatically restart when they end.
            </p>
            <div class="game-canvas-wrapper">
                <canvas id="gameCanvas" width="960" height="720"></canvas>
            </div>
            <div class="game-info">
                <div class="game-info-item">
                    <div class="game-info-label">Game #</div>
                    <div class="game-info-value" id="gameNumber">0</div>
                </div>
                <div class="game-info-item">
                    <div class="game-info-label">Tick</div>
                    <div class="game-info-value" id="gameTick">0</div>
                </div>
                <div class="game-info-item">
                    <div class="game-info-label">AI Lives</div>
                    <div class="game-info-value" id="aiLives">3</div>
                </div>
                <div class="game-info-item">
                    <div class="game-info-label">Enemy Lives</div>
                    <div class="game-info-value" id="enemyLives">3</div>
                </div>
                <div class="game-info-item">
                    <div class="game-info-label">Bullets</div>
                    <div class="game-info-value" id="bulletCount">0</div>
                </div>
                <div class="game-info-item">
                    <div class="game-info-label">Current Reward</div>
                    <div class="game-info-value" id="currentReward">0.00</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Game visualization
        const gameCanvas = document.getElementById('gameCanvas');
        const gameCtx = gameCanvas.getContext('2d');
        let currentGameState = null;
        let gameNumber = 0;
        let eventSource = null;

        function updateStats(data) {
            document.getElementById('episodes').textContent = data.Episodes || 0;
            document.getElementById('avgReward').textContent = (data.AverageReward || 0).toFixed(2);
            document.getElementById('loss').textContent = (data.Loss || 0).toFixed(4);
            document.getElementById('epsilon').textContent = (data.Epsilon || 0).toFixed(3);
            document.getElementById('totalReward').textContent = (data.TotalReward || 0).toFixed(2);
            
            if (data.LastUpdate) {
                const date = new Date(data.LastUpdate);
                document.getElementById('lastUpdate').textContent = date.toLocaleTimeString();
            }
        }

        // Game rendering functions
        function drawTank(tank, color) {
            const size = 24;
            gameCtx.save();
            gameCtx.translate(tank.X + size/2, tank.Y + size/2);
            gameCtx.rotate((tank.Angle * Math.PI) / 180);
            
            // Tank body
            gameCtx.fillStyle = color;
            gameCtx.fillRect(-size/2, -size/2, size, size);
            
            // Tank outline
            gameCtx.strokeStyle = '#000';
            gameCtx.lineWidth = 2;
            gameCtx.strokeRect(-size/2, -size/2, size, size);
            
            // Tank barrel
            gameCtx.fillStyle = '#333';
            gameCtx.fillRect(size/2 - 2, -3, 8, 6);
            
            gameCtx.restore();
            
            // Draw lives indicator
            gameCtx.fillStyle = '#fff';
            gameCtx.font = '12px Arial';
            gameCtx.fillText('Lives: ' + tank.Lives, tank.X, tank.Y - 5);
        }

        function drawBullet(bullet) {
            gameCtx.save();
            gameCtx.fillStyle = bullet.Owner === 'blue' ? '#3b82f6' : '#ef4444';
            gameCtx.beginPath();
            gameCtx.arc(bullet.X, bullet.Y, 3, 0, 2 * Math.PI);
            gameCtx.fill();
            gameCtx.strokeStyle = '#000';
            gameCtx.lineWidth = 1;
            gameCtx.stroke();
            gameCtx.restore();
        }

        function renderGame(gameState) {
            if (!gameState) return;
            
            // Clear canvas
            gameCtx.fillStyle = '#0a0a0a';
            gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
            
            // Scale to fit map
            const scaleX = gameCanvas.width / gameState.MapWidth;
            const scaleY = gameCanvas.height / gameState.MapHeight;
            const scale = Math.min(scaleX, scaleY);
            
            gameCtx.save();
            gameCtx.scale(scale, scale);
            
            // Draw barriers (boulders) - with null check
            if (gameState.Barriers && Array.isArray(gameState.Barriers) && gameState.Barriers.length > 0) {
                gameCtx.fillStyle = '#666';
                gameCtx.strokeStyle = '#444';
                gameCtx.lineWidth = 1;
                gameState.Barriers.forEach(barrier => {
                    if (barrier && barrier.X !== undefined && barrier.Y !== undefined) {
                        gameCtx.fillRect(barrier.X, barrier.Y, barrier.Width, barrier.Height);
                        gameCtx.strokeRect(barrier.X, barrier.Y, barrier.Width, barrier.Height);
                    }
                });
            }
            
            // Draw suns
            if (gameState.Suns && Array.isArray(gameState.Suns) && gameState.Suns.length > 0) {
                gameState.Suns.forEach(sun => {
                    if (sun && sun.X !== undefined && sun.Y !== undefined) {
                        gameCtx.fillStyle = '#ffd700';
                        gameCtx.beginPath();
                        gameCtx.arc(sun.X, sun.Y, sun.Radius || 5, 0, 2 * Math.PI);
                        gameCtx.fill();
                        gameCtx.strokeStyle = '#ffaa00';
                        gameCtx.lineWidth = 1;
                        gameCtx.stroke();
                    }
                });
            }
            
            // Draw bullets - with null check
            if (gameState.Bullets && Array.isArray(gameState.Bullets)) {
                gameState.Bullets.forEach(bullet => {
                    if (bullet && !bullet.Exploding && bullet.X !== undefined && bullet.Y !== undefined) {
                        drawBullet(bullet);
                    }
                });
            }
            
            // Draw tanks - with null checks
            if (gameState.AITank && gameState.AITank.X !== undefined) {
                drawTank(gameState.AITank, '#3b82f6');
            }
            if (gameState.EnemyTank && gameState.EnemyTank.X !== undefined) {
                drawTank(gameState.EnemyTank, '#ef4444');
            }
            
            gameCtx.restore();
        }

        function startGameStream() {
            if (eventSource) {
                eventSource.close();
            }

            eventSource = new EventSource('/api/debug/simulation');

            eventSource.onopen = function() {
                console.log('Game stream connected');
            };

            // Client-side frame rate limiting (backup to server-side throttling)
            // Target 60 FPS for smooth rendering (~16.67ms per frame)
            let lastRenderTime = 0;
            const targetFrameTime = 1000 / 60; // 16.67ms for 60 FPS
            
            eventSource.onmessage = function(event) {
                try {
                    const data = JSON.parse(event.data);
                    
                    if (data.type === 'connected') {
                        console.log('Starting new game...');
                    } else if (data.type === 'tick') {
                        // Client-side throttling: only render if enough time has passed
                        const now = performance.now();
                        const timeSinceLastRender = now - lastRenderTime;
                        
                        // Always process game end events, but throttle rendering
                        if (timeSinceLastRender >= targetFrameTime || data.done) {
                            currentGameState = data.gameState;
                            renderGame(currentGameState);
                            lastRenderTime = now;
                            
                            // Update game info (always update, not throttled)
                            document.getElementById('gameNumber').textContent = data.gameNumber || gameNumber;
                            document.getElementById('gameTick').textContent = data.tickCount || 0;
                            document.getElementById('aiLives').textContent = data.gameState.AITank.Lives;
                            document.getElementById('enemyLives').textContent = data.gameState.EnemyTank.Lives;
                            document.getElementById('bulletCount').textContent = data.gameState.Bullets.filter(b => !b.Exploding).length;
                            document.getElementById('currentReward').textContent = (data.currentReward || 0).toFixed(4);
                        } else {
                            // Still update game info even if we skip rendering
                            document.getElementById('gameTick').textContent = data.tickCount || 0;
                            document.getElementById('aiLives').textContent = data.gameState.AITank.Lives;
                            document.getElementById('enemyLives').textContent = data.gameState.EnemyTank.Lives;
                        }
                    } else if (data.type === 'gameEnd') {
                        gameNumber = data.gameNumber || 0;
                        document.getElementById('gameNumber').textContent = gameNumber;
                        console.log('Game ended, starting new game...');
                        // Stream will automatically start new game
                    }
                } catch (error) {
                    console.error('Error parsing game data:', error);
                }
            };

            eventSource.onerror = function(error) {
                console.error('Game stream error:', error);
                // Reconnect after a delay
                setTimeout(() => {
                    if (!eventSource || eventSource.readyState === EventSource.CLOSED) {
                        startGameStream();
                    }
                }, 1000);
            };
        }

        async function refreshStats() {
            try {
                const response = await fetch('/api/stats');
                if (!response.ok) {
                    throw new Error('Failed to fetch stats');
                }
                const data = await response.json();
                updateStats(data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        }

        // Auto-refresh stats
        setInterval(refreshStats, 2000);
        refreshStats(); // Initial load

        // Health check
        setInterval(async () => {
            try {
                const response = await fetch('/api/health');
                const data = await response.json();
                const indicator = document.getElementById('statusIndicator');
                if (data.status === 'healthy') {
                    indicator.className = 'status-indicator active';
                } else {
                    indicator.className = 'status-indicator inactive';
                }
            } catch (error) {
                document.getElementById('statusIndicator').className = 'status-indicator inactive';
            }
        }, 5000);

        // Start game stream on page load
        startGameStream();

        // Cleanup on page unload
        window.addEventListener('beforeunload', function() {
            if (eventSource) {
                eventSource.close();
            }
        });
    </script>
</body>
</html>`
