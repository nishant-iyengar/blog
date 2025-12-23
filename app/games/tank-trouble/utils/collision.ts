import { checkRectCollision } from '@/lib/physics';
import type { Barrier, Tank, Sun } from '@/app/games/tank-trouble/types';
import { TANK_SIZE, TANK_COLLISION_SIZE } from '@/app/games/tank-trouble/config';

/**
 * Check if a tank position is valid (not colliding with barriers or out of bounds)
 * Note: Tanks can overlap each other - no tank-to-tank collision check
 */
export function isValidTankPosition(
  x: number,
  y: number,
  mapWidth: number,
  mapHeight: number,
  barriers: Barrier[],
  tanks: Tank[],
  suns: Sun[],
  excludeTankIndex?: number
): boolean {
  // Calculate collision box position (centered on tank)
  const collisionOffset = (TANK_SIZE - TANK_COLLISION_SIZE) / 2;
  const collisionX = x + collisionOffset;
  const collisionY = y + collisionOffset;
  
  // Check boundaries - allow tanks to be exactly at walls (with small epsilon for floating point precision)
  const epsilon = 0.001;
  if (collisionX < -epsilon || collisionY < -epsilon || 
      collisionX + TANK_COLLISION_SIZE > mapWidth + epsilon || 
      collisionY + TANK_COLLISION_SIZE > mapHeight + epsilon) {
    return false;
  }

  // Check barriers using collision size
  for (const barrier of barriers) {
    if (checkRectCollision(collisionX, collisionY, TANK_COLLISION_SIZE, TANK_COLLISION_SIZE, 
                           barrier.x, barrier.y, barrier.width, barrier.height)) {
      return false;
    }
  }

  // Check suns - tanks cannot overlap with suns
  for (const sun of suns) {
    const sunLeft = sun.x - sun.size;
    const sunRight = sun.x + sun.size;
    const sunTop = sun.y - sun.size;
    const sunBottom = sun.y + sun.size;
    
    if (checkRectCollision(collisionX, collisionY, TANK_COLLISION_SIZE, TANK_COLLISION_SIZE,
                           sunLeft, sunTop, sunRight - sunLeft, sunBottom - sunTop)) {
      return false;
    }
  }

  // Tanks can now overlap each other - no tank-to-tank collision check

  return true;
}

/**
 * Check if tank can move to a position (checks barriers, boundaries, and suns)
 * Note: Tanks can overlap each other but not with suns
 */
export function canMoveTo(
  x: number,
  y: number,
  mapWidth: number,
  mapHeight: number,
  barriers: Barrier[],
  tanks: Tank[],
  suns: Sun[],
  excludeTankIndex?: number
): boolean {
  return isValidTankPosition(x, y, mapWidth, mapHeight, barriers, tanks, suns, excludeTankIndex);
}

