/**
 * DQN (Deep Q-Network) Model Implementation
 * 
 * Implements a DQN agent using TensorFlow.js for browser-based training.
 * DQN is well-suited for discrete action spaces.
 */

import * as tf from '@tensorflow/tfjs';
import type { Observation } from './rl-observation';
import type { AIDecision } from './types';
import { actionToDecision, NUM_DISCRETE_ACTIONS } from './rl-actions';
import { getObservationSize } from './rl-observation';
import { ROTATION_SPEED } from '@/app/games/tank-trouble/config';

export interface DQNConfig {
  observationSize: number;
  actionSize: number;
  learningRate: number;
  hiddenLayers: number[];
  gamma: number; // Discount factor
  epsilonStart: number;
  epsilonEnd: number;
  epsilonDecay: number;
  batchSize: number;
  replayBufferSize: number;
  targetUpdateFrequency: number;
}

export const DEFAULT_DQN_CONFIG: DQNConfig = {
  observationSize: getObservationSize(),
  actionSize: NUM_DISCRETE_ACTIONS,
  learningRate: 0.001,
  hiddenLayers: [128, 128, 64],
  gamma: 0.99,
  epsilonStart: 1.0,
  epsilonEnd: 0.01,
  epsilonDecay: 0.995,
  batchSize: 32,
  replayBufferSize: 10000,
  targetUpdateFrequency: 100,
};

/**
 * Experience for replay buffer
 */
export interface Experience {
  state: number[];
  action: number;
  reward: number;
  nextState: number[];
  done: boolean;
}

/**
 * DQN Agent
 */
export class DQNAgent {
  private qNetwork: tf.LayersModel | null = null;
  private targetNetwork: tf.LayersModel | null = null;
  private config: DQNConfig;
  private epsilon: number;
  private stepCount: number = 0;
  private trainingInProgress: Promise<number> | null = null; // Active training promise - null means no training
  private isDisposed: boolean = false; // Track if agent has been disposed

  constructor(config: Partial<DQNConfig> = {}) {
    this.config = { ...DEFAULT_DQN_CONFIG, ...config };
    this.epsilon = this.config.epsilonStart;
  }

  /**
   * Initialize the neural networks
   */
  async initialize(): Promise<void> {
    this.qNetwork = this.createNetwork();
    this.targetNetwork = this.createNetwork();
    this.updateTargetNetwork();
  }

  /**
   * Create the Q-network architecture
   */
  private createNetwork(): tf.LayersModel {
    const model = tf.sequential();

    // Input layer
    model.add(
      tf.layers.dense({
        inputShape: [this.config.observationSize],
        units: this.config.hiddenLayers[0],
        activation: 'relu',
        kernelInitializer: 'heNormal',
      })
    );

    // Hidden layers
    for (let i = 1; i < this.config.hiddenLayers.length; i++) {
      model.add(
        tf.layers.dense({
          units: this.config.hiddenLayers[i],
          activation: 'relu',
          kernelInitializer: 'heNormal',
        })
      );
    }

    // Output layer (Q-values for each action)
    model.add(
      tf.layers.dense({
        units: this.config.actionSize,
        activation: 'linear',
        kernelInitializer: 'zeros',
      })
    );

    // Compile model
    model.compile({
      optimizer: tf.train.adam(this.config.learningRate),
      loss: 'meanSquaredError',
    });

    return model;
  }

  /**
   * Check if networks are valid and not disposed
   */
  private areNetworksValid(): boolean {
    return !this.isDisposed && this.qNetwork !== null && this.targetNetwork !== null;
  }

  /**
   * Select action using epsilon-greedy policy
   */
  async selectAction(observation: Observation, training: boolean = true): Promise<number> {
    if (!this.qNetwork) {
      throw new Error('Network not initialized. Call initialize() first.');
    }

    // Exploration: random action
    if (training && Math.random() < this.epsilon) {
      return Math.floor(Math.random() * this.config.actionSize);
    }

    // Exploitation: best action according to Q-network
    const stateTensor = tf.tensor2d([observation.vector]);
    const qValues = this.qNetwork.predict(stateTensor) as tf.Tensor;
    const qValuesArray = await qValues.data();
    stateTensor.dispose();
    qValues.dispose();

    // Find action with highest Q-value
    let bestAction = 0;
    let bestQValue = qValuesArray[0];
    for (let i = 1; i < qValuesArray.length; i++) {
      if (qValuesArray[i] > bestQValue) {
        bestQValue = qValuesArray[i];
        bestAction = i;
      }
    }

    return bestAction;
  }

