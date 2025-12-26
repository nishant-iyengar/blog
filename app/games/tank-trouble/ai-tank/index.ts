/**
 * AI Tank System - Main Entry Point
 * 
 * This module exports the main AI tank update function and configuration
 */

import type { Tank, Bullet, Barrier, Sun } from '@/app/games/tank-trouble/types';
import type { UpdateTankResult, UpdateTankParams } from '@/app/games/tank-trouble/utils/tank';
import type { AIConfig, AIContext, AIDecision } from './types';
import { makeAIDecision } from './controller';
import { DEFAULT_AI_CONFIG } from './config';
import { TANK_SPEED, ROTATION_SPEED, MAX_BULLETS_PER_TANK, GAME_CONFIG } from '@/app/games/tank-trouble/config';
import { canMoveTo } from '@/app/games/tank-trouble/utils/collision';
import { createBullet } from '@/app/games/tank-trouble/utils/bullet-creation';
import { clampTankPosition } from '@/app/games/tank-trouble/utils/tank-utils';
import { degToRad } from '@/app/games/tank-trouble/utils/math';
import { countBulletsByOwner } from '@/app/games/tank-trouble/utils/bullet-optimization';
import type { RLTrainingManager } from './rl-training-manager';

/**
 * Update AI tank - similar to updatePlayer1Tank/updatePlayer2Tank
 */
export function updateAITank(
  params: UpdateTankParams,
  aiConfig: AIConfig = DEFAULT_AI_CONFIG,
  trainingManager?: RLTrainingManager | null,
  gameId?: string
): UpdateTankResult & { decision?: AIDecision } {
  const {
    tank,
    tankIndex,
    tickTime,
    lastShotTime,
    bullets,
    mapWidth,
    mapHeight,
    barriers,
    suns,
    allTanks,
  } = params;

  // Find enemy tank (assumes AI is red/player 2, enemy is blue/player 1)
  // Defensive: ensure we have a valid enemy tank
  let enemyTank = allTanks.find((t) => t && t.color !== tank.color && t.lives > 0);
  if (!enemyTank) {
    // Fallback: try to find any tank that's not this one
    enemyTank = allTanks.find((t) => t && t !== tank);
  }
  // If still no enemy tank, use a dummy tank at center of map (shouldn't happen in normal gameplay)
  if (!enemyTank) {
    // Removed warning log
    enemyTank = {
      x: mapWidth / 2,
      y: mapHeight / 2,
      angle: 0,
      lives: 3,
      color: tank.color === 'blue' ? 'red' : 'blue',
    };
  }

  // Create AI context
  const context: AIContext = {
    aiTank: tank,
    enemyTank,
    bullets,
    barriers,
    suns,
    mapWidth,
    mapHeight,
    tickTime,
    config: aiConfig,
  };

  // Get AI decision
  const decision = makeAIDecision(context);

  // If training, collect step (async, don't wait)
  if (trainingManager && trainingManager.getIsTraining()) {
    trainingManager.step(context, decision, undefined, gameId).catch(() => {
      // Silently handle errors
    });
  }

  // Apply decision to tank
  let newAngle = tank.angle + decision.angleDelta;
  let newX = tank.x;
  let newY = tank.y;
  const newBullets: Bullet[] = [];
  let newLastShotTime = lastShotTime;

  // Handle movement
  if (decision.moveDirection !== 0) {
    const rad = degToRad(newAngle);
    const speed = decision.moveDirection > 0 ? TANK_SPEED : -TANK_SPEED * 0.7; // Backward is slower
    const dx = Math.cos(rad) * speed;
    const dy = Math.sin(rad) * speed;
    const testX = newX + dx;
    const testY = newY + dy;

    if (canMoveTo(testX, testY, mapWidth, mapHeight, barriers, allTanks, suns, tankIndex)) {
      newX = testX;
      newY = testY;
    }
  }

  // Handle shooting
  if (
    decision.shouldShoot &&
    tickTime - lastShotTime > GAME_CONFIG.game.shootingCooldown
  ) {
    const bulletCounts = countBulletsByOwner(bullets);
    const bulletCount = bulletCounts.get(tank.color) || 0;
    if (bulletCount < MAX_BULLETS_PER_TANK) {
      const shootAngle = decision.shootAngle ?? newAngle;
      const bullet = createBullet(
        { ...tank, x: newX, y: newY, angle: shootAngle },
        shootAngle,
        tickTime,
        tank.color
      );
      newBullets.push(bullet);
      newLastShotTime = tickTime;
    }
  }

  // Clamp position
  const clamped = clampTankPosition(newX, newY, mapWidth, mapHeight);
  newX = clamped.x;
  newY = clamped.y;

  return {
    updatedTank: { ...tank, x: newX, y: newY, angle: newAngle },
    newBullets,
    lastShotTime: newLastShotTime,
    decision, // Include decision for training
  };
}

// Export types and config for external use
export type { AIConfig, AIContext } from './types';
export { DEFAULT_AI_CONFIG, EASY_AI_CONFIG, HARD_AI_CONFIG } from './config';

// Export RL components
export { rlModelManager, type RLModel, type ModelInfo } from './rl-model';
export { TankTroubleRLEnv, type RLEnvironmentState } from './rl-environment';
export { extractObservation, getObservationSize, type Observation } from './rl-observation';
export { calculateReward, type RewardInfo } from './rl-reward';
export { actionToDecision, NUM_DISCRETE_ACTIONS, DiscreteAction, type ContinuousAction } from './rl-actions';
export { useTrainedModel } from './rl-training-example';


