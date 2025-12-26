/**
 * RL Training Manager
 * 
 * Coordinates the training process, managing episodes, experience collection,
 * and model updates. Integrates with the game to collect training data.
 */

import { DQNAgent, type DQNConfig, DEFAULT_DQN_CONFIG } from './rl-dqn-model';
import { ReplayBuffer } from './rl-replay-buffer';
import { TankTroubleRLEnv } from './rl-environment';
import { rlModelManager, TensorFlowJSModel } from './rl-model';
import type { AIContext } from './types';
import type { Observation } from './rl-observation';
import type { Experience } from './rl-dqn-model';

export interface TrainingStats {
  episode: number;
  episodeReward: number;
  episodeLength: number;
  totalReward: number;
  wins: number;
  losses: number;
  averageReward: number;
  epsilon: number;
  loss: number;
}

export interface TrainingConfig {
  dqn: Partial<DQNConfig>;
  episodes: number;
  trainEvery: number; // Train every N steps
  saveEvery: number; // Save model every N episodes
  selfPlay: boolean;
  // TODO: Implement headless mode later - this will allow faster training by skipping rendering
  // When implemented, headless mode will run game logic without rendering UI for faster training
  headless: boolean;
  onEpisodeComplete?: (stats: TrainingStats) => void;
  onTrainingUpdate?: (stats: Partial<TrainingStats>) => void;
}

export class RLTrainingManager {
  private agent: DQNAgent;
  private replayBuffer: ReplayBuffer;
  private env: TankTroubleRLEnv;
  private config: TrainingConfig;
  private stats: TrainingStats;
  private isTraining: boolean = false;
  private currentEpisode: number = 0;
  private stepCount: number = 0;
  private gameStates: Map<string, any> = new Map(); // Per-game state tracking

  constructor(config: Partial<TrainingConfig> = {}) {
    this.config = {
      dqn: {},
      episodes: 1000,
      trainEvery: 4,
      saveEvery: 100,
      selfPlay: true,
      // TODO: Implement headless mode later - this will allow faster training by skipping rendering
      // When implemented, set headless: true by default, or use config.headless if provided
      headless: false, // Currently always false - headless mode not yet implemented
      ...config,
    };

    this.agent = new DQNAgent({
      ...DEFAULT_DQN_CONFIG,
      ...this.config.dqn,
    });

    this.replayBuffer = new ReplayBuffer(
      this.config.dqn.replayBufferSize || DEFAULT_DQN_CONFIG.replayBufferSize
    );

    this.env = new TankTroubleRLEnv();

    this.stats = {
      episode: 0,
      episodeReward: 0,
      episodeLength: 0,
      totalReward: 0,
      wins: 0,
      losses: 0,
      averageReward: 0,
      epsilon: 1.0,
      loss: 0,
    };
  }

  /**
   * Initialize training (create networks, etc.)
   */
  async initialize(): Promise<void> {
    await this.agent.initialize();
    
    // Set up model for game
    const model = new TensorFlowJSModel({
      name: 'TankTroubleRL',
      type: 'discrete',
      observationSize: DEFAULT_DQN_CONFIG.observationSize,
      actionSize: DEFAULT_DQN_CONFIG.actionSize,
    });
    
    // Wrap agent in model interface for use in game
    // The agent will be used directly, but we need to set up the model interface
    // For now, the agent is used directly in the training loop
    // The game will use the agent through rlModelManager when training is active
  }

