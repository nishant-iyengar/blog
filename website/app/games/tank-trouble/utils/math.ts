/**
 * Math Utilities
 * 
 * Common mathematical operations used throughout the game.
 */

import { DEGREES_TO_RADIANS, RADIANS_TO_DEGREES } from '../constants/game-constants';

/**
 * Calculate Euclidean distance between two points
 */
export function distance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate Euclidean distance between two point objects
 */
export function distancePoints(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): number {
  return distance(p1.x, p1.y, p2.x, p2.y);
}

/**
 * Convert degrees to radians
 */
export function degToRad(degrees: number): number {
  return degrees * DEGREES_TO_RADIANS;
}

/**
 * Convert radians to degrees
 */
export function radToDeg(radians: number): number {
  return radians * RADIANS_TO_DEGREES;
}

/**
 * Normalize angle to 0-360 range
 */
export function normalizeAngle(angle: number): number {
  let normalized = angle % 360;
  if (normalized < 0) normalized += 360;
  return normalized;
}

/**
 * Normalize angle difference to -180 to 180 range
 */
export function normalizeAngleDifference(angleDiff: number): number {
  while (angleDiff > 180) angleDiff -= 360;
  while (angleDiff < -180) angleDiff += 360;
  return angleDiff;
}

/**
 * Calculate angle from one point to another in degrees
 */
export function angleToPoint(
  from: { x: number; y: number },
  to: { x: number; y: number }
): number {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  return radToDeg(Math.atan2(dy, dx));
}

