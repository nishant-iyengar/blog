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
  episodeStartTime?: number; // When the current episode started (for preventing immediate game over)
  maxEpisodeTimeMs?: number; // Maximum episode duration before timeout (default: 90000 = 90 seconds)
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
  episodeStartTime,
  maxEpisodeTimeMs = 90000, // Default 90 seconds
  onTanksUpdate,
  onBulletsUpdate,
  onLastShotTimesUpdate,
  onGameOver,
}: GameLogicProps) {
  // Track if game over has been triggered to prevent multiple calls
  const gameOverTriggeredRef = useRef(false);
  
  // Reset game over flag when tanks are reset (new game starts)
  useEffect(() => {
    // Check if both tanks have full lives (new game started)
    if (tanks.length >= 2 && tanks[0]?.lives === GAME_CONFIG.tank.lives && tanks[1]?.lives === GAME_CONFIG.tank.lives) {
      gameOverTriggeredRef.current = false;
    }
  }, [tanks]);
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
        // IMPORTANT: We train BOTH tanks in self-play mode for fair competition
        // Both tanks use the same model and both contribute to training
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
          trainingManager, // Train on blue tank too for true self-play
          gameId ? `${gameId}-blue` : 'default-blue' // Use different gameId for blue tank
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

    // Check for timeout using configured max episode time
    const MAX_EPISODE_TIME = maxEpisodeTimeMs;
    if (!gameOverTriggeredRef.current && episodeStartTime) {
      const episodeElapsed = tickTime - episodeStartTime;
      if (episodeElapsed >= MAX_EPISODE_TIME) {
        // Game timed out - determine winner based on lives, or null if tie
        gameOverTriggeredRef.current = true;
        const blueTank = bulletResult.updatedTanks[0];
        const redTank = bulletResult.updatedTanks[1];
        
        let winner: 'blue' | 'red' | null = null;
        if (blueTank && redTank) {
          if (blueTank.lives > redTank.lives) {
            winner = 'blue';
          } else if (redTank.lives > blueTank.lives) {
            winner = 'red';
          }
          // If lives are equal, winner remains null (tie)
        }
        
        // Clear all bullets
        bulletResult.updatedBullets = [];
        
        // Clear respawn states
        bulletResult.updatedTanks[0] = {
          ...blueTank,
          exploding: false,
          explosionStartTime: undefined,
          respawning: false,
          respawnStartTime: undefined,
          respawnTargetX: undefined,
          respawnTargetY: undefined,
          respawnTargetAngle: undefined,
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
        };
        
        // Update state and trigger game over with timeout
        onTanksUpdate(bulletResult.updatedTanks);
        onBulletsUpdate(bulletResult.updatedBullets);
        onGameOver(winner);
        return;
      }
    }

    // Check for game over immediately after bullet updates (before respawn logic)
    // This ensures we stop the game as soon as a tank reaches 0 lives
    const blueTankAfterBullets = bulletResult.updatedTanks[0];
    const redTankAfterBullets = bulletResult.updatedTanks[1];
    
    if (!gameOverTriggeredRef.current && blueTankAfterBullets && redTankAfterBullets) {
      if (blueTankAfterBullets.lives <= 0 || redTankAfterBullets.lives <= 0) {
        // A tank reached 0 lives - trigger game over immediately
        gameOverTriggeredRef.current = true;
        const winner = blueTankAfterBullets.lives <= 0 ? 'red' : 'blue';
        
        // Clear all bullets
        bulletResult.updatedBullets = [];
        
        // Clear respawn states
        bulletResult.updatedTanks[0] = {
          ...blueTankAfterBullets,
          exploding: false,
          explosionStartTime: undefined,
          respawning: false,
          respawnStartTime: undefined,
          respawnTargetX: undefined,
          respawnTargetY: undefined,
          respawnTargetAngle: undefined,
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
        };
        
        // Update state and trigger game over
        onTanksUpdate(bulletResult.updatedTanks);
        onBulletsUpdate(bulletResult.updatedBullets);
        onGameOver(winner);
        return;
      }
    }

    // Check if any tanks were hit and need respawning
    // No animations - respawn immediately
    for (let i = 0; i < bulletResult.updatedTanks.length; i++) {
      const tank = bulletResult.updatedTanks[i];
      const originalTank = currentTanks[i];
      
      // If tank lost a life, respawn immediately (no animation)
      if (tank.lives < originalTank.lives && tank.lives > 0) {
        // Remove all bullets from the dead tank to prevent immediate respawn death
        const tankColor = tank.color;
        bulletResult.updatedBullets = bulletResult.updatedBullets.filter(
          bullet => bullet.owner !== tankColor
        );
        
        // Respawn immediately at new position
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
          explosionStartTime: undefined,
          respawning: false,
          respawnStartTime: undefined,
          respawnTargetX: undefined,
          respawnTargetY: undefined,
          respawnTargetAngle: undefined,
        };
      }
      
      // Clear any animation states (no animations)
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
        };
      }
    }

    // Don't continue game updates if game over has been triggered
    // (Game over is checked earlier, right after bullet updates)
    if (gameOverTriggeredRef.current) {
      return;
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

