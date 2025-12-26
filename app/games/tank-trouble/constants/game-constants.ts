/**
 * Game Constants
 * 
 * Central location for all magic numbers and configuration values
 * used throughout the game logic.
 */

// Spawn Constants
export const SPAWN_PADDING = 8; // Minimum distance from edges
export const MAX_SPAWN_ATTEMPTS = 100;
export const MIN_SPAWN_DISTANCE = 50; // Minimum distance between spawns

// Bullet Constants
export const BULLET_MIN_VELOCITY = 0.5;

// Collision Constants
export const COLLISION_EPSILON = 0.001; // Floating point precision tolerance

// AI Controller Constants
export const URGENT_THREAT_THRESHOLD = 0.85; // Threat level to trigger dodge
export const ENEMY_PREDICTION_TIME_MS = 500; // Time to predict enemy position ahead
export const MOVE_FORWARD_ANGLE_TOLERANCE = 60; // Degrees tolerance for forward movement
export const MOVE_BACKWARD_ANGLE_TOLERANCE = 120; // Degrees tolerance for backward movement

// Navigation Constants
export const MIN_DISTANCE_TO_ENEMY = 50; // Minimum ideal distance to enemy
export const TOO_CLOSE_DISTANCE = 30; // Distance considered too close
export const DISTANCE_REDUCTION_FACTOR = 0.8; // Factor for reducing distance to enemy
export const PATH_CHECK_STEPS = 20; // Steps for path clearance checking

// Threat Assessment Constants
export const COLLISION_SIZE_BUFFER = 5; // Buffer pixels for collision detection
export const HIGH_THREAT_DISTANCE_MULTIPLIER = 3; // Multiplier for high threat distance

// RL Reward Constants
export const TIMEOUT_PENALTY = -50;
export const SURVIVAL_REWARD_PER_TICK = 0.01;
export const HIT_ENEMY_REWARD = 100;
export const GOT_HIT_PENALTY = -100;
export const OPTIMAL_DISTANCE_TO_ENEMY = 120; // Optimal distance for engagement
export const INACTIVITY_THRESHOLD_MS = 1500; // Time before inactivity penalty
export const SIGNIFICANT_MOVEMENT_THRESHOLD = 5; // Pixels - minimum movement to count
export const AGGRESSION_CHECK_INTERVAL_MS = 2000; // Time window for aggression check
export const DODGE_REWARD_PER_BULLET = 10;

// Canvas Rendering Constants
export const CANVAS_SCALE_FACTOR = 2; // Internal resolution multiplier
export const GRAVITY_ARROW_GRID_SPACING = 30;
export const GRAVITY_ARROW_LENGTH = 8;
export const GRAVITY_ARROW_HEAD_SIZE = 3;
export const BULLET_DRAW_LENGTH = 6;
export const BULLET_DRAW_WIDTH = 3;
export const BULLET_DRAW_RADIUS = 1;
export const UI_TEXT_SPACING = 12; // Vertical spacing between UI text lines

// Training View Constants
export const AI_VS_AI_SPEED_MULTIPLIER = 1;
export const MAX_GAMES = 4;
export const GAME_DISPLAY_SCALE = 0.45; // Scale factor for game display

// Math Constants
export const DEGREES_TO_RADIANS = Math.PI / 180;
export const RADIANS_TO_DEGREES = 180 / Math.PI;

