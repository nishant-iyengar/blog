# Training Improvements for Tank Trouble AI

This document describes the improvements made to address poor reinforcement learning performance and the issue where the tank only moved backwards.

## Problems Identified

1. **Poor RL Performance**: Tanks were moving in bizarre patterns during training
2. **Backward Movement Only**: When loaded into the website, the tank only moved backwards
3. **Epsilon Too High**: Starting with epsilon=1.0 (100% random) meant too much exploration initially
4. **No Human Demonstrations**: No way to learn from human player behavior
5. **Reward Function Issues**: Backward movement was not properly discouraged

## Solutions Implemented

### 1. Human Demonstrations Support ✅

**Created Supabase table for storing human demonstrations:**
- File: `backend/supabase_demonstrations.sql`
- Table: `ai_tank_demonstrations`
- Features:
  - Stores game steps (state, action, nextState, done)
  - `is_default` flag to mark baseline demonstrations
  - Metadata for episode information

**API Endpoints:**
- Added `/api/demonstrations` endpoint to receive demonstrations
- Supabase storage methods:
  - `SaveDemonstration()` - Save human game steps
  - `GetDefaultDemonstrations()` - Load default demonstrations for training

**Usage:**
1. Play games as a human (blue tank) vs rule-based AI (red tank)
2. Record the game steps with `isDefault: true`
3. Save to Supabase via API
4. Training will automatically load and use these demonstrations

### 2. Improved Imitation Learning ✅

**Enhanced `ImitationLearning()` function:**
- Now loads human demonstrations from Supabase if available
- Falls back to rule-based AI demonstrations if no human data
- Trains more batches when human demonstrations are available (up to 100 batches)
- Better initialization than random weights

**Benefits:**
- Agent learns from expert human behavior
- Starts with better policy than random exploration
- Faster convergence

### 3. Better Epsilon Management ✅

**Adjustments:**
- After pre-training (imitation learning), epsilon starts at 0.3 instead of 1.0
- When loading a trained model, epsilon starts at 0.2
- Still allows exploration but prioritizes exploitation of learned knowledge

**Code Changes:**
- Added `SetEpsilon()` method to DQNAgent
- Trainer automatically adjusts epsilon based on initialization method

### 4. Improved Reward Function ✅

**Fixed backward movement penalty:**
- Backward movement now only rewarded when there's a nearby threat (bullet)
- When moving backward without threat, reward is reduced to 30% of normal
- Encourages forward movement and engagement

**Logic:**
```go
if isMovingBackward && !hasNearbyThreat {
    movementReward = baseMovementReward * 0.3  // 30% of normal
} else {
    movementReward = baseMovementReward
}
```

### 5. Default Model Loading ✅

**Features:**
- Trainer can now load the latest model from Supabase before starting training
- Allows resuming training from a known good checkpoint
- Automatically adjusts epsilon when loading a trained model

**Benefits:**
- Don't lose progress between training sessions
- Can build on previously trained models
- Faster iteration

## Configuration Recommendations

### Epsilon Schedule (in game-config.json)
Current:
```json
"epsilonStart": 1.0,
"epsilonEnd": 0.05,
"epsilonDecay": 0.998
```

**Recommendations:**
- **Without pre-training**: Keep current values
- **With pre-training**: The system automatically adjusts to 0.3
- **Loading trained model**: Automatically adjusts to 0.2

### Training Strategy

1. **Initial Setup (No Demonstrations):**
   - Run with `useImitationLearning: true`
   - Uses rule-based AI demonstrations
   - Epsilon starts at 0.3 after pre-training

2. **With Human Demonstrations:**
   - Save human games with `isDefault: true` to Supabase
   - Run training - it will automatically load human demonstrations
   - Better starting point than rule-based AI

3. **Resuming Training:**
   - Latest model is automatically loaded from Supabase
   - Training continues from checkpoint
   - Epsilon starts at 0.2 (even lower since model is trained)

## Next Steps

### To Use Human Demonstrations:

1. **Set up Supabase table:**
   ```sql
   -- Run supabase_demonstrations.sql in Supabase SQL editor
   ```

2. **Record Human Games:**
   - Play games on the website (you = blue tank, AI = red tank)
   - Collect game steps: `{state, action, nextState, done}`
   - Mark with `isDefault: true`

3. **Save to Supabase:**
   ```javascript
   // Example API call
   fetch('/api/demonstrations', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       steps: [...gameSteps],
       isDefault: true,
       metadata: { episodeLength, totalReward, timestamp }
     })
   })
   ```

4. **Start Training:**
   - Training will automatically load default demonstrations
   - Pre-training uses human data first, then rule-based if needed

## Testing

After these changes:
1. **Expected Behavior:**
   - Tank should move forward more often
   - Less random/bizarre movement patterns
   - Better use of all actions, not just backward

2. **Monitor:**
   - Check training dashboard at `localhost:8080`
   - Watch epsilon value (should be lower after pre-training)
   - Observe game simulation - should see more varied, purposeful actions

3. **If Still Issues:**
   - Collect more human demonstrations
   - Check reward function values
   - Verify model weights are being saved/loaded correctly

## Files Modified

- `backend/supabase_demonstrations.sql` - New table schema
- `backend/ai-tank/api/server.go` - Added demonstrations endpoint
- `backend/ai-tank/api/supabase.go` - Added demonstration storage methods
- `backend/ai-tank/training/imitation_learning.go` - Loads human demonstrations
- `backend/ai-tank/training/trainer.go` - Better initialization and epsilon handling
- `backend/ai-tank/training/reward.go` - Improved backward movement penalty
- `backend/ai-tank/model/dqn.go` - Added SetEpsilon method
- `backend/cmd/trainer/main.go` - Updated trainer initialization

## Architecture Notes

**Import Cycle Fix:**
- Created `DemonstrationStorage` interface to break cycle between `training` and `api` packages
- Created `ModelStorage` interface for similar purpose
- `SupabaseStorage` implements both interfaces

This allows training package to use storage without importing api package directly.

