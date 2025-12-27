/**
 * Action Conversion Utilities
 * 
 * Converts between keyboard input and discrete action numbers (0-13)
 * Matching the Go backend's action space
 * 
 * Action definitions are standardized in shared/config/game-config.json
 */

import type { AIDecision } from './types';
import { ROTATION_SPEED } from '@/app/games/tank-trouble/config';
import { NUM_DISCRETE_ACTIONS, type DiscreteAction, type ActionDefinition, ACTION_DEFINITIONS } from './rl-action-config';

export { NUM_DISCRETE_ACTIONS, type DiscreteAction, type ActionDefinition };

export type ContinuousAction = AIDecision;

/**
 * Convert keyboard input to discrete action number
 * 
 * Action definitions come from shared/config/game-config.json to ensure
 * consistency with Go backend. See ACTION_DEFINITIONS for the full list.
 * 
 * @param keys - Set of currently pressed keys (from useGameInput)
 * @param controls - Player control mappings (defaults to Player 1: Arrow keys + Space)
 * @returns Action number (0-13) matching ACTION_DEFINITIONS
 */
export function keysToAction(
  keys: Set<string>,
  controls: {
    rotateLeft: string;
    rotateRight: string;
    moveForward: string;
    moveBackward: string;
    shoot: string;
  } = {
    rotateLeft: 'arrowleft',
    rotateRight: 'arrowright',
    moveForward: 'arrowup',
    moveBackward: 'arrowdown',
    shoot: ' ',
  }
): number {
  const rotateLeft = keys.has(controls.rotateLeft);
  const rotateRight = keys.has(controls.rotateRight);
  const moveForward = keys.has(controls.moveForward);
  const moveBackward = keys.has(controls.moveBackward);
  const shoot = keys.has(controls.shoot);

  // Check for shooting actions first (they take priority)
  if (shoot) {
    if (moveForward) {
      return 10; // MOVE_FORWARD_SHOOT
    } else if (moveBackward) {
      return 11; // MOVE_BACKWARD_SHOOT
    } else if (rotateLeft) {
      return 8; // ROTATE_LEFT_SHOOT
    } else if (rotateRight) {
      return 9; // ROTATE_RIGHT_SHOOT
    }
    return 5; // SHOOT
  }

  // Movement actions
  if (moveForward) {
    if (rotateLeft) {
      return 6; // ROTATE_LEFT_FORWARD
    } else if (rotateRight) {
      return 7; // ROTATE_RIGHT_FORWARD
    }
    return 3; // MOVE_FORWARD
  } else if (moveBackward) {
    if (rotateLeft) {
      return 12; // ROTATE_LEFT_BACKWARD
    } else if (rotateRight) {
      return 13; // ROTATE_RIGHT_BACKWARD
    }
    return 4; // MOVE_BACKWARD
  }

  // Rotation-only actions
  if (rotateLeft) {
    return 1; // ROTATE_LEFT
  } else if (rotateRight) {
    return 2; // ROTATE_RIGHT
  }

  return 0; // NO_ACTION
}

/**
 * Convert discrete action number to AIDecision
 * This is the reverse of keysToAction - converts action (0-13) to game decision
 * 
 * @param action - Discrete action number (0-13)
 * @param currentAngle - Current tank angle in degrees (not used, but matches Go signature)
 * @returns AIDecision object with angleDelta, moveDirection, and shouldShoot
 */
export function actionToDecision(action: number, currentAngle: number): AIDecision {
  const decision: AIDecision = {
    angleDelta: 0,
    moveDirection: 0,
    shouldShoot: false,
  };

  switch (action) {
    case 0: // NO_ACTION
      // Do nothing
      break;
    case 1: // ROTATE_LEFT
      decision.angleDelta = -ROTATION_SPEED;
      break;
    case 2: // ROTATE_RIGHT
      decision.angleDelta = ROTATION_SPEED;
      break;
    case 3: // MOVE_FORWARD
      decision.moveDirection = 1;
      break;
    case 4: // MOVE_BACKWARD
      decision.moveDirection = -1;
      break;
    case 5: // SHOOT
      decision.shouldShoot = true;
      break;
    case 6: // ROTATE_LEFT_FORWARD
      decision.angleDelta = -ROTATION_SPEED;
      decision.moveDirection = 1;
      break;
    case 7: // ROTATE_RIGHT_FORWARD
      decision.angleDelta = ROTATION_SPEED;
      decision.moveDirection = 1;
      break;
    case 8: // ROTATE_LEFT_SHOOT
      decision.angleDelta = -ROTATION_SPEED;
      decision.shouldShoot = true;
      break;
    case 9: // ROTATE_RIGHT_SHOOT
      decision.angleDelta = ROTATION_SPEED;
      decision.shouldShoot = true;
      break;
    case 10: // MOVE_FORWARD_SHOOT
      decision.moveDirection = 1;
      decision.shouldShoot = true;
      break;
    case 11: // MOVE_BACKWARD_SHOOT
      decision.moveDirection = -1;
      decision.shouldShoot = true;
      break;
    case 12: // ROTATE_LEFT_BACKWARD
      decision.angleDelta = -ROTATION_SPEED;
      decision.moveDirection = -1;
      break;
    case 13: // ROTATE_RIGHT_BACKWARD
      decision.angleDelta = ROTATION_SPEED;
      decision.moveDirection = -1;
      break;
    default:
      // Unknown action, do nothing
      break;
  }

  return decision;
}

/**
 * Convert AIDecision to discrete action number
 * This is the reverse of actionToDecision
 * 
 * @param decision - AIDecision object
 * @returns Discrete action number (0-13)
 */
export function decisionToAction(decision: AIDecision): number {
  // Check for shooting actions first (they take priority)
  if (decision.shouldShoot) {
    if (decision.moveDirection > 0) {
      return 10; // MOVE_FORWARD_SHOOT
    } else if (decision.moveDirection < 0) {
      return 11; // MOVE_BACKWARD_SHOOT
    } else if (decision.angleDelta < 0) {
      return 8; // ROTATE_LEFT_SHOOT
    } else if (decision.angleDelta > 0) {
      return 9; // ROTATE_RIGHT_SHOOT
    }
    return 5; // SHOOT
  }

  // Movement actions
  if (decision.moveDirection > 0) {
    if (decision.angleDelta < 0) {
      return 6; // ROTATE_LEFT_FORWARD
    } else if (decision.angleDelta > 0) {
      return 7; // ROTATE_RIGHT_FORWARD
    }
    return 3; // MOVE_FORWARD
  } else if (decision.moveDirection < 0) {
    if (decision.angleDelta < 0) {
      return 12; // ROTATE_LEFT_BACKWARD
    } else if (decision.angleDelta > 0) {
      return 13; // ROTATE_RIGHT_BACKWARD
    }
    return 4; // MOVE_BACKWARD
  }

  // Rotation-only actions
  if (decision.angleDelta < 0) {
    return 1; // ROTATE_LEFT
  } else if (decision.angleDelta > 0) {
    return 2; // ROTATE_RIGHT
  }

  return 0; // NO_ACTION
}

// Type alias for DecisionToAction (used in rl-environment.ts)
export type DecisionToAction = typeof decisionToAction;
