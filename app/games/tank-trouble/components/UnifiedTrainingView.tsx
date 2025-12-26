/**
 * Unified Training View
 * 
 * Single interface for all training modes: AI vs AI and Person vs AI
 * Supports up to 4 games simultaneously with stats and model summary
 */

'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';

// Component to update stats reactively (no polling)
function StatsDebouncer({ 
  stats, 
  onUpdate 
}: { 
  stats: { episodeReward: number; episodeLength: number }; 
  onUpdate: (stats: { episodeReward: number; episodeLength: number }) => void;
}) {
  const prevStatsRef = useRef<{ episodeReward: number; episodeLength: number } | null>(null);
  
  // Update reactively when stats change (no artificial delays)
  useEffect(() => {
    const prev = prevStatsRef.current;
    // Only update if values actually changed
    if (!prev || prev.episodeReward !== stats.episodeReward || prev.episodeLength !== stats.episodeLength) {
      prevStatsRef.current = stats;
      onUpdate(stats);
    }
  }, [stats.episodeReward, stats.episodeLength, onUpdate]);
  
  return null;
}
import mapData from '@/content/games/tank-trouble-map.json';
import type { Tank, Bullet, TankTroubleMapData } from '@/app/games/tank-trouble/types';
import { useGameInput } from '@/app/games/tank-trouble/hooks/useGameInput';
import { useTankImages } from '@/app/games/tank-trouble/hooks/useTankImages';
import { useMultiGameLogic, type GameInstance as GameLogicInstance } from '@/app/games/tank-trouble/components/GameLogic';
import { GameCanvas } from '@/app/games/tank-trouble/components/GameCanvas';
import { getInitialSpawnPositions } from '@/app/games/tank-trouble/utils/spawn';
import { DEFAULT_AI_CONFIG, type AIConfig, rlModelManager } from '@/app/games/tank-trouble/ai-tank';
import { useRLTraining } from '@/app/games/tank-trouble/ai-tank/rl-training-hook';
import { listSavedModels, type SavedModel } from '@/app/games/tank-trouble/ai-tank/rl-model-storage';
import { DQNAgent } from '@/app/games/tank-trouble/ai-tank/rl-dqn-model';
import { TensorFlowJSModel } from '@/app/games/tank-trouble/ai-tank/rl-model';
// import { TrainingDictionary } from './TrainingDictionary';

interface GameInstance {
  id: number;
  tanks: Tank[];
  bullets: Bullet[];
  lastShotTimes: { blue: number; red: number };
  gameOverWinner: 'blue' | 'red' | null;
  episodeReward: number;
  episodeLength: number;
  episodeStartTime: number;
  gameType: 'ai-vs-ai' | 'person-vs-ai';
  isActive: boolean;
  episodeNumber: number; // Current episode number for this game instance
}

interface GameStats {
  totalGames: number;
  aiVsAiGames: number;
  personVsAiGames: number;
}

// Speed multiplier for AI vs AI games (1x speed for normal training)
const AI_VS_AI_SPEED_MULTIPLIER = 1;

// Configuration: Number of simultaneous games to train
const MAX_GAMES = 4;

