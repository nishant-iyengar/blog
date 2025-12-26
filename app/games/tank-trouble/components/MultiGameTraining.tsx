/**
 * Multi-Game Training Component
 * 
 * Displays multiple AI vs AI games running simultaneously for parallel training.
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
import { DEFAULT_AI_CONFIG, type AIConfig } from '@/app/games/tank-trouble/ai-tank';
import { useRLTraining } from '@/app/games/tank-trouble/ai-tank/rl-training-hook';
import { TrainingPanel } from '@/app/games/tank-trouble/components/TrainingPanel';

interface GameInstance {
  id: number;
  tanks: Tank[];
  bullets: Bullet[];
  lastShotTimes: { blue: number; red: number };
  gameOverWinner: 'blue' | 'red' | null;
  episodeReward: number;
  episodeLength: number;
  episodeStartTime: number;
}

interface MultiGameTrainingProps {
  numGames?: number;
}

export function MultiGameTraining({ numGames = 4 }: MultiGameTrainingProps) {
  const typedMapData = mapData as TankTroubleMapData;
  const barriersRef = useRef(typedMapData.barriers);
  const sunsRef = useRef(typedMapData.suns || []);
  const aiConfig = DEFAULT_AI_CONFIG;

  // Create multiple game instances
  const [gameInstances, setGameInstances] = useState<GameInstance[]>(() =>
    Array.from({ length: numGames }, (_, i) => ({
      id: i,
      tanks: getInitialSpawnPositions(typedMapData, barriersRef.current, sunsRef.current),
      bullets: [],
      lastShotTimes: { blue: 0, red: 0 },
      gameOverWinner: null,
      episodeReward: 0,
      episodeLength: 0,
      episodeStartTime: Date.now(),
    }))
  );

  // Shared training manager (all games use same model)
  const training = useRLTraining({
    episodes: 1000,
    trainEvery: 4,
    saveEvery: 100,
    selfPlay: true,
    headless: false,
  });

  const tankImagesRef = useTankImages();
  const keysRef = useRef<Set<string>>(new Set()); // Not used in AI mode, but required

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
      // Restart immediately (no delay) - reset game state
      setGameInstances((prev) =>
        prev.map((gi) => {
          if (gi.id === instanceId) {
            return {
              ...gi,
              tanks: getInitialSpawnPositions(typedMapData, barriersRef.current, sunsRef.current),
              bullets: [],
              lastShotTimes: { blue: 0, red: 0 },
              gameOverWinner: null,
              episodeReward: 0,
              episodeLength: 0,
              episodeStartTime: Date.now(),
            };
          }
          return gi;
        })
      );
    },
  });

  // Create game logic for each instance (fixed number, so hooks are fine)
  const gameLogic0 = useGameLogic({
    isPaused: false,
    keysRef,
    mapData: typedMapData,
    barriers: barriersRef.current,
    suns: sunsRef.current,
    tanks: gameInstances[0]?.tanks || [],
    bullets: gameInstances[0]?.bullets || [],
    lastShotTimes: gameInstances[0]?.lastShotTimes || { blue: 0, red: 0 },
    gameMode: 'ai',
    aiConfig,
    trainingManager: training.manager,
    ...createUpdateHandlers(0),
  });

  const gameLogic1 = numGames > 1 ? useGameLogic({
    isPaused: false,
    keysRef,
    mapData: typedMapData,
    barriers: barriersRef.current,
    suns: sunsRef.current,
    tanks: gameInstances[1]?.tanks || [],
    bullets: gameInstances[1]?.bullets || [],
    lastShotTimes: gameInstances[1]?.lastShotTimes || { blue: 0, red: 0 },
    gameMode: 'ai',
    aiConfig,
    trainingManager: training.manager,
    ...createUpdateHandlers(1),
  }) : null;

  const gameLogic2 = numGames > 2 ? useGameLogic({
    isPaused: false,
    keysRef,
    mapData: typedMapData,
    barriers: barriersRef.current,
    suns: sunsRef.current,
    tanks: gameInstances[2]?.tanks || [],
    bullets: gameInstances[2]?.bullets || [],
    lastShotTimes: gameInstances[2]?.lastShotTimes || { blue: 0, red: 0 },
    gameMode: 'ai',
    aiConfig,
    trainingManager: training.manager,
    ...createUpdateHandlers(2),
  }) : null;

  const gameLogic3 = numGames > 3 ? useGameLogic({
    isPaused: false,
    keysRef,
    mapData: typedMapData,
    barriers: barriersRef.current,
    suns: sunsRef.current,
    tanks: gameInstances[3]?.tanks || [],
    bullets: gameInstances[3]?.bullets || [],
    lastShotTimes: gameInstances[3]?.lastShotTimes || { blue: 0, red: 0 },
    gameMode: 'ai',
    aiConfig,
    trainingManager: training.manager,
    ...createUpdateHandlers(3),
  }) : null;

  const gameLogics = [gameLogic0, gameLogic1, gameLogic2, gameLogic3].filter(Boolean);

  // Run all game loops
  useEffect(() => {
    const animationFrames: number[] = [];

    gameLogics.forEach((gameLogic, idx) => {
      if (gameLogic) {
        const gameLoop = () => {
          gameLogic.gameTick();
          
          // Update episode length reactively (calculated on each frame, no polling)
          setGameInstances((prev) => {
            const instance = prev[idx];
            if (instance?.episodeStartTime) {
              const elapsed = (Date.now() - instance.episodeStartTime) / 1000;
              const newEpisodeLength = Math.floor(elapsed * 72);
              if (instance.episodeLength !== newEpisodeLength) {
                return prev.map((gi, i) => 
                  i === idx ? { ...gi, episodeLength: newEpisodeLength } : gi
                );
              }
            }
            return prev;
          });
          
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
  }, [gameLogics]);

  const gridCols = Math.ceil(Math.sqrt(numGames));
  const gridRows = Math.ceil(numGames / gridCols);

  // Track per-game rewards (updated via training manager callbacks)
  const [gameRewards, setGameRewards] = useState<Record<number, number>>({});
  const [gameEpisodeLengths, setGameEpisodeLengths] = useState<Record<number, number>>({});

  // Update game stats when training updates
  useEffect(() => {
    if (training.stats) {
      // Distribute aggregate stats across games (approximation)
      const perGameReward = training.stats.episodeReward / numGames;
      const perGameLength = training.stats.episodeLength / numGames;
      
      const newRewards: Record<number, number> = {};
      const newLengths: Record<number, number> = {};
      
      gameInstances.forEach((instance) => {
        newRewards[instance.id] = gameRewards[instance.id] || 0;
        newLengths[instance.id] = gameEpisodeLengths[instance.id] || 0;
      });
      
      setGameRewards(newRewards);
      setGameEpisodeLengths(newLengths);
    }
  }, [training.stats]);

  // Calculate episode length on-demand (no polling)
  // Episode length is calculated from episodeStartTime when needed
  // This is done reactively in the game loop or when rendering

  return (
    <div className="flex gap-4 w-full">
      {/* Games Grid - Scaled Down */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">Multi-Game AI Training</h2>
          <div className="text-sm text-gray-600">
            {training.isTraining ? (
              <span className="text-green-600">● Training Active</span>
            ) : (
              <span className="text-gray-400">● Training Stopped</span>
            )}
          </div>
        </div>

        {/* Training Panel - Controls */}
        <div className="mb-4">
          <TrainingPanel
            training={training}
            onTrainingStateChange={(isTraining) => {
              if (isTraining) {
                training.startTraining();
              } else {
                training.stopTraining();
              }
            }}
          />
        </div>

        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            gridTemplateRows: `repeat(${gridRows}, 1fr)`,
          }}
        >
          {gameInstances.map((instance) => {
            const scale = 0.75; // 75% size (25% reduction)
            const scaledWidth = typedMapData.width * scale;
            const scaledHeight = typedMapData.height * scale;
            
            return (
              <div key={instance.id} className="border border-gray-300 rounded p-2 bg-gray-50 overflow-hidden">
                <div className="text-xs text-gray-500 mb-1">Game {instance.id + 1}</div>
                <div 
                  className="transform origin-top-left"
                  style={{ 
                    transform: `scale(${scale})`,
                    width: `${typedMapData.width}px`,
                    height: `${typedMapData.height}px`,
                    marginBottom: `-${typedMapData.height * (1 - scale)}px`,
                    marginRight: `-${typedMapData.width * (1 - scale)}px`,
                  }}
                >
                  <GameCanvas
                    width={typedMapData.width}
                    height={typedMapData.height}
                    tanks={instance.tanks}
                    bullets={instance.bullets}
                    barriers={barriersRef.current}
                    suns={sunsRef.current}
                    isPaused={false}
                    tankImages={tankImagesRef.current}
                    gameOverWinner={instance.gameOverWinner}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Side Panel - Live Training Data */}
      <div className="w-80 flex-shrink-0 space-y-4">
        {/* Overall Training Stats */}
        {training.stats && (
          <div className="p-4 bg-white border border-gray-300 rounded shadow">
            <h3 className="font-semibold mb-3 text-lg">Overall Training</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Episode:</span>
                <span className="font-mono font-semibold">{training.stats.episode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Reward:</span>
                <span className="font-mono font-semibold">{training.stats.averageReward.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Epsilon:</span>
                <span className="font-mono font-semibold">{training.stats.epsilon.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Loss:</span>
                <span className="font-mono font-semibold">{training.stats.loss.toFixed(4)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Per-Game Stats */}
        <div className="p-4 bg-white border border-gray-300 rounded shadow">
          <h3 className="font-semibold mb-3 text-lg">Per-Game Stats</h3>
          <div className="space-y-3">
            {gameInstances.map((instance) => {
              const blueLives = instance.tanks[0]?.lives || 0;
              const redLives = instance.tanks[1]?.lives || 0;
              const episodeTime = Math.floor((Date.now() - instance.episodeStartTime) / 1000);
              
              return (
                <div key={instance.id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
                  <div className="font-semibold text-sm mb-2">Game {instance.id + 1}</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Episode Reward:</span>
                      <span className="font-mono">{instance.episodeReward.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Episode Length:</span>
                      <span className="font-mono">{instance.episodeLength} ticks</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-mono">{episodeTime}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Blue Lives:</span>
                      <span className="font-mono font-semibold">{blueLives}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Red Lives:</span>
                      <span className="font-mono font-semibold">{redLives}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bullets:</span>
                      <span className="font-mono">{instance.bullets.length}</span>
                    </div>
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

        {/* Training Optimizations */}
        <div className="p-4 bg-white border border-gray-300 rounded shadow">
          <h3 className="font-semibold mb-3 text-lg">Training Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Active Games:</span>
              <span className="font-mono font-semibold">{numGames}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Training Rate:</span>
              <span className="font-mono font-semibold">~{numGames * 72} steps/sec</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Parallel Episodes:</span>
              <span className="font-mono font-semibold">{numGames}x</span>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                All games share the same model and contribute to training.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

