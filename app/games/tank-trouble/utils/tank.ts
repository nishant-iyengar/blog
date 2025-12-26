import type { Tank, Bullet, Barrier, Sun } from '@/app/games/tank-trouble/types';
import { TANK_SPEED, ROTATION_SPEED, GAME_CONFIG, MAX_BULLETS_PER_TANK } from '@/app/games/tank-trouble/config';
import { canMoveTo } from '@/app/games/tank-trouble/utils/collision';
import { createBullet } from '@/app/games/tank-trouble/utils/bullet-creation';
import { clampTankPosition } from '@/app/games/tank-trouble/utils/tank-utils';
import { degToRad } from '@/app/games/tank-trouble/utils/math';
import { countBulletsByOwner } from '@/app/games/tank-trouble/utils/bullet-optimization';

export interface UpdateTankParams {
  tank: Tank;
  tankIndex: number;
  keys: Set<string>;
  tickTime: number;
  lastShotTime: number;
  bullets: Bullet[];
  mapWidth: number;
  mapHeight: number;
  barriers: Barrier[];
  suns: Sun[];
  allTanks: Tank[];
}

export interface UpdateTankResult {
  updatedTank: Tank;
  newBullets: Bullet[];
  lastShotTime: number;
}

/**
 * Player control key mappings
 */
export interface PlayerControls {
  rotateLeft: string;
  rotateRight: string;
  moveForward: string;
  moveBackward: string;
  shoot: string;
}

/**
 * Update tank movement and shooting using control mappings
 */
function updatePlayerTank(
  params: UpdateTankParams,
  controls: PlayerControls,
  owner: 'blue' | 'red'
): UpdateTankResult {
  const { tank, keys, tickTime, lastShotTime, bullets, mapWidth, mapHeight, barriers, suns, allTanks, tankIndex } = params;
  
  let newAngle = tank.angle;
  let newX = tank.x;
  let newY = tank.y;
  const newBullets: Bullet[] = [];
  let newLastShotTime = lastShotTime;

  // Handle rotation
  if (keys.has(controls.rotateLeft)) {
    newAngle -= ROTATION_SPEED;
  }
  if (keys.has(controls.rotateRight)) {
    newAngle += ROTATION_SPEED;
  }

  // Handle forward movement
  if (keys.has(controls.moveForward)) {
    const rad = degToRad(newAngle);
    const dx = Math.cos(rad) * TANK_SPEED;
    const dy = Math.sin(rad) * TANK_SPEED;
    const testX = newX + dx;
    const testY = newY + dy;
    if (canMoveTo(testX, testY, mapWidth, mapHeight, barriers, allTanks, suns, tankIndex)) {
      newX = testX;
      newY = testY;
    }
  }

  // Handle backward movement
  if (keys.has(controls.moveBackward)) {
    const rad = degToRad(newAngle);
    const dx = -Math.cos(rad) * TANK_SPEED;
    const dy = -Math.sin(rad) * TANK_SPEED;
    const testX = newX + dx;
    const testY = newY + dy;
    if (canMoveTo(testX, testY, mapWidth, mapHeight, barriers, allTanks, suns, tankIndex)) {
      newX = testX;
      newY = testY;
    }
  }

  // Handle shooting
  if (keys.has(controls.shoot) && tickTime - lastShotTime > GAME_CONFIG.game.shootingCooldown) {
    // Use optimized bullet counting instead of filter (O(n) instead of O(n) but cached result)
    const bulletCounts = countBulletsByOwner(bullets);
    const bulletCount = bulletCounts.get(owner) || 0;
    if (bulletCount < MAX_BULLETS_PER_TANK) {
      const bullet = createBullet(
        { ...tank, x: newX, y: newY, angle: newAngle },
        newAngle,
        tickTime,
        owner
      );
      newBullets.push(bullet);
      newLastShotTime = tickTime;
    }
  }

  // Clamp position to ensure collision box stays within bounds
  const clamped = clampTankPosition(newX, newY, mapWidth, mapHeight);

  return {
    updatedTank: { ...tank, x: clamped.x, y: clamped.y, angle: newAngle },
    newBullets,
    lastShotTime: newLastShotTime,
  };
}

/**
 * Update tank movement and shooting for Player 1 (Blue) - Arrow keys + Space
 */
export function updatePlayer1Tank(params: UpdateTankParams): UpdateTankResult {
  return updatePlayerTank(params, {
    rotateLeft: 'arrowleft',
    rotateRight: 'arrowright',
    moveForward: 'arrowup',
    moveBackward: 'arrowdown',
    shoot: ' ',
  }, 'blue');
}

/**
 * Update tank movement and shooting for Player 2 (Red) - WASD + Q
 */
export function updatePlayer2Tank(params: UpdateTankParams): UpdateTankResult {
  return updatePlayerTank(params, {
    rotateLeft: 'a',
    rotateRight: 'd',
    moveForward: 'w',
    moveBackward: 's',
    shoot: 'q',
  }, 'red');
}

