/**
 * Spatial optimization utilities
 * 
 * Provides spatial hashing and optimized collision detection
 * for better performance with large numbers of objects
 */

import type { Barrier } from '@/app/games/tank-trouble/types';
import { checkRectCollision } from '@/lib/physics';

/**
 * Pre-computed barrier bounding boxes for faster collision checks
 * This avoids repeated property access during collision detection
 */
export interface BarrierBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
  barrier: Barrier;
}

/**
 * Pre-compute barrier bounds for faster collision detection
 * Call this once per frame/tick with barriers array
 */
export function precomputeBarrierBounds(barriers: Barrier[]): BarrierBounds[] {
  return barriers.map(barrier => ({
    left: barrier.x,
    right: barrier.x + barrier.width,
    top: barrier.y,
    bottom: barrier.y + barrier.height,
    barrier,
  }));
}

/**
 * Check if a point is inside any barrier using pre-computed bounds
 * More efficient than checking barriers directly
 */
export function pointInBarrier(
  x: number,
  y: number,
  barrierBounds: BarrierBounds[]
): boolean {
  // Early exit optimization - check bounds first (faster than full collision check)
  for (const bounds of barrierBounds) {
    if (
      x >= bounds.left &&
      x <= bounds.right &&
      y >= bounds.top &&
      y <= bounds.bottom
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Optimized barrier distance check using pre-computed bounds
 * Reduces property access overhead
 */
export function getBarrierDistanceInDirection(
  x: number,
  y: number,
  dir: { dx: number; dy: number },
  barrierBounds: BarrierBounds[],
  mapWidth: number,
  mapHeight: number,
  step: number,
  maxDistance: number
): number {
  let distance = 0;

  while (distance < maxDistance) {
    const testX = x + dir.dx * distance;
    const testY = y + dir.dy * distance;

    // Check if out of bounds
    if (testX < 0 || testX > mapWidth || testY < 0 || testY > mapHeight) {
      break;
    }

    // Use pre-computed bounds for faster check
    if (pointInBarrier(testX, testY, barrierBounds)) {
      break;
    }

    distance += step;
  }

  return distance;
}

