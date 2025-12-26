/**
 * Physics utilities for game mechanics
 * Shared between BouncingBall and TankTrouble components
 */

export interface Vector2D {
  x: number;
  y: number;
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BounceResult {
  newPosition: Vector2D;
  newVelocity: Vector2D;
  bounced: boolean;
}

/**
 * Check collision between two rectangles
 */
export function checkRectCollision(
  x1: number,
  y1: number,
  w1: number,
  h1: number,
  x2: number,
  y2: number,
  w2: number,
  h2: number
): boolean {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

/**
 * Bounce off rectangular boundaries
 * Returns new position and velocity after bounce
 * Position is the center of the object, size is the collision size
 * Handles corners properly by detecting when both boundaries are hit
 */
export function bounceOffBoundaries(
  position: Vector2D,
  velocity: Vector2D,
  size: number,
  boundaries: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  }
): BounceResult {
  let newX = position.x;
  let newY = position.y;
  let newVx = velocity.x;
  let newVy = velocity.y;
  let bounced = false;
  // No padding - objects can navigate right up to walls with no gap
  const padding = 0;

  // Check which boundaries are being hit
  const hitLeft = newX - padding < boundaries.left;
  const hitRight = newX + padding > boundaries.right;
  const hitTop = newY - padding < boundaries.top;
  const hitBottom = newY + padding > boundaries.bottom;

  // Handle corner collisions (when two boundaries are hit)
  if ((hitLeft || hitRight) && (hitTop || hitBottom)) {
    // Corner collision - bounce both velocities
    if (hitLeft) {
      newX = boundaries.left + padding;
      newVx = -newVx;
    } else if (hitRight) {
      newX = boundaries.right - padding;
      newVx = -newVx;
    }

    if (hitTop) {
      newY = boundaries.top + padding;
      newVy = -newVy;
    } else if (hitBottom) {
      newY = boundaries.bottom - padding;
      newVy = -newVy;
    }
    bounced = true;
  } else {
    // Handle edge collisions (single boundary)
    if (hitLeft) {
      newX = boundaries.left + padding;
      newVx = -newVx;
      bounced = true;
    } else if (hitRight) {
      newX = boundaries.right - padding;
      newVx = -newVx;
      bounced = true;
    }

    if (hitTop) {
      newY = boundaries.top + padding;
      newVy = -newVy;
      bounced = true;
    } else if (hitBottom) {
      newY = boundaries.bottom - padding;
      newVy = -newVy;
      bounced = true;
    }
  }

  return {
    newPosition: { x: newX, y: newY },
    newVelocity: { x: newVx, y: newVy },
    bounced,
  };
}

/**
 * Bounce off a rectangle barrier
 * Returns new position and velocity after bounce
 * Uses the bullet's previous position to determine collision side more accurately
 */
export function bounceOffRectangle(
  position: Vector2D,
  velocity: Vector2D,
  size: number,
  barrier: Rectangle,
  previousPosition?: Vector2D
): BounceResult {
  const halfSize = size / 2;
  const bulletLeft = position.x - halfSize;
  const bulletRight = position.x + halfSize;
  const bulletTop = position.y - halfSize;
  const bulletBottom = position.y + halfSize;
  
  let newVx = velocity.x;
  let newVy = velocity.y;
  let bounced = false;

  // Check if colliding with barrier
  if (
    bulletLeft < barrier.x + barrier.width &&
    bulletRight > barrier.x &&
    bulletTop < barrier.y + barrier.height &&
    bulletBottom > barrier.y
  ) {
    // Determine which side of the barrier was hit
    // Use previous position if available for more accurate detection
    const refX = previousPosition?.x ?? position.x;
    const refY = previousPosition?.y ?? position.y;
    
    // Calculate distances from bullet center to each barrier edge
    const distToLeft = Math.abs(refX - barrier.x);
    const distToRight = Math.abs(refX - (barrier.x + barrier.width));
    const distToTop = Math.abs(refY - barrier.y);
    const distToBottom = Math.abs(refY - (barrier.y + barrier.height));
    
    // Find the closest edge
    const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
    
    let newX = position.x;
    let newY = position.y;
    
    if (minDist === distToLeft) {
      // Hit left edge - bounce x velocity and position to left of barrier
      newVx = -newVx;
      newX = barrier.x - halfSize;
      bounced = true;
    } else if (minDist === distToRight) {
      // Hit right edge - bounce x velocity and position to right of barrier
      newVx = -newVx;
      newX = barrier.x + barrier.width + halfSize;
      bounced = true;
    } else if (minDist === distToTop) {
      // Hit top edge - bounce y velocity and position above barrier
      newVy = -newVy;
      newY = barrier.y - halfSize;
      bounced = true;
    } else if (minDist === distToBottom) {
      // Hit bottom edge - bounce y velocity and position below barrier
      newVy = -newVy;
      newY = barrier.y + barrier.height + halfSize;
      bounced = true;
    }

    return {
      newPosition: { x: newX, y: newY },
      newVelocity: { x: newVx, y: newVy },
      bounced,
    };
  }

  return {
    newPosition: { x: position.x, y: position.y },
    newVelocity: { x: newVx, y: newVy },
    bounced: false,
  };
}

/**
 * Calculate gravitational acceleration from a point source
 */
export function calculateGravity(
  position: Vector2D,
  source: Vector2D,
  config: {
    gravitationalConstant: number;
    sourceMass: number;
    influenceRadius: number;
    minDistance: number;
    maxAcceleration?: number;
  }
): Vector2D {
  const dx = source.x - position.x;
  const dy = source.y - position.y;
  const distanceSquared = dx * dx + dy * dy;

  // Early exit: check squared distance first (avoid sqrt if outside influence)
  const influenceRadiusSquared = config.influenceRadius * config.influenceRadius;
  if (distanceSquared >= influenceRadiusSquared || distanceSquared === 0) {
    return { x: 0, y: 0 };
  }

  // Only calculate sqrt when we know we're within influence radius
  const distance = Math.sqrt(distanceSquared);
  const effectiveDistance = Math.max(distance, config.minDistance);
  const effectiveDistanceSquared = effectiveDistance * effectiveDistance;

  // Calculate gravitational acceleration
  let gravitationalAcceleration = (config.gravitationalConstant * config.sourceMass) / effectiveDistanceSquared;

  // Cap maximum acceleration if specified
  if (config.maxAcceleration !== undefined) {
    gravitationalAcceleration = Math.min(gravitationalAcceleration, config.maxAcceleration);
  }

  // Normalize direction vector
  const directionX = dx / distance;
  const directionY = dy / distance;

  return {
    x: directionX * gravitationalAcceleration,
    y: directionY * gravitationalAcceleration,
  };
}

/**
 * Apply gravity from multiple sources
 * Optimized: early exit if no sources are within influence radius
 */
export function applyGravityFromSources(
  position: Vector2D,
  sources: Vector2D[],
  config: {
    gravitationalConstant: number;
    sourceMass: number;
    influenceRadius: number;
    minDistance: number;
    maxAcceleration?: number;
  }
): Vector2D {
  let totalAccelerationX = 0;
  let totalAccelerationY = 0;
  
  // Pre-compute squared influence radius for faster distance comparison
  const influenceRadiusSquared = config.influenceRadius * config.influenceRadius;

  for (const source of sources) {
    // Quick squared distance check before calling calculateGravity
    const dx = source.x - position.x;
    const dy = source.y - position.y;
    const distanceSquared = dx * dx + dy * dy;
    
    // Skip this source if it's outside influence radius (calculateGravity also checks, but this avoids function call overhead)
    if (distanceSquared >= influenceRadiusSquared || distanceSquared === 0) {
      continue;
    }
    
    const gravity = calculateGravity(position, source, config);
    totalAccelerationX += gravity.x;
    totalAccelerationY += gravity.y;
  }

  return {
    x: totalAccelerationX,
    y: totalAccelerationY,
  };
}

/**
 * Ensure minimum velocity to prevent objects from getting stuck
 */
export function ensureMinimumVelocity(
  velocity: Vector2D,
  minSpeed: number
): Vector2D {
  const currentSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
  
  if (currentSpeed < minSpeed && currentSpeed > 0) {
    // Normalize and scale to minimum velocity
    const scale = minSpeed / currentSpeed;
    return {
      x: velocity.x * scale,
      y: velocity.y * scale,
    };
  }

  return velocity;
}

/**
 * Clamp velocity to maximum speed
 */
export function clampVelocity(velocity: Vector2D, maxSpeed: number): Vector2D {
  const currentSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
  
  if (currentSpeed > maxSpeed) {
    const scale = maxSpeed / currentSpeed;
    return {
      x: velocity.x * scale,
      y: velocity.y * scale,
    };
  }

  return velocity;
}

