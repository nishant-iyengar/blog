import type { Tank, Bullet, Barrier, Sun } from '@/app/games/tank-trouble/types';
import type { AIContext, AIDecision, AIConfig } from './types';
import { assessThreats, isPositionSafe, findEscapeDirection } from './threat-assessment';
import { calculateOptimalShotAngle } from './sun-calculations';
import { calculateOptimalPosition, findSafeDodgePosition } from './navigation';
import { predictTankPosition } from './prediction';
import { TANK_SPEED, ROTATION_SPEED, TANK_SIZE, MAX_BULLETS_PER_TANK } from '@/app/games/tank-trouble/config';
import { canMoveTo } from '@/app/games/tank-trouble/utils/collision';
import { rlModelManager } from './rl-model';
import { extractObservation } from './rl-observation';
import { URGENT_THREAT_THRESHOLD, ENEMY_PREDICTION_TIME_MS, MOVE_FORWARD_ANGLE_TOLERANCE, MOVE_BACKWARD_ANGLE_TOLERANCE } from '@/app/games/tank-trouble/constants/game-constants';
import { getTankCenter } from '@/app/games/tank-trouble/utils/tank-utils';
import { normalizeAngleDifference, angleToPoint } from '@/app/games/tank-trouble/utils/math';
import { countBulletsByOwner } from '@/app/games/tank-trouble/utils/bullet-optimization';

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
      // Removed warning log
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
  const hasUrgentThreat = threats.length > 0 && threats[0].threatLevel > URGENT_THREAT_THRESHOLD;

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
    const aiCenter = getTankCenter(aiTank);
    const targetAngle = angleToPoint(aiCenter, dodgePos);

    // Calculate angle difference
    let angleDiff = normalizeAngleDifference(targetAngle - aiTank.angle);

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
    let angleDiff = normalizeAngleDifference(escape.angle - aiTank.angle);

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
  const predictedEnemyPos = predictTankPosition(enemyTank, ENEMY_PREDICTION_TIME_MS, TANK_SPEED);

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

  let angleDiff = normalizeAngleDifference(targetAngle - aiTank.angle);

  if (Math.abs(angleDiff) > ROTATION_SPEED) {
    angleDelta = angleDiff > 0 ? ROTATION_SPEED : -ROTATION_SPEED;
  } else {
    angleDelta = angleDiff;
  }

  // Always move toward enemy (aggressive behavior - move forward whenever possible)
  // Calculate angle directly to enemy
  const aiCenter = getTankCenter(aiTank);
  const enemyCenter = getTankCenter(enemyTank);
  const moveAngle = angleToPoint(aiCenter, enemyCenter);

  const normalizedMoveDiff = normalizeAngleDifference(moveAngle - aiTank.angle);

  // Always move forward toward enemy if facing roughly the right direction (wider tolerance)
  if (Math.abs(normalizedMoveDiff) < MOVE_FORWARD_ANGLE_TOLERANCE) {
    moveDirection = 1; // Forward
  } else if (Math.abs(normalizedMoveDiff) > MOVE_BACKWARD_ANGLE_TOLERANCE) {
    moveDirection = -1; // Backward (to quickly reorient)
  } else {
    // Even if not perfectly aligned, still move forward if somewhat close
    moveDirection = 1; // Always move forward aggressively
  }

  // Decide whether to shoot - more aggressive shooting
  let shouldShoot = false;
  let shootAngle: number | undefined;

  // Check if we have bullets available (use optimized counting)
  const bulletCounts = countBulletsByOwner(bullets);
  const bulletCount = bulletCounts.get(aiTank.color) || 0;
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


