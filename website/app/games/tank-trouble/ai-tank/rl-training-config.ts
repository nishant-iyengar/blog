/**
 * RL Training Configuration
 * 
 * Configuration for speeding up training and enabling self-play.
 * These settings can be used during training to accelerate learning.
 */

import { GAME_CONFIG } from '@/app/games/tank-trouble/config';

/**
 * Training speed configuration
 * 
 * Use these to speed up training by running games faster.
 */
export interface TrainingSpeedConfig {
  /** Speed multiplier for game simulation (1.0 = normal, 2.0 = 2x speed) */
  simulationSpeed: number;
  
  /** Speed multiplier for bullets (makes combat faster) */
  bulletSpeedMultiplier: number;
  
  /** Speed multiplier for tank movement */
  tankSpeedMultiplier: number;
  
  /** Reduced tick interval (smaller = faster ticks) */
  tickIntervalMultiplier: number;
  
  /** Skip rendering during training (headless mode) */
  headless: boolean;
}

/**
 * Default training config - 3x faster for training
 */
export const DEFAULT_TRAINING_CONFIG: TrainingSpeedConfig = {
  simulationSpeed: 3.0,        // 3x faster overall
  bulletSpeedMultiplier: 1.5,  // Bullets 1.5x faster (faster combat)
  tankSpeedMultiplier: 1.2,    // Tanks 1.2x faster (faster movement)
  tickIntervalMultiplier: 0.33, // 3x faster ticks (1/3 of normal interval)
  headless: true,              // Skip rendering
};

/**
 * Self-play configuration
 */
export interface SelfPlayConfig {
  /** Enable self-play (AI vs AI) */
  enabled: boolean;
  
  /** Update frequency for opponent model (every N episodes) */
  opponentUpdateFrequency: number;
  
  /** Use different model for opponent (for diversity) */
  useSeparateOpponentModel: boolean;
  
  /** Opponent model path (if using separate model) */
  opponentModelPath?: string;
}

/**
 * Default self-play config
 */
export const DEFAULT_SELF_PLAY_CONFIG: SelfPlayConfig = {
  enabled: true,
  opponentUpdateFrequency: 10, // Update opponent every 10 episodes
  useSeparateOpponentModel: false,
};

/**
 * Apply training speed config to game config
 * 
 * Returns modified config values for training.
 * Note: This doesn't modify the actual game config, just returns values to use.
 */
export function getTrainingGameConfig(speedConfig: TrainingSpeedConfig) {
  const baseTickInterval = 1000 / GAME_CONFIG.game.tickRate;
  
  return {
    tickInterval: baseTickInterval * speedConfig.tickIntervalMultiplier,
    tankSpeed: GAME_CONFIG.tank.speed * speedConfig.tankSpeedMultiplier,
    bulletSpeed: 
      GAME_CONFIG.tank.speed * 
      GAME_CONFIG.bullet.speedMultiplier * 
      speedConfig.bulletSpeedMultiplier,
    rotationSpeed: GAME_CONFIG.tank.rotationSpeed * speedConfig.simulationSpeed,
  };
}

/**
 * Calculate training time savings
 * 
 * Shows how much faster training will be with given config.
 */
export function calculateTrainingSpeedup(config: TrainingSpeedConfig): {
  timeMultiplier: number;
  estimatedEpisodesPerHour: number;
  normalEpisodesPerHour: number;
} {
  // Base episode length: ~30 seconds at normal speed
  const normalEpisodeLength = 30; // seconds
  const trainingEpisodeLength = normalEpisodeLength / config.simulationSpeed;
  
  const timeMultiplier = config.simulationSpeed;
  const normalEpisodesPerHour = 3600 / normalEpisodeLength;
  const trainingEpisodesPerHour = 3600 / trainingEpisodeLength;
  
  return {
    timeMultiplier,
    estimatedEpisodesPerHour: Math.round(trainingEpisodesPerHour),
    normalEpisodesPerHour: Math.round(normalEpisodesPerHour),
  };
}

