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
import { distance } from '@/app/games/tank-trouble/utils/math';
import { getTankCenter } from '@/app/games/tank-trouble/utils/tank-utils';
import { MAX_EPISODE_TIME_MS } from '@/app/games/tank-trouble/constants/game-constants';
import type { RewardConfig } from './rl-reward-config';
import { DEFAULT_REWARD_CONFIG } from './rl-reward-config';

export interface PreviousState {
  aiTank: Tank;
  enemyTank: Tank;
  bullets: Bullet[];
  aiLives: number;
  enemyLives: number;
  tickTime: number;
  aiPositionHistory?: Array<{ x: number; y: number; tickTime: number }>; // Track position history for stalemate detection
  lastMovementTime?: number; // Track when tank last moved significantly (for inactivity penalty)
  lastShotTime?: number; // Track when tank last shot (for aggression penalty)
  episodeStartTime?: number; // Track episode start time for timeout penalty
  timeoutApplied?: boolean; // Track if timeout penalty has been applied
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
    stagnationPenalty?: number;
    stalematePenalty?: number;
    repetitiveActionPenalty?: number;
    timeoutPenalty?: number;
    inactivityPenalty?: number;
    lackOfAggressionPenalty?: number;
  };
}

/**
 * Calculate reward based on state transition
 * 
 * This function implements reward shaping to guide the agent:
 * - Dense rewards for intermediate behaviors (dodging, positioning)
 * - Sparse rewards for major events (hits, deaths)
 * - Automatic penalties for timeout, inactivity, and lack of aggression
 */
