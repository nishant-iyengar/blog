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
    
    // Verify the model is valid and not disposed
    if (!this.areNetworksValid()) {
      throw new Error('Network has been disposed. Cannot save model.');
    }
    
    // Check if IndexedDB is available
    if (typeof indexedDB === 'undefined') {
      throw new Error('IndexedDB is not available in this browser. Cannot save model.');
    }
    
    try {
      console.log('DQNAgent: Saving model to', path);
      
      // Verify path format - TensorFlow.js expects 'indexeddb://model-name'
      // Common issue: extra slashes or special characters cause silent failures
      if (!path.startsWith('indexeddb://')) {
        throw new Error(`Invalid path format. Expected 'indexeddb://...', got: ${path}`);
      }
      
      const cleanPath = path.replace('indexeddb://', '');
      
      // Validate clean path - TensorFlow.js object store names have restrictions
      // They cannot contain certain characters and should be simple identifiers
      if (cleanPath.includes('/') || cleanPath.includes('\\') || cleanPath.includes(' ')) {
        throw new Error(`Invalid model name. Object store names cannot contain slashes or spaces. Got: ${cleanPath}`);
      }
      
      if (cleanPath.length === 0) {
        throw new Error('Invalid model name. Model name cannot be empty.');
      }
      
      console.log('DQNAgent: Clean path for TensorFlow.js:', cleanPath);
      console.log('DQNAgent: Full path:', path);
      
      // Check browser IndexedDB support and permissions
      if (typeof indexedDB === 'undefined') {
        throw new Error('IndexedDB is not available in this browser. Cannot save model.');
      }
      
      // Check if we're in a context where IndexedDB might be restricted
      // (e.g., Safari private browsing, iframe without permissions)
      try {
        const testDbName = '__tfjs_test_db__';
        const testRequest = indexedDB.open(testDbName);
        await new Promise<void>((resolve, reject) => {
          testRequest.onsuccess = () => {
            testRequest.result.close();
            indexedDB.deleteDatabase(testDbName);
            resolve();
          };
          testRequest.onerror = () => reject(new Error('IndexedDB open failed - may be restricted'));
          testRequest.onblocked = () => reject(new Error('IndexedDB is blocked - may need user interaction'));
        });
        console.log('DQNAgent: IndexedDB access test passed');
      } catch (testError) {
        const error = testError instanceof Error ? testError : new Error(String(testError));
        console.warn('DQNAgent: IndexedDB access test failed:', error.message);
        throw new Error(`IndexedDB access restricted: ${error.message}. This may be due to browser privacy settings, private browsing mode, or iframe permissions.`);
      }
      
      // Save the model - TensorFlow.js will create the object store automatically
      // Note: TensorFlow.js save() returns a ModelArtifactsInfo object with modelTopology and weightData
      let saveResult: any = null;
      
      // Before saving, check what databases exist
      console.log('DQNAgent: Checking IndexedDB databases before save...');
      if (indexedDB.databases) {
        const databases = await indexedDB.databases();
        console.log('DQNAgent: Existing IndexedDB databases:', databases.map(db => ({ name: db.name, version: db.version })));
      }
      
      try {
        console.log('DQNAgent: Calling model.save() with path:', path);
        console.log('DQNAgent: Model type:', this.qNetwork.constructor.name);
        console.log('DQNAgent: Model compiled:', !!this.qNetwork.optimizer);
        console.log('DQNAgent: Model has weights:', this.qNetwork.getWeights().length > 0);
        
        // Check model state before saving
        const weights = this.qNetwork.getWeights();
        console.log('DQNAgent: Model has', weights.length, 'weight layers');
        if (weights.length > 0) {
          const firstWeightShape = weights[0].shape;
          console.log('DQNAgent: First weight layer shape:', firstWeightShape);
        }
        
        // Try saving - TensorFlow.js should create the object store
        // Note: model.save() should work for LayersModel, but let's verify it's actually saving
        // CRITICAL: TensorFlow.js save() can fail silently if:
        // 1. Model isn't compiled (we check this above)
        // 2. Path format is wrong (we validate this above)
        // 3. IndexedDB permissions are restricted (browser issue)
        // 4. Model hasn't been trained (weights are still initial values)
        console.log('DQNAgent: About to call model.save()...');
        
        // Verify model is in a saveable state
        if (!this.qNetwork.optimizer) {
          throw new Error('Model is not compiled. Cannot save uncompiled model.');
        }
        
        // Check if model has been trained (weights updated from initial values)
        // TensorFlow.js may have issues saving models that haven't been trained
        // We check stepCount to see if training has occurred
        if (this.stepCount === 0) {
          console.warn('DQNAgent: WARNING - Model has not been trained yet (stepCount = 0). Saving anyway, but this may cause issues.');
        }
        
        // Try saving - wrap in additional error handling
        try {
          saveResult = await this.qNetwork.save(path);
        } catch (saveError) {
          // Re-throw with more context
          const error = saveError instanceof Error ? saveError : new Error(String(saveError));
          console.error('DQNAgent: TensorFlow.js save() threw an error:', error);
          console.error('DQNAgent: Error details:', {
            message: error.message,
            stack: error.stack,
            path: path,
            modelCompiled: !!this.qNetwork.optimizer,
          });
          throw new Error(`TensorFlow.js save() failed: ${error.message}`);
        }
        
        // Wait a brief moment for IndexedDB transaction to commit
        // IndexedDB operations are asynchronous and may need time to complete
        console.log('DQNAgent: Waiting for IndexedDB transaction to commit...');
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Check what databases exist after saving
        console.log('DQNAgent: Checking IndexedDB databases after save...');
        if (indexedDB.databases) {
          try {
            const databasesAfter = await indexedDB.databases();
            console.log('DQNAgent: IndexedDB databases after save:', databasesAfter.map(db => ({ name: db.name, version: db.version })));
            
            // Look for TensorFlow.js database
            const tfDb = databasesAfter.find(db => db.name === 'tensorflowjs_models' || (db.name && db.name.includes('tensorflow')));
            if (tfDb && tfDb.name) {
              console.log('DQNAgent: Found TensorFlow.js database:', tfDb.name);
              // Try to inspect the database
              const inspectRequest = indexedDB.open(tfDb.name);
              inspectRequest.onsuccess = () => {
                const db = inspectRequest.result;
                console.log('DQNAgent: TensorFlow.js database object stores:', Array.from(db.objectStoreNames));
                db.close();
              };
              inspectRequest.onerror = () => {
                console.warn('DQNAgent: Could not inspect TensorFlow.js database');
              };
            } else {
              console.warn('DQNAgent: WARNING - No TensorFlow.js database found after save!');
            }
          } catch (dbError) {
            console.warn('DQNAgent: Could not list databases:', dbError);
          }
        }
        
        // Check if TensorFlow.js can list the model
        // TensorFlow.js provides tf.io.listModels() to enumerate saved models
        console.log('DQNAgent: Checking if TensorFlow.js can list the saved model...');
        try {
          const savedModels = await tf.io.listModels();
          console.log('DQNAgent: TensorFlow.js reports', Object.keys(savedModels).length, 'saved models');
          const modelKeys = Object.keys(savedModels);
          console.log('DQNAgent: Saved model keys:', modelKeys);
          
          // Check if our model is in the list
          const cleanPath = path.replace('indexeddb://', '');
          const modelInList = modelKeys.some(key => key.includes(cleanPath) || key === path || key.endsWith(cleanPath));
          console.log('DQNAgent: Model in TensorFlow.js list?', modelInList);
          
          if (!modelInList) {
            console.warn('DQNAgent: WARNING - Model not found in TensorFlow.js list, but save() completed');
            console.warn('DQNAgent: Expected path:', path);
            console.warn('DQNAgent: Clean path:', cleanPath);
          }
        } catch (listError) {
          console.warn('DQNAgent: Could not list models (this is okay):', listError);
        }
        
        // Immediately try to load the model to verify it was saved
        // This is a common pattern to catch silent failures
        console.log('DQNAgent: Verifying save by attempting to load model...');
        try {
          const testLoad = await tf.loadLayersModel(path);
          console.log('DQNAgent: SUCCESS - Model can be loaded immediately after save!');
          // Dispose the test load - we don't need it
          testLoad.dispose();
        } catch (loadError) {
          const error = loadError instanceof Error ? loadError : new Error(String(loadError));
          console.error('DQNAgent: CRITICAL - Model save() completed but cannot be loaded!');
          console.error('DQNAgent: Load error:', error.message);
          console.error('DQNAgent: Load error stack:', error.stack);
          
          // Try to get more information about what TensorFlow.js sees
          try {
            const savedModels = await tf.io.listModels();
            console.error('DQNAgent: Available models according to TensorFlow.js:', Object.keys(savedModels));
          } catch (e) {
            console.error('DQNAgent: Could not list models:', e);
          }
          
          throw new Error(`Model save() completed but verification load failed: ${error.message}. This indicates the model was not actually saved to IndexedDB.`);
        }
        
        console.log('DQNAgent: Model save() returned:', saveResult);
        console.log('DQNAgent: Save result type:', typeof saveResult);
        if (saveResult) {
          console.log('DQNAgent: Save result keys:', Object.keys(saveResult));
          console.log('DQNAgent: Save result values:', JSON.stringify(saveResult, null, 2));
        } else {
          console.warn('DQNAgent: WARNING - save() returned null/undefined');
        }
        
        console.log('DQNAgent: Model save() call completed for', path);
        
        // After saving, check what databases exist now and debug what was created
        if (indexedDB.databases) {
          const databasesAfter = await indexedDB.databases();
          console.log('DQNAgent: IndexedDB databases after save:', databasesAfter.map(db => ({ name: db.name, version: db.version })));
          
          // Debug: List all databases and their object stores
          const { debugListAllIndexedDBDatabases } = await import('./rl-model-storage');
          await debugListAllIndexedDBDatabases();
        }
      } catch (saveErr) {
        const saveError = saveErr instanceof Error ? saveErr : new Error(String(saveErr));
        console.error('DQNAgent: Error during model.save():', saveError);
        console.error('DQNAgent: Error message:', saveError.message);
        console.error('DQNAgent: Error stack:', saveError.stack);
        throw saveError;
      }
      
      // Wait longer for IndexedDB to sync (TensorFlow.js might be async)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Verify the model was actually saved
      const { modelExists, listAvailableModelPaths } = await import('./rl-model-storage');
      
      // First, check what's actually in the database
      const availablePaths = await listAvailableModelPaths();
      console.log('DQNAgent: Available paths in TensorFlow.js IndexedDB:', availablePaths);
      console.log('DQNAgent: Looking for path:', cleanPath);
      
      // Try verification with retries (IndexedDB can be slow to sync)
      let exists = false;
      let retries = 0;
      while (!exists && retries < 5) {
        exists = await modelExists(path);
        if (!exists && retries < 4) {
          console.log(`DQNAgent: Verification attempt ${retries + 1}/5 failed, retrying...`);
          // Re-check available paths in case they changed
          const currentPaths = await listAvailableModelPaths();
          console.log('DQNAgent: Current available paths:', currentPaths);
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        retries++;
      }
      
      if (!exists) {
        // Final check of what's available
        const finalPaths = await listAvailableModelPaths();
        const errorMsg = `Model save() completed but weights were NOT saved to IndexedDB.\n` +
          `Expected path: ${path}\n` +
          `Clean path: ${cleanPath}\n` +
          `Available paths: ${finalPaths.join(', ') || 'none'}\n` +
          `This suggests TensorFlow.js save() failed silently or used a different path format.`;
        console.error('DQNAgent: CRITICAL ERROR:', errorMsg);
        throw new Error(errorMsg);
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
