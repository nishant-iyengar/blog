import type { AIConfig } from './types';

/**
 * Default AI configuration
 * Adjust these values to balance difficulty
 */
export const DEFAULT_AI_CONFIG: AIConfig = {
  reactionDelay: 50, // 50ms reaction time
  accuracyPenalty: 0.15, // 15% accuracy penalty
  aggressiveness: 0.7, // 70% aggressive (balanced)
  sunSkill: 0.6, // 60% skill at using suns
  maxPredictionTime: 3000, // Predict up to 3 seconds ahead
  dodgeMargin: 30, // Keep 30 pixels away from predicted bullet paths
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