export function calculateReward(
  previous: PreviousState,
  current: CurrentState,
  action: AIDecision,
  maxEpisodeTimeMs: number = MAX_EPISODE_TIME_MS,
  config: RewardConfig = DEFAULT_REWARD_CONFIG
): RewardInfo {
  let totalReward = 0;
  const breakdown: RewardInfo['breakdown'] = {};
  
  // Apply timeout penalty if episode exceeded max episode time (only once)
  if (previous.episodeStartTime && !previous.timeoutApplied) {
    const episodeElapsed = current.tickTime - previous.episodeStartTime;
    if (episodeElapsed >= maxEpisodeTimeMs) {
      const timeoutPenalty = config.timeoutPenalty;
      totalReward += timeoutPenalty;
      breakdown.timeoutPenalty = timeoutPenalty;
    }
  }

  // 1. Survival reward (small positive per tick)
  // Encourages staying alive
  const survivalReward = config.survivalRewardPerTick;
  totalReward += survivalReward;
  breakdown.survival = survivalReward;

  // 2. Hit enemy (large positive)
  // Check if enemy lost a life
  if (current.enemyLives < previous.enemyLives) {
    const hitReward = config.hitEnemyReward;
    totalReward += hitReward;
    breakdown.hitEnemy = hitReward;
  }

  // 3. Got hit (large negative)
  // Check if AI lost a life
  if (current.aiLives < previous.aiLives) {
    const hitPenalty = config.gotHitPenalty;
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
  const optimalDistance = config.optimalDistanceToEnemy;
  
  const prevDistanceError = Math.abs(prevDistance - optimalDistance) / optimalDistance;
  const currDistanceError = Math.abs(currDistance - optimalDistance) / optimalDistance;
  
  // Reward getting closer to optimal distance
  const distanceImprovement = prevDistanceError - currDistanceError;
  const distanceReward = distanceImprovement * 2; // Scale factor
  totalReward += distanceReward;
  breakdown.distanceReward = distanceReward;

  // 5. Dodged bullet (positive)
  // Check if a bullet that was threatening is now gone or missed
  const dodgedReward = checkDodgedBullet(previous, current, config);
  if (dodgedReward > 0) {
    totalReward += dodgedReward;
    breakdown.dodgedBullet = dodgedReward;
  }

  // 6. Shot accuracy (reward for shots that get close to enemy)
  if (action.shouldShoot) {
    // Find bullets that were just created (within threshold)
    const recentBulletThresholdMs = config.recentBulletThresholdMs;
    
    for (const bullet of current.bullets) {
      // Check owner and recency in single pass
      if (bullet.owner === current.aiTank.color && 
          current.tickTime - bullet.createdAt < recentBulletThresholdMs) {
        const closestApproach = getClosestBulletApproach(bullet, current.enemyTank);
        // Reward inversely proportional to closest approach
        const accuracyReward = Math.max(0, 5 * (1 - closestApproach / config.shotAccuracyMaxDistance));
        totalReward += accuracyReward;
        breakdown.shotAccuracy = (breakdown.shotAccuracy || 0) + accuracyReward;
      }
    }
  }

  // 7. Life advantage (encourage maintaining/improving life advantage)
  // Only reward maintaining advantage, not changes (changes are handled by hit rewards above)
  const prevLifeDiff = previous.aiLives - previous.enemyLives;
  const currLifeDiff = current.aiLives - current.enemyLives;
  
  // Small bonus for having life advantage (maintains incentive when ahead)
  if (currLifeDiff > 0) {
    const lifeAdvantageReward = config.lifeAdvantageReward;
    totalReward += lifeAdvantageReward;
    breakdown.lifeAdvantage = lifeAdvantageReward;
  }

  // 8. Movement reward (encourage active movement, penalize staying still)
  // Cache distance calculation to avoid redundant sqrt operations
  const movementDistance = getDistance(previous.aiTank, current.aiTank);
  const moved = movementDistance > 0.1;
  
  if (moved) {
    // Reward proportional to distance moved (encourage significant movement)
    const movementReward = Math.min(config.movementRewardMax, movementDistance * config.movementRewardMultiplier);
    totalReward += movementReward;
    breakdown.movement = movementReward;
  } else {
    // Increased penalty for not moving (stalling) - stronger penalty to encourage movement
    const stagnationPenalty = config.stagnationPenalty;
    totalReward += stagnationPenalty;
    breakdown.stagnationPenalty = stagnationPenalty;
    breakdown.movement = stagnationPenalty;
  }

  // 9. Stalemate detection (both tanks in similar positions, not making progress)
  // Cache distance calculations to avoid redundant sqrt operations
  const tankDistance = getDistance(current.aiTank, current.enemyTank);
  const prevTankDistance = getDistance(previous.aiTank, previous.enemyTank);
  const distanceChange = Math.abs(tankDistance - prevTankDistance);
  
  // Check if both tanks are in a stalemate situation
  // Stalemate: tanks aren't changing relative positions much, and AI isn't moving much
  // This catches both close-range standoffs and long-range circling
  const isStalemate = 
    distanceChange < 5 && // Distance between tanks isn't changing much
    movementDistance < 2; // AI tank isn't moving much
  
  if (isStalemate) {
    // Stronger penalty for stalemate - encourages breaking out of deadlock
    const stalematePenalty = config.stalematePenalty;
    totalReward += stalematePenalty;
    breakdown.stalematePenalty = stalematePenalty;
  }

  // 10. Repetitive action penalty (shooting without movement or progress)
  // Penalize if shooting repeatedly without moving or making progress
  if (action.shouldShoot && !moved && current.bullets.length >= previous.bullets.length) {
    // Shooting but not moving and bullet count isn't decreasing (bullets colliding or missing)
    const repetitiveActionPenalty = config.repetitiveActionPenalty;
    totalReward += repetitiveActionPenalty;
    breakdown.repetitiveActionPenalty = repetitiveActionPenalty;
  }

  // 11. Position diversity reward (encourage exploring different positions)
  // Track if tank has been in similar position recently (if history available)
  if (previous.aiPositionHistory && previous.aiPositionHistory.length > 0) {
    const positionRepeatThreshold = config.positionRepeatThreshold;
    const positionHistorySize = config.positionHistorySize;
    
    // Only check recent positions (avoid full array slice if history is large)
    const startIdx = Math.max(0, previous.aiPositionHistory.length - positionHistorySize);
    const currentPos = { x: current.aiTank.x, y: current.aiTank.y };
    
    // Check if current position is similar to recent positions (early exit optimization)
    let isRepeatingPosition = false;
    for (let i = startIdx; i < previous.aiPositionHistory.length; i++) {
      const pos = previous.aiPositionHistory[i];
      const dist = distance(currentPos.x, currentPos.y, pos.x, pos.y);
      if (dist < positionRepeatThreshold) {
        isRepeatingPosition = true;
        break; // Early exit when repeat found
      }
    }
    
    if (!isRepeatingPosition && moved) {
      // Reward for moving to a new area
      const diversityReward = config.positionDiversityReward;
      totalReward += diversityReward;
      breakdown.movement = (breakdown.movement || 0) + diversityReward;
    }
  }

  // 12. Inactivity penalty (tank sitting still for more than 1.5 seconds)
  const inactivityThreshold = config.inactivityThresholdMs;
  const significantMovementThreshold = config.significantMovementThreshold;
  
  if (moved && movementDistance >= significantMovementThreshold) {
    // Tank moved significantly, update last movement time
    // This will be tracked in the environment state
  } else {
    // Tank didn't move significantly, check if it's been inactive too long
    const lastMovementTime = previous.lastMovementTime || previous.episodeStartTime || previous.tickTime;
    const timeSinceLastMovement = current.tickTime - lastMovementTime;
    
    if (timeSinceLastMovement >= inactivityThreshold) {
      // Stronger penalty that scales with inactivity duration
      const inactivityDuration = timeSinceLastMovement - inactivityThreshold;
      const scalingPenalty = Math.min(
        config.inactivityMaxPenalty,
        config.inactivityBasePenalty - (inactivityDuration / 1000) * config.inactivityScalingFactor
      );
      totalReward += scalingPenalty;
      breakdown.inactivityPenalty = scalingPenalty;
    }
  }

  // 13. Lack of aggression penalty
  // Penalize if tank is not being aggressive enough (not shooting, not moving toward enemy, etc.)
  const aggressionCheckInterval = config.aggressionCheckIntervalMs;
  const timeSinceLastShot = previous.lastShotTime ? current.tickTime - previous.lastShotTime : Infinity;
  
  // Check if tank is being passive:
  // - Not shooting for a while (more than 2 seconds)
  // - Moving away from enemy
  // - Not closing distance to enemy
  const isPassive = 
    timeSinceLastShot > aggressionCheckInterval && // Not shooting
    !action.shouldShoot && // Not about to shoot
    movementDistance < 2; // Not moving much
  
  // Also check if moving away from enemy
  const distanceToEnemyChange = currDistance - prevDistance;
  const isMovingAway = distanceToEnemyChange > config.movementAwayThreshold;
  
  if (isPassive || (isMovingAway && !action.shouldShoot)) {
    const lackOfAggressionPenalty = config.lackOfAggressionPenalty;
    totalReward += lackOfAggressionPenalty;
    breakdown.lackOfAggressionPenalty = lackOfAggressionPenalty;
  }

  return {
    reward: totalReward,
    breakdown,
  };
}

/**
 * Get Euclidean distance between two tanks
 * Uses utility function for consistency
 */
function getDistance(tank1: Tank, tank2: Tank): number {
  return distance(tank1.x, tank1.y, tank2.x, tank2.y);
}

/**
 * Check if AI successfully dodged a bullet
 * 
 * Returns reward if a bullet that was close to AI is now gone or far away
 * Optimized to use Map for O(1) lookups instead of O(n) searches
 */
function checkDodgedBullet(previous: PreviousState, current: CurrentState, config: RewardConfig): number {
  const threatDistance = config.threatDistance;
  const bulletMatchDistance = config.bulletMatchDistance;
  
  // Find bullets that were threatening AI in previous state
  const threateningBullets: Bullet[] = [];
  for (const bullet of previous.bullets) {
    if (bullet.owner === previous.aiTank.color || bullet.exploding) {
      continue; // Ignore own bullets and exploding bullets
    }
    
    const dist = getDistanceToTank(bullet, previous.aiTank);
    if (dist < threatDistance) {
      threateningBullets.push(bullet);
    }
  }

  // Create a Map of current bullets by owner for faster lookup
  // Key: owner, Value: array of bullets from that owner
  const currentBulletsByOwner = new Map<'blue' | 'red', Bullet[]>();
  for (const bullet of current.bullets) {
    if (!bullet.exploding) {
      const bullets = currentBulletsByOwner.get(bullet.owner) || [];
      bullets.push(bullet);
      currentBulletsByOwner.set(bullet.owner, bullets);
    }
  }

  // Check if any threatening bullets are now gone or far away
  let dodgedCount = 0;
  const aiTankCenter = getTankCenter(current.aiTank);
  
  for (const prevBullet of threateningBullets) {
    const ownerBullets = currentBulletsByOwner.get(prevBullet.owner) || [];
    
    // Check if a similar bullet still exists (matching by position)
    let stillThreatening = false;
    for (const currBullet of ownerBullets) {
      const dist = distance(currBullet.x, currBullet.y, prevBullet.x, prevBullet.y);
      if (dist < bulletMatchDistance) {
        stillThreatening = true;
        break;
      }
    }

    if (!stillThreatening) {
      // Bullet is gone - check if closest bullet from same owner is now far away
      let minDistance = Infinity;
      for (const currBullet of ownerBullets) {
        const dist = distance(currBullet.x, currBullet.y, aiTankCenter.x, aiTankCenter.y);
        if (dist < minDistance) {
          minDistance = dist;
        }
      }
      
      if (minDistance > threatDistance) {
        dodgedCount++;
      }
    }
  }

  return dodgedCount * config.dodgeRewardPerBullet;
}

/**
 * Get distance from bullet to tank center
 * Uses utility functions for consistency and performance
 */
function getDistanceToTank(bullet: Bullet, tank: Tank): number {
  const tankCenter = getTankCenter(tank);
  return distance(bullet.x, bullet.y, tankCenter.x, tankCenter.y);
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

