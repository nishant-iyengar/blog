/**
 * Test utilities and helpers for Tank Trouble testing
 */

import type { Tank, Bullet, Barrier, Sun } from '@/app/games/tank-trouble/types';

/**
 * Create a mock tank for testing
 */
export function createMockTank(
  overrides?: Partial<Tank>
): Tank {
  return {
    x: 100,
    y: 100,
    angle: 0,
    lives: 3,
    color: 'blue',
    ...overrides,
  };
}

/**
 * Create a mock bullet for testing
 */
export function createMockBullet(
  overrides?: Partial<Bullet>
): Bullet {
  return {
    x: 100,
    y: 100,
    angle: 0,
    speed: 1.68,
    owner: 'blue',
    createdAt: Date.now(),
    vx: 1.68,
    vy: 0,
    ...overrides,
  };
}

/**
 * Create a mock barrier for testing
 */
export function createMockBarrier(
  overrides?: Partial<Barrier>
): Barrier {
  return {
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    ...overrides,
  };
}

/**
 * Create a mock sun for testing
 */
export function createMockSun(
  overrides?: Partial<Sun>
): Sun {
  return {
    x: 200,
    y: 200,
    size: 30,
    ...overrides,
  };
}

/**
 * Wait for a specified number of game ticks
 */
export function waitTicks(ticks: number, tickInterval: number = 1000 / 72): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ticks * tickInterval);
  });
}

/**
 * Calculate distance between two points
 */
export function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Normalize angle to 0-360 range
 */
export function normalizeAngle(angle: number): number {
  while (angle < 0) angle += 360;
  while (angle >= 360) angle -= 360;
  return angle;
}

/**
 * Check if two positions are approximately equal (within tolerance)
 */
export function positionsEqual(
  pos1: { x: number; y: number },
  pos2: { x: number; y: number },
  tolerance: number = 0.1
): boolean {
  return (
    Math.abs(pos1.x - pos2.x) < tolerance &&
    Math.abs(pos1.y - pos2.y) < tolerance
  );
}


