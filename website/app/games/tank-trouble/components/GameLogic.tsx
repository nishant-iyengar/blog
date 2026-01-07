import React, { useCallback, useRef, useEffect } from 'react';
import type { Tank, Bullet, Barrier, Sun, TankTroubleMapData } from '@/app/games/tank-trouble/types';
import { TICK_INTERVAL, GAME_CONFIG } from '@/app/games/tank-trouble/config';
import { updatePlayer1Tank, updatePlayer2Tank } from '@/app/games/tank-trouble/utils/tank';
import { updateBullets } from '@/app/games/tank-trouble/utils/bullet';
import { generateRandomSpawnPosition } from '@/app/games/tank-trouble/utils/spawn';

export interface GameInstance {
  id: number;
  tanks: Tank[];
  bullets: Bullet[];
  lastShotTimes: { blue: number; red: number };
  isPaused: boolean;
  speedMultiplier: number;
  keysRef: React.MutableRefObject<Set<string>>;
}

interface GameLogicProps {
  mapData: TankTroubleMapData;
  barriers: Barrier[];
  suns: Sun[];
  gameInstances: GameInstance[];
  onTanksUpdate: (gameId: number, tanks: Tank[]) => void;
  onBulletsUpdate: (gameId: number, bullets: Bullet[]) => void;
  onLastShotTimesUpdate: (gameId: number, times: { blue: number; red: number }) => void;
  onGameOver: (gameId: number, winner: 'blue' | 'red' | null) => void;
}

interface GameTickOptions {
  skipIntervalCheck?: boolean;
  gameId?: number;
}

/**
 * Simplified game logic hook - handles game ticks for 2-player games only
 */
export function useGameLogic({
  mapData,
  barriers,
  suns,
  gameInstances,
  onTanksUpdate,
  onBulletsUpdate,
  onLastShotTimesUpdate,
  onGameOver,
}: GameLogicProps) {
  const gameOverTriggeredRefs = useRef<Map<number, boolean>>(new Map());
  const lastTickRefs = useRef<Map<number, number>>(new Map());
  const tanksRefs = useRef<Map<number, Tank[]>>(new Map());
  const bulletsRefs = useRef<Map<number, Bullet[]>>(new Map());
  
  const gameInstancesRef = useRef(gameInstances);
  const gameInstancesMapRef = useRef<Map<number, GameInstance>>(new Map());
  
  useEffect(() => {
    gameInstancesRef.current = gameInstances;
    const map = new Map<number, GameInstance>();
    gameInstances.forEach(instance => {
      map.set(instance.id, instance);
    });
    gameInstancesMapRef.current = map;
  }, [gameInstances]);
  
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
  
  useEffect(() => {
    gameInstances.forEach((instance) => {
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
    const currentGameInstances = gameInstancesRef.current;
    const gamesToTick = options?.gameId !== undefined 
      ? (() => {
          const instance = gameInstancesMapRef.current.get(options.gameId);
          return instance ? [instance] : [];
        })()
      : currentGameInstances;

    for (const instance of gamesToTick) {
      if (instance.isPaused) {
        continue;
      }
      
      const now = Date.now();
      const lastTickTime = lastTickRefs.current.get(instance.id) || 0;
      
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
      
      if (!currentTanks || currentTanks.length < 2) {
        continue;
      }

      // Update Player 1 (Blue)
      if (currentTanks[0]?.lives > 0) {
        const result = updatePlayer1Tank({
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
        
        currentTanks[0] = result.updatedTank;
        currentBullets.push(...result.newBullets);
        newLastShotTimes.blue = result.lastShotTime;
      }

      // Update Player 2 (Red)
      if (currentTanks[1]?.lives > 0) {
        const result = updatePlayer2Tank({
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

      const gameOverTriggered = gameOverTriggeredRefs.current.get(instance.id) || false;

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
          const filteredBullets: typeof bulletResult.updatedBullets = [];
          for (const bullet of bulletResult.updatedBullets) {
            if (bullet.owner !== tankColor) {
              filteredBullets.push(bullet);
            }
          }
          bulletResult.updatedBullets = filteredBullets;
          
          const spawn = generateRandomSpawnPosition(
            mapData,
            barriers,
            bulletResult.updatedTanks,
            suns,
            i === 0 ? bulletResult.updatedTanks[1] : bulletResult.updatedTanks[0]
              ? { x: bulletResult.updatedTanks[i === 0 ? 1 : 0].x, y: bulletResult.updatedTanks[i === 0 ? 1 : 0].y }
              : undefined
          );
          
          const INVINCIBILITY_DURATION_MS = 2000;
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
          };
        }
        
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
    }
  }, [
    mapData,
    barriers,
    suns,
    onTanksUpdate,
    onBulletsUpdate,
    onLastShotTimesUpdate,
    onGameOver,
  ]);

  return { gameTick };
}
