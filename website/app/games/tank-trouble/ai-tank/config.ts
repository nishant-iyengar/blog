import type { AIConfig } from './types';

/**
 * Default AI configuration
 * Adjust these values to balance difficulty
 * More aggressive settings to reduce stalemates during training
 */
export const DEFAULT_AI_CONFIG: AIConfig = {
  reactionDelay: 30, // 30ms reaction time (reduced from 50ms for faster reactions)
  accuracyPenalty: 0.08, // 8% accuracy penalty (reduced from 15% to shoot more)
  aggressiveness: 0.85, // 85% aggressive (increased from 70% to encourage closer engagement)
  sunSkill: 0.65, // 65% skill at using suns (slightly increased)
  maxPredictionTime: 3000, // Predict up to 3 seconds ahead
  dodgeMargin: 25, // Keep 25 pixels away from predicted bullet paths (reduced from 30 for more aggressive positioning)
};

/**
 * Easy difficulty AI config
 */
export const EASY_AI_CONFIG: AIConfig = {
  reactionDelay: 150,
  accuracyPenalty: 0.3,
  aggressiveness: 0.4,
  sunSkill: 0.3,
  maxPredictionTime: 2000,
  dodgeMargin: 40,
};

/**
 * Hard difficulty AI config
 */
export const HARD_AI_CONFIG: AIConfig = {
  reactionDelay: 20,
  accuracyPenalty: 0.05,
  aggressiveness: 0.9,
  sunSkill: 0.85,
  maxPredictionTime: 4000,
  dodgeMargin: 20,
};