  /**
   * Predict action (for inference, no exploration)
   */
  async predict(observation: Observation, currentAngle: number): Promise<AIDecision> {
    const action = await this.selectAction(observation, false);
    return actionToDecision(action, currentAngle);
  }

  /**
   * Train on a batch of experiences
   * 
   * Note: This method prevents concurrent training calls by using a promise-based lock.
   * If training is already in progress, this call will wait for it and skip (return 0).
   */
  async train(experiences: Experience[]): Promise<number> {
    if (!this.areNetworksValid() || experiences.length === 0) {
      return 0;
    }

    // If training is already in progress, wait for it and skip this call
    if (this.trainingInProgress) {
      try {
        await this.trainingInProgress;
      } catch (error) {
        // Ignore errors from previous training - we're just waiting
      }
      return 0;
    }

    // Create and assign the promise SYNCHRONOUSLY before any async work
    let resolveTraining: ((value: number) => void) | undefined;
    let rejectTraining: ((error: any) => void) | undefined;
    
    this.trainingInProgress = new Promise<number>((resolve, reject) => {
      resolveTraining = resolve;
      rejectTraining = reject;
    });

    // Start async training work
    this.executeTraining(experiences, this.trainingInProgress)
      .then((result) => {
        this.trainingInProgress = null;
        if (resolveTraining) resolveTraining(result);
      })
      .catch((error) => {
        this.trainingInProgress = null;
        if (rejectTraining) rejectTraining(error);
      });

    try {
      return await this.trainingInProgress;
    } catch (error) {
      // Return 0 on error instead of throwing - training errors shouldn't crash the app
      console.error('Training error:', error);
      return 0;
    }
  }

  /**
   * Internal method that performs the actual training
   */
  private async executeTraining(experiences: Experience[], currentTrainingPromise: Promise<number>): Promise<number> {
    // Prepare batch
    const batchSize = Math.min(experiences.length, this.config.batchSize);
    const states: number[][] = [];
    const actions: number[] = [];
    const rewards: number[] = [];
    const nextStates: number[][] = [];
    const dones: boolean[] = [];

    for (let i = 0; i < batchSize; i++) {
      const exp = experiences[i];
      states.push(exp.state);
      actions.push(exp.action);
      rewards.push(exp.reward);
      nextStates.push(exp.nextState);
      dones.push(exp.done);
    }

    // Create tensors
    const statesTensor = tf.tensor2d(states);
    const nextStatesTensor = tf.tensor2d(nextStates);
    
    // Track all tensors for cleanup
    const tensorsToDispose: tf.Tensor[] = [statesTensor, nextStatesTensor];

    try {
      // Verify we're still the active training call and networks are valid
      if (!this.areNetworksValid() || this.trainingInProgress !== currentTrainingPromise) {
        return 0;
      }

      // Get Q-values from both networks
      const currentQValues = this.qNetwork!.predict(statesTensor) as tf.Tensor;
      const nextQValues = this.targetNetwork!.predict(nextStatesTensor) as tf.Tensor;
      tensorsToDispose.push(currentQValues, nextQValues);

      // Extract arrays (this is async, but if network is disposed, it will throw)
      const currentQArray = await currentQValues.array() as number[][];
      const nextQArray = await nextQValues.array() as number[][];

      // Verify again after async operation
      if (!this.areNetworksValid() || this.trainingInProgress !== currentTrainingPromise) {
        return 0;
      }

      // Compute target Q-values
      const targets: number[][] = [];
      for (let i = 0; i < batchSize; i++) {
        const target = [...currentQArray[i]];
        const maxNextQ = Math.max(...nextQArray[i]);
        const targetQ = rewards[i] + (dones[i] ? 0 : this.config.gamma * maxNextQ);
        target[actions[i]] = targetQ;
        targets.push(target);
      }

      const targetsTensor = tf.tensor2d(targets);
      tensorsToDispose.push(targetsTensor);

      // Final check before training
      if (!this.areNetworksValid() || this.trainingInProgress !== currentTrainingPromise) {
        return 0;
      }

      // Train the network
      const history = await this.qNetwork!.fit(statesTensor, targetsTensor, {
        epochs: 1,
        verbose: 0,
        batchSize: batchSize,
      });

      // Extract loss value
      let loss: number = 0;
      if (Array.isArray(history.history.loss)) {
        loss = history.history.loss[0] as number;
      } else if (typeof history.history.loss === 'number') {
        loss = history.history.loss;
      } else if (history.history.loss && typeof history.history.loss === 'object' && 'dataSync' in history.history.loss) {
        const lossTensor = history.history.loss as tf.Tensor;
        loss = lossTensor.dataSync()[0];
        lossTensor.dispose();
      }

      // Update epsilon
      this.epsilon = Math.max(
        this.config.epsilonEnd,
        this.epsilon * this.config.epsilonDecay
      );

      // Update target network periodically
      this.stepCount++;
      if (this.stepCount % this.config.targetUpdateFrequency === 0) {
        this.updateTargetNetwork();
      }

      return loss;
    } catch (error: any) {
      // If network was disposed, silently return 0
      // Otherwise, log the error but don't throw (training errors shouldn't crash)
      if (!error?.message?.includes('disposed')) {
        console.error('Training error:', error);
      }
      return 0;
    } finally {
      // Always cleanup tensors
      tensorsToDispose.forEach(tensor => {
        try {
          tensor.dispose();
        } catch (e) {
          // Ignore disposal errors
        }
      });
    }
  }

