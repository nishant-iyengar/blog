import React, { useCallback, useRef, useEffect } from 'react';
import type { Tank, Bullet, Barrier, Sun, TankTroubleMapData } from '@/app/games/tank-trouble/types';
import { TICK_INTERVAL, GAME_CONFIG } from '@/app/games/tank-trouble/config';
import { updatePlayer1Tank, updatePlayer2Tank } from '@/app/games/tank-trouble/utils/tank';
import { updateBullets } from '@/app/games/tank-trouble/utils/bullet';
import { generateRandomSpawnPosition } from '@/app/games/tank-trouble/utils/spawn';
import { updateAITank, type AIConfig } from '@/app/games/tank-trouble/ai-tank';
import type { RLTrainingManager } from '@/app/games/tank-trouble/ai-tank/rl-training-manager';

export interface GameInstance {
  id: number;
  tanks: Tank[];
  bullets: Bullet[];
  lastShotTimes: { blue: number; red: number };
  gameMode: 'ai' | 'person-vs-ai';
  gameId: string;
  isPaused: boolean;
  speedMultiplier: number;
  episodeStartTime?: number;
  keysRef: React.MutableRefObject<Set<string>>;
}

interface MultiGameLogicProps {
  mapData: TankTroubleMapData;
  barriers: Barrier[];
  suns: Sun[];
  aiConfig?: AIConfig;
  trainingManager?: RLTrainingManager | null;
  maxEpisodeTimeMs?: number;
  gameInstances: GameInstance[];
  onTanksUpdate: (gameId: number, tanks: Tank[]) => void;
  onBulletsUpdate: (gameId: number, bullets: Bullet[]) => void;
  onLastShotTimesUpdate: (gameId: number, times: { blue: number; red: number }) => void;
  onGameOver: (gameId: number, winner: 'blue' | 'red' | null) => void;
}

interface GameTickOptions {
  skipIntervalCheck?: boolean;
  gameId?: number; // Optional: tick specific game, otherwise tick all
}

/**
 * Multi-game logic hook - handles game ticks for multiple game instances
 * This replaces the previous pattern of calling useGameLogic multiple times (which violated Rules of Hooks)
 */