export function UnifiedTrainingView() {
  const typedMapData = mapData as TankTroubleMapData;
  const barriersRef = useRef(typedMapData.barriers);
  const sunsRef = useRef(typedMapData.suns || []);
  const aiConfig = DEFAULT_AI_CONFIG;
  const maxGames = MAX_GAMES;

  // Game statistics
  const [gameStats, setGameStats] = useState<GameStats>({
    totalGames: 0,
    aiVsAiGames: 0,
    personVsAiGames: 0,
  });
  
  // Track total games started (including incomplete ones)
  // Starts at MAX_GAMES because we have MAX_GAMES games running initially
  const [totalGamesStarted, setTotalGamesStarted] = useState(MAX_GAMES);

  // Model selection
  const [savedModels, setSavedModels] = useState<SavedModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const selectedModelRef = useRef<string>('');
  
  // Dictionary visibility (commented out - using separate component)
  // const [isDictionaryVisible, setIsDictionaryVisible] = useState(true);
  
  // Debounced stats for display (update every 5 seconds)
  const [displayStats, setDisplayStats] = useState<{ reward: number; length: number } | null>(null);
  
  // Memoize the update callback to prevent recreation
  const handleDisplayStatsUpdate = useCallback((stats: { episodeReward: number; episodeLength: number }) => {
    setDisplayStats((prev) => {
      // Only update if values actually changed
      if (!prev || prev.reward !== stats.episodeReward || prev.length !== stats.episodeLength) {
        return { reward: stats.episodeReward, length: stats.episodeLength };
      }
      return prev;
    });
  }, []);

  // Track which game the user is playing (only one at a time)
  const [userPlayingGameId, setUserPlayingGameId] = useState<number | null>(null);

  // Ref to track next episode number atomically (prevents race conditions when multiple games end simultaneously)
  const nextEpisodeNumberRef = useRef(MAX_GAMES + 1); // Start at MAX_GAMES + 1 (first game will be MAX_GAMES + 1)

  // Track current time for duration calculations
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update current time every second for duration display
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000); // Update every second
    
    return () => clearInterval(interval);
  }, []);

  // Create game instances (start with 4 AI vs AI games)
  const [gameInstances, setGameInstances] = useState<GameInstance[]>(() =>
    Array.from({ length: maxGames }, (_, i) => ({
      id: i,
      tanks: getInitialSpawnPositions(typedMapData, barriersRef.current, sunsRef.current),
      bullets: [],
      lastShotTimes: { blue: 0, red: 0 },
      gameOverWinner: null,
      episodeReward: 0,
      episodeLength: 0,
      episodeStartTime: Date.now(),
      gameType: 'ai-vs-ai',
      isActive: false, // Games don't run until training starts
      episodeNumber: i + 1, // Start at ID + 1 (Game 1, Game 2, Game 3, Game 4)
    }))
  );

  // Shared training manager
  const training = useRLTraining({
    episodes: 1000,
    trainEvery: 4,
    saveEvery: 100,
    selfPlay: true,
    // TODO: Implement headless mode later - this will allow faster training by skipping rendering
    // headless: false,
  });

  // Sync gameStats.totalGames with training episode count (completed games)
  useEffect(() => {
    if (training.stats && training.stats.episode !== undefined) {
      const completedGames = training.stats.episode;
      setGameStats((prev) => ({
        ...prev,
        totalGames: completedGames,
      }));
    }
  }, [training.stats?.episode]);
  
  // Update total games started when a game completes
  // This includes both completed and incomplete games
  useEffect(() => {
    if (training.stats && training.stats.episode !== undefined) {
      // Total games started = completed games + MAX_GAMES (currently running games)
      setTotalGamesStarted(training.stats.episode + MAX_GAMES);
    }
  }, [training.stats?.episode]);

  const tankImagesRef = useTankImages();
  
  // Single keyboard input hook - only one game can be personal at a time
  const activeGameOver = userPlayingGameId !== null ? gameInstances[userPlayingGameId]?.gameOverWinner !== null : false;
  const gameInput = useGameInput({ gameOver: activeGameOver });

  // Use appropriate keys ref based on game type
  const getKeysRef = (gameId: number) => {
    // Only return the keys ref if this is the game the user is playing
    if (gameId === userPlayingGameId) {
      return gameInput.keysRef;
    }
    return { current: new Set<string>() };
  };


  // Replace AI game with person game (user joins as Blue, AI is Red)
  // Preserves current game state - user takes control of existing blue tank
  const replaceWithPersonGame = (gameId: number) => {
    // If user is already playing another game, convert that one back to AI vs AI first
    if (userPlayingGameId !== null && userPlayingGameId !== gameId) {
      replaceWithAIGame(userPlayingGameId);
    }
    
    setUserPlayingGameId(gameId);
    setGameInstances((prev) =>
      prev.map((gi) =>
        gi.id === gameId
          ? {
              ...gi,
              gameType: 'person-vs-ai',
              // Don't reset game state - preserve current tanks, bullets, and game progress
              // User simply takes control of the existing blue tank
            }
          : gi
      )
    );
  };

  // Replace person game with AI game
  // Preserves current game state - AI simply takes control of the blue tank
  const replaceWithAIGame = (gameId: number) => {
    if (userPlayingGameId === gameId) {
      setUserPlayingGameId(null);
    }
    setGameInstances((prev) =>
      prev.map((gi) =>
        gi.id === gameId
          ? {
              ...gi,
              gameType: 'ai-vs-ai',
              // Don't reset game state - preserve current tanks, bullets, and game progress
              // AI simply takes control of the existing blue tank
            }
          : gi
      )
    );
  };

  // Get max episode time from training manager
  const maxEpisodeTimeMs = training.manager?.getMaxEpisodeTimeMs() || 90000;

  // Prepare game instances for multi-game logic hook - memoize to avoid recreating on every render
  // Note: This will still recreate when gameInstances changes (which is frequent during gameplay),
  // but prevents recreation on unrelated renders (UI state changes, etc.)
  const gameLogicInstances: GameLogicInstance[] = useMemo(() => {
    return gameInstances.map((instance) => ({
      id: instance.id,
      tanks: instance.tanks,
      bullets: instance.bullets,
      lastShotTimes: instance.lastShotTimes,
      gameMode: instance.gameType === 'person-vs-ai' ? 'person-vs-ai' : 'ai',
      gameId: `game-${instance.id}`,
      isPaused: !instance.isActive || !training.isTraining || (instance.id === userPlayingGameId && gameInput.isPaused),
      speedMultiplier: instance.gameType === 'ai-vs-ai' ? AI_VS_AI_SPEED_MULTIPLIER : 1,
      episodeStartTime: instance.episodeStartTime,
      keysRef: getKeysRef(instance.id), // getKeysRef returns stable refs, safe to call here
    }));
  }, [
    gameInstances,
    training.isTraining,
    userPlayingGameId,
    gameInput.isPaused,
    // getKeysRef is a stable function (doesn't change between renders), so not included in deps
  ]);

  // Single hook call for all games
  const gameLogic = useMultiGameLogic({
    mapData: typedMapData,
    barriers: barriersRef.current,
    suns: sunsRef.current,
    aiConfig,
    trainingManager: training.manager,
    maxEpisodeTimeMs,
    gameInstances: gameLogicInstances,
    onTanksUpdate: (gameId, tanks) => {
      setGameInstances((prev) =>
        prev.map((gi) => (gi.id === gameId ? { ...gi, tanks } : gi))
      );
    },
    onBulletsUpdate: (gameId, bullets) => {
      setGameInstances((prev) =>
        prev.map((gi) => (gi.id === gameId ? { ...gi, bullets } : gi))
      );
    },
    onLastShotTimesUpdate: (gameId, times) => {
      setGameInstances((prev) =>
        prev.map((gi) => (gi.id === gameId ? { ...gi, lastShotTimes: times } : gi))
      );
    },
    onGameOver: (gameId, winner) => {
      const newEpisodeNumber = nextEpisodeNumberRef.current++;
      training.incrementEpisode();

      setGameInstances((prev) =>
        prev.map((gi) => {
          if (gi.id === gameId) {
            setGameStats((stats) => ({
              ...stats,
              aiVsAiGames: gi.gameType === 'ai-vs-ai' ? stats.aiVsAiGames + 1 : stats.aiVsAiGames,
              personVsAiGames: gi.gameType === 'person-vs-ai' ? stats.personVsAiGames + 1 : stats.personVsAiGames,
            }));

            return {
              ...gi,
              tanks: getInitialSpawnPositions(typedMapData, barriersRef.current, sunsRef.current),
              bullets: [],
              lastShotTimes: { blue: 0, red: 0 },
              gameOverWinner: null,
              episodeReward: 0,
              episodeLength: 0,
              episodeStartTime: Date.now(),
              isActive: training.isTraining,
              episodeNumber: newEpisodeNumber,
            };
          }
          return gi;
        })
      );

      if (gameId === userPlayingGameId) {
        setUserPlayingGameId(null);
      }
    },
  });

  // Handle training state changes
  useEffect(() => {
    if (training.isTraining) {
      // Activate all games when training starts
      setGameInstances((prev) =>
        prev.map((gi) => ({ ...gi, isActive: true }))
      );
    } else {
      // Deactivate all games when training stops
      setGameInstances((prev) =>
        prev.map((gi) => ({ ...gi, isActive: false }))
      );
    }
  }, [training.isTraining]);

  // Run all game loops (only if training is active)
  useEffect(() => {
    if (!training.isTraining) {
      return;
    }

    const animationFrames: number[] = [];
    let lastFrameTime = performance.now();
    
    const gameLoop = (currentTime: number) => {
      // Tick all active games
      gameInstances.forEach((instance, idx) => {
        if (instance.isActive) {
          const isAIVsAI = instance.gameType === 'ai-vs-ai';
          const speedMultiplier = isAIVsAI ? AI_VS_AI_SPEED_MULTIPLIER : 1;
          
          if (isAIVsAI && speedMultiplier > 1) {
            // For AI vs AI games, run multiple ticks per frame
            const elapsed = currentTime - lastFrameTime;
            const targetFrameTime = 1000 / 72; // Target 72 FPS base
            const ticksToRun = Math.max(1, Math.floor((elapsed / targetFrameTime) * speedMultiplier));
            
            for (let i = 0; i < ticksToRun; i++) {
              gameLogic.gameTick({ skipIntervalCheck: i > 0, gameId: instance.id });
            }
          } else {
            // Normal speed (one tick per frame)
            gameLogic.gameTick({ gameId: instance.id });
          }
          
          // Update episode length reactively
          if (instance.episodeStartTime) {
            const elapsed = (Date.now() - instance.episodeStartTime) / 1000;
            const newEpisodeLength = Math.floor(elapsed * 72);
            if (instance.episodeLength !== newEpisodeLength) {
              setGameInstances((prev) =>
                prev.map((gi) => (gi.id === instance.id ? { ...gi, episodeLength: newEpisodeLength } : gi))
              );
            }
          }
        }
      });
      
      lastFrameTime = currentTime;
      const frameId = requestAnimationFrame(gameLoop);
      animationFrames.push(frameId);
    };
    
    const frameId = requestAnimationFrame(gameLoop);
    animationFrames.push(frameId);

    return () => {
      animationFrames.forEach((id) => cancelAnimationFrame(id));
    };
  }, [training.isTraining, gameLogic, gameInstances]);

  const loadSavedModels = useCallback(async () => {
    setIsLoadingModels(true);
    try {
      const models = await listSavedModels();
      setSavedModels(models);
      // Preserve selectedModel if it still exists in the new list
      if (selectedModelRef.current && !models.some(m => m.path === selectedModelRef.current)) {
        // If selected model is no longer in the list, keep it selected anyway
        // (it might have been renamed or the list refresh happened before save completed)
        // Don't clear it - let the user decide
      }
    } catch (error) {
      console.error('Failed to load models:', error);
    } finally {
      setIsLoadingModels(false);
    }
  }, []);

  // Load saved models on mount
  useEffect(() => {
    loadSavedModels();
  }, [loadSavedModels]);

  // Refresh models when training saves
  useEffect(() => {
    if (training.stats && training.stats.episode > 0 && training.stats.episode % 100 === 0) {
      // Refresh model list when model is saved (every 100 games)
      // Preserve current selection using ref to avoid stale closure
      const currentSelection = selectedModelRef.current;
      loadSavedModels().then(() => {
        // Restore selection if it still exists
        if (currentSelection) {
          setSelectedModel(currentSelection);
          selectedModelRef.current = currentSelection;
        }
      });
    }
  }, [training.stats?.episode, loadSavedModels]);

  const handleModelSelect = async (modelPath: string) => {
    if (!modelPath) return;
    
    try {
      setSelectedModel(modelPath);
      selectedModelRef.current = modelPath;
      
      // Load the model
      const agent = new DQNAgent();
      await agent.load(modelPath);
      
      // Wrap in model interface
      const model = new TensorFlowJSModel({
        name: 'TankTroubleRL',
        type: 'discrete',
        observationSize: 142,
        actionSize: 14,
      });
      
      (model as any).agent = agent;
      (model as any).predict = async (obs: any, angle: number) => agent.predict(obs, angle);
      (model as any).isLoaded = () => true;
      
      // Set as active model for AI controller (for playing against AI)
      rlModelManager.setModel(model);
      
      // If training is active, also load the model into the training manager
      // This allows training to continue from the selected model
      if (training.isTraining && training.manager) {
        await training.manager.loadModel(modelPath);
        console.log('Model loaded into training manager for continued training');
      }
      
      alert('Model loaded successfully!');
    } catch (error) {
      console.error('Failed to load model:', error);
      alert('Failed to load model. See console for details.');
    }
  };

  // Calculate episode length on-demand (no polling)
  // Episode length is calculated from episodeStartTime when needed
  // This is done reactively in the game loop or when rendering

  // Calculate grid layout dynamically based on number of games
  // Aim for roughly square grid (e.g., 4 games = 2x2, 9 games = 3x3, 10 games = 4x3)
  const gridCols = Math.ceil(Math.sqrt(MAX_GAMES));
  const gridRows = Math.ceil(MAX_GAMES / gridCols);
  // Scale down to fit games in grid
  // Use 0.45 to ensure proper fit with padding
  const scale = 0.45;
  
  // Speed multiplier for AI vs AI games (3x faster for faster training)

  // Get model info
  const modelInfo = rlModelManager.getModel().getInfo();
  const isRLActive = rlModelManager.isRLActive();

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top Section: Stats/Model Info and Training Controls */}
      <div className="flex gap-4">
        {/* Left: RL Training + Model Selector, Stats, and Model Summary */}
        <div className="flex-1 space-y-4">
          {/* RL Training Control + Model Selector (Horizontal Bar) */}
          <div className="p-4 bg-white border border-gray-300 rounded shadow">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Training Controls */}
              <div className="flex items-center gap-2">
                {!training.isTraining ? (
                  <button
                    onClick={async () => {
                      if (selectedModel && training.manager) {
                        try {
                          await training.manager.loadModel(selectedModel);
                          console.log('Loaded selected model into training manager');
                        } catch (error) {
                          console.error('Failed to load model into training manager:', error);
                        }
                      }
                      training.startTraining();
                    }}
                    style={{ backgroundColor: '#bbf7d0' }}
                    className="px-4 py-2 bg-green-200 text-green-700 rounded hover:bg-green-300 font-medium"
                  >
                    Start Training
                  </button>
                ) : (
                  <button
                    onClick={() => training.stopTraining()}
                    style={{ backgroundColor: '#fecaca' }}
                    className="px-4 py-2 bg-red-200 text-red-700 rounded hover:bg-red-300 font-medium"
                  >
                    Stop Training
                  </button>
                )}
                <button
                  onClick={async () => {
                    try {
                      // Check if training manager is initialized
                      if (!training.manager) {
                        alert('Training manager not initialized. Please wait for initialization or start training first.');
                        return;
                      }
                      
                      const timestamp = Date.now();
                      const modelPath = `indexeddb://tank-ai-${timestamp}`;
                      console.log('Attempting to save model to:', modelPath);
                      await training.saveModel(modelPath);
                      console.log('Model save completed, refreshing model list...');
                      // Preserve current selection before refreshing
                      const currentSelection = selectedModelRef.current;
                      await loadSavedModels(); // Refresh the model list
                      // If we had a selection and it still exists, restore it
                      // Otherwise, the newly saved model will be available but not auto-selected
                      if (currentSelection) {
                        setSelectedModel(currentSelection);
                        selectedModelRef.current = currentSelection;
                      }
                      alert(`Model saved successfully! (tank-ai-${timestamp})`);
                    } catch (error) {
                      console.error('Error saving model:', error);
                      const errorMessage = error instanceof Error ? error.message : String(error);
                      alert(`Failed to save model: ${errorMessage}\n\nCheck the browser console for details.`);
                    }
                  }}
                  style={{ backgroundColor: '#bfdbfe' }}
                  className="px-4 py-2 bg-blue-200 text-blue-700 rounded hover:bg-blue-300 font-medium"
                >
                  Save Model
                </button>
              </div>

              {/* Training Status */}
              <div className="flex items-center gap-2 text-sm">
                <span className={`inline-block w-3 h-3 rounded-full ${training.isTraining ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span>{training.isTraining ? 'Training Active' : 'Training Stopped'}</span>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-300" />

              {/* Model Selector (Optional) */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <label className="text-sm font-semibold whitespace-nowrap">Select Model (Optional):</label>
                <select
                  value={selectedModel}
                  onChange={(e) => handleModelSelect(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-w-0"
                  disabled={isLoadingModels}
                >
                  <option value="">{isLoadingModels ? 'Loading models...' : '-- Select a model --'}</option>
                  {savedModels.length === 0 && !isLoadingModels && (
                    <option value="" disabled>No saved models found</option>
                  )}
                  {savedModels.map((model) => (
                    <option key={model.path} value={model.path}>
                      {model.name} - {model.createdAtString}
                    </option>
                  ))}
                </select>
                <button
                  onClick={loadSavedModels}
                  style={{ backgroundColor: '#e5e7eb' }}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:bg-gray-200 disabled:opacity-50 text-sm font-medium whitespace-nowrap flex-shrink-0"
                  disabled={isLoadingModels}
                >
                  {isLoadingModels ? 'Loading...' : 'Refresh'}
                </button>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500 italic">
              Models are saved in your browser's local storage (IndexedDB)
            </div>
          </div>

          {/* Stats Header */}
          <div className="p-4 bg-white border border-gray-300 rounded shadow">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${MAX_GAMES}, 1fr)` }}>
              <div>
                <div className="text-sm text-gray-600">Total Games</div>
                <div className="text-2xl font-bold">{training.stats?.episode || 0}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">AI vs AI</div>
                <div className="text-2xl font-bold text-blue-600">{gameStats.aiVsAiGames}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Person vs AI</div>
                <div className="text-2xl font-bold text-green-600">{gameStats.personVsAiGames}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Active Games</div>
                <div className="text-2xl font-bold text-purple-600">
                  {gameInstances.filter((gi) => gi.isActive).length}
                </div>
              </div>
            </div>
          </div>

          {/* Model Summary */}
          <div className="p-4 bg-white border border-gray-300 rounded shadow">
            <h3 className="font-semibold mb-2">Model Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-sm mb-2">
              <div>
                <div>
                  <span className="text-gray-600">Model Type: </span>
                  <span className="font-semibold">{isRLActive ? 'RL (Trained)' : 'Rule-Based (Fallback)'}</span>
                </div>
                <div className="text-xs text-gray-500 italic mt-0.5">Type of AI model being used</div>
              </div>
              <div>
                <div>
                  <span className="text-gray-600">Action Space: </span>
                  <span className="font-semibold">{modelInfo.type === 'discrete' ? 'Discrete (14 actions)' : 'Continuous'}</span>
                </div>
                <div className="text-xs text-gray-500 italic mt-0.5">Number of possible actions the AI can take</div>
              </div>
              <div>
                <div>
                  <span className="text-gray-600">Observation Size: </span>
                  <span className="font-semibold">{modelInfo.observationSize} features</span>
                </div>
                <div className="text-xs text-gray-500 italic mt-0.5">Number of input features the AI observes</div>
              </div>
            </div>
            {training.stats && (
              <>
                {/* Debounce stats updates (every 5 seconds) */}
                <StatsDebouncer
                  stats={training.stats}
                  onUpdate={handleDisplayStatsUpdate}
                />
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <h4 className="font-semibold mb-2 text-sm">Training Statistics</h4>
                <div className="grid grid-cols-2 gap-3 text-sm mb-2">
                  <div>
                    <div>
                      <span className="text-gray-600">Games: </span>
                      <span className="font-semibold">{training.stats.episode}</span>
                    </div>
                    <div className="text-xs text-gray-500 italic mt-0.5">Total games completed (auto-saves every 100 games). Each game = one complete game session.</div>
                  </div>
                  <div>
                    <div>
                      <span className="text-gray-600">Avg Reward: </span>
                      <span className="font-semibold">{(training.stats.averageReward ?? 0).toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-500 italic mt-0.5">Average reward per game</div>
                  </div>
                  <div>
                    <div>
                      <span className="text-gray-600">Epsilon: </span>
                      <span className="font-semibold">{(training.stats.epsilon ?? 0).toFixed(3)}</span>
                    </div>
                    <div className="text-xs text-gray-500 italic mt-0.5">Exploration rate (higher = more random)</div>
                  </div>
                  <div>
                    <div>
                      <span className="text-gray-600">Loss: </span>
                      <span className="font-semibold">{(training.stats.loss ?? 0).toFixed(4)}</span>
                    </div>
                    <div className="text-xs text-gray-500 italic mt-0.5">
                      {training.stats.loss === 0
                        ? 'Will update after 32+ experiences collected and training starts (every 4 steps)'
                        : 'Neural network training loss'}
                    </div>
                  </div>
                </div>
                {/* Active Games Stats - Always visible to prevent layout shifts */}
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <h4 className="font-semibold mb-2 text-sm">Active Games Stats</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div>
                        <span className="text-gray-600">Reward: </span>
                        <span className="font-semibold">
                          {displayStats?.reward !== undefined 
                            ? displayStats.reward.toFixed(2) 
                            : training.stats?.episodeReward.toFixed(2) || '0.00'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 italic mt-0.5">
                        Total reward accumulated across all {gameInstances.filter(gi => gi.isActive).length} active games
                      </div>
                    </div>
                  <div>
                    <div>
                      <span className="text-gray-600">Length: </span>
                      <span className="font-semibold">
                        {displayStats?.length !== undefined 
                          ? displayStats.length 
                          : training.stats?.episodeLength || 0}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 italic mt-0.5">
                      Total steps across all {gameInstances.filter(gi => gi.isActive).length} active games (updates every 5 seconds)
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              </>
            )}
          </div>
        </div>

        {/* Right: Dictionary */}
        {/* <TrainingDictionary /> */}
      </div>

      {/* Game Status - Horizontal Layout */}
      <div className="w-full">
        <div className="p-4 bg-white border border-gray-300 rounded shadow">
          <h3 className="font-semibold mb-3 text-lg">Game Status</h3>
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${MAX_GAMES}, 1fr)` }}>
            {gameInstances.map((instance) => {
              const blueLives = instance.tanks[0]?.lives || 0;
              const redLives = instance.tanks[1]?.lives || 0;
              const isAIVsAI = instance.gameType === 'ai-vs-ai';
              const isPersonVsAI = instance.gameType === 'person-vs-ai';
              
              // Calculate active duration
              // Show N/A if training hasn't started or game hasn't started yet
              const hasStarted = training.isTraining && instance.episodeStartTime;
              let durationSeconds = 0;
              
              if (hasStarted) {
                durationSeconds = Math.floor((currentTime - instance.episodeStartTime) / 1000);
              }
              
              const formatDuration = (seconds: number) => {
                const mins = Math.floor(seconds / 60);
                const secs = seconds % 60;
                return `${mins}:${secs.toString().padStart(2, '0')}`;
              };
              
              return (
                <div key={instance.id} className="border border-gray-200 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-sm">Game {instance.id + 1}</div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      isPersonVsAI 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {isPersonVsAI ? 'Person vs AI' : 'AI vs AI'}
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-semibold ${instance.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                        {instance.isActive ? 'Active' : 'Paused'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-mono font-semibold text-gray-700">
                        {hasStarted ? formatDuration(durationSeconds) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Blue Lives:</span>
                      <span className="font-mono font-semibold">{blueLives}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Red Lives:</span>
                      <span className="font-mono font-semibold">{redLives}</span>
                    </div>
                    {training.stats && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model:</span>
                        <span className="font-semibold text-blue-600">v{Math.floor((training.stats.episode || 0) / MAX_GAMES) + 1}</span>
                      </div>
                    )}
                    {instance.gameOverWinner && (
                      <div className="mt-1 pt-1 border-t border-gray-200">
                        <span className="text-gray-600">Winner: </span>
                        <span className={`font-semibold ${instance.gameOverWinner === 'blue' ? 'text-blue-600' : 'text-red-600'}`}>
                          {instance.gameOverWinner.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content - Games Grid */}
      <div className="w-full">
        <div 
          className="grid gap-4" 
          style={{ 
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          }}
        >
          {gameInstances.map((instance) => {
            const keysRef = getKeysRef(instance.id);
            const isPersonGame = instance.gameType === 'person-vs-ai';
            // Calculate scaled canvas size (internal resolution is 2x, then apply scale)
            const scaledWidth = typedMapData.width * 2 * scale;
            const scaledHeight = typedMapData.height * 2 * scale;
            
            const isUserPlaying = userPlayingGameId === instance.id;
            
            return (
              <div 
                key={instance.id} 
                className={`border rounded p-2 bg-gray-50 relative flex flex-col items-center ${
                  isUserPlaying ? 'border-blue-600 border-2' : 'border-gray-300'
                }`}
                style={{ 
                  height: `${scaledHeight + 60}px`, // Fixed height: Canvas height + padding + header (prevents scroll on game end)
                  minHeight: `${scaledHeight + 60}px`,
                  maxHeight: `${scaledHeight + 60}px`,
                  overflow: 'hidden', // Prevent content from expanding beyond fixed height
                }}
              >
                  <div className="flex items-center justify-between mb-1 w-full" style={{ width: `${scaledWidth}px` }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-700">
                        ID: {instance.id + 1}
                      </span>
                      
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded font-medium">
                            Game {instance.episodeNumber} / {(training.stats?.episode || 0) + MAX_GAMES}
                          </span>
                     
                    </div>
                    {!isPersonGame && (
                      <div className="relative">
                        <button
                          onClick={() => {
                            // Only allow joining if not already in a different game
                            if (userPlayingGameId === null || userPlayingGameId === instance.id) {
                              replaceWithPersonGame(instance.id);
                            }
                          }}
                          className={`text-xs px-2 py-1 rounded font-medium transition-colors ${
                            !training.isTraining || (userPlayingGameId !== null && userPlayingGameId !== instance.id)
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                              : 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer'
                          }`}
                          disabled={!training.isTraining || (userPlayingGameId !== null && userPlayingGameId !== instance.id)}
                        >
                          {userPlayingGameId === instance.id ? 'You are playing' : 'Join Game'}
                        </button>
                      </div>
                    )}
                    {isPersonGame && (
                      <button
                        onClick={() => replaceWithAIGame(instance.id)}
                        className="text-xs px-2 py-1 bg-orange-200 text-orange-700 rounded hover:bg-orange-300 font-medium"
                      >
                        Make AI vs AI
                      </button>
                    )}
                  </div>
                  {!instance.isActive && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded">
                      <div className="text-white text-sm">Waiting for training to start...</div>
                    </div>
                  )}
                  {/* Properly scaled canvas container - fixed size to prevent layout shifts */}
                  <div 
                    className="flex justify-center items-center overflow-hidden"
                    style={{
                      width: `${scaledWidth}px`,
                      height: `${scaledHeight}px`,
                    }}
                  >
                    <GameCanvas
                      width={typedMapData.width}
                      height={typedMapData.height}
                      tanks={instance.tanks}
                      bullets={instance.bullets}
                      barriers={barriersRef.current}
                      suns={sunsRef.current}
                      isPaused={!instance.isActive || !training.isTraining}
                      tankImages={tankImagesRef.current}
                      gameOverWinner={instance.gameOverWinner}
                      scale={scale}
                    />
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </div>
  );
}

