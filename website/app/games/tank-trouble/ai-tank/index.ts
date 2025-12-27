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
 * 
 * Made async to support async AI decision making (TensorFlow.js predictions)
 */
export async function updateAITank(
  params: UpdateTankParams,
  aiConfig: AIConfig = DEFAULT_AI_CONFIG,
  trainingManager?: RLTrainingManager | null,
  gameId?: string
): Promise<UpdateTankResult & { decision?: AIDecision }> {
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

  // Find enemy tank - optimized O(1) lookup instead of O(n) find
  // Tanks array is always [blue, red], so use index directly
  let enemyTank: Tank | undefined;
  if (allTanks.length >= 2 && tankIndex !== undefined) {
    // Direct index lookup: enemy is the other tank
    const enemyIndex = tankIndex === 0 ? 1 : 0;
    enemyTank = allTanks[enemyIndex];
    
    // Validate enemy tank exists and has lives
    if (!enemyTank || enemyTank.lives <= 0) {
      // Fallback: try the other index if current enemy is invalid
      const fallbackIndex = enemyIndex === 0 ? 1 : 0;
      enemyTank = allTanks[fallbackIndex] || enemyTank;
    }
  } else {
    // Fallback to find if array structure is unexpected (defensive)
    enemyTank = allTanks.find((t) => t && t.color !== tank.color && t.lives > 0) ||
                allTanks.find((t) => t && t !== tank);
  }
  
  // If still no enemy tank, use a dummy tank at center of map (shouldn't happen in normal gameplay)
  if (!enemyTank) {
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

  // Get AI decision (async)
  const decision = await makeAIDecision(context);

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
export { actionToDecision, NUM_DISCRETE_ACTIONS, decisionToAction } from './rl-actions';
export { ACTION_DEFINITIONS, ACTION_BY_ID, ACTION_BY_NAME } from './rl-action-config';
export type { DiscreteAction, ContinuousAction, DecisionToAction, ActionDefinition } from './rl-actions';
export { useTrainedModel } from './rl-training-example';


