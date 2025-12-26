import React, { useCallback, useRef, useEffect } from 'react';
import type { Tank, Bullet, Barrier, Sun, TankTroubleMapData } from '@/app/games/tank-trouble/types';
import { TICK_INTERVAL, GAME_CONFIG } from '@/app/games/tank-trouble/config';
import { updatePlayer1Tank, updatePlayer2Tank } from '@/app/games/tank-trouble/utils/tank';
import { updateBullets } from '@/app/games/tank-trouble/utils/bullet';
import { generateRandomSpawnPosition } from '@/app/games/tank-trouble/utils/spawn';
import { updateAITank, type AIConfig } from '@/app/games/tank-trouble/ai-tank';
import type { RLTrainingManager } from '@/app/games/tank-trouble/ai-tank/rl-training-manager';

interface GameLogicProps {
  isPaused: boolean;
  keysRef: React.MutableRefObject<Set<string>>;
  mapData: TankTroubleMapData;
  barriers: Barrier[];
  suns: Sun[];
  tanks: Tank[];
  bullets: Bullet[];
  lastShotTimes: { blue: number; red: number };
  gameMode: 'ai' | 'person-vs-ai';
  aiConfig?: AIConfig;
  trainingManager?: RLTrainingManager | null;
  gameId?: string; // Unique identifier for this game instance
  speedMultiplier?: number; // Speed multiplier for AI vs AI games (default: 1)
  onTanksUpdate: (tanks: Tank[]) => void;
  onBulletsUpdate: (bullets: Bullet[]) => void;
  onLastShotTimesUpdate: (times: { blue: number; red: number }) => void;
  onGameOver: (winner: 'blue' | 'red' | null) => void;
}

interface GameTickOptions {
  skipIntervalCheck?: boolean; // Skip the interval check (for speedup)
}

