# Runtime Complexity Optimizations

## Executive Summary

This document identifies and addresses runtime complexity issues in the Tank Trouble game that can cause performance degradation, especially with multiple game instances or high bullet counts. The optimizations focus on:

1. **Eliminating redundant filter operations** - Replace O(n) filters with cached data structures
2. **Pre-computing static data** - Cache values that don't change between ticks
3. **Optimizing data structures** - Use Maps and Sets for O(1) lookups instead of O(n) searches
4. **Reducing array allocations** - Avoid creating new arrays on every tick

---

## 1. Filter Operations Analysis

### Issue 1.1: Tank Validation Filter in GameCanvas (O(n) per render)
**Location**: `components/GameCanvas.tsx:152-154`
```typescript
const validTanks = tanks
  .filter(tank => tank && tank.lives !== undefined && tank.x !== undefined && tank.y !== undefined && tank.color)
  .slice(0, 2);
```

**Problem**: 
- Runs on every render (potentially 60+ times per second)
- Creates new array every time
- Validation logic is redundant if tanks are always valid

**Solution**: 
- Remove filter if tanks are guaranteed to be valid
- If validation needed, do it once in game logic, not in render
- Use direct array access with bounds checking

**Complexity**: O(n) → O(1) per render

---

### Issue 1.2: Bullet Filter During Respawn (O(n) per respawn)
**Location**: `components/GameLogic.tsx:347`
```typescript
bulletResult.updatedBullets = bulletResult.updatedBullets.filter(
  bullet => bullet.owner !== tankColor
);
```

**Problem**:
- Creates new array on every respawn
- O(n) operation where n = number of bullets

**Solution**:
- Use Set of bullet indices to remove instead of filter
- Or track bullets by owner using Map structure

**Complexity**: O(n) → O(k) where k = bullets to remove

---

### Issue 1.3: Bullet Filter in Reward Calculation (O(n) per tick)
**Location**: `ai-tank/rl-reward.ts:141`
```typescript
const aiBullets = current.bullets.filter(b => b.owner === current.aiTank.color);
```

**Problem**:
- Called every tick for every game instance
- Creates new array every time
- Already have `countBulletsByOwner` utility that uses Map

**Solution**:
- Use `countBulletsByOwner` or create a `getBulletsByOwner` function that returns a Map
- Cache result if bullets haven't changed

**Complexity**: O(n) → O(n) but cached, or O(1) lookup if using Map

---

### Issue 1.4: Bullet Filter in Observation Extraction (O(n) per observation)
**Location**: `ai-tank/rl-observation.ts:81-83`
```typescript
const activeBullets = bullets
  .filter(b => !b.exploding)
  .slice(0, MAX_BULLETS);
```

**Problem**:
- Called every tick for AI decision making
- Creates new array every time
- Filter + slice creates intermediate array

**Solution**:
- Single pass: iterate once, collect non-exploding bullets up to MAX_BULLETS
- Or maintain a separate array of active bullets that's updated incrementally

**Complexity**: O(n) → O(min(n, MAX_BULLETS))

---

## 2. Find Operations Analysis

### Issue 2.1: Enemy Tank Lookup (O(n) per tick)
**Location**: `ai-tank/index.ts:44-48`
```typescript
let enemyTank = allTanks.find((t) => t && t.color !== tank.color && t.lives > 0);
if (!enemyTank) {
  enemyTank = allTanks.find((t) => t && t !== tank);
}
```

**Problem**:
- Called every tick for every AI tank
- O(n) search where n = number of tanks (usually 2, but still inefficient)
- Multiple fallback searches

**Solution**:
- Tanks array is always [blue, red] - use index directly
- If tankIndex is 0, enemy is tanks[1], else enemy is tanks[0]
- Pre-compute enemy index once

**Complexity**: O(n) → O(1)

---

### Issue 2.2: Game Instance Lookup (O(n) per operation)
**Location**: `components/UnifiedTrainingView.tsx:358`
```typescript
const gameBeforeReset = gameInstances.find(gi => gi.id === gameId);
```

**Problem**:
- O(n) search through game instances
- Could be called multiple times

**Solution**:
- Use Map<gameId, GameInstance> for O(1) lookup
- Already partially implemented in GameLogic.tsx with `gameInstancesMapRef`

**Complexity**: O(n) → O(1)

---

## 3. Map Operations Analysis

### Issue 3.1: Sun Sources Array Creation (O(n) per tick)
**Location**: `utils/bullet.ts:58-61`
```typescript
const sunSources: Vector2D[] = GAME_CONFIG.debug.disableSunGravity 
  ? [] 
  : suns.map((sun) => ({
      x: sun.x,
      y: sun.y,
    }));
```

**Problem**:
- Creates new array every tick for every bullet update
- Suns don't change during gameplay
- Called once per bullet update, but suns are static

**Solution**:
- Pre-compute sun sources once when suns are initialized
- Cache in game state or pass as pre-computed array
- Only recompute if suns array changes

**Complexity**: O(n) per tick → O(n) once (amortized O(1))

---

### Issue 3.2: Barrier Bounds Array Creation (O(n) per observation)
**Location**: `ai-tank/rl-observation.ts:185-190`
```typescript
const barrierBounds = barriers.map(barrier => ({
  left: barrier.x,
  right: barrier.x + barrier.width,
  top: barrier.y,
  bottom: barrier.y + barrier.height,
}));
```

**Problem**:
- Called every tick for every AI observation
- Barriers are static during gameplay
- Already have `precomputeBarrierBounds` utility in `spatial-optimization.ts`

