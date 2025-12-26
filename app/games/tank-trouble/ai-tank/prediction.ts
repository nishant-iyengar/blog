import type { Bullet, Sun, Barrier } from '@/app/games/tank-trouble/types';
import type { PredictedBulletPath } from './types';
import {
  applyGravityFromSources,
  bounceOffBoundaries,
  bounceOffRectangle,
  ensureMinimumVelocity,
  type Vector2D,
  type Rectangle,
} from '@/lib/physics';
import {
  BULLET_SPEED,
  G,
  mSun,
  SUN_INFLUENCE_RADIUS,
  GAME_CONFIG,
  TICK_INTERVAL,
} from '@/app/games/tank-trouble/config';
import { BULLET_MIN_VELOCITY } from '@/app/games/tank-trouble/constants/game-constants';

/**
 * Predict bullet trajectory accounting for sun gravity and collisions
 */
export function predictBulletPath(
  bullet: Bullet,
  suns: Sun[],
  barriers: Barrier[],
  mapWidth: number,
  mapHeight: number,
  maxTime: number,
  stepSize: number = TICK_INTERVAL
): PredictedBulletPath {
  const points: Array<{ x: number; y: number; time: number }> = [];
  let currentX = bullet.x;
  let currentY = bullet.y;
  let currentVx = bullet.vx;
  let currentVy = bullet.vy;
  let currentTime = 0;
  const bulletCollisionSize = GAME_CONFIG.bullet.collisionSize;
  let isBlocked = false;

  // Convert suns to vector sources (pre-compute once, skip if disabled via debug flag)
  const sunSources: Vector2D[] = GAME_CONFIG.debug.disableSunGravity
    ? []
    : suns.map((sun) => ({
        x: sun.x,
        y: sun.y,
      }));

  // Pre-compute gravity config (avoid recreating object in loop)
  const gravityConfig = {
    gravitationalConstant: G,
    sourceMass: mSun,
    influenceRadius: SUN_INFLUENCE_RADIUS,
    minDistance: GAME_CONFIG.sun.minDistance,
    maxAcceleration: BULLET_SPEED * 0.3,
  };

  // Store initial point
  points.push({ x: currentX, y: currentY, time: currentTime });

  while (currentTime < maxTime && !isBlocked) {
    // Apply gravity (skip if disabled via debug flag)
    const gravityAcceleration = GAME_CONFIG.debug.disableSunGravity
      ? { x: 0, y: 0 }
      : applyGravityFromSources(
          { x: currentX, y: currentY },
          sunSources,
          gravityConfig
        );

    // Update velocity
    let newVx = currentVx + gravityAcceleration.x;
    let newVy = currentVy + gravityAcceleration.y;

    // Ensure minimum velocity
    const velocity = ensureMinimumVelocity({ x: newVx, y: newVy }, BULLET_MIN_VELOCITY);
    newVx = velocity.x;
    newVy = velocity.y;

    // Update position
    let newX = currentX + newVx;
    let newY = currentY + newVy;

    // Check boundary collision
    const boundaryBounce = bounceOffBoundaries(
      { x: newX, y: newY },
      { x: newVx, y: newVy },
      bulletCollisionSize,
      {
        left: 0,
        right: mapWidth,
        top: 0,
        bottom: mapHeight,
      }
    );

    if (boundaryBounce.bounced) {
      newX = boundaryBounce.newPosition.x;
      newY = boundaryBounce.newPosition.y;
      newVx = boundaryBounce.newVelocity.x;
      newVy = boundaryBounce.newVelocity.y;
    }

    // Check barrier collision
    for (const barrier of barriers) {
      const barrierRect: Rectangle = {
        x: barrier.x,
        y: barrier.y,
        width: barrier.width,
        height: barrier.height,
      };

      const barrierBounce = bounceOffRectangle(
        { x: newX, y: newY },
        { x: newVx, y: newVy },
        bulletCollisionSize,
        barrierRect,
        { x: currentX, y: currentY }
      );

      if (barrierBounce.bounced) {
        newX = barrierBounce.newPosition.x;
        newY = barrierBounce.newPosition.y;
        newVx = barrierBounce.newVelocity.x;
        newVy = barrierBounce.newVelocity.y;
        // Continue after bounce
      }
    }

    currentX = newX;
    currentY = newY;
    currentVx = newVx;
    currentVy = newVy;
    currentTime += stepSize;

    // Add point (sample every few steps to reduce memory)
    if (points.length === 0 || currentTime - points[points.length - 1].time >= stepSize * 5) {
      points.push({ x: currentX, y: currentY, time: currentTime });
    }

    // Stop if bullet is moving too slowly (stuck in sun)
    const speed = Math.sqrt(newVx * newVx + newVy * newVy);
    if (speed < BULLET_MIN_VELOCITY) {
      isBlocked = true;
      break;
    }
  }

  return {
    points,
    isBlocked,
    endTime: currentTime,
  };
}

/**
 * Predict where a tank will be based on current velocity/position
 * Uses simple linear extrapolation
 */
export function predictTankPosition(
  tank: { x: number; y: number; angle: number },
  timeAhead: number,
  tankSpeed: number
): { x: number; y: number } {
  const rad = (tank.angle * Math.PI) / 180;
  const dx = Math.cos(rad) * tankSpeed * (timeAhead / TICK_INTERVAL);
  const dy = Math.sin(rad) * tankSpeed * (timeAhead / TICK_INTERVAL);
  return {
    x: tank.x + dx,
    y: tank.y + dy,
  };
}


