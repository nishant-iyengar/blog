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
  // Use continuous collision detection to prevent bullets passing through each other
  for (let i = 0; i < bullets.length; i++) {
    if (bulletsToRemove.has(i)) continue;
    const bullet = bullets[i];
    if (bullet.exploding) continue; // Skip exploding bullets
    
    // Skip bullets from the same owner (they shouldn't collide with each other)
    // Only check collisions between bullets from different owners
    for (let j = i + 1; j < bullets.length; j++) {
      if (bulletsToRemove.has(j)) continue;
      const otherBullet = bullets[j];
      if (otherBullet.exploding) continue; // Skip exploding bullets
      
      // Only check collisions between bullets from different owners
      if (bullet.owner === otherBullet.owner) {
        continue;
      }
      
      // Check current distance
      const dx = bullet.x - otherBullet.x;
      const dy = bullet.y - otherBullet.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Check if bullets are actually colliding (within collision size)
      if (distance < GAME_CONFIG.bullet.collisionSize) {
        // Both bullets are removed immediately (no animation)
        bulletsToRemove.add(i);
        bulletsToRemove.add(j);
        break; // Both bullets removed, no need to check more collisions
      }
    }
  }

  // Second pass: update remaining bullets
  for (let i = 0; i < bullets.length; i++) {
    if (bulletsToRemove.has(i)) continue;
    
    const bullet = bullets[i];
    
    // Remove exploding bullets immediately (no animation)
    if (bullet.exploding) {
      continue;
    }

    // Check bullet age - bullets fade away instead of exploding
    const age = tickTime - bullet.createdAt;
    if (age > BULLET_MAX_AGE) {
      // Remove bullet after fade duration
      const fadeDuration = GAME_CONFIG.bullet.fadeDuration;
      if (age > BULLET_MAX_AGE + fadeDuration) {
        continue; // Bullet has faded completely, remove it
      }
      // Keep bullet but mark as fading (will be handled in rendering)
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
      // Bullet hits tank - remove immediately (no animation)
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

