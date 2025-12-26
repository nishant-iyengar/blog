/**
 * Experience Replay Buffer
 * 
 * Stores experiences for training the DQN agent.
 * Uses a circular buffer to maintain a fixed-size memory.
 */

import type { Experience } from './rl-dqn-model';

export class ReplayBuffer {
  private buffer: Experience[] = [];
  private maxSize: number;
  private currentIndex: number = 0;

  constructor(maxSize: number = 10000) {
    this.maxSize = maxSize;
  }

  /**
   * Add experience to buffer
   */
  add(experience: Experience): void {
    if (this.buffer.length < this.maxSize) {
      this.buffer.push(experience);
    } else {
      // Overwrite oldest experience (circular buffer)
      this.buffer[this.currentIndex] = experience;
      this.currentIndex = (this.currentIndex + 1) % this.maxSize;
    }
  }

  /**
   * Add multiple experiences
   */
  addBatch(experiences: Experience[]): void {
    for (const exp of experiences) {
      this.add(exp);
    }
  }

  /**
   * Sample a batch of experiences
   */
  sample(batchSize: number): Experience[] {
    if (this.buffer.length < batchSize) {
      // Return all experiences if buffer is smaller than batch size
      return [...this.buffer];
    }

    // Random sampling
    const indices: number[] = [];
    const sampled: Experience[] = [];

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
   * Get all experiences (for debugging)
   */
  getAll(): Experience[] {
    return [...this.buffer];
  }
}

