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
      
      // If tank lost a life, respawn it at a random position
      if (tank.lives < originalTank.lives && tank.lives > 0) {
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
        };
      }
    }

    // Check if game should restart (tank reached 0 lives)
    let shouldRestart = false;
    for (const tank of bulletResult.updatedTanks) {
      if (tank.lives <= 0) {
        shouldRestart = true;
        break;
      }
    }

    if (shouldRestart) {
      // Reset game immediately with new random spawn positions
      const blueSpawn = generateRandomSpawnPosition(mapData, barriers, [], suns);
      const redSpawn = generateRandomSpawnPosition(mapData, barriers, [], suns, blueSpawn);
      
      bulletResult.updatedTanks[0] = {
        x: blueSpawn.x,
        y: blueSpawn.y,
        angle: blueSpawn.angle,
        lives: GAME_CONFIG.tank.lives,
        color: 'blue',
      };
      bulletResult.updatedTanks[1] = {
        x: redSpawn.x,
        y: redSpawn.y,
        angle: redSpawn.angle,
        lives: GAME_CONFIG.tank.lives,
        color: 'red',
      };
      // Clear bullets on restart
      bulletResult.updatedBullets.length = 0;
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
  ]);

  return { gameTick };
}

