import type { Tank, SpawnPosition, TankTroubleMapData, Sun } from '@/app/games/tank-trouble/types';
import { GAME_CONFIG, TANK_SIZE } from '@/app/games/tank-trouble/config';
import { isValidTankPosition } from '@/app/games/tank-trouble/utils/collision';

/**
 * Generate a random valid spawn position for a tank
 */
export function generateRandomSpawnPosition(
  mapData: TankTroubleMapData,
  barriers: Array<{ x: number; y: number; width: number; height: number }>,
  tanks: Tank[],
  suns: Sun[],
  excludePosition?: { x: number; y: number }
): SpawnPosition {
  const maxAttempts = 100;
  const padding = 8; // Minimum distance from edges (16 * 0.5 = 8)
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const x = padding + Math.random() * (mapData.width - TANK_SIZE - padding * 2);
    const y = padding + Math.random() * (mapData.height - TANK_SIZE - padding * 2);
    
    // Check if position is valid (no barrier or sun collision)
    if (isValidTankPosition(x, y, mapData.width, mapData.height, barriers, tanks, suns)) {
      // Tanks can overlap, so no distance check needed
      // Random angle between 0 and 360
      const angle = Math.random() * 360;
      return { x, y, angle };
    }
  }
  
  // Fallback to default spawn points if random generation fails
  const spawnPoints = mapData.spawnPoints;
  const fallbackIndex = Math.floor(Math.random() * spawnPoints.length);
  return {
    x: spawnPoints[fallbackIndex].x,
    y: spawnPoints[fallbackIndex].y,
    angle: spawnPoints[fallbackIndex].angle,
  };
}

/**
 * Generate random initial spawn positions for both tanks
 */
export function getInitialSpawnPositions(
  mapData: TankTroubleMapData,
  barriers: Array<{ x: number; y: number; width: number; height: number }>,
  suns: Sun[]
): Tank[] {
  const blueSpawn = generateRandomSpawnPosition(mapData, barriers, [], suns);
  const redSpawn = generateRandomSpawnPosition(mapData, barriers, [], suns, blueSpawn);
  
  return [
    { x: blueSpawn.x, y: blueSpawn.y, angle: blueSpawn.angle, lives: GAME_CONFIG.tank.lives, color: 'blue' },
    { x: redSpawn.x, y: redSpawn.y, angle: redSpawn.angle, lives: GAME_CONFIG.tank.lives, color: 'red' },
  ];
}