  /**
   * Copy weights from Q-network to target network
   */
  private updateTargetNetwork(): void {
    if (!this.qNetwork || !this.targetNetwork) {
      return;
    }

    const weights = this.qNetwork.getWeights();
    this.targetNetwork.setWeights(weights);
  }

  /**
   * Get current epsilon (for logging)
   */
  getEpsilon(): number {
    return this.epsilon;
  }

  /**
   * Save model
   */
  async save(path: string): Promise<void> {
    if (typeof window === 'undefined') {
      throw new Error('Cannot save model: IndexedDB is only available in the browser (not during SSR)');
    }
    
    if (!this.qNetwork) {
      throw new Error('Network not initialized. Cannot save model.');
    }
    
    try {
      console.log('DQNAgent: Saving model to', path);
      await this.qNetwork.save(path);
      console.log('DQNAgent: Model saved successfully to', path);
      
      // Verify the model was actually saved
      const { modelExists } = await import('./rl-model-storage');
      const exists = await modelExists(path);
      
      if (!exists) {
        console.warn('DQNAgent: Warning - Model save completed but verification failed. The model may not be accessible.');
        console.warn('DQNAgent: This could be a timing issue. Try waiting a moment and checking again.');
      } else {
        console.log('DQNAgent: Model verification successful - model exists in IndexedDB');
      }
    } catch (error) {
      console.error('DQNAgent: Error saving model:', error);
      throw error;
    }
  }

  /**
   * Load model
   */
  async load(path: string): Promise<void> {
    if (typeof window === 'undefined') {
      throw new Error('Cannot load model: IndexedDB is only available in the browser (not during SSR)');
    }
    
    // Wait for any in-progress training to complete before loading new model
    if (this.trainingInProgress) {
      await this.trainingInProgress.catch(() => {
        // Ignore errors from previous training
      });
    }
    
    // Verify model exists before attempting to load
    const { modelExists, listAvailableModelPaths } = await import('./rl-model-storage');
    const exists = await modelExists(path);
    
    if (!exists) {
      // Get available models for better error message
      const availablePaths = await listAvailableModelPaths();
      const cleanPath = path.replace('indexeddb://', '');
      
      let errorMessage = `Cannot find model with path '${path}' in IndexedDB.\n`;
      errorMessage += `Looking for object store: '${cleanPath}'\n\n`;
      
      if (availablePaths.length > 0) {
        errorMessage += `Available models in IndexedDB:\n`;
        availablePaths.forEach(p => {
          errorMessage += `  - ${p}\n`;
        });
      } else {
        errorMessage += `No models found in IndexedDB. Make sure you've saved a model first.`;
      }
      
      throw new Error(errorMessage);
    }
    
    console.log('DQNAgent: Loading model from', path);
    
    try {
    const newQNetwork = await tf.loadLayersModel(path);
    const newTargetNetwork = this.createNetwork();
    
    // Dispose old networks only after new ones are loaded
    if (this.qNetwork) {
      this.qNetwork.dispose();
    }
    if (this.targetNetwork) {
      this.targetNetwork.dispose();
    }
    
    this.qNetwork = newQNetwork;
    this.targetNetwork = newTargetNetwork;
    this.updateTargetNetwork();
    console.log('DQNAgent: Model loaded successfully from', path);
    } catch (error) {
      console.error('DQNAgent: Error loading model:', error);
      throw new Error(`Failed to load model from ${path}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Dispose resources
   */
  dispose(): void {
    this.isDisposed = true;
    
    // Wait for any in-progress training to complete before disposing
    const disposeNetworks = () => {
      if (this.qNetwork) {
        this.qNetwork.dispose();
      }
      if (this.targetNetwork) {
        this.targetNetwork.dispose();
      }
    };

    if (this.trainingInProgress) {
      this.trainingInProgress
        .then(disposeNetworks)
        .catch(disposeNetworks); // Dispose even if training fails
    } else {
      disposeNetworks();
    }
  }
}
