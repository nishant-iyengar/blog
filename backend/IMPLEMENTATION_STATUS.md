# Implementation Status - Model Lifecycle & Human Demonstrations

## ✅ Completed (Backend/Go)

### 1. Database Schema
- [x] Created `ai_tank_demonstrations` table for storing human game steps
- [x] Added `is_default` column to `ai_tank_models` table
- [x] Added indexes for efficient querying
- [x] SQL files created: `supabase_demonstrations.sql`, `supabase_model_updates.sql`

### 2. API Endpoints
- [x] `/api/demonstrations` POST endpoint to save human demonstrations
- [x] Hard error if Supabase not initialized
- [x] Converts JSON steps to `types.Step` format
- [x] Saves to Supabase `ai_tank_demonstrations` table

### 3. Model Storage & Selection
- [x] `SaveModel()` now accepts `isDefault` parameter
- [x] `GetBestDefaultModel()` - retrieves default model with best eval score
- [x] `SaveDefaultModelIfBetter()` - only saves if better than existing default
- [x] Added `IsDefault` and `Source` fields to `ModelMetadata`

### 4. Training Integration
- [x] Trainer loads best default model on startup (before imitation learning)
- [x] Imitation learning saves pre-trained model as default (if better)
- [x] Epsilon adjusted appropriately (0.2 for loaded default, 0.3 for pre-trained)
- [x] RL training saves models with `isDefault = false`

### 5. Documentation
- [x] `MODEL_LIFECYCLE.md` - Complete lifecycle documentation
- [x] `TRAINING_IMPROVEMENTS.md` - Training improvements summary

## 🚧 TODO (TypeScript/Frontend)

### Phase 1: Collect Human Demonstrations in PlayYourAI.tsx

**File**: `website/app/games/tank-trouble/components/PlayYourAI.tsx`

**Changes needed**:
1. Add state to track demonstration steps:
   ```typescript
   const [demonstrationSteps, setDemonstrationSteps] = useState<Array<{
     state: number[];
     action: number;
     nextState: number[];
     done: boolean;
   }>>([]);
   const [previousObservation, setPreviousObservation] = useState<Observation | null>(null);
   ```

2. In game loop, for each tick where human controls blue tank:
   - Extract observation using `extractObservation()` from blue tank's perspective
   - Convert current keyboard input to action (0-13) using `keysToAction()`
   - Store step when we have both previous and current observation

3. At game end (`gameOverWinner !== null`):
   - Send all collected steps to `http://localhost:8080/api/demonstrations`
   - Reset demonstration steps
   - Show success/error message

4. Helper function to convert keyboard input to action:
   ```typescript
   function keysToAction(keys: Set<string>, currentAngle: number): number {
     // Map keyboard input to action 0-13
     // Similar to convertActionToDecision but reverse
   }
   ```

### Phase 2: Collect Human Demonstrations in UnifiedTrainingView.tsx

**File**: `website/app/games/tank-trouble/components/UnifiedTrainingView.tsx`

**Changes needed**:
- Similar to PlayYourAI.tsx but for person-vs-ai mode games
- Only collect when `gameMode === 'person-vs-ai'`
- Send demonstrations at end of each episode

### Phase 3: Observation Extraction

**File**: `website/app/games/tank-trouble/ai-tank/rl-observation.ts`

**Already exists**: `extractObservation(context: AIContext)`
- Need to ensure we extract from **blue tank's perspective** (human player)
- Swap AI/Enemy in context if needed

### Phase 4: Action Conversion

**Helper function needed**:
- Convert keyboard input (Arrow keys + Space) to discrete action (0-13)
- Must match the Go backend's action mapping:
  - 0: NO_ACTION
  - 1: ROTATE_LEFT
  - 2: ROTATE_RIGHT
  - 3: MOVE_FORWARD
  - 4: MOVE_BACKWARD
  - 5: SHOOT
  - 6-13: Combinations

## Implementation Plan

### Step 1: Create Action Conversion Helper
**File**: `website/app/games/tank-trouble/ai-tank/rl-actions.ts` (new or existing)
- Function: `keysToAction(keys: Set<string>, angle: number): number`

### Step 2: Modify PlayYourAI.tsx
- Add demonstration collection logic
- Send to `/api/demonstrations` endpoint
- Handle errors gracefully

### Step 3: Modify UnifiedTrainingView.tsx (optional, for training mode)
- Similar demonstration collection
- Only for person-vs-ai games

### Step 4: Test End-to-End
1. Play a game in PlayYourAI mode
2. Verify steps are collected
3. Verify steps are sent to Go backend
4. Verify steps are saved to Supabase
5. Start Go training service
6. Verify default model is created from demonstrations
7. Verify default model is loaded on startup

## API Contract

### POST `/api/demonstrations`
**Request**:
```json
{
  "steps": [
    {
      "state": [0.5, 0.3, ...],  // Observation vector (152 numbers)
      "action": 3,                // Discrete action 0-13
      "nextState": [0.52, 0.3, ...],
      "done": false
    },
    ...
  ],
  "isDefault": true,
  "metadata": {
    "episodeLength": 150,
    "totalReward": 45.67,
    "timestamp": "2024-..."
  }
}
```

**Response**:
```json
{
  "status": "saved",
  "steps": 150,
  "message": "✅ Saved 150 demonstration steps to Supabase (isDefault: true)"
}
```

## Database Queries

### Get Best Default Model
```sql
SELECT * FROM ai_tank_models 
WHERE is_default = true 
ORDER BY (metadata->>'evalScore')::float DESC 
LIMIT 1;
```

### Get All Default Demonstrations
```sql
SELECT * FROM ai_tank_demonstrations 
WHERE is_default = true 
ORDER BY created_at DESC;
```

## Next Steps

1. **Implement TypeScript demonstration collection** (highest priority)
2. **Test end-to-end flow**:
   - Play game → Collect steps → Save to Supabase
   - Start training → Load demonstrations → Create default model
   - Verify default model is loaded on subsequent startups
3. **Improve eval score calculation**:
   - Currently placeholder (10.0)
   - Should run actual test games and calculate average reward
4. **Add UI feedback**:
   - Show when demonstrations are being collected
   - Show success/error messages
   - Display number of demonstrations collected

