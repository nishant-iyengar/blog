/**
 * Action Space Definition
 * 
 * Defines the action space for the RL agent and converts between
 * RL actions and game decisions.
 */

import type { AIDecision } from './types';
import { ROTATION_SPEED } from '@/app/games/tank-trouble/config';
import { assertType } from '@/lib/type-guards';

/**
 * Discrete action space
 * 
 * Each action is a number representing a combination of movements.
 * This is easier to train than continuous actions.
 */
export enum DiscreteAction {
  NO_ACTION = 0,
  ROTATE_LEFT = 1,
  ROTATE_RIGHT = 2,
  MOVE_FORWARD = 3,
  MOVE_BACKWARD = 4,
  SHOOT = 5,
  ROTATE_LEFT_FORWARD = 6,
  ROTATE_RIGHT_FORWARD = 7,
  ROTATE_LEFT_SHOOT = 8,
  ROTATE_RIGHT_SHOOT = 9,
  MOVE_FORWARD_SHOOT = 10,
  MOVE_BACKWARD_SHOOT = 11,
  ROTATE_LEFT_BACKWARD = 12,
  ROTATE_RIGHT_BACKWARD = 13,
}

export const NUM_DISCRETE_ACTIONS = 14;

/**
 * Continuous action space
 * 
 * For more flexible control, use continuous actions.
 */
export interface ContinuousAction {
  angleDelta: number;      // -1 to 1 (normalized rotation)
  moveDirection: number;   // -1 to 1 (backward to forward)
  shouldShoot: number;     // 0 to 1 (probability to shoot)
}

/**
 * Convert discrete action to game decision
 */
export function actionToDecision(
  action: number | ContinuousAction,
  currentAngle: number
): AIDecision {
  // Handle continuous actions
  if (typeof action !== 'number') {
    return {
      angleDelta: action.angleDelta * ROTATION_SPEED,
      moveDirection: Math.round(action.moveDirection), // Clamp to -1, 0, 1
      shouldShoot: action.shouldShoot > 0.5,
    };
  }

  // Handle discrete actions
  // Type guard: ensure action is a valid DiscreteAction enum value
  const discreteAction = assertType(
    action,
    (val): val is DiscreteAction =>
      typeof val === 'number' && val >= 0 && val < NUM_DISCRETE_ACTIONS,
    `Invalid discrete action: ${action}`
  );
  
  let angleDelta = 0;
  let moveDirection = 0;
  let shouldShoot = false;

  switch (discreteAction) {
    case DiscreteAction.NO_ACTION:
      // Do nothing
      break;

    case DiscreteAction.ROTATE_LEFT:
      angleDelta = -ROTATION_SPEED;
      break;

    case DiscreteAction.ROTATE_RIGHT:
      angleDelta = ROTATION_SPEED;
      break;

    case DiscreteAction.MOVE_FORWARD:
      moveDirection = 1;
      break;

    case DiscreteAction.MOVE_BACKWARD:
      moveDirection = -1;
      break;

    case DiscreteAction.SHOOT:
      shouldShoot = true;
      break;

    case DiscreteAction.ROTATE_LEFT_FORWARD:
      angleDelta = -ROTATION_SPEED;
      moveDirection = 1;
      break;

    case DiscreteAction.ROTATE_RIGHT_FORWARD:
      angleDelta = ROTATION_SPEED;
      moveDirection = 1;
      break;

    case DiscreteAction.ROTATE_LEFT_SHOOT:
      angleDelta = -ROTATION_SPEED;
      shouldShoot = true;
      break;

    case DiscreteAction.ROTATE_RIGHT_SHOOT:
      angleDelta = ROTATION_SPEED;
      shouldShoot = true;
      break;

    case DiscreteAction.MOVE_FORWARD_SHOOT:
      moveDirection = 1;
      shouldShoot = true;
      break;

    case DiscreteAction.MOVE_BACKWARD_SHOOT:
      moveDirection = -1;
      shouldShoot = true;
      break;

    case DiscreteAction.ROTATE_LEFT_BACKWARD:
      angleDelta = -ROTATION_SPEED;
      moveDirection = -1;
      break;

    case DiscreteAction.ROTATE_RIGHT_BACKWARD:
      angleDelta = ROTATION_SPEED;
      moveDirection = -1;
      break;

    default:
      // Removed warning log
  }

  return {
    angleDelta,
    moveDirection,
    shouldShoot,
  };
}

/**
 * Convert decision to action (for logging/debugging)
 */
export type DecisionToAction = {
  type: 'discrete' | 'continuous';
  value: number | ContinuousAction;
};

export function decisionToAction(decision: AIDecision): DecisionToAction {
  // Convert decision back to action representation
  // This is approximate since multiple actions can map to same decision
  
  const hasRotation = Math.abs(decision.angleDelta) > 0.1;
  const hasMovement = decision.moveDirection !== 0;
  const hasShoot = decision.shouldShoot;

  if (!hasRotation && !hasMovement && !hasShoot) {
    return { type: 'discrete', value: DiscreteAction.NO_ACTION };
  }

  // Try to match to discrete action
  if (hasRotation && hasMovement && hasShoot) {
    // Complex combination - use continuous
    return {
      type: 'continuous',
      value: {
        angleDelta: decision.angleDelta / ROTATION_SPEED,
        moveDirection: decision.moveDirection,
        shouldShoot: hasShoot ? 1 : 0,
      },
    };
  }

  // Simple combinations
  if (hasRotation && decision.angleDelta < 0) {
    if (hasMovement && decision.moveDirection > 0) {
      return { type: 'discrete', value: DiscreteAction.ROTATE_LEFT_FORWARD };
    }
    if (hasShoot) {
      return { type: 'discrete', value: DiscreteAction.ROTATE_LEFT_SHOOT };
    }
    return { type: 'discrete', value: DiscreteAction.ROTATE_LEFT };
  }

  if (hasRotation && decision.angleDelta > 0) {
    if (hasMovement && decision.moveDirection > 0) {
      return { type: 'discrete', value: DiscreteAction.ROTATE_RIGHT_FORWARD };
    }
    if (hasShoot) {
      return { type: 'discrete', value: DiscreteAction.ROTATE_RIGHT_SHOOT };
    }
    return { type: 'discrete', value: DiscreteAction.ROTATE_RIGHT };
  }

  if (hasMovement && decision.moveDirection > 0) {
    if (hasShoot) {
      return { type: 'discrete', value: DiscreteAction.MOVE_FORWARD_SHOOT };
    }
    return { type: 'discrete', value: DiscreteAction.MOVE_FORWARD };
  }

  if (hasMovement && decision.moveDirection < 0) {
    if (hasShoot) {
      return { type: 'discrete', value: DiscreteAction.MOVE_BACKWARD_SHOOT };
    }
    return { type: 'discrete', value: DiscreteAction.MOVE_BACKWARD };
  }

  if (hasShoot) {
    return { type: 'discrete', value: DiscreteAction.SHOOT };
  }

  return { type: 'discrete', value: DiscreteAction.NO_ACTION };
}

