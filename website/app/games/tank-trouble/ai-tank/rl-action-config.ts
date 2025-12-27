/**
 * Action Configuration - Shared with Go backend
 * 
 * This file reads from the shared game-config.json to ensure
 * action definitions stay in sync between Go and TypeScript
 */

import gameConfig from '@/shared/config/game-config.json';

// Get NUM_DISCRETE_ACTIONS from shared config
export const NUM_DISCRETE_ACTIONS = gameConfig.rl.action.numDiscreteActions;

// Action definitions from shared config
export type ActionDefinition = {
  id: number;
  name: string;
  description: string;
};

export const ACTION_DEFINITIONS: ActionDefinition[] = gameConfig.rl.action.actions;

// Create a map for quick lookup
export const ACTION_BY_ID = new Map<number, ActionDefinition>(
  ACTION_DEFINITIONS.map(action => [action.id, action])
);

export const ACTION_BY_NAME = new Map<string, ActionDefinition>(
  ACTION_DEFINITIONS.map(action => [action.name, action])
);

// Action type (0-13)
export type DiscreteAction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

// Validate that actions are properly defined
if (ACTION_DEFINITIONS.length !== NUM_DISCRETE_ACTIONS) {
  console.warn(
    `Warning: Action definitions count (${ACTION_DEFINITIONS.length}) doesn't match ` +
    `NUM_DISCRETE_ACTIONS (${NUM_DISCRETE_ACTIONS}) in config`
  );
}

// Validate action IDs are sequential 0..N-1
for (let i = 0; i < ACTION_DEFINITIONS.length; i++) {
  if (ACTION_DEFINITIONS[i].id !== i) {
    console.warn(
      `Warning: Action at index ${i} has ID ${ACTION_DEFINITIONS[i].id}, expected ${i}`
    );
  }
}

