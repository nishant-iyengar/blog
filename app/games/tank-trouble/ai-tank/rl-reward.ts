/**
 * Reward Function
 * 
 * Calculates rewards for the RL agent based on game state transitions.
 * Reward shaping is critical for RL success - rewards should guide the agent
 * toward desired behaviors.
 */

import type { Tank, Bullet } from '@/app/games/tank-trouble/types';
import type { AIDecision } from './types';
import { TANK_SIZE } from '@/app/games/tank-trouble/config';

export interface PreviousState {
  aiTank: Tank;
  enemyTank: Tank;
  bullets: Bullet[];
  aiLives: number;
  enemyLives: number;
  tickTime: number;
}

export interface CurrentState {
  aiTank: Tank;
  enemyTank: Tank;
  bullets: Bullet[];
  aiLives: number;
  enemyLives: number;
  tickTime: number;
}

export interface RewardInfo {
  reward: number;
  breakdown: {
    survival?: number;
    hitEnemy?: number;
    gotHit?: number;
    distanceReward?: number;
    dodgedBullet?: number;
    shotAccuracy?: number;
    lifeAdvantage?: number;
    movement?: number;
  };
}

/**
 * Calculate reward based on state transition
 * 
 * This function implements reward shaping to guide the agent:
 * - Dense rewards for intermediate behaviors (dodging, positioning)
 * - Sparse rewards for major events (hits, deaths)
 */
export function calculateReward(
  previous: PreviousState,
  current: CurrentState,
  action: AIDecision
): RewardInfo {
  let totalReward = 0;
  const breakdown: RewardInfo['breakdown'] = {};

  // 1. Survival reward (small positive per tick)
  // Encourages staying alive
  const survivalReward = 0.01;
  totalReward += survivalReward;
  breakdown.survival = survivalReward;

  // 2. Hit enemy (large positive)
  // Check if enemy lost a life
  if (current.enemyLives < previous.enemyLives) {
    const hitReward = 100;
    totalReward += hitReward;
    breakdown.hitEnemy = hitReward;
  }

  // 3. Got hit (large negative)
  // Check if AI lost a life
  if (current.aiLives < previous.aiLives) {
    const hitPenalty = -100;
    totalReward += hitPenalty;
    breakdown.gotHit = hitPenalty;
  }

  // 4. Distance to enemy (shaped reward)
  // Reward maintaining optimal distance (not too close, not too far)
  // Optimal distance reasoning:
  // - Too close (< 80px): Hard to dodge, easy to get hit, bullets travel too fast
  // - Too far (> 200px): Hard to hit enemy, bullets take too long, less pressure
  // - Sweet spot (100-150px): Good balance - can dodge, can hit, maintains engagement
  // - Based on: map size (480x360), tank size (24px), bullet speed (~2px/tick)
  // - At 150px: ~75 ticks for bullet to travel, gives ~1 second reaction time at 72 FPS
  const prevDistance = getDistance(previous.aiTank, previous.enemyTank);
  const currDistance = getDistance(current.aiTank, current.enemyTank);
  const optimalDistance = 120; // pixels - balanced for 480x360 map
  
  const prevDistanceError = Math.abs(prevDistance - optimalDistance) / optimalDistance;
  const currDistanceError = Math.abs(currDistance - optimalDistance) / optimalDistance;
  
  // Reward getting closer to optimal distance
  const distanceImprovement = prevDistanceError - currDistanceError;
  const distanceReward = distanceImprovement * 2; // Scale factor
  totalReward += distanceReward;
  breakdown.distanceReward = distanceReward;

  // 5. Dodged bullet (positive)
  // Check if a bullet that was threatening is now gone or missed
  const dodgedReward = checkDodgedBullet(previous, current);
  if (dodgedReward > 0) {
    totalReward += dodgedReward;
    breakdown.dodgedBullet = dodgedReward;
  }

  // 6. Shot accuracy (reward for shots that get close to enemy)
  if (action.shouldShoot) {
    // Find bullets that were just created (within last 100ms)
    const recentBullets = current.bullets.filter(
      b => b.owner === current.aiTank.color &&
      current.tickTime - b.createdAt < 100
    );

    for (const bullet of recentBullets) {
      const closestApproach = getClosestBulletApproach(bullet, current.enemyTank);
      // Reward inversely proportional to closest approach
      // Max reward if bullet gets within 20 pixels
      const accuracyReward = Math.max(0, 5 * (1 - closestApproach / 50));
      totalReward += accuracyReward;
      breakdown.shotAccuracy = (breakdown.shotAccuracy || 0) + accuracyReward;
    }
  }

  // 7. Life advantage (encourage maintaining/improving life advantage)
  const prevLifeDiff = previous.aiLives - previous.enemyLives;
  const currLifeDiff = current.aiLives - current.enemyLives;
  const lifeAdvantageChange = currLifeDiff - prevLifeDiff;
  
  if (lifeAdvantageChange !== 0) {
    // Already handled by hit rewards, but add small bonus for maintaining advantage
    const lifeAdvantageReward = currLifeDiff * 0.5;
    totalReward += lifeAdvantageReward - (prevLifeDiff * 0.5);
    breakdown.lifeAdvantage = lifeAdvantageChange * 0.5;
  }

  // 8. Movement reward (encourage active movement, penalize staying still)
  const moved = getDistance(previous.aiTank, current.aiTank) > 0.1;
  if (moved) {
    const movementReward = 0.05;
    totalReward += movementReward;
    breakdown.movement = movementReward;
  } else {
    // Small penalty for not moving (but not too harsh)
    const stagnationPenalty = -0.01;
    totalReward += stagnationPenalty;
    breakdown.movement = stagnationPenalty;
  }

  return {
    reward: totalReward,
    breakdown,
  };
}

