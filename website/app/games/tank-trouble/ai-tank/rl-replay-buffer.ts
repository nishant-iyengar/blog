/**
 * Step Replay Buffer
 * 
 * Stores steps for training the DQN agent.
 * Uses a circular buffer to maintain a fixed-size memory.
 */

import type { Step } from './rl-dqn-model';

export class ReplayBuffer {
  private buffer: Step[] = [];
  private maxSize: number;
  private currentIndex: number = 0;

  constructor(maxSize: number = 10000) {
    this.maxSize = maxSize;
  }

  /**
   * Add step to buffer
   */
  add(step: Step): void {
    if (this.buffer.length < this.maxSize) {
      this.buffer.push(step);
    } else {
      // Overwrite oldest step (circular buffer)
      this.buffer[this.currentIndex] = step;
      this.currentIndex = (this.currentIndex + 1) % this.maxSize;
    }
  }

  /**
   * Add multiple steps
   */
  addBatch(steps: Step[]): void {
    for (const step of steps) {
      this.add(step);
    }
  }

  /**
   * Sample a batch of steps
   */
  sample(batchSize: number): Step[] {
    if (this.buffer.length < batchSize) {
      // Return all steps if buffer is smaller than batch size
      return [...this.buffer];
    }

    // Random sampling
    const indices: number[] = [];
    const sampled: Step[] = [];

    while (indices.length < batchSize) {
      const index = Math.floor(Math.random() * this.buffer.length);
      if (!indices.includes(index)) {
        indices.push(index);
        sampled.push(this.buffer[index]);
      }
    }

    return sampled;
  }

  /**
   * Get current buffer size
   */
  size(): number {
    return this.buffer.length;
  }

  /**
   * Check if buffer has enough samples for training
   */
  canSample(batchSize: number): boolean {
    return this.buffer.length >= batchSize;
  }

  /**
   * Clear buffer
   */
  clear(): void {
    this.buffer = [];
    this.currentIndex = 0;
  }

  /**
   * Get all steps (for debugging)
   */
  getAll(): Step[] {
    return [...this.buffer];
  }
}