  /**
   * Run one training step
   * 
   * This should be called from the game loop after each game tick.
   * The decision parameter is the action that was actually taken.
   * 
   * @param gameId - Unique identifier for the game instance (e.g., "game-0", "game-1")
   *                 This allows tracking state per game while sharing the model
   */
  async step(context: AIContext, decision: any, actionTaken?: number, gameId?: string): Promise<void> {
    if (!this.isTraining) {
      return;
    }

    // Get current observation
    const observation = this.env.getObservation(context);

    // Use gameId to track state per game (default to "default" if not provided for backward compatibility)
    const gameKey = gameId || 'default';
    
    // Get or initialize state for this specific game
    let envState = this.gameStates.get(gameKey);
    
    // If this is the first step or state is invalid, reset environment for this game
    if (!envState || !envState.observation) {
      envState = this.env.reset(context);
      this.gameStates.set(gameKey, envState);
      return;
    }

    // Use provided action or select new one
    let action: number = 0; // Default to action 0 (no-op)
    if (actionTaken !== undefined && actionTaken !== null) {
      action = actionTaken;
    } else {
      // Select action using epsilon-greedy
      action = await this.agent.selectAction(envState.observation, true);
    }

    // Execute action and get next state
    const nextEnvState = this.env.step(action, context, decision);

    // Ensure we have valid state before storing experience
    if (!envState || !envState.observation || !nextEnvState || !nextEnvState.observation) {
      // Skip experience collection if state is invalid, reset for this game
      this.gameStates.set(gameKey, nextEnvState || this.env.reset(context));
      return;
    }

    // Store experience from previous state to current state
    // All games contribute to the SAME shared replay buffer
    const experience: Experience = {
      state: envState.observation.vector,
      action: action,
      reward: nextEnvState.reward,
      nextState: nextEnvState.observation.vector,
      done: nextEnvState.done,
    };

    // Add to shared replay buffer (all games contribute here)
    this.replayBuffer.add(experience);
    this.stats.episodeReward += nextEnvState.reward;
    this.stats.episodeLength++;

    // Train periodically on shared model
    // All games' experiences are batched together for training
    this.stepCount++;
    if (this.stepCount % this.config.trainEvery === 0 && this.replayBuffer.canSample(32)) {
      const batch = this.replayBuffer.sample(32); // Sample from ALL games' experiences
      const loss = await this.agent.train(batch); // Train shared model
      this.stats.loss = loss;

      if (this.config.onTrainingUpdate) {
        this.config.onTrainingUpdate({
          loss,
          epsilon: this.agent.getEpsilon(),
        });
      }
    }

    // Check if episode is done for this specific game
    if (nextEnvState.done) {
      await this.onEpisodeComplete(nextEnvState, gameKey);
      // Reset state for this game only (other games unaffected)
      this.gameStates.delete(gameKey);
    } else {
      // Update state for this specific game
      this.gameStates.set(gameKey, nextEnvState);
    }
  }

  /**
   * Handle episode completion
   */
  private async onEpisodeComplete(finalState: any, gameKey: string): Promise<void> {
    this.currentEpisode++;
    this.stats.episode = this.currentEpisode;
    this.stats.totalReward += this.stats.episodeReward;
    this.stats.averageReward = this.stats.totalReward / this.currentEpisode;
    this.stats.epsilon = this.agent.getEpsilon();

    // Determine win/loss
    if (finalState.info.aiLives > 0 && finalState.info.enemyLives <= 0) {
      this.stats.wins++;
    } else if (finalState.info.aiLives <= 0) {
      this.stats.losses++;
    }

    // Callback
    if (this.config.onEpisodeComplete) {
      this.config.onEpisodeComplete({ ...this.stats });
    }

    // Save model periodically
    if (this.currentEpisode % this.config.saveEvery === 0) {
      await this.saveModel(`tank-ai-episode-${this.currentEpisode}`);
    }

    // Reset for next episode
    this.stats.episodeReward = 0;
    this.stats.episodeLength = 0;
    // Note: Game-specific state is already deleted in step() method
  }

  /**
   * Start training
   */
  start(): void {
    if (!this.isTraining) {
      this.isTraining = true;
      this.currentEpisode = 0;
      this.stepCount = 0;
    }
  }

  /**
   * Stop training
   */
  stop(): void {
    this.isTraining = false;
  }

  /**
   * Check if training is active
   */
  getIsTraining(): boolean {
    return this.isTraining;
  }

  /**
   * Get current training statistics
   */
  getStats(): TrainingStats {
    return { ...this.stats };
  }

  /**
   * Save model
   */
  async saveModel(path: string): Promise<void> {
    await this.agent.save(`indexeddb://${path}`);
    console.log(`Model saved to: ${path}`);
  }

  /**
   * Load model
   */
  async loadModel(path: string): Promise<void> {
    await this.agent.load(`indexeddb://${path}`);
    console.log(`Model loaded from: ${path}`);
  }

  /**
   * Reset environment for new episode
   */
  resetEpisode(context: AIContext, gameId?: string): void {
    const gameKey = gameId || 'default';
    const newState = this.env.reset(context);
    this.gameStates.set(gameKey, newState);
  }

  /**
   * Dispose resources
   */
  dispose(): void {
    this.stop();
    this.agent.dispose();
    this.replayBuffer.clear();
  }
}

