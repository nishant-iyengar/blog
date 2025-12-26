import type { Bullet, Tank, Sun, Barrier } from '@/app/games/tank-trouble/types';
import type { Threat } from './types';
import { predictBulletPath } from './prediction';
import { TANK_SIZE, TANK_COLLISION_SIZE } from '@/app/games/tank-trouble/config';

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

    // Calculate tank collision box
    const tankCollisionOffset = (TANK_SIZE - TANK_COLLISION_SIZE) / 2;
    const tankCenterX = tank.x + TANK_SIZE / 2;
    const tankCenterY = tank.y + TANK_SIZE / 2;

    for (const point of path.points) {
      // Distance from bullet to tank center
      const dx = point.x - tankCenterX;
      const dy = point.y - tankCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Check if bullet would hit tank (within collision size)
      if (dist < TANK_COLLISION_SIZE + 5) {
        closestDistance = dist;
        closestTime = point.time;
        collisionPoint = { x: point.x, y: point.y };
        break;
      }

      if (dist < closestDistance) {
        closestDistance = dist;
        closestTime = point.time;
        collisionPoint = { x: point.x, y: point.y };
      }
    }

    // Calculate threat level based on distance and time
    if (closestDistance < TANK_COLLISION_SIZE * 3) {
      // High threat if very close
      const timeFactor = Math.max(0, 1 - closestTime / maxPredictionTime);
      const distanceFactor = Math.max(
        0,
        1 - closestDistance / (TANK_COLLISION_SIZE * 3)
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

    // Check if any point gets too close
    for (const point of path.points) {
      const dx = point.x - x;
      const dy = point.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < TANK_COLLISION_SIZE + safeMargin) {
        return false;
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
  const tankCenterX = tank.x + TANK_SIZE / 2;
  const tankCenterY = tank.y + TANK_SIZE / 2;

  const dx = tankCenterX - urgentThreat.collisionPoint.x;
  const dy = tankCenterY - urgentThreat.collisionPoint.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 1) {
    // Too close, pick random direction
    return { angle: (tank.angle + 90) % 360, urgency: 1 };
  }

  const escapeAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return {
    angle: escapeAngle,
    urgency: urgentThreat.threatLevel,
  };
}


