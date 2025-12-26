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

  /**
   * Reset the environment to initial state
   */
  reset(context: AIContext): RLEnvironmentState {
    const observation = extractObservation(context);
    
    // Store initial state
    this.previousState = {
      aiTank: { ...context.aiTank },
      enemyTank: { ...context.enemyTank },
      bullets: context.bullets.map(b => ({ ...b })),
      aiLives: context.aiTank.lives,
      enemyLives: context.enemyTank.lives,
      tickTime: context.tickTime,
    };
    
    this.episodeStartTime = context.tickTime;
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

    // Calculate reward based on state transition
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
      decision
    );

    this.totalReward += rewardInfo.reward;
    this.episodeLength++;

    // Check if episode is done
    const done = this.isDone(context);

    // Extract new observation
    const observation = extractObservation(context);

    // Update previous state
    this.previousState = {
      aiTank: { ...context.aiTank },
      enemyTank: { ...context.enemyTank },
      bullets: context.bullets.map(b => ({ ...b })),
      aiLives: context.aiTank.lives,
      enemyLives: context.enemyTank.lives,
      tickTime: context.tickTime,
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
    // 3. Episode is too long (prevent infinite episodes)
    const maxEpisodeLength = 10000; // ~2.3 minutes at 72 FPS
    
    if (context.aiTank.lives <= 0 || context.enemyTank.lives <= 0) {
      return true;
    }
    
    if (this.episodeLength >= maxEpisodeLength) {
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

