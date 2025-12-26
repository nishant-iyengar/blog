/**
 * RL Model Interface
 * 
 * Defines the interface for RL models and provides a way to load/use
 * trained models. Supports both TensorFlow.js models and custom implementations.
 */

import type { Observation } from './rl-observation';
import type { AIDecision } from './types';
import { actionToDecision } from './rl-actions';
import { NUM_DISCRETE_ACTIONS } from './rl-actions';

/**
 * RL Model interface
 * 
 * Any RL model implementation should implement this interface.
 */
export interface RLModel {
  /**
   * Check if model is loaded and ready
   */
  isLoaded(): boolean;

  /**
   * Load model from URL or path
   */
  load(path: string): Promise<void>;

  /**
   * Predict action from observation
   * 
   * @param observation - Current game observation
   * @param currentAngle - Current tank angle (for action conversion)
   * @returns Decision for the tank
   */
  predict(observation: Observation, currentAngle: number): AIDecision;

  /**
   * Get model info
   */
  getInfo(): ModelInfo;
}

export interface ModelInfo {
  name: string;
  type: 'discrete' | 'continuous';
  observationSize: number;
  actionSize: number;
  version?: string;
}

/**
 * Simple rule-based model (for testing/fallback)
 * 
 * This can be used as a baseline or fallback when RL model isn't available.
 */
export class RuleBasedRLModel implements RLModel {
  private loaded = true;

  isLoaded(): boolean {
    return this.loaded;
  }

  async load(_path: string): Promise<void> {
    this.loaded = true;
  }

  predict(observation: Observation, currentAngle: number): AIDecision {
    // Simple rule-based decision based on observation
    // This is just a placeholder - in practice, you'd use a trained model
    
    // Extract some key features
    const enemyX = observation.vector[4];
    const enemyY = observation.vector[5];
    const angleToEnemy = observation.vector[11]; // Normalized angle difference
    
    // Simple strategy: rotate toward enemy and shoot
    let angleDelta = 0;
    let moveDirection = 0;
    let shouldShoot = false;

    // Rotate toward enemy
    if (Math.abs(angleToEnemy) > 0.1) {
      angleDelta = angleToEnemy > 0 ? 5 : -5;
    }

    // Move forward if roughly facing enemy
    if (Math.abs(angleToEnemy) < 0.2) {
      moveDirection = 1;
      shouldShoot = true;
    }

    return {
      angleDelta,
      moveDirection,
      shouldShoot,
    };
  }

  getInfo(): ModelInfo {
    return {
      name: 'Rule-Based Fallback',
      type: 'discrete',
      observationSize: 142, // From rl-observation.ts
      actionSize: NUM_DISCRETE_ACTIONS,
    };
  }
}

/**
 * TensorFlow.js model wrapper
 * 
 * This is a placeholder for when you implement TensorFlow.js integration.
 * To use this, you'll need to:
 * 1. Install @tensorflow/tfjs
 * 2. Train a model (Python or TypeScript)
 * 3. Export it in a format TensorFlow.js can load
 * 4. Implement the predict method
 */
export class TensorFlowJSModel implements RLModel {
  private loaded = false;
  private model: any = null; // tf.LayersModel when implemented
  private info: ModelInfo;

  constructor(info: ModelInfo) {
    this.info = info;
  }

  isLoaded(): boolean {
    return this.loaded && this.model !== null;
  }

  async load(path: string): Promise<void> {
    try {
      // TODO: Implement TensorFlow.js model loading
      // Example:
      // const tf = await import('@tensorflow/tfjs');
      // this.model = await tf.loadLayersModel(path);
      // this.loaded = true;
      
      console.warn('TensorFlow.js model loading not yet implemented');
      console.warn('To implement: install @tensorflow/tfjs and load your trained model');
      this.loaded = false;
    } catch (error) {
      console.error('Failed to load RL model:', error);
      this.loaded = false;
      throw error;
    }
  }

  predict(observation: Observation, currentAngle: number): AIDecision {
    if (!this.isLoaded()) {
      throw new Error('Model not loaded');
    }

    // TODO: Implement TensorFlow.js prediction
    // Example:
    // const tf = await import('@tensorflow/tfjs');
    // const input = tf.tensor2d([observation.vector]);
    // const output = this.model.predict(input) as tf.Tensor;
    // const action = await output.data();
    // return actionToDecision(action[0], currentAngle);

    throw new Error('TensorFlow.js prediction not yet implemented');
  }

  getInfo(): ModelInfo {
    return this.info;
  }
}

/**
 * Model manager
 * 
 * Manages the current RL model and provides a unified interface.
 */
export class RLModelManager {
  private model: RLModel | null = null;
  private fallbackModel: RLModel;

  constructor() {
    this.fallbackModel = new RuleBasedRLModel();
  }

  /**
   * Set the active model
   */
  setModel(model: RLModel): void {
    this.model = model;
  }

  /**
   * Get the active model (or fallback)
   */
  getModel(): RLModel {
    return this.model && this.model.isLoaded() ? this.model : this.fallbackModel;
  }

  /**
   * Check if RL model is active
   */
  isRLActive(): boolean {
    return this.model !== null && this.model.isLoaded();
  }

  /**
   * Load model from path
   */
  async loadModel(path: string): Promise<void> {
    if (!this.model) {
      throw new Error('No model set. Call setModel() first.');
    }
    await this.model.load(path);
  }
}

// Global model manager instance
export const rlModelManager = new RLModelManager();

