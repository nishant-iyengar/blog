import type { Tank, Bullet, Barrier, Sun } from '@/app/games/tank-trouble/types';
import type { AIContext, AIDecision, AIConfig } from './types';
import { assessThreats, isPositionSafe, findEscapeDirection } from './threat-assessment';
import { calculateOptimalShotAngle } from './sun-calculations';
import { calculateOptimalPosition, findSafeDodgePosition } from './navigation';
import { predictTankPosition } from './prediction';
import { TANK_SPEED, ROTATION_SPEED, TANK_SIZE, BULLET_SPEED, MAX_BULLETS_PER_TANK, GAME_CONFIG } from '@/app/games/tank-trouble/config';
import { canMoveTo } from '@/app/games/tank-trouble/utils/collision';
import { rlModelManager } from './rl-model';
import { extractObservation } from './rl-observation';

/**
 * Main AI controller - decides what actions the AI tank should take
 * 
 * Supports both RL-based and rule-based decision making.
 * If an RL model is loaded, it will be used; otherwise falls back to rules.
 */
export function makeAIDecision(context: AIContext): AIDecision {
  const {
    aiTank,
    enemyTank,
    bullets,
    barriers,
    suns,
    mapWidth,
    mapHeight,
    tickTime,
    config,
  } = context;

  // Skip if tank is respawning or exploding
  if (aiTank.respawning || aiTank.exploding || aiTank.lives <= 0) {
    return {
      angleDelta: 0,
      moveDirection: 0,
      shouldShoot: false,
    };
  }

  // Try to use RL model if available
  if (rlModelManager.isRLActive()) {
    try {
      const model = rlModelManager.getModel();
      const observation = extractObservation(context);
      const decision = model.predict(observation, aiTank.angle);
      return decision;
    } catch (error) {
      console.warn('RL model prediction failed, falling back to rule-based:', error);
      // Fall through to rule-based AI
    }
  }

  // Fall back to rule-based AI
  return makeRuleBasedDecision(context);
}

/**
 * Rule-based decision making (original implementation)
 */
function makeRuleBasedDecision(context: AIContext): AIDecision {
  const {
    aiTank,
    enemyTank,
    bullets,
    barriers,
    suns,
    mapWidth,
    mapHeight,
    config,
  } = context;

  // Assess threats
  const threats = assessThreats(
    aiTank,
    bullets,
    suns,
    barriers,
    mapWidth,
    mapHeight,
    config.maxPredictionTime
  );

  const hasUrgentThreat = threats.length > 0 && threats[0].threatLevel > 0.6;

  // Decision making: prioritize dodging if immediate threat
  if (hasUrgentThreat) {
    return handleDodge(context, threats);
  }

  // Otherwise, pursue and attack
  return handleAttack(context);
}

/**
 * Handle dodging from threats
 */
function handleDodge(
  context: AIContext,
  threats: ReturnType<typeof assessThreats>
): AIDecision {
  const {
    aiTank,
    enemyTank,
    barriers,
    suns,
    mapWidth,
    mapHeight,
    config,
    bullets,
  } = context;

  // Find escape direction
  const escape = findEscapeDirection(
    aiTank,
    threats,
    barriers,
    suns,
    mapWidth,
    mapHeight
  );

  // Find safe position to dodge to
  const dodgePos = findSafeDodgePosition(
    aiTank,
    escape.angle,
    config.dodgeMargin * 2,
    barriers,
    suns,
    [aiTank, enemyTank],
    mapWidth,
    mapHeight,
    1 // AI is tank index 1
  );

  let angleDelta = 0;
  let moveDirection = 0;

  if (dodgePos) {
    // Calculate angle to dodge position
    const dx = dodgePos.x - (aiTank.x + TANK_SIZE / 2);
    const dy = dodgePos.y - (aiTank.y + TANK_SIZE / 2);
    const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

    // Calculate angle difference
    let angleDiff = targetAngle - aiTank.angle;
    // Normalize to -180 to 180
    while (angleDiff > 180) angleDiff -= 360;
    while (angleDiff < -180) angleDiff += 360;

    // Rotate toward target
    if (Math.abs(angleDiff) > ROTATION_SPEED) {
      angleDelta = angleDiff > 0 ? ROTATION_SPEED : -ROTATION_SPEED;
    } else {
      angleDelta = angleDiff;
    }

    // Move forward
    moveDirection = 1;
  } else {
    // Can't dodge to position, just rotate away from threat
    const dx = escape.angle - aiTank.angle;
    let angleDiff = dx;
    while (angleDiff > 180) angleDiff -= 360;
    while (angleDiff < -180) angleDiff += 360;

    if (Math.abs(angleDiff) > ROTATION_SPEED) {
      angleDelta = angleDiff > 0 ? ROTATION_SPEED : -ROTATION_SPEED;
    } else {
      angleDelta = angleDiff;
    }

    // Try to move backward
    moveDirection = -1;
  }

  // Don't shoot while dodging (too distracted)
  return {
    angleDelta,
    moveDirection,
    shouldShoot: false,
  };
}

