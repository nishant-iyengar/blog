import type { Tank, SpawnPosition, TankTroubleMapData, Sun } from '@/app/games/tank-trouble/types';
import { GAME_CONFIG, TANK_SIZE } from '@/app/games/tank-trouble/config';
import { isValidTankPosition } from '@/app/games/tank-trouble/utils/collision';
import { MAX_SPAWN_ATTEMPTS, SPAWN_PADDING, MIN_SPAWN_DISTANCE } from '@/app/games/tank-trouble/constants/game-constants';
import { distancePoints } from '@/app/games/tank-trouble/utils/math';

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
  if (!mapData || typeof mapData.width !== 'number' || typeof mapData.height !== 'number') {
    // Fallback to safe defaults - use type guard utility for validation
    return {
      x: 90,
      y: 90,
      angle: 0,
    };
  }
  
  const maxAttempts = MAX_SPAWN_ATTEMPTS;
  const padding = SPAWN_PADDING;
  
  // Validate map dimensions
  const mapWidth = mapData.width;
  const mapHeight = mapData.height;
  const availableWidth = mapWidth - TANK_SIZE - padding * 2;
  const availableHeight = mapHeight - TANK_SIZE - padding * 2;
  
  if (isNaN(availableWidth) || isNaN(availableHeight) || availableWidth <= 0 || availableHeight <= 0) {
    // Fallback to spawn points
    if (mapData.spawnPoints && mapData.spawnPoints.length > 0) {
      return {
        x: mapData.spawnPoints[0].x,
        y: mapData.spawnPoints[0].y,
        angle: mapData.spawnPoints[0].angle,
      };
    }
    return {
      x: padding,
      y: padding,
      angle: 0,
    };
  }
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const x = padding + Math.random() * availableWidth;
    const y = padding + Math.random() * availableHeight;
    
    // Check if position is too close to exclude position (if provided)
    if (excludePosition) {
      const dist = distancePoints({ x, y }, excludePosition);
      if (dist < MIN_SPAWN_DISTANCE) {
        continue;
      }
    }
    
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
  if (!spawnPoints || spawnPoints.length === 0) {
    // Last resort: return a safe default position if spawn points are missing
    return {
      x: padding,
      y: padding,
      angle: 0,
    };
  }
  
  // Try each spawn point until we find a valid one
  for (const spawnPoint of spawnPoints) {
    if (isValidTankPosition(spawnPoint.x, spawnPoint.y, mapData.width, mapData.height, barriers, tanks, suns)) {
      // Check exclude position if provided
      if (excludePosition) {
        const dist = distancePoints(spawnPoint, excludePosition);
        if (dist < MIN_SPAWN_DISTANCE) {
          continue;
        }
      }
      return {
        x: spawnPoint.x,
        y: spawnPoint.y,
        angle: spawnPoint.angle,
      };
    }
  }
  
  // If all spawn points are invalid, use the first one anyway (last resort)
  return {
    x: spawnPoints[0].x,
    y: spawnPoints[0].y,
    angle: spawnPoints[0].angle,
  };
}

/**
 * Generate random initial spawn positions for both tanks
 * Explicitly excludes all death/respawn state to ensure clean tank state
 */
export function getInitialSpawnPositions(
  mapData: TankTroubleMapData,
  barriers: Array<{ x: number; y: number; width: number; height: number }>,
  suns: Sun[]
): Tank[] {
  
  const blueSpawn = generateRandomSpawnPosition(mapData, barriers || [], [], suns || []);
  
  // Validate blue spawn position
  if (typeof blueSpawn.x !== 'number' || typeof blueSpawn.y !== 'number' || isNaN(blueSpawn.x) || isNaN(blueSpawn.y)) {
    // Fallback to safe default
    blueSpawn.x = 90;
    blueSpawn.y = 90;
    blueSpawn.angle = 0;
  }
  
  // Create blue tank object to pass to red spawn generation (for collision checking)
  const blueTank: Tank = {
    x: blueSpawn.x,
    y: blueSpawn.y,
    angle: blueSpawn.angle,
    lives: GAME_CONFIG.tank.lives,
    color: 'blue',
  };
  const redSpawn = generateRandomSpawnPosition(mapData, barriers, [blueTank], suns, blueSpawn);
  
  // Validate red spawn position
  if (typeof redSpawn.x !== 'number' || typeof redSpawn.y !== 'number' || isNaN(redSpawn.x) || isNaN(redSpawn.y)) {
    // Fallback to safe default (different from blue)
    redSpawn.x = mapData.spawnPoints && mapData.spawnPoints.length > 1 ? mapData.spawnPoints[1].x : 390;
    redSpawn.y = mapData.spawnPoints && mapData.spawnPoints.length > 1 ? mapData.spawnPoints[1].y : 270;
    redSpawn.angle = mapData.spawnPoints && mapData.spawnPoints.length > 1 ? mapData.spawnPoints[1].angle : 180;
  }
  
  return [
    { 
      x: blueSpawn.x, 
      y: blueSpawn.y, 
      angle: blueSpawn.angle, 
      lives: GAME_CONFIG.tank.lives, 
      color: 'blue',
      // Explicitly exclude death/respawn state
      exploding: undefined,
      explosionStartTime: undefined,
      respawning: undefined,
      respawnStartTime: undefined,
      respawnTargetX: undefined,
      respawnTargetY: undefined,
      respawnTargetAngle: undefined,
    },
    { 
      x: redSpawn.x, 
      y: redSpawn.y, 
      angle: redSpawn.angle, 
      lives: GAME_CONFIG.tank.lives, 
      color: 'red',
      // Explicitly exclude death/respawn state
      exploding: undefined,
      explosionStartTime: undefined,
      respawning: undefined,
      respawnStartTime: undefined,
      respawnTargetX: undefined,
      respawnTargetY: undefined,
      respawnTargetAngle: undefined,
    },
  ];
}

