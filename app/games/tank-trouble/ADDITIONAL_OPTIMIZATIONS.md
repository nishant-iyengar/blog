# Additional Performance Optimizations (Second Pass)

This document identifies additional performance issues found in a second review pass.

## Critical Issues Found

### 1. Redundant Distance Calculations ⚠️ HIGH PRIORITY

**File**: `ai-tank/rl-reward.ts`

**Problem**: `getDistance()` is called multiple times with the same arguments:

```typescript
// Line 165-166: Called TWICE for same tanks
const moved = getDistance(previous.aiTank, current.aiTank) > 0.1;
const movementDistance = getDistance(previous.aiTank, current.aiTank); // DUPLICATE!

// Line 182-183: Called TWICE
const tankDistance = getDistance(current.aiTank, current.enemyTank);
const distanceChange = Math.abs(tankDistance - getDistance(previous.aiTank, previous.enemyTank)); // DUPLICATE!
```

**Impact**: Unnecessary O(n) calculations (sqrt operations are expensive)
**Fix**: Cache the result of first call

### 2. O(n²) Bullet Matching in Reward Calculation ⚠️ HIGH PRIORITY

**File**: `ai-tank/rl-reward.ts` - `checkDodgedBullet()` function

**Problem**: 
```typescript
// Line 298-305: Filter bullets O(n)
const threateningBullets = previous.bullets.filter(...);

// Line 309-317: For each threatening bullet, check if still exists
for (const prevBullet of threateningBullets) {
  const stillThreatening = current.bullets.some(currBullet => { // O(n) per iteration
    // Matching logic
  });
}

// Line 321-324: Filter + map + reduce chain O(n)
const currentDistance = current.bullets
  .filter(b => b.owner === prevBullet.owner) // O(n)
  .map(b => getDistanceToTank(b, current.aiTank)) // O(n)
  .reduce((min, d) => Math.min(min, d), Infinity); // O(n)
```

**Complexity**: O(n²) - for each threatening bullet (m), iterate all current bullets (n)
**Fix**: Use Map/Set to track bullets by position/owner for O(1) lookup

### 3. Expensive `predictBulletPath()` Called Repeatedly ⚠️ CRITICAL

**Files**: `ai-tank/threat-assessment.ts`, `ai-tank/sun-calculations.ts`

**Problem**: `predictBulletPath()` is extremely expensive (simulates bullet physics over time with gravity), but called:
- For EVERY bullet in `assessThreats()` (line 27)
- For EVERY bullet in `isPositionSafe()` (line 112)
- Multiple times in `sun-calculations.ts` for shot calculations

**Impact**: With 20 bullets, this could be 20+ expensive path predictions per AI decision
**Fix**: 
- Limit to only nearby bullets (distance threshold)
- Cache predictions if bullet hasn't moved significantly
- Use cheaper approximations for distant bullets

### 4. Barrier Loop Inside Prediction Loop ⚠️ MEDIUM PRIORITY

**File**: `ai-tank/prediction.ts` - `predictBulletPath()`

**Problem**: 
```typescript
while (currentTime < maxTime && !isBlocked) {
  // ... physics calculations ...
  
  // Check barrier collision - loops through ALL barriers for EACH step
  for (const barrier of barriers) { // O(m) where m = barriers
    // ... collision check ...
  }
}
```

**Complexity**: O(steps × barriers) - could be 100+ steps × 10+ barriers = 1000+ checks
**Fix**: Pre-compute barrier bounds, use spatial partitioning, or early exit optimizations

### 5. Unused Variables ⚠️ LOW PRIORITY

**File**: `components/GameLogic.tsx`

**Problem**: Variables created but never used:
- Line 143: `const blueTankBefore = { ...currentTanks[0] };`
- Line 202: `const redTankBefore = { ...currentTanks[1] };`

**Impact**: Unnecessary object cloning/copying
**Fix**: Remove unused variables

### 6. Duplicate Code Pattern ⚠️ MEDIUM PRIORITY

**File**: `components/GameLogic.tsx`

**Problem**: Lines 224-242 duplicate the exact same logic as 204-223 (both call `updateAITank` with identical parameters)
**Fix**: Consolidate duplicate branches

### 7. Repeated Array Creation ⚠️ LOW PRIORITY

**File**: `ai-tank/prediction.ts`

**Problem**: 
```typescript
// Line 42-45: Creates new array every call
const sunSources: Vector2D[] = suns.map((sun) => ({
  x: sun.x,
  y: sun.y,
}));
```

**Impact**: If suns don't change, this is wasted allocation
**Fix**: Cache if suns array reference hasn't changed (memoization)

### 8. Inefficient Array Chain Operations ⚠️ MEDIUM PRIORITY

**File**: `ai-tank/rl-reward.ts`

**Problem**: 
```typescript
// Line 321-324: Creates intermediate arrays
const currentDistance = current.bullets
  .filter(b => b.owner === prevBullet.owner) // Creates new array
  .map(b => getDistanceToTank(b, current.aiTank)) // Creates another array
  .reduce((min, d) => Math.min(min, d), Infinity); // Finally computes result
```

**Impact**: Multiple array allocations, multiple iterations
**Fix**: Single-pass loop with early exit if possible

### 9. Repeated Property Access ⚠️ LOW PRIORITY

**File**: `ai-tank/threat-assessment.ts`, `ai-tank/rl-reward.ts`

**Problem**: `TANK_SIZE / 2` calculated multiple times:
- `threat-assessment.ts` line 44-45
- `rl-reward.ts` line 339-340

**Impact**: Minor, but could be constant
**Fix**: Extract to constant `TANK_HALF_SIZE = TANK_SIZE / 2`

### 10. Magic Number in Prediction ⚠️ LOW PRIORITY

**File**: `ai-tank/prediction.ts`

**Problem**: Line 69: `const minVelocity = 0.5;` should use constant
**Fix**: Use `BULLET_MIN_VELOCITY` from constants

## Priority Ranking

### Must Fix (Performance Impact)
1. ✅ **Redundant distance calculations** - Easy fix, immediate benefit
2. ✅ **O(n²) bullet matching** - Significant performance gain
3. ⚠️ **Expensive predictBulletPath calls** - Needs careful design (caching/memoization)

### Should Fix (Code Quality)
4. ✅ **Barrier loop optimization** - Medium effort, good return
5. ✅ **Unused variables** - Easy cleanup
6. ✅ **Duplicate code** - Code clarity
7. ✅ **Inefficient array chains** - Single-pass optimization

### Nice to Have
8. Array creation caching (memoization)
9. Repeated property access
10. Magic numbers

## Implementation Recommendations

### Quick Wins (Easy, High Impact)
1. Cache distance calculations in `rl-reward.ts`
2. Remove unused variables in `GameLogic.tsx`
3. Use `BULLET_MIN_VELOCITY` constant in `prediction.ts`
4. Optimize array chain in `checkDodgedBullet()`

### Medium Effort (Good ROI)
5. Optimize bullet matching with Map/Set
6. Early exit optimizations in prediction loops
7. Remove duplicate code in GameLogic.tsx

### Complex (Requires Design)
8. Implement caching/memoization for `predictBulletPath()`
9. Spatial partitioning for barriers (if barrier count grows)

