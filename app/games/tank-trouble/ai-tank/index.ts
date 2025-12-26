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
import { TANK_SPEED, ROTATION_SPEED, TANK_SIZE, BULLET_SPEED, MAX_BULLETS_PER_TANK, GAME_CONFIG } from '@/app/games/tank-trouble/config';
import { canMoveTo } from '@/app/games/tank-trouble/utils/collision';
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
    console.warn('No valid enemy tank found, using dummy tank');
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

  // If training, collect experience (async, don't wait)
  if (trainingManager && trainingManager.getIsTraining()) {
    trainingManager.step(context, decision, undefined, gameId).catch(console.error);
  }

  // Apply decision to tank
  let newAngle = tank.angle + decision.angleDelta;
  let newX = tank.x;
  let newY = tank.y;
  const newBullets: Bullet[] = [];
  let newLastShotTime = lastShotTime;

  // Handle movement
  if (decision.moveDirection !== 0) {
    const rad = (newAngle * Math.PI) / 180;
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
    const bulletCount = bullets.filter((b) => b.owner === tank.color && !b.exploding).length;
    if (bulletCount < MAX_BULLETS_PER_TANK) {
      const shootAngle = decision.shootAngle ?? newAngle;
      const rad = (shootAngle * Math.PI) / 180;
      const bulletX =
        newX +
        TANK_SIZE / 2 +
        Math.cos(rad) * (TANK_SIZE / 2 + GAME_CONFIG.tank.spawnOffset);
      const bulletY =
        newY +
        TANK_SIZE / 2 +
        Math.sin(rad) * (TANK_SIZE / 2 + GAME_CONFIG.tank.spawnOffset);

      newBullets.push({
        x: bulletX,
        y: bulletY,
        angle: shootAngle,
        speed: BULLET_SPEED,
        owner: tank.color,
        createdAt: tickTime,
        vx: Math.cos(rad) * BULLET_SPEED,
        vy: Math.sin(rad) * BULLET_SPEED,
      });
      newLastShotTime = tickTime;
    }
  }

  // Clamp position
  const TANK_COLLISION_SIZE = GAME_CONFIG.tank.collisionSize;
  const collisionOffset = (TANK_SIZE - TANK_COLLISION_SIZE) / 2;
  newX = Math.max(-collisionOffset, Math.min(newX, mapWidth - TANK_SIZE + collisionOffset));
  newY = Math.max(-collisionOffset, Math.min(newY, mapHeight - TANK_SIZE + collisionOffset));

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