export function useGameLogic({
  isPaused,
  keysRef,
  mapData,
  barriers,
  suns,
  tanks,
  bullets,
  lastShotTimes,
  gameMode,
  aiConfig,
  trainingManager,
  gameId,
  speedMultiplier = 1,
  onTanksUpdate,
  onBulletsUpdate,
  onLastShotTimesUpdate,
  onGameOver,
}: GameLogicProps) {
  const lastTickRef = useRef<number>(0);
  const tanksRef = useRef<Tank[]>(tanks);
  const bulletsRef = useRef<Bullet[]>(bullets);

  // Update refs when state changes
  useEffect(() => {
    tanksRef.current = tanks;
  }, [tanks]);

  useEffect(() => {
    bulletsRef.current = bullets;
  }, [bullets]);

  const gameTick = useCallback((options?: GameTickOptions) => {
    // Skip game updates if paused
    if (isPaused) {
      return;
    }
    
    const now = Date.now();
    
    // If skipIntervalCheck is true (for speedup), bypass the interval check
    if (!options?.skipIntervalCheck) {
      // Normal interval check - adjust based on speed multiplier
      const adjustedTickInterval = TICK_INTERVAL / speedMultiplier;
      if (now - lastTickRef.current < adjustedTickInterval) {
        return;
      }
    }
    
    const tickTime = now;
    lastTickRef.current = tickTime;

    const currentTanks = [...tanksRef.current];
    const currentBullets = [...bulletsRef.current];
    let newLastShotTimes = { ...lastShotTimes };
    const keys = keysRef.current;

    // Update Player 1 (Blue) - Arrow keys + Space, or AI if training
    if (currentTanks[0]?.lives > 0) {
      let result;
      // In person-vs-ai mode, player controls blue tank
      if (gameMode === 'person-vs-ai') {
        // Player controls blue tank with keyboard
        result = updatePlayer1Tank({
          tank: currentTanks[0],
          tankIndex: 0,
          keys,
          tickTime,
          lastShotTime: lastShotTimes.blue,
          bullets: currentBullets,
          mapWidth: mapData.width,
          mapHeight: mapData.height,
          barriers,
          suns,
          allTanks: currentTanks,
        });
      } else if (trainingManager && trainingManager.getIsTraining() && gameMode === 'ai') {
        // AI vs AI training: use AI for blue tank too
        result = updateAITank(
          {
            tank: currentTanks[0],
            tankIndex: 0,
            keys, // Not used by AI, but required by interface
            tickTime,
            lastShotTime: lastShotTimes.blue,
            bullets: currentBullets,
            mapWidth: mapData.width,
            mapHeight: mapData.height,
            barriers,
            suns,
            allTanks: currentTanks,
          },
          aiConfig,
          null, // Don't train on blue tank (only red tank is being trained)
          gameId
        );
      } else {
        // Normal gameplay: use keyboard input
        result = updatePlayer1Tank({
          tank: currentTanks[0],
          tankIndex: 0,
          keys,
          tickTime,
          lastShotTime: lastShotTimes.blue,
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

    // Update Player 2 (Red) - WASD + Q or AI
    if (currentTanks[1]?.lives > 0) {
      let result;
      if (gameMode === 'ai' || gameMode === 'person-vs-ai') {
        // Use AI to control red tank (in both AI mode and person-vs-ai mode)
        result = updateAITank(
          {
            tank: currentTanks[1],
            tankIndex: 1,
            keys, // Not used by AI, but required by interface
            tickTime,
            lastShotTime: lastShotTimes.red,
            bullets: currentBullets,
            mapWidth: mapData.width,
            mapHeight: mapData.height,
            barriers,
            suns,
            allTanks: currentTanks,
          },
          aiConfig,
          trainingManager, // Always train on red tank (AI) in person-vs-ai mode
          gameId
        );
      } else {
        // This should never happen - all games are either AI or person-vs-ai
        // Fallback to AI if somehow we get here
        result = updateAITank(
          {
            tank: currentTanks[1],
            tankIndex: 1,
            keys,
            tickTime,
            lastShotTime: lastShotTimes.red,
            bullets: currentBullets,
            mapWidth: mapData.width,
            mapHeight: mapData.height,
            barriers,
            suns,
            allTanks: currentTanks,
          },
          aiConfig,
          trainingManager,
          gameId
        );
      }
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

    // Check if any tanks were hit and need respawning
    for (let i = 0; i < bulletResult.updatedTanks.length; i++) {
      const tank = bulletResult.updatedTanks[i];
      const originalTank = currentTanks[i];
      
      // If tank lost a life, start explosion animation
      if (tank.lives < originalTank.lives && tank.lives > 0) {
        bulletResult.updatedTanks[i] = {
          ...tank,
          exploding: true,
          explosionStartTime: tickTime,
        };
      }
      
      // Handle respawn after explosion delay
      if (tank.exploding && tank.explosionStartTime) {
        const explosionDuration = 500; // 500ms explosion
        const respawnDelay = 1000; // 1 second pause after explosion
        const timeSinceExplosion = tickTime - tank.explosionStartTime;
        
        if (timeSinceExplosion >= explosionDuration + respawnDelay) {
          // Time to respawn - start respawn animation
          const spawn = generateRandomSpawnPosition(
            mapData,
            barriers,
            bulletResult.updatedTanks,
            suns,
            i === 0 ? bulletResult.updatedTanks[1] : bulletResult.updatedTanks[0]
              ? { x: bulletResult.updatedTanks[i === 0 ? 1 : 0].x, y: bulletResult.updatedTanks[i === 0 ? 1 : 0].y }
              : undefined
          );
          bulletResult.updatedTanks[i] = {
            ...tank,
            x: spawn.x,
            y: spawn.y,
            angle: spawn.angle,
            exploding: false,
            respawning: true,
            respawnStartTime: tickTime,
            respawnTargetX: spawn.x,
            respawnTargetY: spawn.y,
            respawnTargetAngle: spawn.angle,
          };
        }
      }
      
      // Handle respawn animation
      if (tank.respawning && tank.respawnStartTime) {
        const respawnDuration = 300; // 300ms respawn animation
        const timeSinceRespawn = tickTime - tank.respawnStartTime;
        
        if (timeSinceRespawn >= respawnDuration) {
          // Respawn complete
          bulletResult.updatedTanks[i] = {
            ...tank,
            respawning: false,
          };
        }
      }
    }

    // Check if game is over (tank reached 0 lives)
    let gameOverWinner: 'blue' | 'red' | null = null;
    for (let i = 0; i < bulletResult.updatedTanks.length; i++) {
      const tank = bulletResult.updatedTanks[i];
      if (tank.lives <= 0 && !tank.exploding) {
        // Start explosion for dead tank
        bulletResult.updatedTanks[i] = {
          ...tank,
          exploding: true,
          explosionStartTime: tickTime,
        };
        // Determine winner
        gameOverWinner = i === 0 ? 'red' : 'blue';
      }
    }
    
    if (gameOverWinner) {
      onGameOver(gameOverWinner);
    }

    onTanksUpdate(bulletResult.updatedTanks);
    onBulletsUpdate(bulletResult.updatedBullets);
    onLastShotTimesUpdate(newLastShotTimes);
  }, [
    isPaused,
    keysRef,
    mapData,
    barriers,
    suns,
    lastShotTimes,
    gameMode,
    aiConfig,
    onTanksUpdate,
    onBulletsUpdate,
    onLastShotTimesUpdate,
    onGameOver,
  ]);

  return { gameTick };
}

