/**
 * Unified Training View
 * 
 * Single interface for all training modes: AI vs AI and Person vs AI
 * Supports up to 4 games simultaneously with stats and model summary
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import mapData from '@/content/games/tank-trouble-map.json';
import type { Tank, Bullet, TankTroubleMapData } from '@/app/games/tank-trouble/types';
import { useGameInput } from '@/app/games/tank-trouble/hooks/useGameInput';
import { useTankImages } from '@/app/games/tank-trouble/hooks/useTankImages';
import { useGameLogic } from '@/app/games/tank-trouble/components/GameLogic';
import { GameCanvas } from '@/app/games/tank-trouble/components/GameCanvas';
import { getInitialSpawnPositions } from '@/app/games/tank-trouble/utils/spawn';
import { DEFAULT_AI_CONFIG, type AIConfig, rlModelManager } from '@/app/games/tank-trouble/ai-tank';
import { useRLTraining } from '@/app/games/tank-trouble/ai-tank/rl-training-hook';
import { TrainingPanel } from '@/app/games/tank-trouble/components/TrainingPanel';
import { listSavedModels, type SavedModel } from '@/app/games/tank-trouble/ai-tank/rl-model-storage';
import { DQNAgent } from '@/app/games/tank-trouble/ai-tank/rl-dqn-model';
import { TensorFlowJSModel } from '@/app/games/tank-trouble/ai-tank/rl-model';

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
  gameNumber: number; // Track which game number this instance is on (increments each restart)
}

interface GameStats {
  totalGames: number;
  aiVsAiGames: number;
  personVsAiGames: number;
}

// Speed multiplier for AI vs AI games (3x speed)
const AI_VS_AI_SPEED_MULTIPLIER = 3;

export function UnifiedTrainingView() {
  const typedMapData = mapData as TankTroubleMapData;
  const barriersRef = useRef(typedMapData.barriers);
  const sunsRef = useRef(typedMapData.suns || []);
  const aiConfig = DEFAULT_AI_CONFIG;
  const maxGames = 4;

  // Game statistics
  const [gameStats, setGameStats] = useState<GameStats>({
    totalGames: 0,
    aiVsAiGames: 0,
    personVsAiGames: 0,
  });

  // Model selection
  const [savedModels, setSavedModels] = useState<SavedModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [isLoadingModels, setIsLoadingModels] = useState(false);

  // Track which game the user is playing (only one at a time)
  const [userPlayingGameId, setUserPlayingGameId] = useState<number | null>(null);

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
      gameNumber: 0, // Start at 0, will increment when game restarts
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

  const tankImagesRef = useTankImages();
  const keysRef0 = useRef<Set<string>>(new Set());
  const keysRef1 = useRef<Set<string>>(new Set());
  const keysRef2 = useRef<Set<string>>(new Set());
  const keysRef3 = useRef<Set<string>>(new Set());
  
  // Set up keyboard input for person games
  const gameInput0 = useGameInput({ gameOver: gameInstances[0]?.gameOverWinner !== null });
  const gameInput1 = useGameInput({ gameOver: gameInstances[1]?.gameOverWinner !== null });
  const gameInput2 = useGameInput({ gameOver: gameInstances[2]?.gameOverWinner !== null });
  const gameInput3 = useGameInput({ gameOver: gameInstances[3]?.gameOverWinner !== null });

  // Use appropriate keys ref based on game type
  const getKeysRef = (gameId: number) => {
    if (gameInstances[gameId]?.gameType === 'person-vs-ai') {
      if (gameId === 0) return gameInput0.keysRef;
      if (gameId === 1) return gameInput1.keysRef;
      if (gameId === 2) return gameInput2.keysRef;
      if (gameId === 3) return gameInput3.keysRef;
    }
    return { current: new Set<string>() };
  };

  // Create update handlers for each instance
  const createUpdateHandlers = (instanceId: number) => ({
    onTanksUpdate: (tanks: Tank[]) => {
      setGameInstances((prev) =>
        prev.map((gi) => (gi.id === instanceId ? { ...gi, tanks } : gi))
      );
    },
    onBulletsUpdate: (bullets: Bullet[]) => {
      setGameInstances((prev) =>
        prev.map((gi) => (gi.id === instanceId ? { ...gi, bullets } : gi))
      );
    },
    onLastShotTimesUpdate: (times: { blue: number; red: number }) => {
      setGameInstances((prev) =>
        prev.map((gi) => (gi.id === instanceId ? { ...gi, lastShotTimes: times } : gi))
      );
    },
    onGameOver: (winner: 'blue' | 'red' | null) => {
      setGameInstances((prev) =>
        prev.map((gi) => {
          if (gi.id === instanceId) {
            // Update stats
            setGameStats((stats) => {
              const newTotalGames = stats.totalGames + 1;
              return {
                totalGames: newTotalGames,
                aiVsAiGames: gi.gameType === 'ai-vs-ai' ? stats.aiVsAiGames + 1 : stats.aiVsAiGames,
                personVsAiGames: gi.gameType === 'person-vs-ai' ? stats.personVsAiGames + 1 : stats.personVsAiGames,
              };
            });

            // Auto-restart after a short delay
            setTimeout(() => {
              setGameInstances((prev2) =>
                prev2.map((gi2) =>
                  gi2.id === instanceId
                    ? {
                        ...gi2,
                        tanks: getInitialSpawnPositions(typedMapData, barriersRef.current, sunsRef.current),
                        bullets: [],
                        lastShotTimes: { blue: 0, red: 0 },
                        gameOverWinner: null,
                        episodeReward: 0,
                        episodeLength: 0,
                        episodeStartTime: Date.now(),
                        isActive: training.isTraining, // Only active if training is running
                        gameNumber: gi2.gameNumber + 1, // Increment game number
                      }
                    : gi2
                )
              );
            }, 1000);
            return { ...gi, gameOverWinner: winner };
          }
          return gi;
        })
      );
      
      // If user was playing this game and it ended, reset userPlayingGameId
      if (instanceId === userPlayingGameId) {
        setUserPlayingGameId(null);
      }
    },
  });

  // Replace AI game with person game (user joins as Blue, AI is Red)
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
              tanks: getInitialSpawnPositions(typedMapData, barriersRef.current, sunsRef.current),
              bullets: [],
              lastShotTimes: { blue: 0, red: 0 },
              gameOverWinner: null,
              episodeReward: 0,
              episodeLength: 0,
              episodeStartTime: Date.now(),
            }
          : gi
      )
    );
  };

  // Replace person game with AI game
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
              tanks: getInitialSpawnPositions(typedMapData, barriersRef.current, sunsRef.current),
              bullets: [],
              lastShotTimes: { blue: 0, red: 0 },
              gameOverWinner: null,
              episodeReward: 0,
              episodeLength: 0,
              episodeStartTime: Date.now(),
            }
          : gi
      )
    );
  };

  // Create game logic for each instance (fixed number, so hooks are fine)
  const gameLogic0 = useGameLogic({
    isPaused: !gameInstances[0]?.isActive || !training.isTraining || gameInput0.isPaused,
    keysRef: getKeysRef(0),
    mapData: typedMapData,
    barriers: barriersRef.current,
    suns: sunsRef.current,
    tanks: gameInstances[0]?.tanks || [],
    bullets: gameInstances[0]?.bullets || [],
    lastShotTimes: gameInstances[0]?.lastShotTimes || { blue: 0, red: 0 },
    gameMode: gameInstances[0]?.gameType === 'person-vs-ai' ? 'person-vs-ai' : 'ai',
    aiConfig,
    trainingManager: training.manager, // Always pass training manager - person games also contribute to training
    gameId: 'game-0',
    speedMultiplier: gameInstances[0]?.gameType === 'ai-vs-ai' ? AI_VS_AI_SPEED_MULTIPLIER : 1,
    ...createUpdateHandlers(0),
  });

  const gameLogic1 = useGameLogic({
    isPaused: !gameInstances[1]?.isActive || !training.isTraining || gameInput1.isPaused,
    keysRef: getKeysRef(1),
    mapData: typedMapData,
    barriers: barriersRef.current,
    suns: sunsRef.current,
    tanks: gameInstances[1]?.tanks || [],
    bullets: gameInstances[1]?.bullets || [],
    lastShotTimes: gameInstances[1]?.lastShotTimes || { blue: 0, red: 0 },
    gameMode: gameInstances[1]?.gameType === 'person-vs-ai' ? 'person-vs-ai' : 'ai',
    aiConfig,
    trainingManager: training.manager,
    gameId: 'game-1',
    speedMultiplier: gameInstances[1]?.gameType === 'ai-vs-ai' ? AI_VS_AI_SPEED_MULTIPLIER : 1,
    ...createUpdateHandlers(1),
  });

  const gameLogic2 = useGameLogic({
    isPaused: !gameInstances[2]?.isActive || !training.isTraining || gameInput2.isPaused,
    keysRef: getKeysRef(2),
    mapData: typedMapData,
    barriers: barriersRef.current,
    suns: sunsRef.current,
    tanks: gameInstances[2]?.tanks || [],
    bullets: gameInstances[2]?.bullets || [],
    lastShotTimes: gameInstances[2]?.lastShotTimes || { blue: 0, red: 0 },
    gameMode: gameInstances[2]?.gameType === 'person-vs-ai' ? 'person-vs-ai' : 'ai',
    aiConfig,
    trainingManager: training.manager,
    gameId: 'game-2',
    speedMultiplier: gameInstances[2]?.gameType === 'ai-vs-ai' ? AI_VS_AI_SPEED_MULTIPLIER : 1,
    ...createUpdateHandlers(2),
  });

  const gameLogic3 = useGameLogic({
    isPaused: !gameInstances[3]?.isActive || !training.isTraining || gameInput3.isPaused,
    keysRef: getKeysRef(3),
    mapData: typedMapData,
    barriers: barriersRef.current,
    suns: sunsRef.current,
    tanks: gameInstances[3]?.tanks || [],
    bullets: gameInstances[3]?.bullets || [],
    lastShotTimes: gameInstances[3]?.lastShotTimes || { blue: 0, red: 0 },
    gameMode: gameInstances[3]?.gameType === 'person-vs-ai' ? 'person-vs-ai' : 'ai',
    aiConfig,
    trainingManager: training.manager,
    gameId: 'game-3',
    speedMultiplier: gameInstances[3]?.gameType === 'ai-vs-ai' ? AI_VS_AI_SPEED_MULTIPLIER : 1,
    ...createUpdateHandlers(3),
  });

  const gameLogics = [gameLogic0, gameLogic1, gameLogic2, gameLogic3];

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

    gameLogics.forEach((gameLogic, idx) => {
      if (gameInstances[idx]?.isActive) {
        const isAIVsAI = gameInstances[idx]?.gameType === 'ai-vs-ai';
        const speedMultiplier = isAIVsAI ? AI_VS_AI_SPEED_MULTIPLIER : 1;
        
        // For speedup, we run multiple ticks per frame
        // requestAnimationFrame is limited to ~60 FPS, so we simulate faster gameplay
        // by running multiple game ticks per frame with interval checks bypassed
        const gameLoop = () => {
          if (isAIVsAI && speedMultiplier > 1) {
            // For AI vs AI games, run multiple ticks per frame
            // Skip interval check for all but the first tick to allow rapid execution
            gameLogic.gameTick(); // First tick with normal interval check
            for (let i = 1; i < speedMultiplier; i++) {
              gameLogic.gameTick({ skipIntervalCheck: true }); // Subsequent ticks bypass interval
            }
          } else {
            // Normal speed for person games (one tick per frame)
            gameLogic.gameTick();
          }
          
          const frameId = requestAnimationFrame(gameLoop);
          animationFrames.push(frameId);
        };
        const frameId = requestAnimationFrame(gameLoop);
        animationFrames.push(frameId);
      }
    });

    return () => {
      animationFrames.forEach((id) => cancelAnimationFrame(id));
    };
  }, [training.isTraining, gameLogics, gameInstances]);

  // Load saved models on mount
  useEffect(() => {
    loadSavedModels();
  }, []);

  // Refresh models when training saves
  useEffect(() => {
    if (training.stats && training.stats.episode > 0 && training.stats.episode % 100 === 0) {
      // Refresh model list when model is saved (every 100 episodes)
      loadSavedModels();
    }
  }, [training.stats?.episode]);

  const loadSavedModels = async () => {
    setIsLoadingModels(true);
    try {
      const models = await listSavedModels();
      setSavedModels(models);
    } catch (error) {
      console.error('Failed to load models:', error);
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleModelSelect = async (modelPath: string) => {
    if (!modelPath) return;
    
    try {
      setSelectedModel(modelPath);
      
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

  // Update episode lengths
  useEffect(() => {
    const interval = setInterval(() => {
      setGameInstances((prev) =>
        prev.map((gi) => {
          if (gi.isActive) {
            const elapsed = (Date.now() - gi.episodeStartTime) / 1000;
            return {
              ...gi,
              episodeLength: Math.floor(elapsed * 72),
            };
          }
          return gi;
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const gridCols = 2;
  const gridRows = 2;
  // Scale down to fit 4 games in grid
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
        {/* Left: Model Selector, Stats, and Model Summary */}
        <div className="flex-1 space-y-4">
          {/* Model Selector */}
          <div className="p-4 bg-white border border-gray-300 rounded shadow">
            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold">Select Model:</label>
              <select
                value={selectedModel}
                onChange={(e) => handleModelSelect(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:bg-gray-200 disabled:opacity-50 text-sm font-medium"
                disabled={isLoadingModels}
              >
                {isLoadingModels ? 'Loading...' : 'Refresh'}
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500 italic">
              Models are saved in your browser's local storage (IndexedDB)
            </div>
            {selectedModel && (
              <div className="mt-2 text-xs text-gray-600">
                Current model: {savedModels.find(m => m.path === selectedModel)?.name || selectedModel}
              </div>
            )}
          </div>

          {/* Stats Header */}
          <div className="p-4 bg-white border border-gray-300 rounded shadow">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-600">Total Games</div>
                <div className="text-2xl font-bold">{gameStats.totalGames}</div>
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
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Model Type: </span>
                <span className="font-semibold">{isRLActive ? 'RL (Trained)' : 'Rule-Based (Fallback)'}</span>
              </div>
              <div>
                <span className="text-gray-600">Action Space: </span>
                <span className="font-semibold">{modelInfo.type === 'discrete' ? 'Discrete (14 actions)' : 'Continuous'}</span>
              </div>
              <div>
                <span className="text-gray-600">Observation Size: </span>
                <span className="font-semibold">{modelInfo.observationSize} features</span>
              </div>
            </div>
            {training.stats && (
              <div className="mt-2 pt-2 border-t border-gray-200 text-sm">
                <span className="text-gray-600">Training Episodes: </span>
                <span className="font-semibold">{training.stats.episode}</span>
                <span className="text-gray-600 ml-4">Avg Reward: </span>
                <span className="font-semibold">{training.stats.averageReward.toFixed(2)}</span>
                <span className="text-gray-600 ml-4">Epsilon: </span>
                <span className="font-semibold">{training.stats.epsilon.toFixed(3)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Training Panel */}
        <div className="w-80 flex-shrink-0 flex flex-col">
          <TrainingPanel
            training={training}
            onTrainingStateChange={async (isTraining) => {
              if (isTraining) {
                // If a model is selected, load it into the training manager before starting
                if (selectedModel && training.manager) {
                  try {
                    await training.manager.loadModel(selectedModel);
                    console.log('Loaded selected model into training manager');
                  } catch (error) {
                    console.error('Failed to load model into training manager:', error);
                  }
                }
                training.startTraining();
              } else {
                training.stopTraining();
              }
            }}
          />
        </div>
      </div>

      {/* Game Status - Horizontal Layout */}
      <div className="w-full">
        <div className="p-4 bg-white border border-gray-300 rounded shadow">
          <h3 className="font-semibold mb-3 text-lg">Game Status</h3>
          <div className="grid grid-cols-4 gap-4">
            {gameInstances.map((instance) => {
              const blueLives = instance.tanks[0]?.lives || 0;
              const redLives = instance.tanks[1]?.lives || 0;
              const isAIVsAI = instance.gameType === 'ai-vs-ai';
              const isPersonVsAI = instance.gameType === 'person-vs-ai';
              
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
                      <span className="text-blue-600">Blue Lives:</span>
                      <span className="font-mono font-semibold">{blueLives}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Red Lives:</span>
                      <span className="font-mono font-semibold">{redLives}</span>
                    </div>
                    {isAIVsAI && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Speed:</span>
                        <span className="font-semibold text-purple-600">{AI_VS_AI_SPEED_MULTIPLIER}x</span>
                      </div>
                    )}
                    {training.stats && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model:</span>
                        <span className="font-semibold text-blue-600">v{Math.floor((training.stats.episode || 0) / 4) + 1}</span>
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
            
            return (
              <div 
                key={instance.id} 
                className="border border-gray-300 rounded p-2 bg-gray-50 relative flex flex-col items-center"
                style={{ 
                  minHeight: `${scaledHeight + 60}px`, // Canvas height + padding + header
                }}
              >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="text-xs font-semibold">
                        Game {instance.id + 1} - {isPersonGame ? 'Person vs AI' : 'AI vs AI'}
                      </div>
                      {!isPersonGame && (
                        <>
                          <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded font-medium">
                            {AI_VS_AI_SPEED_MULTIPLIER}x Speed
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded font-medium">
                            Game {instance.gameNumber + 1} / {gameStats.totalGames}
                          </span>
                        </>
                      )}
                    </div>
                    {!isPersonGame && (
                      <button
                        onClick={() => replaceWithPersonGame(instance.id)}
                        style={{ backgroundColor: '#dcfce7' }}
                        className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed font-medium"
                        disabled={!training.isTraining || (userPlayingGameId !== null && userPlayingGameId !== instance.id)}
                      >
                        {userPlayingGameId === instance.id ? 'You are playing' : 'Join Game'}
                      </button>
                    )}
                    {isPersonGame && (
                      <button
                        onClick={() => replaceWithAIGame(instance.id)}
                        style={{ backgroundColor: '#e5e7eb' }}
                        className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium"
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
                  {/* Properly scaled canvas container */}
                  <div 
                    className="flex justify-center items-center overflow-hidden"
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
                  {isPersonGame && (
                    <div className="mt-2 text-xs text-gray-600 p-2 bg-yellow-50 rounded">
                      <div className="font-semibold">You are playing!</div>
                      <div>Blue (You): Arrow keys + Space</div>
                      <div>Red (AI): Training in progress...</div>
                      <div className="mt-1 text-xs text-gray-500 italic">Your actions are being used for training</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
      </div>
    </div>
  );
}

