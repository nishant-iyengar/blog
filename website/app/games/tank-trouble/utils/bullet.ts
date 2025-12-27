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
import { BULLET_MIN_VELOCITY } from '@/app/games/tank-trouble/constants/game-constants';
import { distance, radToDeg } from '@/app/games/tank-trouble/utils/math';
import { detectBulletCollisions, groupBulletsByOwner } from '@/app/games/tank-trouble/utils/bullet-optimization';

// Cache for sun sources (suns are static during gameplay)
let cachedSunSources: Vector2D[] | null = null;
let cachedSunsReference: Sun[] | null = null;
let cachedDisableSunGravity: boolean | null = null;

// Cache for gravity config (only maxAcceleration depends on BULLET_SPEED)
let cachedGravityConfig: {
  gravitationalConstant: number;
  sourceMass: number;
  influenceRadius: number;
  minDistance: number;
  maxAcceleration: number;
} | null = null;
let cachedBulletSpeed: number | null = null;

/**
 * Get or compute sun sources array (cached for performance)
 */
function getSunSources(suns: Sun[]): Vector2D[] {
  const disableSunGravity = GAME_CONFIG.debug.disableSunGravity;
  
  // Check if suns array reference changed, disable flag changed, or cache is invalid
  if (cachedSunSources === null || 
      cachedSunsReference !== suns || 
      cachedDisableSunGravity !== disableSunGravity) {
    if (disableSunGravity) {
      cachedSunSources = [];
    } else {
      cachedSunSources = suns.map((sun) => ({
        x: sun.x,
        y: sun.y,
      }));
    }
    cachedSunsReference = suns;
    cachedDisableSunGravity = disableSunGravity;
  }
  return cachedSunSources;
}

/**
 * Get or compute gravity config (cached for performance)
 */
function getGravityConfig(): {
  gravitationalConstant: number;
  sourceMass: number;
  influenceRadius: number;
  minDistance: number;
  maxAcceleration: number;
} {
  // Check if BULLET_SPEED changed (only maxAcceleration depends on it)
  if (cachedGravityConfig === null || cachedBulletSpeed !== BULLET_SPEED) {
    cachedGravityConfig = {
      gravitationalConstant: G,
      sourceMass: mSun,
      influenceRadius: SUN_INFLUENCE_RADIUS,
      minDistance: GAME_CONFIG.sun.minDistance,
      maxAcceleration: BULLET_SPEED * 0.3, // Max 30% of bullet speed per frame
    };
    cachedBulletSpeed = BULLET_SPEED;
  }
  return cachedGravityConfig;
}

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
  const updatedTanks = [...tanks];
  const bulletCollisionSize = GAME_CONFIG.bullet.collisionSize;

  // First pass: optimized bullet-bullet collision detection
  // Groups bullets by owner first, reducing O(n²) to O(blue_count * red_count)
  const bulletGroups = groupBulletsByOwner(bullets);
  const bulletsToRemove = detectBulletCollisions(bullets, bulletGroups);

  // Get cached sun sources (only recomputed if suns array reference changes)
  const sunSources = getSunSources(suns);

  // Get cached gravity config (only recomputed if BULLET_SPEED changes)
  const gravityConfig = getGravityConfig();

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

    // Apply gravitational force from suns (skip if disabled via debug flag)
    const gravityAcceleration = GAME_CONFIG.debug.disableSunGravity
      ? { x: 0, y: 0 }
      : applyGravityFromSources(
          { x: bullet.x, y: bullet.y },
          sunSources,
          gravityConfig
        );

    // Update velocity with gravitational acceleration
    let newVx = bullet.vx + gravityAcceleration.x;
    let newVy = bullet.vy + gravityAcceleration.y;

    // Ensure minimum velocity to prevent bullets from getting stuck (very small minimum to prevent division by zero)
    const velocity = ensureMinimumVelocity({ x: newVx, y: newVy }, BULLET_MIN_VELOCITY);
    newVx = velocity.x;
    newVy = velocity.y;

    // Allow gravity to slow bullets naturally - no minimum speed enforcement

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
    // Early exit when collision found - barriers array is typically small so O(n) is acceptable
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
        break; // Only one barrier collision per tick
      }
    }

    // Check collision with tanks
    let hitTank = false;
    for (let j = 0; j < updatedTanks.length; j++) {
      const tank = updatedTanks[j];
      if (tank.lives > 0) {
        // Check if tank is invincible (recently respawned)
        const isInvincible = tank.invincibleUntil !== undefined && tickTime < tank.invincibleUntil;
        if (isInvincible) {
          // Tank is invincible, skip collision check
          continue;
        }
        
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
    const newAngle = radToDeg(Math.atan2(newVy, newVx));
    
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

