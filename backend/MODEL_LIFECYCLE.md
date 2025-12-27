# Model Lifecycle and Training Flow

## Overview

This document describes the complete lifecycle of AI models, from human demonstrations to trained models.

## Model States

### 1. **Default Model** (Human Demonstration-Based)
- **Purpose**: Initial baseline model trained from human demonstrations
- **Source**: Human vs AI game sessions (player is blue tank)
- **Training Method**: Imitation Learning (Behavioral Cloning)
- **Storage**: Supabase `ai_tank_models` table with `metadata.isDefault = true`
- **Selection**: Only ONE default model exists at a time (best eval score)

### 2. **Training Models** (RL-Trained)
- **Purpose**: Models trained via reinforcement learning
- **Source**: RL training process (self-play or vs rule-based AI)
- **Training Method**: DQN with experience replay
- **Storage**: Supabase `ai_tank_models` table with `metadata.isDefault = false`
- **Selection**: Latest or best performing model

## Complete Lifecycle

### Phase 1: Human Demonstration Collection

**Where**: TypeScript website (`PlayYourAI.tsx` or `UnifiedTrainingView.tsx` in person-vs-ai mode)

**What happens**:
1. Human plays as blue tank vs AI (red tank) using rule-based AI or RL model
2. Every game tick:
   - Extract observation (game state) from blue tank's perspective
   - Record human action (arrow keys → discrete action 0-13)
   - Store: `{state, action, nextState, done}`
3. At end of episode:
   - Send all steps to `http://localhost:8080/api/demonstrations`
   - Mark with `isDefault: true`
   - Store in Supabase `ai_tank_models_demonstrations` table

**Result**: Multiple demonstration sets stored in Supabase with `is_default = true`

### Phase 2: Creating Default Model from Demonstrations

**Where**: Go backend training service (`trainer/main.go`)

**When**: On startup, if `useImitationLearning = true`

**What happens**:
1. Load all default demonstrations from Supabase (`is_default = true`)
2. Run `ImitationLearning()`:
   - Pre-train DQN agent using demonstrations (behavioral cloning)
   - Train on batches of demonstration steps
   - Agent learns to imitate human behavior
3. **Save pre-trained model**:
   - Evaluate pre-trained model (optional: run test games, calculate eval score)
   - Save to Supabase with `metadata.isDefault = true`
   - Also set `metadata.source = "imitation_learning"`

**Key Question**: Should we save a new default model every time, or only if better?

**Answer**: Use eval score comparison:
- If no default model exists → Save this one
- If default model exists → Compare eval scores
  - Only save if new eval score is better (or within 5% threshold)
  - This ensures we always have the BEST default model

### Phase 3: Loading Default Model for Training

**Where**: Go backend training service (`trainer/main.go`)

**When**: On startup, before training begins

**What happens**:
1. **REQUIRED**: Check Supabase for models with `is_default = true`
2. **HARD ERROR if not found**: Training will not start without a default model
3. If multiple exist:
   - Query: `WHERE is_default = true ORDER BY evalScore DESC LIMIT 1`
   - Select the one with highest eval score
4. Load weights into agent using `agent.SetWeights()`
5. Set epsilon to 0.2 (low, since model is already trained)
6. **Then** optionally run imitation learning again (if enabled) to add any new demonstrations

**Error Handling**:
- If no default model exists: `FATAL` error with instructions
- Training service will exit with error message
- User must create demonstrations first by playing games

**Result**: Agent starts with human demonstration knowledge, ready for RL training

### Phase 4: RL Training on Default Model

**Where**: Go backend training service (continuous training loop)

**What happens**:
1. Agent plays games (self-play or vs rule-based AI)
2. Collects experience: `{state, action, reward, nextState, done}`
3. Stores in replay buffer
4. Trains on batches periodically
5. Epsilon decays over time (starts at 0.2, decays to 0.05)
6. Model improves beyond initial human demonstrations

**Model Saving**:
- Save models with `metadata.isDefault = false`
- Save when model improves (5% threshold)
- Save periodically as backup (every 5 minutes)

**Result**: Trained models that are better than the default baseline

## Database Schema Updates Needed

### `ai_tank_models` table - Add column:
```sql
ALTER TABLE ai_tank_models 
ADD COLUMN IF NOT EXISTS is_default BOOLEAN DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_ai_tank_models_is_default 
ON ai_tank_models(is_default, (metadata->>'evalScore') DESC);
```

### Model Metadata Structure:
```json
{
  "version": 1,
  "timestamp": "2024-...",
  "evalScore": 45.67,
  "episodes": 150,
  "isDefault": true,
  "source": "imitation_learning"
}
```

## API Changes Needed

### 1. Save Model with isDefault flag
- Modify `SupabaseStorage.SaveModel()` to accept `isDefault` parameter
- Update metadata to include `isDefault` field

### 2. Get Best Default Model
- New method: `GetBestDefaultModel()` 
- Query: `WHERE isDefault = true ORDER BY evalScore DESC LIMIT 1`

### 3. Compare and Save Default Model
- Only save if better than existing default (eval score comparison)

## Implementation Plan

### Step 1: Update Database Schema ✅
- [x] Create demonstrations table
- [x] Add `is_default` column to `ai_tank_models`
- [x] Add index for efficient querying

### Step 2: Collect Human Demonstrations (TypeScript) ✅
- [x] Modify `PlayYourAI.tsx`
- [x] Create `keysToAction()` helper function
- [x] Track human actions and observations
- [x] Send to `/api/demonstrations` endpoint
- [x] Display collection status in UI

### Step 3: Create Default Model from Demonstrations (Go) ✅
- [x] After imitation learning, evaluate model (placeholder eval score)
- [x] Save with `isDefault = true` if better than existing
- [x] Implement eval score comparison with 5% threshold

### Step 4: Load Best Default Model (Go) ✅
- [x] On startup, query for best default model
- [x] Load weights before training starts
- [x] Adjust epsilon appropriately (0.2 for loaded default, 0.3 for pre-trained)

### Step 5: Model Selection Logic ✅
- [x] Implement "best default" query (`GetBestDefaultModel()`)
- [x] Handle case where no default exists
- [x] Handle multiple defaults (select best by eval score)

## Flow Diagram

```
[Human Plays Game]
        ↓
[Collect Steps] → [Send to /api/demonstrations] → [Store in Supabase]
                                                        ↓
[Go Service Starts] → [Load Best Default Model] → [Run Imitation Learning]
                                                        ↓
                                        [Evaluate Model Performance]
                                                        ↓
                                    [Save as Default if Better]
                                                        ↓
                                        [Start RL Training Loop]
                                                        ↓
                                    [Save Improved Models (isDefault=false)]
```

## Questions Answered

**Q: Multiple default models?**
A: No. Only ONE default model exists at a time - the one with the best eval score. When saving a new default, we compare eval scores and only replace if better.

**Q: How do we know which model to use?**
A: Query `WHERE isDefault = true ORDER BY evalScore DESC LIMIT 1`. Always use the best one.

**Q: What if human plays multiple times?**
A: Each game session adds demonstrations to the database. When imitation learning runs, it uses ALL default demonstrations. After training, we evaluate and only save as default if it's better than the existing one.

**Q: Eval score calculation?**
A: Can be simple initially (average reward over 10 test games). Later can be more sophisticated (win rate, average episode length, etc.).