/**
 * Handle attacking the enemy
 */
function handleAttack(context: AIContext): AIDecision {
  const {
    aiTank,
    enemyTank,
    bullets,
    barriers,
    suns,
    mapWidth,
    mapHeight,
    tickTime,
    config,
  } = context;

  // Predict enemy position
  const predictionTime = 500; // Predict 500ms ahead
  const predictedEnemyPos = predictTankPosition(enemyTank, predictionTime, TANK_SPEED);

  // Calculate optimal shot
  const shot = calculateOptimalShotAngle(
    aiTank,
    predictedEnemyPos,
    suns,
    barriers,
    mapWidth,
    mapHeight,
    config.sunSkill
  );

  // Calculate optimal position
  const optimalPos = calculateOptimalPosition(
    aiTank,
    enemyTank,
    config.aggressiveness,
    barriers,
    suns,
    mapWidth,
    mapHeight
  );

  // Calculate movement decision
  let angleDelta = 0;
  let moveDirection = 0;

  // Rotate toward optimal position or shot angle
  const targetAngle = config.aggressiveness > 0.7 
    ? shot.angle 
    : optimalPos.angle;

  let angleDiff = targetAngle - aiTank.angle;
  while (angleDiff > 180) angleDiff -= 360;
  while (angleDiff < -180) angleDiff += 360;

  if (Math.abs(angleDiff) > ROTATION_SPEED) {
    angleDelta = angleDiff > 0 ? ROTATION_SPEED : -ROTATION_SPEED;
  } else {
    angleDelta = angleDiff;
  }

  // Decide movement
  const distanceToOptimal = Math.sqrt(
    Math.pow(optimalPos.x - aiTank.x, 2) + Math.pow(optimalPos.y - aiTank.y, 2)
  );

  if (distanceToOptimal > 20) {
    // Need to move toward optimal position
    const moveAngle = (Math.atan2(
      optimalPos.y - aiTank.y,
      optimalPos.x - aiTank.x
    ) * 180) / Math.PI;

    const moveAngleDiff = moveAngle - aiTank.angle;
    const normalizedMoveDiff = ((moveAngleDiff + 180) % 360) - 180;

    // Move forward if facing roughly the right direction
    if (Math.abs(normalizedMoveDiff) < 45) {
      moveDirection = 1;
    } else if (Math.abs(normalizedMoveDiff) > 135) {
      moveDirection = -1;
    }
  }

  // Decide whether to shoot
  let shouldShoot = false;
  let shootAngle: number | undefined;

  // Check if we have bullets available
  const bulletCount = bullets.filter((b) => b.owner === aiTank.color && !b.exploding).length;
  const canShoot = bulletCount < MAX_BULLETS_PER_TANK;

  if (canShoot && shot.confidence > 0.3 - config.accuracyPenalty) {
    // Apply accuracy penalty
    const adjustedConfidence = shot.confidence * (1 - config.accuracyPenalty);
    
    // Shoot if confidence is high enough and angle is close
    if (adjustedConfidence > 0.2 && Math.abs(angleDiff) < 30) {
      shouldShoot = true;
      shootAngle = shot.angle;
    }
  }

  return {
    angleDelta,
    moveDirection,
    shouldShoot,
    shootAngle,
  };
}


