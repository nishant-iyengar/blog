package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"sync"
	"syscall"
	"time"

	"blog/backend/ai-tank/api"
	"blog/backend/ai-tank/config"
	"blog/backend/ai-tank/training"

	"github.com/joho/godotenv"
)

var (
	supabaseURL     = flag.String("supabase-url", "", "Supabase URL")
	supabaseKey     = flag.String("supabase-key", "", "Supabase API key")
	supabaseTable   = flag.String("supabase-table", "", "Supabase table name")
	saveInterval    = flag.Duration("save-interval", 0, "Interval between model saves")
	batchSize       = flag.Int("batch-size", 0, "Number of simulations per batch")
	dashboardPort   = flag.Int("dashboard-port", 0, "Port for the training dashboard")
	enableDashboard = flag.Bool("dashboard", true, "Enable web dashboard")
)

// loadEnv loads environment variables from .env file in root folder
func loadEnv() error {
	// Try to load .env file from root folder (parent directory from backend/)
	// Try multiple paths to handle different execution contexts
	envPaths := []string{
		"../.env",    // From backend/cmd/trainer/
		"../../.env", // From backend/
		".env",       // Current directory (fallback)
	}

	for _, path := range envPaths {
		err := godotenv.Load(path)
		if err == nil {
			log.Printf("Loaded .env file from: %s", path)
			return nil
		}
	}

	// .env file is optional, so we don't fail if it doesn't exist
	log.Println("No .env file found, using environment variables and flags")
	return nil
}

// getEnvString returns environment variable or default value
func getEnvString(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

// getEnvInt returns environment variable as int or default value
func getEnvInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}

// getEnvBool returns environment variable as bool or default value
func getEnvBool(key string, defaultValue bool) bool {
	if value := os.Getenv(key); value != "" {
		if boolValue, err := strconv.ParseBool(value); err == nil {
			return boolValue
		}
	}
	return defaultValue
}

// getEnvDuration returns environment variable as duration or default value
// Supports both integer (minutes) and float (minutes) for SAVE_INTERVAL_MINUTES
func getEnvDuration(key string, defaultValue time.Duration) time.Duration {
	if value := os.Getenv(key); value != "" {
		// Try parsing as float first (for values like 0.5 for 30 seconds)
		if floatValue, err := strconv.ParseFloat(value, 64); err == nil {
			return time.Duration(floatValue * float64(time.Minute))
		}
		// Fallback to integer (minutes)
		if intValue, err := strconv.Atoi(value); err == nil {
			return time.Duration(intValue) * time.Minute
		}
	}
	return defaultValue
}

