import type { Tank, Barrier, Sun } from '@/app/games/tank-trouble/types';
import { canMoveTo } from '@/app/games/tank-trouble/utils/collision';
import { TANK_SPEED, ROTATION_SPEED } from '@/app/games/tank-trouble/config';

/**
 * Find optimal position relative to enemy
 */
export function calculateOptimalPosition(
  aiTank: Tank,
  enemyTank: Tank,
  aggressiveness: number,
  barriers: Barrier[],
  suns: Sun[],
  mapWidth: number,
  mapHeight: number
): { x: number; y: number; angle: number } {
  const aiCenterX = aiTank.x + 12; // Half of TANK_SIZE
  const aiCenterY = aiTank.y + 12;
  const enemyCenterX = enemyTank.x + 12;
  const enemyCenterY = enemyTank.y + 12;

  // Calculate distance to enemy
  const dx = enemyCenterX - aiCenterX;
  const dy = enemyCenterY - aiCenterY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Ideal distance based on aggressiveness (closer = more aggressive)
  const idealDistance = 100 + (1 - aggressiveness) * 100;

  // Calculate angle toward/away from enemy
  const angleToEnemy = (Math.atan2(dy, dx) * 180) / Math.PI;

  // Calculate desired position (maintain ideal distance)
  let targetX = enemyCenterX;
  let targetY = enemyCenterY;

  if (distance > idealDistance * 1.1) {
    // Too far, move closer
    const approachAngle = angleToEnemy;
    targetX =
      enemyCenterX - Math.cos((approachAngle * Math.PI) / 180) * idealDistance;
    targetY =
      enemyCenterY - Math.sin((approachAngle * Math.PI) / 180) * idealDistance;
  } else if (distance < idealDistance * 0.9) {
    // Too close, move away slightly
    const retreatAngle = (angleToEnemy + 180) % 360;
    targetX =
      enemyCenterX -
      Math.cos((retreatAngle * Math.PI) / 180) * idealDistance;
    targetY =
      enemyCenterY -
      Math.sin((retreatAngle * Math.PI) / 180) * idealDistance;
  }

  // Clamp to map bounds
  targetX = Math.max(12, Math.min(targetX, mapWidth - 12));
  targetY = Math.max(12, Math.min(targetY, mapHeight - 12));

  // Calculate angle toward target
  const targetDx = targetX - aiCenterX;
  const targetDy = targetY - aiCenterY;
  const targetAngle =
    (Math.atan2(targetDy, targetDx) * 180) / Math.PI;

  return {
    x: targetX - 12, // Convert center to corner
    y: targetY - 12,
    angle: targetAngle,
  };
}

/**
 * Check if a path is clear to a position
 */
export function isPathClear(
  from: { x: number; y: number },
  to: { x: number; y: number },
  barriers: Barrier[],
  suns: Sun[],
  tanks: Tank[],
  mapWidth: number,
  mapHeight: number,
  excludeTankIndex?: number
): boolean {
  // Simple line-of-sight check (could be improved with proper pathfinding)
  const steps = 20;
  const dx = (to.x - from.x) / steps;
  const dy = (to.y - from.y) / steps;

  for (let i = 0; i <= steps; i++) {
    const testX = from.x + dx * i;
    const testY = from.y + dy * i;

    if (
      !canMoveTo(
        testX,
        testY,
        mapWidth,
        mapHeight,
        barriers,
        tanks,
        suns,
        excludeTankIndex
      )
    ) {
      return false;
    }
  }

  return true;
}

/**
 * Find a safe nearby position when dodging
 */
export function findSafeDodgePosition(
  tank: Tank,
  dodgeAngle: number,
  dodgeDistance: number,
  barriers: Barrier[],
  suns: Sun[],
  allTanks: Tank[],
  mapWidth: number,
  mapHeight: number,
  tankIndex: number
): { x: number; y: number } | null {
  const rad = (dodgeAngle * Math.PI) / 180;
  const targetX = tank.x + Math.cos(rad) * dodgeDistance;
  const targetY = tank.y + Math.sin(rad) * dodgeDistance;

  // Check if target position is valid
  if (
    canMoveTo(
      targetX,
      targetY,
      mapWidth,
      mapHeight,
      barriers,
      allTanks,
      suns,
      tankIndex
    )
  ) {
    return { x: targetX, y: targetY };
  }

  // Try perpendicular directions
  const perpAngle1 = (dodgeAngle + 90) % 360;
  const perpAngle2 = (dodgeAngle - 90 + 360) % 360;

  for (const angle of [perpAngle1, perpAngle2]) {
    const rad = (angle * Math.PI) / 180;
    const testX = tank.x + Math.cos(rad) * dodgeDistance;
    const testY = tank.y + Math.sin(rad) * dodgeDistance;

    if (
      canMoveTo(
        testX,
        testY,
        mapWidth,
        mapHeight,
        barriers,
        allTanks,
        suns,
        tankIndex
      )
    ) {
      return { x: testX, y: testY };
    }
  }

  // Try smaller distance
  if (dodgeDistance > 20) {
    return findSafeDodgePosition(
      tank,
      dodgeAngle,
      dodgeDistance * 0.5,
      barriers,
      suns,
      allTanks,
      mapWidth,
      mapHeight,
      tankIndex
    );
  }

  return null;
}


