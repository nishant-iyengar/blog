/**
 * Observation Space Definition
 * 
 * Converts game state into a numerical observation vector for the RL agent.
 * The observation should be normalized and contain all relevant information.
 */

import type { Tank, Bullet, Barrier, Sun } from '@/app/games/tank-trouble/types';
import type { AIContext } from './types';
import { TANK_SIZE, TANK_SPEED, BULLET_SPEED } from '@/app/games/tank-trouble/config';

/**
 * Observation vector structure
 * 
 * This is a flattened array of normalized features:
 * - Tank positions and angles (normalized 0-1)
 * - Enemy positions and angles
 * - Bullet states (fixed-size array)
 * - Sun positions (fixed-size array)
 * - Barrier distances (8 directions)
 * - Game state (lives, time, etc.)
 */
export interface Observation {
  vector: number[];
  size: number;
}

// Constants for observation space
const MAX_BULLETS = 20; // Maximum bullets to track
const MAX_SUNS = 10; // Maximum suns to track
const BARRIER_DIRECTIONS = 8; // 8 directions for barrier detection
const BULLET_FEATURES = 5; // x, y, vx, vy, owner
const SUN_FEATURES = 3; // x, y, size

/**
 * Extract observation from game context
 * 
 * Returns a normalized feature vector that the RL agent can use.
 */
export function extractObservation(context: AIContext): Observation {
  const {
    aiTank,
    enemyTank,
    bullets,
    suns,
    barriers,
    mapWidth,
    mapHeight,
  } = context;

  const features: number[] = [];

  // 1. AI Tank state (4 features)
  features.push(normalize(aiTank.x, 0, mapWidth));
  features.push(normalize(aiTank.y, 0, mapHeight));
  features.push(normalizeAngle(aiTank.angle));
  features.push(normalize(aiTank.lives, 0, 3));

  // 2. Enemy Tank state (4 features)
  features.push(normalize(enemyTank.x, 0, mapWidth));
  features.push(normalize(enemyTank.y, 0, mapHeight));
  features.push(normalizeAngle(enemyTank.angle));
  features.push(normalize(enemyTank.lives, 0, 3));

  // 3. Relative position and distance (3 features)
  const dx = enemyTank.x - aiTank.x;
  const dy = enemyTank.y - aiTank.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const maxDistance = Math.sqrt(mapWidth * mapWidth + mapHeight * mapHeight);
  
  features.push(normalize(dx, -mapWidth, mapWidth));
  features.push(normalize(dy, -mapHeight, mapHeight));
  features.push(normalize(distance, 0, maxDistance));

  // 4. Angle to enemy (1 feature)
  const angleToEnemy = (Math.atan2(dy, dx) * 180) / Math.PI;
  const angleDiff = normalizeAngleDifference(angleToEnemy - aiTank.angle);
  features.push(angleDiff);

  // 5. Bullet states (MAX_BULLETS * BULLET_FEATURES features)
  const activeBullets = bullets
    .filter(b => !b.exploding)
    .slice(0, MAX_BULLETS);
  
  for (let i = 0; i < MAX_BULLETS; i++) {
    if (i < activeBullets.length) {
      const bullet = activeBullets[i];
      features.push(normalize(bullet.x, 0, mapWidth));
      features.push(normalize(bullet.y, 0, mapHeight));
      features.push(normalize(bullet.vx, -BULLET_SPEED * 2, BULLET_SPEED * 2));
      features.push(normalize(bullet.vy, -BULLET_SPEED * 2, BULLET_SPEED * 2));
      features.push(bullet.owner === aiTank.color ? 1 : 0); // Owner (0 or 1)
    } else {
      // Pad with zeros
      features.push(0, 0, 0, 0, 0);
    }
  }

  // 6. Sun states (MAX_SUNS * SUN_FEATURES features)
  const activeSuns = (suns || []).slice(0, MAX_SUNS);
  for (let i = 0; i < MAX_SUNS; i++) {
    if (i < activeSuns.length) {
      const sun = activeSuns[i];
      features.push(normalize(sun.x, 0, mapWidth));
      features.push(normalize(sun.y, 0, mapHeight));
      features.push(normalize(sun.size, 0, 100));
    } else {
      features.push(0, 0, 0);
    }
  }

  // 7. Barrier distances in 8 directions (BARRIER_DIRECTIONS features)
  const barrierDistances = getBarrierDistances(
    aiTank.x + TANK_SIZE / 2,
    aiTank.y + TANK_SIZE / 2,
    barriers,
    mapWidth,
    mapHeight
  );
  features.push(...barrierDistances.map(d => normalize(d, 0, Math.max(mapWidth, mapHeight))));

  // 8. Game state (2 features)
  features.push(normalize(context.tickTime % 10000, 0, 10000)); // Time modulo
  features.push(normalize(mapWidth, 0, 2000)); // Map size indicator

  // Total: 4 + 4 + 3 + 1 + (20 * 5) + (10 * 3) + 8 + 2 = 142 features

  return {
    vector: features,
    size: features.length,
  };
}