/**
 * Get Euclidean distance between two tanks
 */
function getDistance(tank1: Tank, tank2: Tank): number {
  const dx = tank2.x - tank1.x;
  const dy = tank2.y - tank1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Check if AI successfully dodged a bullet
 * 
 * Returns reward if a bullet that was close to AI is now gone or far away
 */
function checkDodgedBullet(previous: PreviousState, current: CurrentState): number {
  // Find bullets that were threatening AI in previous state
  const threateningBullets = previous.bullets.filter(bullet => {
    if (bullet.owner === previous.aiTank.color || bullet.exploding) {
      return false; // Ignore own bullets and exploding bullets
    }

    const distance = getDistanceToTank(bullet, previous.aiTank);
    return distance < 50; // Was within 50 pixels
  });

  // Check if any of these bullets are now gone or far away
  let dodgedCount = 0;
  for (const prevBullet of threateningBullets) {
    const stillThreatening = current.bullets.some(currBullet => {
      // Match bullets by position and owner (simple heuristic)
      const distance = Math.sqrt(
        Math.pow(currBullet.x - prevBullet.x, 2) +
        Math.pow(currBullet.y - prevBullet.y, 2)
      );
      return distance < 10 && currBullet.owner === prevBullet.owner;
    });

    if (!stillThreatening) {
      // Bullet is gone or moved away
      const currentDistance = current.bullets
        .filter(b => b.owner === prevBullet.owner)
        .map(b => getDistanceToTank(b, current.aiTank))
        .reduce((min, d) => Math.min(min, d), Infinity);
      
      if (currentDistance > 50) {
        dodgedCount++;
      }
    }
  }

  return dodgedCount * 10; // 10 points per dodged bullet
}

/**
 * Get distance from bullet to tank center
 */
function getDistanceToTank(bullet: Bullet, tank: Tank): number {
  const tankCenterX = tank.x + TANK_SIZE / 2;
  const tankCenterY = tank.y + TANK_SIZE / 2;
  const dx = bullet.x - tankCenterX;
  const dy = bullet.y - tankCenterY;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate closest approach distance of bullet to tank
 * 
 * This is a simplified calculation - in reality, we'd need to account for
 * bullet trajectory and tank movement.
 */
function getClosestBulletApproach(bullet: Bullet, tank: Tank): number {
  // Simplified: just use current distance
  // In a full implementation, we'd predict the bullet path
  return getDistanceToTank(bullet, tank);
}

