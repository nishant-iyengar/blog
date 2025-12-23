import React, { useCallback, useRef, useEffect } from 'react';
import type { Tank, Bullet, Barrier, Sun, TankTroubleMapData } from '@/app/games/tank-trouble/types';
import { TICK_INTERVAL, GAME_CONFIG } from '@/app/games/tank-trouble/config';
import { updatePlayer1Tank, updatePlayer2Tank } from '@/app/games/tank-trouble/utils/tank';
import { updateBullets } from '@/app/games/tank-trouble/utils/bullet';
import { generateRandomSpawnPosition } from '@/app/games/tank-trouble/utils/spawn';

interface GameLogicProps {
  isPaused: boolean;
  keysRef: React.MutableRefObject<Set<string>>;
  mapData: TankTroubleMapData;
  barriers: Barrier[];
  suns: Sun[];
  tanks: Tank[];
  bullets: Bullet[];
  lastShotTimes: { blue: number; red: number };
  onTanksUpdate: (tanks: Tank[]) => void;
  onBulletsUpdate: (bullets: Bullet[]) => void;
  onLastShotTimesUpdate: (times: { blue: number; red: number }) => void;
  onGameOver: (winner: 'blue' | 'red' | null) => void;
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

  const gameTick = useCallback(() => {
    // Skip game updates if paused
    if (isPaused) {
      return;
    }
    
    const now = Date.now();
    if (now - lastTickRef.current < TICK_INTERVAL) {
      return;
    }
    const tickTime = now;
    lastTickRef.current = tickTime;

    const currentTanks = [...tanksRef.current];
    const currentBullets = [...bulletsRef.current];
    let newLastShotTimes = { ...lastShotTimes };
    const keys = keysRef.current;

    // Update Player 1 (Blue) - Arrow keys + Space
    if (currentTanks[0]?.lives > 0) {
      const result = updatePlayer1Tank({
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
      currentTanks[0] = result.updatedTank;
      currentBullets.push(...result.newBullets);
      newLastShotTimes.blue = result.lastShotTime;
    }

    // Update Player 2 (Red) - WASD + Q
    if (currentTanks[1]?.lives > 0) {
      const result = updatePlayer2Tank({
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
      });
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
    onTanksUpdate,
    onBulletsUpdate,
    onLastShotTimesUpdate,
    onGameOver,
  ]);

  return { gameTick };
}

