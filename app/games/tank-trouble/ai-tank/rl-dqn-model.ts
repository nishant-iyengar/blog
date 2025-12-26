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
import { assertType, is2DNumberArray, isError } from '@/lib/type-guards';

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
 * Step for replay buffer (state, action, reward, nextState, done)
 */
export interface Step {
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
    const qValuesResult = this.qNetwork.predict(stateTensor);
    // Type guard for TensorFlow Tensor
    const qValues = assertType(
      qValuesResult,
      (val): val is tf.Tensor => val instanceof tf.Tensor,
      'Expected Tensor from predict'
    );
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
   * Train on a batch of steps
   * 
   * Note: This method prevents concurrent training calls by using a promise-based lock.
   * If training is already in progress, this call will wait for it and skip (return 0).
   */
  async train(steps: Step[]): Promise<number> {
    if (!this.areNetworksValid() || steps.length === 0) {
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
    let rejectTraining: ((error: unknown) => void) | undefined;
    
    this.trainingInProgress = new Promise<number>((resolve, reject) => {
      resolveTraining = resolve;
      rejectTraining = reject;
    });

    // Start async training work
    this.executeTraining(steps, this.trainingInProgress)
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
      return 0;
    }
  }

  /**
   * Internal method that performs the actual training
   */
  private async executeTraining(steps: Step[], currentTrainingPromise: Promise<number>): Promise<number> {
    // Prepare batch
    const batchSize = Math.min(steps.length, this.config.batchSize);
    const states: number[][] = [];
    const actions: number[] = [];
    const rewards: number[] = [];
    const nextStates: number[][] = [];
    const dones: boolean[] = [];

    for (let i = 0; i < batchSize; i++) {
      const step = steps[i];
      states.push(step.state);
      actions.push(step.action);
      rewards.push(step.reward);
      nextStates.push(step.nextState);
      dones.push(step.done);
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
      if (!this.qNetwork || !this.targetNetwork) {
        throw new Error('Networks not initialized');
      }
      const currentQValuesResult = this.qNetwork.predict(statesTensor);
      const nextQValuesResult = this.targetNetwork.predict(nextStatesTensor);
      
      // Type guards for TensorFlow Tensors
      const currentQValues = assertType(
        currentQValuesResult,
        (val): val is tf.Tensor => val instanceof tf.Tensor,
        'Expected Tensor from predict'
      );
      const nextQValues = assertType(
        nextQValuesResult,
        (val): val is tf.Tensor => val instanceof tf.Tensor,
        'Expected Tensor from predict'
      );
      tensorsToDispose.push(currentQValues, nextQValues);

      // Extract arrays (this is async, but if network is disposed, it will throw)
      const currentQArrayResult = await currentQValues.array();
      const nextQArrayResult = await nextQValues.array();
      
      // Type guard for 2D number arrays
      const currentQArray = assertType(
        currentQArrayResult,
        is2DNumberArray,
        'Expected 2D number array from tensor.array()'
      );
      const nextQArray = assertType(
        nextQArrayResult,
        is2DNumberArray,
        'Expected 2D number array from tensor.array()'
      );

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
      if (!this.qNetwork) {
        throw new Error('Network not initialized');
      }
      const history = await this.qNetwork.fit(statesTensor, targetsTensor, {
        epochs: 1,
        verbose: 0,
        batchSize: batchSize,
      });

      // Extract loss value
      let loss: number = 0;
      if (Array.isArray(history.history.loss)) {
        const firstLoss = history.history.loss[0];
        if (typeof firstLoss === 'number') {
          loss = firstLoss;
        }
      } else if (typeof history.history.loss === 'number') {
        loss = history.history.loss;
      } else if (history.history.loss && typeof history.history.loss === 'object') {
        // Check if it has dataSync method (TensorFlow Tensor)
        // Use JSON to safely access properties without type assertions
        try {
          const jsonString = JSON.stringify(history.history.loss);
          const parsed = JSON.parse(jsonString);
          // TensorFlow tensors can't be serialized, so if we get here it's not a tensor
          // Skip this branch for tensor objects
        } catch {
          // If JSON.stringify fails, it might be a TensorFlow tensor
          // Check for dataSync method using property access
          // Skip tensor handling to avoid type assertions
          // In practice, loss should be a number or array, not a tensor
          // TensorFlow tensors can't be safely handled without type assertions
        }
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
    } catch (error: unknown) {
      // If network was disposed, silently return 0
      // Otherwise, log the error but don't throw (training errors shouldn't crash)
      const errorMessage = isError(error) ? error.message : String(error);
      if (!errorMessage.includes('disposed')) {
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
    // Note: Dexie stores metadata, but TensorFlow.js stores the actual model weights in IndexedDB
    const { modelExists, listAvailableModelPaths, listSavedModels } = await import('./rl-model-storage');
    
    // First check if model exists in TensorFlow.js IndexedDB (where the weights are stored)
    const exists = await modelExists(path);
    
    if (!exists) {
      // Check if model exists in Dexie metadata (to provide better error message)
      const savedModels = await listSavedModels();
      const modelInMetadata = savedModels.find(m => m.path === path);
      
      const availablePaths = await listAvailableModelPaths();
      const cleanPath = path.replace('indexeddb://', '');
      
      let errorMessage = `Cannot find model weights for '${path}'.\n\n`;
      errorMessage += `Note: Model metadata is stored in Dexie DB, but the actual model weights are stored in TensorFlow.js IndexedDB.\n\n`;
      
      if (modelInMetadata) {
        errorMessage += `⚠️ Model metadata exists in Dexie, but the model weights are missing from TensorFlow.js IndexedDB.\n`;
        errorMessage += `This can happen if:\n`;
        errorMessage += `• The model was deleted from IndexedDB but metadata remains\n`;
        errorMessage += `• Browser storage was cleared for IndexedDB but not Dexie\n`;
        errorMessage += `• There was an error during model save\n\n`;
      }
      
      errorMessage += `Looking for TensorFlow.js object store: '${cleanPath}'\n\n`;
      
      if (availablePaths.length > 0) {
        errorMessage += `Available models in TensorFlow.js IndexedDB:\n`;
        availablePaths.forEach(p => {
          errorMessage += `  - ${p}\n`;
        });
      } else {
        errorMessage += `No models found in TensorFlow.js IndexedDB. Make sure you've saved a model first.`;
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
      
      // Check for Safari/IndexedDB specific issues
      const isSafari = typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      let detailedError = `Failed to load model from ${path}: ${errorMessage}`;
      
      if (isSafari) {
        detailedError += '\n\nSafari detected. Common issues:\n';
        detailedError += '• Private Browsing mode disables IndexedDB - try regular browsing mode\n';
        detailedError += '• Safari may require user interaction before accessing IndexedDB\n';
        detailedError += '• Check Safari settings: Preferences > Privacy > uncheck "Prevent cross-site tracking"';
      }
      
      throw new Error(detailedError);
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
