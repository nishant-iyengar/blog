import type { Tank, Bullet, Barrier, Sun } from '@/app/games/tank-trouble/types';
import { TANK_SPEED, ROTATION_SPEED, TANK_SIZE, TANK_COLLISION_SIZE, BULLET_SPEED, GAME_CONFIG, MAX_BULLETS_PER_TANK } from '@/app/games/tank-trouble/config';
import { canMoveTo } from '@/app/games/tank-trouble/utils/collision';

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
 * Update tank movement and shooting for Player 1 (Blue) - Arrow keys + Space
 */
export function updatePlayer1Tank(params: UpdateTankParams): UpdateTankResult {
  const { tank, keys, tickTime, lastShotTime, bullets, mapWidth, mapHeight, barriers, suns, allTanks } = params;
  
  let newAngle = tank.angle;
  let newX = tank.x;
  let newY = tank.y;
  const newBullets: Bullet[] = [];
  let newLastShotTime = lastShotTime;

  if (keys.has('arrowleft')) {
    newAngle -= ROTATION_SPEED;
  }
  if (keys.has('arrowright')) {
    newAngle += ROTATION_SPEED;
  }
  if (keys.has('arrowup')) {
    const rad = (newAngle * Math.PI) / 180;
    const dx = Math.cos(rad) * TANK_SPEED;
    const dy = Math.sin(rad) * TANK_SPEED;
    const testX = newX + dx;
    const testY = newY + dy;
    if (canMoveTo(testX, testY, mapWidth, mapHeight, barriers, allTanks, suns, 0)) {
      newX = testX;
      newY = testY;
    }
  }
  if (keys.has('arrowdown')) {
    const rad = (newAngle * Math.PI) / 180;
    const dx = -Math.cos(rad) * TANK_SPEED;
    const dy = -Math.sin(rad) * TANK_SPEED;
    const testX = newX + dx;
    const testY = newY + dy;
    if (canMoveTo(testX, testY, mapWidth, mapHeight, barriers, allTanks, suns, 0)) {
      newX = testX;
      newY = testY;
    }
  }
  if (keys.has(' ') && tickTime - lastShotTime > GAME_CONFIG.game.shootingCooldown) {
    // Check bullet limit
    const blueBulletCount = bullets.filter(b => b.owner === 'blue').length;
    if (blueBulletCount < MAX_BULLETS_PER_TANK) {
      // Shoot bullet
      const rad = (newAngle * Math.PI) / 180;
      const bulletX = newX + TANK_SIZE / 2 + Math.cos(rad) * (TANK_SIZE / 2 + GAME_CONFIG.tank.spawnOffset);
      const bulletY = newY + TANK_SIZE / 2 + Math.sin(rad) * (TANK_SIZE / 2 + GAME_CONFIG.tank.spawnOffset);
      newBullets.push({
        x: bulletX,
        y: bulletY,
        angle: newAngle,
        speed: BULLET_SPEED,
        owner: 'blue',
        createdAt: tickTime,
        vx: Math.cos(rad) * BULLET_SPEED,
        vy: Math.sin(rad) * BULLET_SPEED,
      });
      newLastShotTime = tickTime;
    }
  }

  // Clamp position to ensure collision box stays within bounds (prevents getting stuck at walls)
  const collisionOffset = (TANK_SIZE - TANK_COLLISION_SIZE) / 2;
  newX = Math.max(-collisionOffset, Math.min(newX, mapWidth - TANK_SIZE + collisionOffset));
  newY = Math.max(-collisionOffset, Math.min(newY, mapHeight - TANK_SIZE + collisionOffset));

  return {
    updatedTank: { ...tank, x: newX, y: newY, angle: newAngle },
    newBullets,
    lastShotTime: newLastShotTime,
  };
}

/**
 * Update tank movement and shooting for Player 2 (Red) - WASD + Q
 */
export function updatePlayer2Tank(params: UpdateTankParams): UpdateTankResult {
  const { tank, keys, tickTime, lastShotTime, bullets, mapWidth, mapHeight, barriers, suns, allTanks } = params;
  
  let newAngle = tank.angle;
  let newX = tank.x;
  let newY = tank.y;
  const newBullets: Bullet[] = [];
  let newLastShotTime = lastShotTime;

  if (keys.has('a')) {
    newAngle -= ROTATION_SPEED;
  }
  if (keys.has('d')) {
    newAngle += ROTATION_SPEED;
  }
  if (keys.has('w')) {
    const rad = (newAngle * Math.PI) / 180;
    const dx = Math.cos(rad) * TANK_SPEED;
    const dy = Math.sin(rad) * TANK_SPEED;
    const testX = newX + dx;
    const testY = newY + dy;
    if (canMoveTo(testX, testY, mapWidth, mapHeight, barriers, allTanks, suns, 1)) {
      newX = testX;
      newY = testY;
    }
  }
  if (keys.has('s')) {
    const rad = (newAngle * Math.PI) / 180;
    const dx = -Math.cos(rad) * TANK_SPEED;
    const dy = -Math.sin(rad) * TANK_SPEED;
    const testX = newX + dx;
    const testY = newY + dy;
    if (canMoveTo(testX, testY, mapWidth, mapHeight, barriers, allTanks, suns, 1)) {
      newX = testX;
      newY = testY;
    }
  }
  if (keys.has('q') && tickTime - lastShotTime > GAME_CONFIG.game.shootingCooldown) {
    // Check bullet limit
    const redBulletCount = bullets.filter(b => b.owner === 'red').length;
    if (redBulletCount < MAX_BULLETS_PER_TANK) {
      // Shoot bullet
      const rad = (newAngle * Math.PI) / 180;
      const bulletX = newX + TANK_SIZE / 2 + Math.cos(rad) * (TANK_SIZE / 2 + GAME_CONFIG.tank.spawnOffset);
      const bulletY = newY + TANK_SIZE / 2 + Math.sin(rad) * (TANK_SIZE / 2 + GAME_CONFIG.tank.spawnOffset);
      newBullets.push({
        x: bulletX,
        y: bulletY,
        angle: newAngle,
        speed: BULLET_SPEED,
        owner: 'red',
        createdAt: tickTime,
        vx: Math.cos(rad) * BULLET_SPEED,
        vy: Math.sin(rad) * BULLET_SPEED,
      });
      newLastShotTime = tickTime;
    }
  }

  // Clamp position to ensure collision box stays within bounds (prevents getting stuck at walls)
  const collisionOffset = (TANK_SIZE - TANK_COLLISION_SIZE) / 2;
  newX = Math.max(-collisionOffset, Math.min(newX, mapWidth - TANK_SIZE + collisionOffset));
  newY = Math.max(-collisionOffset, Math.min(newY, mapHeight - TANK_SIZE + collisionOffset));

  return {
    updatedTank: { ...tank, x: newX, y: newY, angle: newAngle },
    newBullets,
    lastShotTime: newLastShotTime,
  };
}

