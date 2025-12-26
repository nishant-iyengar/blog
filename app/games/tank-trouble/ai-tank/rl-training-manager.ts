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
import { saveModelWithMetadata } from './rl-model-storage';
import type { AIContext } from './types';
import type { Observation } from './rl-observation';
import type { Experience } from './rl-dqn-model';

export interface TrainingStats {
  episode: number;
  episodeReward: number;
  episodeLength: number;
  totalReward: number;
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
  maxEpisodeTimeMs: number; // Maximum episode duration in milliseconds before timeout (default: 90000 = 90 seconds)
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
  private activeGameEpisodes: Set<string> = new Set(); // Track which games have active episodes
  private gameEpisodeRewards: Map<string, number> = new Map(); // Track episode reward per game
  private gameEpisodeLengths: Map<string, number> = new Map(); // Track episode length per game

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
      maxEpisodeTimeMs: 90000, // 90 seconds default
      ...config,
    };

    this.agent = new DQNAgent({
      ...DEFAULT_DQN_CONFIG,
      ...this.config.dqn,
    });

    this.replayBuffer = new ReplayBuffer(
      this.config.dqn.replayBufferSize || DEFAULT_DQN_CONFIG.replayBufferSize
    );

    this.env = new TankTroubleRLEnv(this.config.maxEpisodeTimeMs);

    this.stats = {
      episode: 0,
      episodeReward: 0,
      episodeLength: 0,
      totalReward: 0,
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
    
    // Set up model for game and connect agent to model manager
    // This allows the game to use the trained model during training
    const model = new TensorFlowJSModel({
      name: 'TankTroubleRL',
      type: 'discrete',
      observationSize: DEFAULT_DQN_CONFIG.observationSize,
      actionSize: DEFAULT_DQN_CONFIG.actionSize,
    });
    
    // Connect agent to model interface for use in game
    // This allows the game controller to use the trained model during training
    (model as any).agent = this.agent;
    (model as any).predict = async (obs: any, angle: number) => this.agent.predict(obs, angle);
    (model as any).isLoaded = () => true;
    
    // Set model in global model manager so game controller can use it during training
    rlModelManager.setModel(model);
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
      // Mark this game as having an active episode
      this.activeGameEpisodes.add(gameKey);
      // Initialize episode reward and length for this game (reset from previous episode)
      this.gameEpisodeRewards.set(gameKey, 0);
      this.gameEpisodeLengths.set(gameKey, 0);
      // Update shared stats to include this newly active game
      this.updateSharedStats();
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
    
    // Track reward and length per game (for proper episode tracking)
    const currentGameReward = this.gameEpisodeRewards.get(gameKey) || 0;
    const currentGameLength = this.gameEpisodeLengths.get(gameKey) || 0;
    this.gameEpisodeRewards.set(gameKey, currentGameReward + nextEnvState.reward);
    this.gameEpisodeLengths.set(gameKey, currentGameLength + 1);
    
    // Update shared stats for display (sum of all active games)
    this.updateSharedStats();
    
    // Debug: Log every 100 steps to verify accumulation
    if (this.stats.episodeLength % 100 === 0) {
      console.log(`Step ${this.stats.episodeLength}: reward=${this.stats.episodeReward.toFixed(2)}, activeGames=${this.activeGameEpisodes.size}`);
    }

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
      // Note: Don't remove from activeGameEpisodes here - it will be re-added when the game restarts
      // This prevents the brief window where all games might be "inactive" causing premature reset
      // Note: We also don't clear gameEpisodeRewards/gameEpisodeLengths here - they'll be reset
      // when the game restarts and step() is called with a fresh state
    } else {
      // Update state for this specific game
      this.gameStates.set(gameKey, nextEnvState);
    }
  }

  /**
   * Update shared stats from per-game rewards and lengths
   * This sums all active game rewards/lengths for display
   */
  private updateSharedStats(): void {
    let totalReward = 0;
    let totalLength = 0;
    
    for (const [gameKey, reward] of this.gameEpisodeRewards.entries()) {
      if (this.activeGameEpisodes.has(gameKey)) {
        totalReward += reward;
      }
    }
    
    for (const [gameKey, length] of this.gameEpisodeLengths.entries()) {
      if (this.activeGameEpisodes.has(gameKey)) {
        totalLength += length;
      }
    }
    
    this.stats.episodeReward = totalReward;
    this.stats.episodeLength = totalLength;
  }

  /**
   * Increment episode count (called when a new game starts)
   * This is shared across all 4 games running in parallel
   * Each game that starts increments the shared counter by 1
   * 
   * Note: The reward from the completed episode should have already been
   * added to totalReward in onEpisodeComplete(). This just increments the counter.
   */
  incrementEpisode(): void {
    // Increment episode count
    this.currentEpisode++;
    this.stats.episode = this.currentEpisode;
    this.stats.epsilon = this.agent.getEpsilon();
    
    // Update average reward (totalReward was already updated in onEpisodeComplete)
    if (this.currentEpisode > 0) {
      this.stats.averageReward = this.stats.totalReward / this.currentEpisode;
    }
    
    // Save model periodically
    if (this.currentEpisode % this.config.saveEvery === 0) {
      // Save asynchronously without blocking
      this.saveModel(`indexeddb://tank-ai-episode-${this.currentEpisode}`).catch((error) => {
        console.error('Error saving model:', error);
      });
    }
    
    // Callback to notify listeners
    if (this.config.onEpisodeComplete) {
      this.config.onEpisodeComplete({ ...this.stats });
    }
  }

  /**
   * Handle episode completion (simplified - no longer increments episode count)
   * Episode count is now incremented when a new game starts, not when it ends
   * 
   * This method adds the completed game's reward to totalReward and cleans up
   * per-game tracking. The episode counter is incremented separately when
   * the new game starts.
   */
  private async onEpisodeComplete(finalState: any, gameKey: string): Promise<void> {
    // Get the base game key (without "-blue" suffix) to combine both tanks' rewards
    const isBlueTank = gameKey.includes('-blue');
    const baseGameKey = isBlueTank ? gameKey.replace('-blue', '') : gameKey;
    
    // Get rewards from both tanks for this game (blue and red)
    const redReward = this.gameEpisodeRewards.get(baseGameKey) || 0;
    const blueReward = this.gameEpisodeRewards.get(`${baseGameKey}-blue`) || 0;
    const totalGameReward = redReward + blueReward;
    
    // Get lengths from both tanks
    const redLength = this.gameEpisodeLengths.get(baseGameKey) || 0;
    const blueLength = this.gameEpisodeLengths.get(`${baseGameKey}-blue`) || 0;
    const totalGameLength = redLength + blueLength;
    
    // Add this game's total reward to totalReward (only count once per game, not per tank)
    // In AI vs AI mode, both tanks call this, but we only want to count once
    if (!isBlueTank) {
      this.stats.totalReward += totalGameReward;
      
      // Debug: Log episode completion with per-game reward
      console.log(`Episode completion for ${baseGameKey}. Total reward: ${totalGameReward.toFixed(2)} (red: ${redReward.toFixed(2)}, blue: ${blueReward.toFixed(2)}), Length: ${totalGameLength}, Total episodes: ${this.currentEpisode}`);
    }
    
    // Clean up per-game tracking for this game when episode completes
    // We'll reset these when the game restarts and step() is called with fresh state
    // Note: We mark as inactive so it doesn't contribute to shared stats
    this.activeGameEpisodes.delete(baseGameKey);
    this.activeGameEpisodes.delete(`${baseGameKey}-blue`); // Also remove blue variant if it exists
    
    // Update shared stats (will exclude this completed game)
    this.updateSharedStats();
  }

  /**
   * Start training
   */
  start(): void {
    if (!this.isTraining) {
      this.isTraining = true;
      this.currentEpisode = 0;
      this.stepCount = 0;
      // Reset episode stats when training starts
      this.stats.episodeReward = 0;
      this.stats.episodeLength = 0;
      this.stats.totalReward = 0;
      this.stats.averageReward = 0;
      this.activeGameEpisodes.clear();
      this.gameEpisodeRewards.clear();
      this.gameEpisodeLengths.clear();
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
  async saveModel(path: string, displayName?: string): Promise<void> {
    try {
      // Ensure path has indexeddb:// prefix for IndexedDB storage
      // If path already has the prefix, use it as-is; otherwise add it
      const fullPath = path.startsWith('indexeddb://') ? path : `indexeddb://${path}`;
      console.log('RLTrainingManager: Saving model to', fullPath);
      
      if (!this.agent) {
        throw new Error('Agent not initialized. Cannot save model.');
      }
      
      await this.agent.save(fullPath);
      console.log(`Model saved successfully to: ${fullPath}`);
      
      // Save metadata for easier model management
      try {
        await saveModelWithMetadata(fullPath, displayName);
      } catch (metaError) {
        console.warn('Failed to save model metadata (model still saved):', metaError);
        // Don't throw - metadata is optional
      }
    } catch (error) {
      console.error('Error in saveModel:', error);
      throw error; // Re-throw to let caller handle it
    }
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
   * Get max episode time in milliseconds
   */
  getMaxEpisodeTimeMs(): number {
    return this.config.maxEpisodeTimeMs;
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

