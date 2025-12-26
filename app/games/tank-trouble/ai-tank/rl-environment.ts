/**
 * RL Environment Wrapper
 * 
 * Wraps the Tank Trouble game as a reinforcement learning environment.
 * Converts game state to observations, executes actions, and calculates rewards.
 */

import type { Tank, Bullet, Barrier, Sun } from '@/app/games/tank-trouble/types';
import type { AIContext } from './types';
import { extractObservation, Observation } from './rl-observation';
import { calculateReward, RewardInfo } from './rl-reward';
import { actionToDecision, DecisionToAction } from './rl-actions';
import type { AIDecision } from './types';

export interface RLEnvironmentState {
  observation: Observation;
  reward: number;
  done: boolean;
  info: RewardInfo['breakdown'] & {
    episodeLength: number;
    totalReward: number;
    aiLives: number;
    enemyLives: number;
  };
}

export interface PreviousState {
  aiTank: Tank;
  enemyTank: Tank;
  bullets: Bullet[];
  aiLives: number;
  enemyLives: number;
  tickTime: number;
  aiPositionHistory?: Array<{ x: number; y: number; tickTime: number }>;
  lastMovementTime?: number;
  lastShotTime?: number;
  episodeStartTime?: number;
  timeoutApplied?: boolean;
}

/**
 * RL Environment for Tank Trouble
 * 
 * This class wraps the game state and provides a standard RL interface:
 * - reset(): Initialize/reset environment
 * - step(action): Execute action and return next state
 * - getObservation(): Get current observation
 */
export class TankTroubleRLEnv {
  private previousState: PreviousState | null = null;
  private episodeStartTime: number = 0;
  private episodeLength: number = 0;
  private totalReward: number = 0;
  private positionHistory: Array<{ x: number; y: number; tickTime: number }> = [];
  private maxEpisodeTimeMs: number;

  constructor(maxEpisodeTimeMs: number = 90000) {
    this.maxEpisodeTimeMs = maxEpisodeTimeMs;
  }

  /**
   * Reset the environment to initial state
   */
  reset(context: AIContext): RLEnvironmentState {
    const observation = extractObservation(context);
    
    // Reset position history
    this.positionHistory = [{ x: context.aiTank.x, y: context.aiTank.y, tickTime: context.tickTime }];
    
    // Store initial state
    this.episodeStartTime = context.tickTime;
    this.previousState = {
      aiTank: { ...context.aiTank },
      enemyTank: { ...context.enemyTank },
      bullets: context.bullets.map(b => ({ ...b })),
      aiLives: context.aiTank.lives,
      enemyLives: context.enemyTank.lives,
      tickTime: context.tickTime,
      aiPositionHistory: [],
      lastMovementTime: context.tickTime, // Initialize movement tracking
      lastShotTime: 0, // Initialize shot tracking
      episodeStartTime: context.tickTime, // Track episode start for timeout
      timeoutApplied: false,
    };
    
    this.episodeLength = 0;
    this.totalReward = 0;

    return {
      observation,
      reward: 0,
      done: false,
      info: {
        episodeLength: 0,
        totalReward: 0,
        aiLives: context.aiTank.lives,
        enemyLives: context.enemyTank.lives,
      },
    };
  }

  /**
   * Step the environment with an action
   * 
   * @param action - Action from RL agent (discrete or continuous)
   * @param context - Current game context
   * @param decision - The decision that was executed (for reward calculation)
   * @returns Next state, reward, done flag, and info
   */
  step(
    action: number | DecisionToAction,
    context: AIContext,
    decision: AIDecision
  ): RLEnvironmentState {
    if (!this.previousState) {
      // If not initialized, reset first
      return this.reset(context);
    }

    // Calculate reward based on state transition (no boolean arguments needed)
    const rewardInfo = calculateReward(
      this.previousState,
      {
        aiTank: context.aiTank,
        enemyTank: context.enemyTank,
        bullets: context.bullets,
        aiLives: context.aiTank.lives,
        enemyLives: context.enemyTank.lives,
        tickTime: context.tickTime,
      },
      decision,
      this.maxEpisodeTimeMs
    );

    this.totalReward += rewardInfo.reward;
    this.episodeLength++;

    // Check if episode is done
    const done = this.isDone(context);

    // Extract new observation
    const observation = extractObservation(context);

    // Update position history (keep last 20 positions)
    this.positionHistory.push({ x: context.aiTank.x, y: context.aiTank.y, tickTime: context.tickTime });
    if (this.positionHistory.length > 20) {
      this.positionHistory.shift();
    }
    
    // Track movement and shooting for inactivity/aggression penalties
    const movementDistance = Math.sqrt(
      Math.pow(context.aiTank.x - this.previousState.aiTank.x, 2) +
      Math.pow(context.aiTank.y - this.previousState.aiTank.y, 2)
    );
    const SIGNIFICANT_MOVEMENT_THRESHOLD = 5; // pixels
    const lastMovementTime = movementDistance >= SIGNIFICANT_MOVEMENT_THRESHOLD 
      ? context.tickTime 
      : (this.previousState.lastMovementTime || context.tickTime);
    
    const lastShotTime = decision.shouldShoot 
      ? context.tickTime 
      : (this.previousState.lastShotTime || 0);
    
    // Check if timeout penalty was applied (check in reward function, but track here)
    const episodeElapsed = context.tickTime - this.episodeStartTime;
    const timeoutApplied = episodeElapsed >= this.maxEpisodeTimeMs && !this.previousState?.timeoutApplied;
    
    // Update previous state
    this.previousState = {
      aiTank: { ...context.aiTank },
      enemyTank: { ...context.enemyTank },
      bullets: context.bullets.map(b => ({ ...b })),
      aiLives: context.aiTank.lives,
      enemyLives: context.enemyTank.lives,
      tickTime: context.tickTime,
      aiPositionHistory: [...this.positionHistory], // Include position history for stalemate detection
      lastMovementTime, // Track when tank last moved significantly
      lastShotTime, // Track when tank last shot
      episodeStartTime: this.episodeStartTime, // Pass episode start time for timeout check
      timeoutApplied: timeoutApplied || this.previousState?.timeoutApplied || false, // Track if timeout penalty was applied
    };

    return {
      observation,
      reward: rewardInfo.reward,
      done,
      info: {
        episodeLength: this.episodeLength,
        totalReward: this.totalReward,
        aiLives: context.aiTank.lives,
        enemyLives: context.enemyTank.lives,
        ...rewardInfo.breakdown,
      },
    };
  }

  /**
   * Get current observation without stepping
   */
  getObservation(context: AIContext): Observation {
    return extractObservation(context);
  }

  /**
   * Check if episode is done
   */
  private isDone(context: AIContext): boolean {
    // Episode ends when:
    // 1. AI tank has no lives left
    // 2. Enemy tank has no lives left
    // 3. Episode exceeds max episode time (timeout)
    if (context.aiTank.lives <= 0 || context.enemyTank.lives <= 0) {
      return true;
    }
    
    // Check if episode has exceeded max episode time
    const episodeElapsed = context.tickTime - this.episodeStartTime;
    if (episodeElapsed >= this.maxEpisodeTimeMs) {
      return true;
    }
    
    return false;
  }

  /**
   * Get episode statistics
   */
  getStats() {
    return {
      episodeLength: this.episodeLength,
      totalReward: this.totalReward,
    };
  }
}

