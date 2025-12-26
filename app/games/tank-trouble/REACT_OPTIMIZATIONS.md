# React Performance Optimizations

This document tracks React-specific performance optimizations.

## Completed Optimizations

### 1. ✅ Pre-computed Active Games Count

**File**: `components/UnifiedTrainingView.tsx`

**Problem**: `gameInstances.filter(gi => gi.isActive).length` was called 3 times on every render:
- Line 811: Display count
- Line 889: In tooltip text
- Line 902: In tooltip text

**Solution**: 
- Added `useMemo` to compute `activeGamesCount` once per render
- Replaced all 3 filter operations with the memoized value

**Impact**: 
- Reduces from 3 filter operations per render to 1 (computed only when `gameInstances` changes)
- Eliminates redundant array iterations

### 2. ✅ Map-Based Game Instance Lookup

**File**: `components/GameLogic.tsx`

**Problem**: 
```typescript
currentGameInstances.filter(gi => gi.id === options.gameId)
```
O(n) filter operation on every game tick to find a single game instance.

**Solution**: 
- Created `gameInstancesMapRef` using `Map<number, GameInstance>`
- Updated on `gameInstances` change in `useEffect`
- Changed lookup from `filter()` to `Map.get()` for O(1) lookup

**Impact**: 
- Reduced from O(n) to O(1) lookup
- Significant improvement when ticking individual games (common case)

### 3. ✅ Set-Based Key Lookup

**File**: `hooks/useGameInput.ts`

**Problem**: 
```typescript
const gameKeys = ['arrowup', 'arrowdown', ...];
if (gameKeys.includes(key)) { ... }
```
O(n) array lookup on every keydown/keyup event.

**Solution**: 
- Created module-level constant `GAME_KEYS_SET` as `Set<string>`
- Replaced `gameKeys.includes(key)` with `GAME_KEYS_SET.has(key)`

**Impact**: 
- Reduced from O(n) to O(1) lookup
- Improves keyboard input handling performance (called on every key event)

## Dependency Array Analysis

### ✅ Good Practices Found

1. **GameLogic.tsx**: Uses `gameInstances` in dependency arrays - necessary for tracking state changes
2. **UnifiedTrainingView.tsx**: Dependency arrays use primitives and stable references (functions memoized with `useCallback`)

### ⚠️ Potential Issues (Acceptable)

1. **rl-training-hook.ts**: 
   - `[config]` dependency - config object reference may change
   - **Analysis**: Acceptable - we want to re-run when config changes, and the effect uses `configRef` internally
   - **Status**: Already optimized with ref pattern

2. **UnifiedTrainingView.tsx**:
   - `[gameInstances]` in multiple effects
   - **Analysis**: Acceptable - necessary to track state changes, and effects are optimized with refs where needed

## Performance Improvements Summary

| Optimization | Before | After | Improvement |
|-------------|--------|-------|-------------|
| Active games count | 3× filter O(n) per render | 1× useMemo O(n) | 3x reduction, only on state change |
| Game instance lookup | O(n) filter | O(1) Map.get() | O(n) → O(1) |
| Key lookup | O(n) array.includes() | O(1) Set.has() | O(n) → O(1) |

## Best Practices Applied

1. ✅ Use `useMemo` for expensive computations that depend on props/state
2. ✅ Use `Map` for O(1) key-based lookups instead of O(n) filters
3. ✅ Use `Set` for O(1) membership checks instead of O(n) array.includes()
4. ✅ Pre-compute constants outside components (module-level)
5. ✅ Use refs for values that don't need to trigger re-renders
6. ✅ Dependency arrays use primitives and stable references

## Files Modified

1. `components/UnifiedTrainingView.tsx` - Added `activeGamesCount` memoization
2. `components/GameLogic.tsx` - Added `gameInstancesMapRef` for O(1) lookups
3. `hooks/useGameInput.ts` - Added `GAME_KEYS_SET` constant for O(1) key checks

