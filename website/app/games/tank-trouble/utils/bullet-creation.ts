/**
 * Bullet Creation Utilities
 * 
 * Centralized logic for creating bullet objects.
 */

import type { Bullet, Tank } from '@/app/games/tank-trouble/types';
import { TANK_SIZE, BULLET_SPEED, GAME_CONFIG } from '@/app/games/tank-trouble/config';
import { degToRad } from './math';

/**
 * Create a bullet from a tank's position and angle
 */
export function createBullet(
  tank: Tank,
  angle: number,
  tickTime: number,
  owner: 'blue' | 'red'
): Bullet {
  const rad = degToRad(angle);
  const bulletX =
    tank.x +
    TANK_SIZE / 2 +
    Math.cos(rad) * (TANK_SIZE / 2 + GAME_CONFIG.tank.spawnOffset);
  const bulletY =
    tank.y +
    TANK_SIZE / 2 +
    Math.sin(rad) * (TANK_SIZE / 2 + GAME_CONFIG.tank.spawnOffset);

  return {
    x: bulletX,
    y: bulletY,
    angle: angle,
    speed: BULLET_SPEED,
    owner: owner,
    createdAt: tickTime,
    vx: Math.cos(rad) * BULLET_SPEED,
    vy: Math.sin(rad) * BULLET_SPEED,
  };
}

