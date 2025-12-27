/**
 * Tank Utilities
 * 
 * Common operations for tank manipulation.
 */

import type { Tank } from '@/app/games/tank-trouble/types';
import { TANK_SIZE, TANK_COLLISION_SIZE, TANK_HALF_SIZE } from '@/app/games/tank-trouble/config';

/**
 * Get the center point of a tank
 */
export function getTankCenter(tank: Tank): { x: number; y: number } {
  return {
    x: tank.x + TANK_HALF_SIZE,
    y: tank.y + TANK_HALF_SIZE,
  };
}

/**
 * Clamp tank position to keep collision box within map bounds
 */
export function clampTankPosition(
  x: number,
  y: number,
  mapWidth: number,
  mapHeight: number
): { x: number; y: number } {
  const collisionOffset = (TANK_SIZE - TANK_COLLISION_SIZE) / 2;
  const clampedX = Math.max(
    -collisionOffset,
    Math.min(x, mapWidth - TANK_SIZE + collisionOffset)
  );
  const clampedY = Math.max(
    -collisionOffset,
    Math.min(y, mapHeight - TANK_SIZE + collisionOffset)
  );
  return { x: clampedX, y: clampedY };
}

