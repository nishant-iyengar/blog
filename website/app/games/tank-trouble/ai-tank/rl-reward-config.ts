/**
 * Reward Configuration
 * 
 * Defines reward constants that match the shared game-config.json
 * This ensures consistency between TypeScript and Go implementations
 */

export interface RewardConfig {
  timeoutPenalty: number;
  maxEpisodeTimeMs: number;
  survivalRewardPerTick: number;
  hitEnemyReward: number;
  gotHitPenalty: number;
  optimalDistanceToEnemy: number;
  inactivityThresholdMs: number;
  significantMovementThreshold: number;
  aggressionCheckIntervalMs: number;
  dodgeRewardPerBullet: number;
  recentBulletThresholdMs: number;
  positionHistorySize: number;
  positionRepeatThreshold: number;
  threatDistance: number;
  bulletMatchDistance: number;
  movementAwayThreshold: number;
  shotAccuracyMaxDistance: number;
  movementRewardMax: number;
  movementRewardMultiplier: number;
  stagnationPenalty: number;
  stalematePenalty: number;
  repetitiveActionPenalty: number;
  positionDiversityReward: number;
  lifeAdvantageReward: number;
  inactivityBasePenalty: number;
  inactivityMaxPenalty: number;
  inactivityScalingFactor: number;
  lackOfAggressionPenalty: number;
}

/**
 * Default reward config matching shared/config/game-config.json
 */
export const DEFAULT_REWARD_CONFIG: RewardConfig = {
  timeoutPenalty: -100,
  maxEpisodeTimeMs: 60000,
  survivalRewardPerTick: 0.01,
  hitEnemyReward: 100,
  gotHitPenalty: -100,
  optimalDistanceToEnemy: 120,
  inactivityThresholdMs: 1500,
  significantMovementThreshold: 5,
  aggressionCheckIntervalMs: 2000,
  dodgeRewardPerBullet: 10,
  recentBulletThresholdMs: 100,
  positionHistorySize: 10,
  positionRepeatThreshold: 30,
  threatDistance: 50,
  bulletMatchDistance: 10,
  movementAwayThreshold: 10,
  shotAccuracyMaxDistance: 50,
  movementRewardMax: 0.15,
  movementRewardMultiplier: 0.0015,
  stagnationPenalty: -0.1,
  stalematePenalty: -0.2,
  repetitiveActionPenalty: -0.03,
  positionDiversityReward: 0.02,
  lifeAdvantageReward: 0.02,
  inactivityBasePenalty: -0.3,
  inactivityMaxPenalty: -0.5,
  inactivityScalingFactor: 0.1,
  lackOfAggressionPenalty: -0.15,
};