**Solution**:
- Pre-compute barrier bounds once when barriers are initialized
- Use existing `precomputeBarrierBounds` utility
- Cache in game state

**Complexity**: O(n) per tick → O(n) once (amortized O(1))

---

### Issue 3.3: Gravity Config Object Creation (O(1) but unnecessary)
**Location**: `utils/bullet.ts:64-70`
```typescript
const gravityConfig = {
  gravitationalConstant: G,
  sourceMass: mSun,
  influenceRadius: SUN_INFLUENCE_RADIUS,
  minDistance: GAME_CONFIG.sun.minDistance,
  maxAcceleration: BULLET_SPEED * 0.3,
};
```

**Problem**:
- Creates new object every tick
- Values are constants (except maxAcceleration which depends on BULLET_SPEED)
- Object creation overhead

**Solution**:
- Pre-compute once and cache
- Only maxAcceleration needs recalculation if BULLET_SPEED changes

**Complexity**: O(1) object creation → O(1) cached (reduced allocations)

---

## 4. Pre-computable Data

### Issue 4.1: Active Bullets List
**Problem**: Multiple places filter bullets to get active (non-exploding) bullets:
- `rl-observation.ts`: Filters for observation
- `rl-reward.ts`: Filters for reward calculation
- `bullet-optimization.ts`: Groups bullets by owner

**Solution**:
- Maintain a separate `activeBullets` array that's updated incrementally
- When bullet is created: add to activeBullets
- When bullet explodes: remove from activeBullets (mark for removal, clean up in batch)
- Use Set for O(1) removal lookups

**Complexity**: Multiple O(n) filters → O(1) updates, O(1) access

---

### Issue 4.2: Tank Collision Boxes
**Problem**: Tank collision boxes are calculated on every collision check:
```typescript
const tankCollisionOffset = (TANK_SIZE - TANK_COLLISION_SIZE) / 2;
const tankCollisionLeft = tank.x + tankCollisionOffset;
// ... etc
```

**Solution**:
- Pre-compute collision offset constant (already done: `TANK_HALF_SIZE`)
- Cache collision box bounds when tank position changes
- Only recalculate if tank moved

**Complexity**: O(1) per check → O(1) cached (fewer calculations)

---

### Issue 4.3: Distance Calculations
**Problem**: Distance calculations are repeated for same pairs:
- Enemy distance calculated in multiple places
- Bullet-to-tank distances recalculated even when positions haven't changed

**Solution**:
- Cache distance calculations with position hashes
- Only recalculate if positions changed
- Use squared distances for comparisons (avoid sqrt when possible)

**Complexity**: O(1) per calculation → O(1) cached (fewer sqrt operations)

---

## 5. Data Structure Improvements

### Issue 5.1: Bullets Array vs Map Structure
**Current**: Bullets stored as array, filtered/searched linearly

**Proposed**: 
- Keep array for iteration (needed for rendering/physics)
- Maintain Map<owner, Set<bulletIndex>> for O(1) owner lookups
- Maintain Set<activeBulletIndices> for O(1) active bullet checks

**Trade-off**: 
- Slightly more memory
- Faster lookups
- Need to keep in sync

---

### Issue 5.2: Tanks Array Indexing
**Current**: Tanks array, enemy found via `.find()`

**Proposed**:
- Always maintain tanks in fixed order: [blue, red]
- Use index directly: `enemyIndex = tankIndex === 0 ? 1 : 0`
- Validate array length, but no search needed

**Complexity**: O(n) → O(1)

---

## 6. Implementation Priority

### High Priority (Immediate Impact)
1. ✅ Enemy tank lookup optimization (Issue 2.1)
2. ✅ Sun sources pre-computation (Issue 3.1)
3. ✅ Barrier bounds pre-computation (Issue 3.2)
4. ✅ Gravity config caching (Issue 3.3)
5. ✅ Remove tank filter in GameCanvas (Issue 1.1)

### Medium Priority (Significant Impact)
6. ✅ Bullet filter optimizations (Issues 1.2, 1.3, 1.4)
7. ✅ Game instance lookup optimization (Issue 2.2)

### Low Priority (Nice to Have)
8. Active bullets tracking (Issue 4.1)
9. Distance calculation caching (Issue 4.3)
10. Bullets Map structure (Issue 5.1)

---

## 7. Expected Performance Improvements

### Before Optimizations
- **Per tick cost**: O(n_bullets) filters × multiple calls + O(n_tanks) finds + O(n_barriers) maps
- **With 20 bullets, 2 tanks, 10 barriers**: ~60+ operations per tick
- **At 72 FPS**: ~4,320 operations per second per game instance

### After Optimizations
- **Per tick cost**: O(1) lookups + O(n_bullets) iteration (unavoidable for physics)
- **With 20 bullets, 2 tanks, 10 barriers**: ~20 operations per tick (mostly iteration)
- **At 72 FPS**: ~1,440 operations per second per game instance

### Estimated Improvement
- **~66% reduction** in per-tick operations
- **Better scalability** with multiple game instances
- **Reduced GC pressure** from fewer array allocations

---

## 8. Testing Considerations

After implementing optimizations, verify:
1. Game behavior unchanged (no bugs introduced)
2. Performance improvement measurable (use browser profiler)
3. Memory usage acceptable (check for leaks)
4. Multiple game instances still perform well

---

## Implementation Notes

- All optimizations maintain existing API contracts
- Changes are internal optimizations, no external API changes
- Backward compatible with existing code
- Can be implemented incrementally

