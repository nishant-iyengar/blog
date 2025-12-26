import type { Tank, Bullet, Barrier, Sun } from '@/app/games/tank-trouble/types';

/**
 * AI-specific types and interfaces
 */

export interface AIConfig {
  /** Reaction time delay in milliseconds (simulates human-like delay) */
  reactionDelay: number;
  /** Accuracy penalty (0-1, higher = less accurate) */
  accuracyPenalty: number;
  /** How aggressively AI pursues enemy (0-1) */
  aggressiveness: number;
  /** How well AI uses suns for advanced shots (0-1) */
  sunSkill: number;
  /** Maximum prediction time for bullet paths (ms) */
  maxPredictionTime: number;
  /** Safety margin when dodging bullets */
  dodgeMargin: number;
}

export interface Threat {
  bullet: Bullet;
  /** Time until collision (ms) */
  timeToCollision: number;
  /** Distance at closest approach */
  closestDistance: number;
  /** Predicted collision point */
  collisionPoint: { x: number; y: number };
  /** Threat level (0-1, higher = more dangerous) */
  threatLevel: number;
}

export interface PredictedBulletPath {
  points: Array<{ x: number; y: number; time: number }>;
  /** True if path hits a barrier or boundary */
  isBlocked: boolean;
  /** Time when path ends (collision or max time) */
  endTime: number;
}

export interface ShotOpportunity {
  /** Angle to shoot at (degrees) */
  angle: number;
  /** Confidence that shot will hit (0-1) */
  confidence: number;
  /** Time until hit (ms) */
  timeToHit: number;
  /** Whether shot uses sun gravity */
  usesSun: boolean;
}

export interface AIDecision {
  /** Desired angle change (degrees) */
  angleDelta: number;
  /** Movement direction: 1 = forward, -1 = backward, 0 = none */
  moveDirection: number;
  /** Whether to shoot */
  shouldShoot: boolean;
  /** Target angle for shooting (degrees) */
  shootAngle?: number;
}

export interface AIContext {
  aiTank: Tank;
  enemyTank: Tank;
  bullets: Bullet[];
  barriers: Barrier[];
  suns: Sun[];
  mapWidth: number;
  mapHeight: number;
  tickTime: number;
  config: AIConfig;
}


