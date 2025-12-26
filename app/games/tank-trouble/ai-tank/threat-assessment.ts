import type { Bullet, Tank, Sun, Barrier } from '@/app/games/tank-trouble/types';
import type { Threat } from './types';
import { predictBulletPath } from './prediction';
import { TANK_SIZE, TANK_COLLISION_SIZE } from '@/app/games/tank-trouble/config';
import { getTankCenter } from '@/app/games/tank-trouble/utils/tank-utils';
import { distance, angleToPoint, radToDeg } from '@/app/games/tank-trouble/utils/math';
import { COLLISION_SIZE_BUFFER, HIGH_THREAT_DISTANCE_MULTIPLIER } from '@/app/games/tank-trouble/constants/game-constants';

/**
 * Assess threats from incoming bullets
 */
export function assessThreats(
  tank: Tank,
  bullets: Bullet[],
  suns: Sun[],
  barriers: Barrier[],
  mapWidth: number,
  mapHeight: number,
  maxPredictionTime: number
): Threat[] {
  const threats: Threat[] = [];

  for (const bullet of bullets) {
    // Skip own bullets and exploding bullets
    if (bullet.owner === tank.color || bullet.exploding) {
      continue;
    }

    // Predict bullet path
    const path = predictBulletPath(
      bullet,
      suns,
      barriers,
      mapWidth,
      mapHeight,
      maxPredictionTime,
      16 // Use smaller steps for accuracy
    );

    // Check if path gets close to tank
    let closestDistance = Infinity;
    let closestTime = 0;
    let collisionPoint = { x: bullet.x, y: bullet.y };

    // Calculate tank center once (reused for all points)
    const tankCenter = getTankCenter(tank);
    const hitThreshold = TANK_COLLISION_SIZE + COLLISION_SIZE_BUFFER;

    // Early exit optimization: if we find a collision, break immediately
    for (const point of path.points) {
      // Distance from bullet to tank center
      const dist = distance(point.x, point.y, tankCenter.x, tankCenter.y);

      // Check if bullet would hit tank (within collision size)
      if (dist < hitThreshold) {
        closestDistance = dist;
        closestTime = point.time;
        collisionPoint = { x: point.x, y: point.y };
        break; // Early exit when collision detected
      }

      if (dist < closestDistance) {
        closestDistance = dist;
        closestTime = point.time;
        collisionPoint = { x: point.x, y: point.y };
      }
    }

    // Calculate threat level based on distance and time
    const threatDistanceThreshold = TANK_COLLISION_SIZE * HIGH_THREAT_DISTANCE_MULTIPLIER;
    if (closestDistance < threatDistanceThreshold) {
      // High threat if very close
      const timeFactor = Math.max(0, 1 - closestTime / maxPredictionTime);
      const distanceFactor = Math.max(
        0,
        1 - closestDistance / threatDistanceThreshold
      );
      const threatLevel = (timeFactor + distanceFactor) / 2;

      threats.push({
        bullet,
        timeToCollision: closestTime,
        closestDistance,
        collisionPoint,
        threatLevel: Math.min(1, threatLevel),
      });
    }
  }

  // Sort by threat level (most dangerous first)
  threats.sort((a, b) => b.threatLevel - a.threatLevel);

  return threats;
}

/**
 * Check if a position is safe from bullets
 */
export function isPositionSafe(
  x: number,
  y: number,
  bullets: Bullet[],
  suns: Sun[],
  barriers: Barrier[],
  mapWidth: number,
  mapHeight: number,
  predictionTime: number,
  safeMargin: number
): boolean {
  // Check each bullet
  for (const bullet of bullets) {
    if (bullet.exploding) continue;

    const path = predictBulletPath(
      bullet,
      suns,
      barriers,
      mapWidth,
      mapHeight,
      predictionTime,
      16
    );

    // Check if any point gets too close (early exit optimization)
    const safeDistance = TANK_COLLISION_SIZE + safeMargin;
    for (const point of path.points) {
      const dist = distance(point.x, point.y, x, y);
      if (dist < safeDistance) {
        return false; // Early exit when unsafe position found
      }
    }
  }

  return true;
}

/**
 * Find escape direction from threats
 */
export function findEscapeDirection(
  tank: Tank,
  threats: Threat[],
  barriers: Barrier[],
  suns: Sun[],
  mapWidth: number,
  mapHeight: number
): { angle: number; urgency: number } {
  if (threats.length === 0) {
    return { angle: tank.angle, urgency: 0 };
  }

  // Find the most urgent threat
  const urgentThreat = threats[0];
  if (urgentThreat.threatLevel < 0.5) {
    return { angle: tank.angle, urgency: urgentThreat.threatLevel };
  }

  // Calculate direction away from threat
  const tankCenter = getTankCenter(tank);
  const dist = distance(tankCenter.x, tankCenter.y, urgentThreat.collisionPoint.x, urgentThreat.collisionPoint.y);

  if (dist < 1) {
    // Too close, pick random direction
    return { angle: (tank.angle + 90) % 360, urgency: 1 };
  }

  const escapeAngle = angleToPoint(urgentThreat.collisionPoint, tankCenter);

  return {
    angle: escapeAngle,
    urgency: urgentThreat.threatLevel,
  };
}