func main() {
	// Load .env file first
	if err := loadEnv(); err != nil {
		log.Printf("Warning: Failed to load .env file: %v", err)
	}

	flag.Parse()

	// Override flags with environment variables if flags are not set
	// Priority: Command-line flags > Environment variables > Defaults

	// Supabase configuration
	if *supabaseURL == "" {
		*supabaseURL = getEnvString("SUPABASE_URL", "")
	}
	if *supabaseKey == "" {
		*supabaseKey = getEnvString("SUPABASE_KEY", "")
	}
	if *supabaseTable == "" {
		*supabaseTable = getEnvString("SUPABASE_TABLE", "ai_tank_models")
	}

	// Training configuration
	if *batchSize == 0 {
		*batchSize = getEnvInt("BATCH_SIZE", 25)
	}
	if *saveInterval == 0 {
		*saveInterval = getEnvDuration("SAVE_INTERVAL_MINUTES", 30*time.Second)
	}
	if *dashboardPort == 0 {
		*dashboardPort = getEnvInt("DASHBOARD_PORT", 8080)
	}
	// For boolean flags, check if env var is set (since we can't easily detect if flag was set)
	if envVal := os.Getenv("ENABLE_DASHBOARD"); envVal != "" {
		*enableDashboard = getEnvBool("ENABLE_DASHBOARD", true)
	}

	// Load configuration
	_, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Create trainer with self-play enabled and imitation learning
	// true = self-play (both tanks use RL agents)
	// true = use imitation learning (pre-train from rule-based AI) - increased episodes for better seeding
	trainer, err := training.NewTrainer(true, true)
	if err != nil {
		log.Fatalf("Failed to create trainer: %v", err)
	}
	log.Println("Trainer initialized with self-play and imitation learning")

	// Set up context for graceful shutdown
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Use WaitGroup to track all goroutines for proper shutdown
	var wg sync.WaitGroup

	// Start dashboard server if enabled
	var dashboard *api.Server
	if *enableDashboard {
		dashboard = api.NewServer(trainer, *dashboardPort)
		api.AddLog("success", fmt.Sprintf("Dashboard server starting on port %d", *dashboardPort))
		wg.Add(1)
		go func() {
			defer wg.Done()
			if err := dashboard.Start(); err != nil {
				// Only log if it's not a server closed error (expected on shutdown)
				if err != http.ErrServerClosed {
					errorMsg := fmt.Sprintf("Dashboard server error: %v", err)
					log.Printf(errorMsg)
					api.AddLog("error", errorMsg)
				}
			}
		}()
	}

	// Handle signals
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	// Start training loop
	wg.Add(1)
	go func() {
		defer wg.Done()
		ticker := time.NewTicker(1 * time.Second) // Train every second
		defer ticker.Stop()

		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				err := trainer.TrainBatch(ctx, *batchSize)
				if err != nil {
					errorMsg := fmt.Sprintf("Training error: %v", err)
					log.Printf(errorMsg)
					api.AddLog("error", errorMsg)
				} else {
					stats := trainer.GetStats()
					infoMsg := fmt.Sprintf("Episodes: %d, Loss: %.4f, Epsilon: %.4f, Avg Reward: %.2f",
						stats.Episodes, stats.Loss, stats.Epsilon, stats.AverageReward)
					log.Printf(infoMsg)
					api.AddLog("info", infoMsg)
				}
			}
		}
	}()

	// Start model saving loop (if Supabase is configured)
	if *supabaseURL != "" && *supabaseKey != "" {
		// Initialize Supabase storage
		storage, err := api.NewSupabaseStorage(*supabaseURL, *supabaseKey, *supabaseTable)
		if err != nil {
			warningMsg := fmt.Sprintf("Warning: Failed to initialize Supabase storage: %v", err)
			log.Printf(warningMsg)
			api.AddLog("error", warningMsg)
		} else {
			successMsg := fmt.Sprintf("✅ Supabase storage initialized (table: %s) - Models will save on improvement (5 percent threshold)", *supabaseTable)
			log.Printf(successMsg)
			api.AddLog("success", successMsg)

			// Improvement threshold: 5% improvement or 0.1 absolute improvement
			improvementThreshold := 0.05
			lastSaveTime := time.Now()
			maxSaveInterval := 5 * time.Minute // Force save every 5 minutes as backup

			wg.Add(1)
			go func() {
				defer wg.Done()
				// Check for improvements every 10 seconds
				ticker := time.NewTicker(10 * time.Second)
				defer ticker.Stop()

				for {
					select {
					case <-ctx.Done():
						return
					case <-ticker.C:
						stats := trainer.GetStats()
						bestReward, bestLoss := trainer.GetBestMetrics()

						// Check if model has improved
						hasImproved := trainer.HasImproved(improvementThreshold)

						// Also save if it's been too long since last save (backup)
						timeSinceLastSave := time.Since(lastSaveTime)
						forceSave := timeSinceLastSave >= maxSaveInterval

						if hasImproved || forceSave {
							weights := trainer.GetModelWeights()
							weights.Metadata.Timestamp = time.Now().UTC().Format(time.RFC3339)
							weights.Metadata.Episodes = stats.Episodes
							weights.Metadata.EvalScore = stats.AverageReward

							var saveMsg string
							if hasImproved {
								saveMsg = fmt.Sprintf("💾 Model improved! Saving to Supabase (Episodes: %d, Reward: %.2f → %.2f, Loss: %.4f → %.4f)",
									weights.Metadata.Episodes, bestReward, stats.AverageReward, bestLoss, stats.Loss)
							} else {
								saveMsg = fmt.Sprintf("💾 Periodic save to Supabase (Episodes: %d, Reward: %.2f, Loss: %.4f)",
									weights.Metadata.Episodes, stats.AverageReward, stats.Loss)
							}
							log.Printf(saveMsg)
							api.AddLog("info", saveMsg)

							if err := storage.SaveModel(weights); err != nil {
								errorMsg := fmt.Sprintf("❌ Failed to save model to Supabase: %v", err)
								log.Printf(errorMsg)
								api.AddLog("error", errorMsg)
							} else {
								var successMsg string
								if hasImproved {
									successMsg = fmt.Sprintf("✅ Improved model saved! (Episodes: %d, Reward: %.2f, Loss: %.4f)",
										weights.Metadata.Episodes, stats.AverageReward, stats.Loss)
								} else {
									successMsg = fmt.Sprintf("✅ Model saved (periodic backup) (Episodes: %d, Reward: %.2f)",
										weights.Metadata.Episodes, stats.AverageReward)
								}
								log.Printf(successMsg)
								api.AddLog("success", successMsg)
								lastSaveTime = time.Now()
							}
						}
					}
				}
			}()
		}
	} else {
		log.Println("Supabase not configured - models will not be saved")
	}

	// Wait for shutdown signal
	<-sigChan
	fmt.Println("\nShutting down...")

	// Cancel context to signal all goroutines to stop
	cancel()

	// Gracefully shutdown HTTP server if it exists
	if dashboard != nil {
		shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer shutdownCancel()
		if err := dashboard.Shutdown(shutdownCtx); err != nil {
			log.Printf("Error shutting down dashboard server: %v", err)
		}
	}

	// Wait for all goroutines to finish (they should exit when ctx.Done() is signaled)
	// Use a channel with timeout to prevent indefinite blocking
	done := make(chan struct{})
	go func() {
		wg.Wait()
		close(done)
	}()

	select {
	case <-done:
		fmt.Println("All goroutines finished cleanly")
	case <-time.After(10 * time.Second):
		fmt.Println("Warning: Some goroutines did not finish within timeout")
	}
}