export function useMultiGameLogic({
  mapData,
  barriers,
  suns,
  aiConfig,
  trainingManager,
  maxEpisodeTimeMs = 90000,
  gameInstances,
  onTanksUpdate,
  onBulletsUpdate,
  onLastShotTimesUpdate,
  onGameOver,
}: MultiGameLogicProps) {
  // Track game over states per game
  const gameOverTriggeredRefs = useRef<Map<number, boolean>>(new Map());
  
  // Track last tick times per game
  const lastTickRefs = useRef<Map<number, number>>(new Map());
  
  // Track tank/bullet refs per game
  const tanksRefs = useRef<Map<number, Tank[]>>(new Map());
  const bulletsRefs = useRef<Map<number, Bullet[]>>(new Map());
  
  // Store latest gameInstances in ref for access in callback (avoid stale closure)
  const gameInstancesRef = useRef(gameInstances);
  
  // Create a Map for O(1) lookup by gameId instead of O(n) filter
  const gameInstancesMapRef = useRef<Map<number, GameInstance>>(new Map());
  
  useEffect(() => {
    gameInstancesRef.current = gameInstances;
    // Update Map for efficient lookups
    const map = new Map<number, GameInstance>();
    gameInstances.forEach(instance => {
      map.set(instance.id, instance);
    });
    gameInstancesMapRef.current = map;
  }, [gameInstances]);
  
  // Initialize refs for all games
  useEffect(() => {
    gameInstances.forEach((instance) => {
      if (!tanksRefs.current.has(instance.id)) {
        tanksRefs.current.set(instance.id, instance.tanks);
      }
      if (!bulletsRefs.current.has(instance.id)) {
        bulletsRefs.current.set(instance.id, instance.bullets);
      }
    });
  }, [gameInstances]);
  
  // Update refs when state changes
  useEffect(() => {
    gameInstances.forEach((instance) => {
      const prevTanks = tanksRefs.current.get(instance.id);
      tanksRefs.current.set(instance.id, instance.tanks);
      bulletsRefs.current.set(instance.id, instance.bullets);
      
      // Reset game over flag when tanks are reset (new game started)
      if (instance.tanks.length >= 2 && 
          instance.tanks[0]?.lives === GAME_CONFIG.tank.lives && 
          instance.tanks[1]?.lives === GAME_CONFIG.tank.lives) {
        gameOverTriggeredRefs.current.set(instance.id, false);
      }
    });
  }, [gameInstances]);

  const gameTick = useCallback((options?: GameTickOptions) => {
    // Use ref to get latest game instances (avoid stale closure)
    const currentGameInstances = gameInstancesRef.current;
    const gamesToTick = options?.gameId !== undefined 
      ? (() => {
          // Use Map for O(1) lookup instead of O(n) filter
          const instance = gameInstancesMapRef.current.get(options.gameId);
          return instance ? [instance] : [];
        })()
      : currentGameInstances;

    gamesToTick.forEach((instance) => {
      // Skip if paused
      if (instance.isPaused) {
        return;
      }
      
      const now = Date.now();
      const lastTickTime = lastTickRefs.current.get(instance.id) || 0;
      
      // Check interval (unless skipIntervalCheck is true)
      if (!options?.skipIntervalCheck) {
        const adjustedTickInterval = TICK_INTERVAL / instance.speedMultiplier;
        if (now - lastTickTime < adjustedTickInterval) {
          return;
        }
      }
      
      const tickTime = now;
      lastTickRefs.current.set(instance.id, tickTime);

      const currentTanks = [...(tanksRefs.current.get(instance.id) || [])];
      const currentBullets = [...(bulletsRefs.current.get(instance.id) || [])];
      let newLastShotTimes = { ...instance.lastShotTimes };
      const keys = instance.keysRef.current;
      
      // Validate tanks exist
      if (!currentTanks || currentTanks.length < 2) {
        return;
      }

      // Update Player 1 (Blue)
      if (currentTanks[0]?.lives > 0) {
        let result;
        
        if (instance.gameMode === 'person-vs-ai') {
          result = updatePlayer1Tank({
            tank: currentTanks[0],
            tankIndex: 0,
            keys,
            tickTime,
            lastShotTime: instance.lastShotTimes.blue,
            bullets: currentBullets,
            mapWidth: mapData.width,
            mapHeight: mapData.height,
            barriers,
            suns,
            allTanks: currentTanks,
          });
        } else if (trainingManager && trainingManager.getIsTraining() && instance.gameMode === 'ai') {
          result = updateAITank(
            {
              tank: currentTanks[0],
              tankIndex: 0,
              keys,
              tickTime,
              lastShotTime: instance.lastShotTimes.blue,
              bullets: currentBullets,
              mapWidth: mapData.width,
              mapHeight: mapData.height,
              barriers,
              suns,
              allTanks: currentTanks,
            },
            aiConfig,
            trainingManager,
            `${instance.gameId}-blue`
          );
        } else {
          result = updatePlayer1Tank({
            tank: currentTanks[0],
            tankIndex: 0,
            keys,
            tickTime,
            lastShotTime: instance.lastShotTimes.blue,
            bullets: currentBullets,
            mapWidth: mapData.width,
            mapHeight: mapData.height,
            barriers,
            suns,
            allTanks: currentTanks,
          });
        }
        
        currentTanks[0] = result.updatedTank;
        currentBullets.push(...result.newBullets);
        newLastShotTimes.blue = result.lastShotTime;
      }

      // Update Player 2 (Red)
      if (currentTanks[1]?.lives > 0) {
        // Always use AI for red tank (simplified logic - removed duplicate branch)
        const result = updateAITank(
          {
            tank: currentTanks[1],
            tankIndex: 1,
            keys,
            tickTime,
            lastShotTime: instance.lastShotTimes.red,
            bullets: currentBullets,
            mapWidth: mapData.width,
            mapHeight: mapData.height,
            barriers,
            suns,
            allTanks: currentTanks,
          },
          aiConfig,
          trainingManager,
          instance.gameId
        );
        
        currentTanks[1] = result.updatedTank;
        currentBullets.push(...result.newBullets);
        newLastShotTimes.red = result.lastShotTime;
      }

      // Update bullets
      const bulletResult = updateBullets({
        bullets: currentBullets,
        tickTime,
        mapWidth: mapData.width,
        mapHeight: mapData.height,
        barriers,
        suns,
        tanks: currentTanks,
      });

      const gameOverTriggered = gameOverTriggeredRefs.current.get(instance.id) || false;

      // Check for timeout
      if (!gameOverTriggered && instance.episodeStartTime) {
        const episodeElapsed = tickTime - instance.episodeStartTime;
        if (episodeElapsed >= maxEpisodeTimeMs) {
          gameOverTriggeredRefs.current.set(instance.id, true);
          const blueTank = bulletResult.updatedTanks[0];
          const redTank = bulletResult.updatedTanks[1];
          
          let winner: 'blue' | 'red' | null = null;
          if (blueTank && redTank) {
            if (blueTank.lives > redTank.lives) {
              winner = 'blue';
            } else if (redTank.lives > blueTank.lives) {
              winner = 'red';
            }
          }
          
          bulletResult.updatedBullets = [];
          bulletResult.updatedTanks[0] = {
            ...blueTank,
            exploding: false,
            explosionStartTime: undefined,
            respawning: false,
            respawnStartTime: undefined,
            respawnTargetX: undefined,
            respawnTargetY: undefined,
            respawnTargetAngle: undefined,
            invincibleUntil: undefined,
          };
          bulletResult.updatedTanks[1] = {
            ...redTank,
            exploding: false,
            explosionStartTime: undefined,
            respawning: false,
            respawnStartTime: undefined,
            respawnTargetX: undefined,
            respawnTargetY: undefined,
            respawnTargetAngle: undefined,
            invincibleUntil: undefined,
          };
          
          onTanksUpdate(instance.id, bulletResult.updatedTanks);
          onBulletsUpdate(instance.id, bulletResult.updatedBullets);
          onGameOver(instance.id, winner);
          return;
        }
      }

      // Check for game over (tank reached 0 lives)
      const blueTankAfterBullets = bulletResult.updatedTanks[0];
      const redTankAfterBullets = bulletResult.updatedTanks[1];
      
      if (!gameOverTriggered && blueTankAfterBullets && redTankAfterBullets) {
        if (blueTankAfterBullets.lives <= 0 || redTankAfterBullets.lives <= 0) {
          gameOverTriggeredRefs.current.set(instance.id, true);
          const winner = blueTankAfterBullets.lives <= 0 ? 'red' : 'blue';
          
          bulletResult.updatedBullets = [];
          bulletResult.updatedTanks[0] = {
            ...blueTankAfterBullets,
            exploding: false,
            explosionStartTime: undefined,
            respawning: false,
            respawnStartTime: undefined,
            respawnTargetX: undefined,
            respawnTargetY: undefined,
            respawnTargetAngle: undefined,
            invincibleUntil: undefined,
          };
          bulletResult.updatedTanks[1] = {
            ...redTankAfterBullets,
            exploding: false,
            explosionStartTime: undefined,
            respawning: false,
            respawnStartTime: undefined,
            respawnTargetX: undefined,
            respawnTargetY: undefined,
            respawnTargetAngle: undefined,
            invincibleUntil: undefined,
          };
          
          onTanksUpdate(instance.id, bulletResult.updatedTanks);
          onBulletsUpdate(instance.id, bulletResult.updatedBullets);
          onGameOver(instance.id, winner);
          return;
        }
      }

      // Handle respawning
      for (let i = 0; i < bulletResult.updatedTanks.length; i++) {
        const tank = bulletResult.updatedTanks[i];
        const originalTank = currentTanks[i];
        
        if (tank.lives < originalTank.lives && tank.lives > 0) {
          const tankColor = tank.color;
          bulletResult.updatedBullets = bulletResult.updatedBullets.filter(
            bullet => bullet.owner !== tankColor
          );
          
          const spawn = generateRandomSpawnPosition(
            mapData,
            barriers,
            bulletResult.updatedTanks,
            suns,
            i === 0 ? bulletResult.updatedTanks[1] : bulletResult.updatedTanks[0]
              ? { x: bulletResult.updatedTanks[i === 0 ? 1 : 0].x, y: bulletResult.updatedTanks[i === 0 ? 1 : 0].y }
              : undefined
          );
          
          // Set invincibility for 2 seconds after respawn
          const INVINCIBILITY_DURATION_MS = 2000; // 2 seconds
          bulletResult.updatedTanks[i] = {
            ...tank,
            x: spawn.x,
            y: spawn.y,
            angle: spawn.angle,
            exploding: false,
            explosionStartTime: undefined,
            respawning: false,
            respawnStartTime: undefined,
            respawnTargetX: undefined,
            respawnTargetY: undefined,
            respawnTargetAngle: undefined,
            invincibleUntil: tickTime + INVINCIBILITY_DURATION_MS,
          };
        }
        
        if (tank.exploding || tank.respawning) {
          bulletResult.updatedTanks[i] = {
            ...tank,
            exploding: false,
            explosionStartTime: undefined,
            respawning: false,
            respawnStartTime: undefined,
            respawnTargetX: undefined,
            respawnTargetY: undefined,
            respawnTargetAngle: undefined,
            // Don't clear invincibleUntil here - it may still be active
          };
        }
        
        // Clear invincibility if it has expired
        if (tank.invincibleUntil !== undefined && tickTime >= tank.invincibleUntil) {
          bulletResult.updatedTanks[i] = {
            ...tank,
            invincibleUntil: undefined,
          };
        }
      }

      if (!gameOverTriggered) {
        onTanksUpdate(instance.id, bulletResult.updatedTanks);
        onBulletsUpdate(instance.id, bulletResult.updatedBullets);
        onLastShotTimesUpdate(instance.id, newLastShotTimes);
      }
    });
  }, [
    mapData,
    barriers,
    suns,
    aiConfig,
    trainingManager,
    maxEpisodeTimeMs,
    onTanksUpdate,
    onBulletsUpdate,
    onLastShotTimesUpdate,
    onGameOver,
  ]);

  return { gameTick };
}