/**
 * Normalize a value to [0, 1] range
 */
function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0.5;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

/**
 * Normalize angle to [0, 1] range (0-360 degrees -> 0-1)
 */
function normalizeAngle(angle: number): number {
  // Normalize angle to 0-360
  let normalized = angle % 360;
  if (normalized < 0) normalized += 360;
  return normalized / 360;
}

/**
 * Normalize angle difference to [-1, 1] range
 */
function normalizeAngleDifference(angleDiff: number): number {
  // Normalize to -180 to 180
  while (angleDiff > 180) angleDiff -= 360;
  while (angleDiff < -180) angleDiff += 360;
  return angleDiff / 180; // Normalize to -1 to 1
}

/**
 * Get distances to nearest barriers in 8 directions
 * Optimized with pre-computed barrier bounds
 */
function getBarrierDistances(
  x: number,
  y: number,
  barriers: Barrier[],
  mapWidth: number,
  mapHeight: number
): number[] {
  const directions = [
    { dx: 1, dy: 0 },   // Right
    { dx: 1, dy: 1 },   // Down-right
    { dx: 0, dy: 1 },   // Down
    { dx: -1, dy: 1 },  // Down-left
    { dx: -1, dy: 0 },  // Left
    { dx: -1, dy: -1 }, // Up-left
    { dx: 0, dy: -1 },  // Up
    { dx: 1, dy: -1 },  // Up-right
  ];

  // Pre-compute barrier bounds once instead of repeatedly accessing properties
  const barrierBounds = barriers.map(barrier => ({
    left: barrier.x,
    right: barrier.x + barrier.width,
    top: barrier.y,
    bottom: barrier.y + barrier.height,
  }));

  const step = 5; // Check every 5 pixels
  const maxDistance = Math.max(mapWidth, mapHeight);

  return directions.map(dir => {
    let distance = 0;

    while (distance < maxDistance) {
      const testX = x + dir.dx * distance;
      const testY = y + dir.dy * distance;

      // Check if out of bounds
      if (testX < 0 || testX > mapWidth || testY < 0 || testY > mapHeight) {
        break;
      }

      // Use pre-computed bounds for faster barrier check
      // Early exit when barrier found
      let hitBarrier = false;
      for (const bounds of barrierBounds) {
        if (
          testX >= bounds.left &&
          testX <= bounds.right &&
          testY >= bounds.top &&
          testY <= bounds.bottom
        ) {
          hitBarrier = true;
          break;
        }
      }

      if (hitBarrier) {
        break;
      }

      distance += step;
    }

    return distance;
  });
}

/**
 * Get observation size (for model initialization)
 */
export function getObservationSize(): number {
  return 4 + 4 + 3 + 1 + (MAX_BULLETS * BULLET_FEATURES) + (MAX_SUNS * SUN_FEATURES) + BARRIER_DIRECTIONS + 2;
}

