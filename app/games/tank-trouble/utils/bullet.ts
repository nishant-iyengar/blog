import type { Bullet, Tank, Barrier, Sun } from '@/app/games/tank-trouble/types';
import {
  bounceOffBoundaries,
  bounceOffRectangle,
  applyGravityFromSources,
  ensureMinimumVelocity,
  type Vector2D,
  type Rectangle,
} from '@/lib/physics';
import {
  BULLET_MAX_AGE,
  BULLET_SPEED,
  G,
  mSun,
  SUN_INFLUENCE_RADIUS,
  GAME_CONFIG,
  TANK_COLLISION_SIZE,
  TANK_SIZE,
} from '@/app/games/tank-trouble/config';

interface UpdateBulletsParams {
  bullets: Bullet[];
  tickTime: number;
  mapWidth: number;
  mapHeight: number;
  barriers: Barrier[];
  suns: Sun[];
  tanks: Tank[];
}

interface UpdateBulletsResult {
  updatedBullets: Bullet[];
  updatedTanks: Tank[];
}

/**
 * Update all bullets - handle physics, collisions, and tank hits
 */
export function updateBullets(params: UpdateBulletsParams): UpdateBulletsResult {
  const { bullets, tickTime, mapWidth, mapHeight, barriers, suns, tanks } = params;
  
  const updatedBullets: Bullet[] = [];
  const bulletsToRemove = new Set<number>();
  const updatedTanks = [...tanks];
  const bulletCollisionSize = GAME_CONFIG.bullet.collisionSize;

  // First pass: check for bullet-bullet collisions
  for (let i = 0; i < bullets.length; i++) {
    if (bulletsToRemove.has(i)) continue;
    const bullet = bullets[i];
    
    for (let j = i + 1; j < bullets.length; j++) {
      if (bulletsToRemove.has(j)) continue;
      const otherBullet = bullets[j];
      
      const dx = bullet.x - otherBullet.x;
      const dy = bullet.y - otherBullet.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < GAME_CONFIG.bullet.collisionSize) {
        // Both bullets start exploding
        if (!bullet.exploding) {
          bullets[i] = { ...bullet, exploding: true, explosionStartTime: tickTime };
        }
        if (!otherBullet.exploding) {
          bullets[j] = { ...otherBullet, exploding: true, explosionStartTime: tickTime };
        }
        break;
      }
    }
  }

  // Second pass: update remaining bullets
  for (let i = 0; i < bullets.length; i++) {
    if (bulletsToRemove.has(i)) continue;
    
    const bullet = bullets[i];
    
    // Check if bullet is exploding
    if (bullet.exploding) {
      const explosionDuration = 300; // 300ms explosion animation
      if (bullet.explosionStartTime && tickTime - bullet.explosionStartTime < explosionDuration) {
        // Keep exploding bullet for animation
        updatedBullets.push(bullet);
      }
      continue; // Remove after animation
    }

    // Check bullet age
    if (tickTime - bullet.createdAt > BULLET_MAX_AGE) {
      // Start explosion animation
      updatedBullets.push({ ...bullet, exploding: true, explosionStartTime: tickTime });
      continue;
    }

    // Apply gravitational force from suns
    const sunSources: Vector2D[] = suns.map((sun) => ({
      x: sun.x,
      y: sun.y,
    }));

    const gravityAcceleration = applyGravityFromSources(
      { x: bullet.x, y: bullet.y },
      sunSources,
      {
        gravitationalConstant: G,
        sourceMass: mSun,
        influenceRadius: SUN_INFLUENCE_RADIUS,
        minDistance: GAME_CONFIG.sun.minDistance,
        maxAcceleration: BULLET_SPEED * 0.3, // Max 30% of bullet speed per frame
      }
    );

    // Update velocity with gravitational acceleration
    let newVx = bullet.vx + gravityAcceleration.x;
    let newVy = bullet.vy + gravityAcceleration.y;

    // Ensure minimum velocity to prevent bullets from getting stuck
    const minVelocity = 0.5;
    const velocity = ensureMinimumVelocity({ x: newVx, y: newVy }, minVelocity);
    newVx = velocity.x;
    newVy = velocity.y;

    // Update position using velocity
    let newX = bullet.x + newVx;
    let newY = bullet.y + newVy;

    // Bounce off boundaries (walls)
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
    newX = boundaryBounce.newPosition.x;
    newY = boundaryBounce.newPosition.y;
    newVx = boundaryBounce.newVelocity.x;
    newVy = boundaryBounce.newVelocity.y;

    // Check collision with barriers - bounce off barriers
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
        { x: bullet.x, y: bullet.y } // Previous position for accurate side detection
      );

      if (barrierBounce.bounced) {
        newX = barrierBounce.newPosition.x;
        newY = barrierBounce.newPosition.y;
        newVx = barrierBounce.newVelocity.x;
        newVy = barrierBounce.newVelocity.y;
        break;
      }
    }

    // Check collision with tanks
    let hitTank = false;
    for (let j = 0; j < updatedTanks.length; j++) {
      const tank = updatedTanks[j];
      if (tank.lives > 0) {
        const bulletLeft = newX - bulletCollisionSize / 2;
        const bulletTop = newY - bulletCollisionSize / 2;
        const bulletRight = newX + bulletCollisionSize / 2;
        const bulletBottom = newY + bulletCollisionSize / 2;
        
        // Calculate tank collision box (centered on tank position)
        const tankCollisionOffset = (TANK_SIZE - TANK_COLLISION_SIZE) / 2;
        const tankCollisionLeft = tank.x + tankCollisionOffset;
        const tankCollisionTop = tank.y + tankCollisionOffset;
        const tankCollisionRight = tankCollisionLeft + TANK_COLLISION_SIZE;
        const tankCollisionBottom = tankCollisionTop + TANK_COLLISION_SIZE;
        
        // Check if bullet rectangle overlaps with tank collision rectangle
        if (
          bulletLeft < tankCollisionRight &&
          bulletRight > tankCollisionLeft &&
          bulletTop < tankCollisionBottom &&
          bulletBottom > tankCollisionTop
        ) {
          // Tank hit! Decrease lives and respawn immediately
          const newLives = tank.lives - 1;
          // Use random spawn (will be handled by game logic)
          updatedTanks[j] = {
            ...tank,
            lives: newLives,
          };
          hitTank = true;
          break;
        }
      }
    }
    
    if (hitTank) {
      // Start explosion animation
      updatedBullets.push({ ...bullet, exploding: true, explosionStartTime: tickTime });
      continue;
    }

    // Update angle based on new velocity
    const newAngle = (Math.atan2(newVy, newVx) * 180) / Math.PI;
    
    updatedBullets.push({
      ...bullet,
      x: newX,
      y: newY,
      angle: newAngle,
      vx: newVx,
      vy: newVy,
    });
  }

  return {
    updatedBullets,
    updatedTanks,
  };
}

