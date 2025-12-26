import type { Sun, Tank, Barrier } from '@/app/games/tank-trouble/types';
import type { ShotOpportunity } from './types';
import { predictBulletPath } from './prediction';
import { BULLET_SPEED, TANK_SIZE, GAME_CONFIG, TICK_INTERVAL } from '@/app/games/tank-trouble/config';
import { applyGravityFromSources, type Vector2D } from '@/lib/physics';
import { G, mSun, SUN_INFLUENCE_RADIUS } from '@/app/games/tank-trouble/config';

/**
 * Calculate if a shot will curve around a sun to hit the target
 */
export function findSunLeveragedShot(
  shooter: Tank,
  target: { x: number; y: number },
  suns: Sun[],
  barriers: Barrier[],
  mapWidth: number,
  mapHeight: number,
  sunSkill: number
): ShotOpportunity | null {
  // Only attempt sun shots if skill is high enough
  if (sunSkill < 0.3 || suns.length === 0) {
    return null;
  }

  let bestShot: ShotOpportunity | null = null;
  let bestConfidence = 0;

  // Check each sun for potential leverage
  for (const sun of suns) {
    // Find angles that will curve around this sun toward target
    const anglesToTest = 16; // Test multiple angles
    const angleSpread = 60; // Test ±60 degrees

    for (let i = 0; i < anglesToTest; i++) {
      const baseAngle = Math.atan2(
        target.y - (shooter.y + TANK_SIZE / 2),
        target.x - (shooter.x + TANK_SIZE / 2)
      );
      const testAngle =
        (baseAngle * 180) / Math.PI +
        (i / (anglesToTest - 1) - 0.5) * angleSpread;

      // Create test bullet
      const rad = (testAngle * Math.PI) / 180;
      const bulletX =
        shooter.x +
        TANK_SIZE / 2 +
        Math.cos(rad) * (TANK_SIZE / 2 + GAME_CONFIG.tank.spawnOffset);
      const bulletY =
        shooter.y +
        TANK_SIZE / 2 +
        Math.sin(rad) * (TANK_SIZE / 2 + GAME_CONFIG.tank.spawnOffset);

      const testBullet = {
        x: bulletX,
        y: bulletY,
        angle: testAngle,
        speed: BULLET_SPEED,
        owner: shooter.color,
        createdAt: 0,
        vx: Math.cos(rad) * BULLET_SPEED,
        vy: Math.sin(rad) * BULLET_SPEED,
      };

      // Predict path
      const path = predictBulletPath(
        testBullet,
        suns,
        barriers,
        mapWidth,
        mapHeight,
        3000,
        TICK_INTERVAL
      );

      // Check if path gets close to target
      let closestDistance = Infinity;
      let closestTime = 0;

      for (const point of path.points) {
        const dx = point.x - target.x;
        const dy = point.y - target.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < closestDistance) {
          closestDistance = dist;
          closestTime = point.time;
        }

        // Hit if within tank collision size
        if (dist < 15) {
          const confidence = sunSkill * (1 - Math.min(closestDistance / 30, 1));
          if (confidence > bestConfidence) {
            bestConfidence = confidence;
            bestShot = {
              angle: testAngle,
              confidence,
              timeToHit: closestTime,
              usesSun: true,
            };
          }
        }
      }
    }
  }

  return bestShot;
}

/**
 * Check if a position is shielded by a sun from another position
 */
export function isPositionShieldedBySun(
  position: { x: number; y: number },
  attackerPosition: { x: number; y: number },
  suns: Sun[]
): boolean {
  for (const sun of suns) {
    // Check if sun is between position and attacker
    const dxToSun = sun.x - position.x;
    const dyToSun = sun.y - position.y;
    const dxToAttacker = attackerPosition.x - position.x;
    const dyToAttacker = attackerPosition.y - position.y;

    // Dot product to check if sun is in same direction as attacker
    const dot = dxToSun * dxToAttacker + dyToSun * dyToAttacker;

    if (dot > 0) {
      // Sun is in same direction, check distance
      const distToSun = Math.sqrt(dxToSun * dxToSun + dyToSun * dyToSun);
      const distToAttacker = Math.sqrt(
        dxToAttacker * dxToAttacker + dyToAttacker * dyToAttacker
      );

      // If sun is closer and large enough to block, we're shielded
      if (distToSun < distToAttacker && distToSun < sun.size * 2) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Find the best angle to shoot at target considering sun gravity
 * Returns direct shot if better, or sun-leveraged shot
 */
export function calculateOptimalShotAngle(
  shooter: Tank,
  target: { x: number; y: number },
  suns: Sun[],
  barriers: Barrier[],
  mapWidth: number,
  mapHeight: number,
  sunSkill: number
): ShotOpportunity {
  // First, try direct shot
  const directAngle =
    (Math.atan2(
      target.y - (shooter.y + TANK_SIZE / 2),
      target.x - (shooter.x + TANK_SIZE / 2)
    ) *
      180) /
    Math.PI;

  const rad = (directAngle * Math.PI) / 180;
  const bulletX =
    shooter.x +
    TANK_SIZE / 2 +
    Math.cos(rad) * (TANK_SIZE / 2 + GAME_CONFIG.tank.spawnOffset);
  const bulletY =
    shooter.y +
    TANK_SIZE / 2 +
    Math.sin(rad) * (TANK_SIZE / 2 + GAME_CONFIG.tank.spawnOffset);

  const testBullet = {
    x: bulletX,
    y: bulletY,
    angle: directAngle,
    speed: BULLET_SPEED,
    owner: shooter.color,
    createdAt: 0,
    vx: Math.cos(rad) * BULLET_SPEED,
    vy: Math.sin(rad) * BULLET_SPEED,
  };

  const directPath = predictBulletPath(
    testBullet,
    suns,
    barriers,
    mapWidth,
    mapHeight,
    3000,
    TICK_INTERVAL
  );

  let directConfidence = 0;
  for (const point of directPath.points) {
    const dx = point.x - target.x;
    const dy = point.y - target.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 15) {
      directConfidence = 0.8;
      break;
    }
  }

  // Try sun-leveraged shot
  const sunShot = findSunLeveragedShot(
    shooter,
    target,
    suns,
    barriers,
    mapWidth,
    mapHeight,
    sunSkill
  );

  // Return best shot
  if (sunShot && sunShot.confidence > directConfidence) {
    return sunShot;
  }

  return {
    angle: directAngle,
    confidence: directConfidence,
    timeToHit: 1000, // Estimate
    usesSun: false,
  };
}


