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

  // More aggressive: only dodge if threat is truly imminent (very high threat level)
  // This encourages movement toward enemy even when under moderate threat
  const hasUrgentThreat = threats.length > 0 && threats[0].threatLevel > 0.85; // Increased from 0.6 to 0.85

  // Decision making: only dodge for truly urgent threats, otherwise always attack
  if (hasUrgentThreat) {
    return handleDodge(context, threats);
  }

  // Otherwise, pursue and attack aggressively
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

  // Even while dodging, try to shoot if possible (more aggressive)
  // But prioritize dodging movement
  return {
    angleDelta,
    moveDirection,
    shouldShoot: false, // Still don't shoot while dodging to focus on survival
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

  // Calculate movement decision - always aggressive
  let angleDelta = 0;
  let moveDirection = 0;

  // Always rotate toward enemy/shot angle (prioritize shooting over positioning)
  const targetAngle = shot.angle; // Always prioritize shooting angle

  let angleDiff = targetAngle - aiTank.angle;
  while (angleDiff > 180) angleDiff -= 360;
  while (angleDiff < -180) angleDiff += 360;

  if (Math.abs(angleDiff) > ROTATION_SPEED) {
    angleDelta = angleDiff > 0 ? ROTATION_SPEED : -ROTATION_SPEED;
  } else {
    angleDelta = angleDiff;
  }

  // Always move toward enemy (aggressive behavior - move forward whenever possible)
  // Calculate angle directly to enemy
  const enemyCenterX = enemyTank.x + 12;
  const enemyCenterY = enemyTank.y + 12;
  const aiCenterX = aiTank.x + 12;
  const aiCenterY = aiTank.y + 12;
  const moveAngle = (Math.atan2(
    enemyCenterY - aiCenterY,
    enemyCenterX - aiCenterX
  ) * 180) / Math.PI;

  const moveAngleDiff = moveAngle - aiTank.angle;
  const normalizedMoveDiff = ((moveAngleDiff + 180) % 360) - 180;

  // Always move forward toward enemy if facing roughly the right direction (wider tolerance)
  if (Math.abs(normalizedMoveDiff) < 60) { // Increased from 45 to 60 for more movement
    moveDirection = 1; // Forward
  } else if (Math.abs(normalizedMoveDiff) > 120) { // Increased from 135 to 120
    moveDirection = -1; // Backward (to quickly reorient)
  } else {
    // Even if not perfectly aligned, still move forward if somewhat close
    moveDirection = 1; // Always move forward aggressively
  }

  // Decide whether to shoot - more aggressive shooting
  let shouldShoot = false;
  let shootAngle: number | undefined;

  // Check if we have bullets available
  const bulletCount = bullets.filter((b) => b.owner === aiTank.color && !b.exploding).length;
  const canShoot = bulletCount < MAX_BULLETS_PER_TANK;

  // More aggressive shooting: lower confidence threshold, wider angle tolerance
  if (canShoot && shot.confidence > 0.2 - config.accuracyPenalty) { // Reduced from 0.3
    // Apply accuracy penalty
    const adjustedConfidence = shot.confidence * (1 - config.accuracyPenalty);
    
    // Shoot if confidence is reasonable and angle is somewhat close (wider tolerance)
    if (adjustedConfidence > 0.15 && Math.abs(angleDiff) < 45) { // Reduced confidence from 0.2 to 0.15, increased angle from 30 to 45
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


