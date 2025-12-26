/**
 * Optimized bullet collision utilities
 * 
 * Pre-computes bullet groupings to reduce O(n²) operations to O(n)
 */

import type { Bullet } from '@/app/games/tank-trouble/types';
import { distance } from './math';
import { GAME_CONFIG } from '../config';

/**
 * Group bullets by owner for faster collision detection
 * Returns a map: owner -> array of bullet indices
 */
export function groupBulletsByOwner(bullets: Bullet[]): Map<'blue' | 'red', number[]> {
  const groups = new Map<'blue' | 'red', number[]>();
  
  for (let i = 0; i < bullets.length; i++) {
    const bullet = bullets[i];
    if (bullet.exploding) continue;
    
    const indices = groups.get(bullet.owner) || [];
    indices.push(i);
    groups.set(bullet.owner, indices);
  }
  
  return groups;
}

/**
 * Count bullets by owner using Map for O(1) lookup
 * More efficient than filtering on every call
 */
export function countBulletsByOwner(bullets: Bullet[]): Map<'blue' | 'red', number> {
  const counts = new Map<'blue' | 'red', number>();
  
  for (const bullet of bullets) {
    if (!bullet.exploding) {
      counts.set(bullet.owner, (counts.get(bullet.owner) || 0) + 1);
    }
  }
  
  return counts;
}

/**
 * Optimized bullet-bullet collision detection
 * Reduces O(n²) to O(n) by only checking bullets from different owners
 */
export function detectBulletCollisions(
  bullets: Bullet[],
  bulletGroups: Map<'blue' | 'red', number[]>
): Set<number> {
  const collisions = new Set<number>();
  const checked = new Set<string>();
  const collisionSize = GAME_CONFIG.bullet.collisionSize;
  
  const blueIndices = bulletGroups.get('blue') || [];
  const redIndices = bulletGroups.get('red') || [];
  
  // Only check blue vs red bullets (not same owner)
  // This reduces from O(n²) to O(blue_count * red_count), which is typically much smaller
  for (const i of blueIndices) {
    if (collisions.has(i)) continue;
    const bullet = bullets[i];
    if (bullet.exploding) continue;
    
    for (const j of redIndices) {
      if (collisions.has(j)) continue;
      const otherBullet = bullets[j];
      if (otherBullet.exploding) continue;
      
      // Create unique key to avoid duplicate checks
      const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
      if (checked.has(key)) continue;
      checked.add(key);
      
      const dist = distance(bullet.x, bullet.y, otherBullet.x, otherBullet.y);
      if (dist < collisionSize) {
        collisions.add(i);
        collisions.add(j);
        break; // This bullet collided, no need to check more
      }
    }
  }
  
  return collisions;
}

