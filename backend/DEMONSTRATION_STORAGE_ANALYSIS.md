# Demonstration Storage Analysis and Recommendations

## Current Implementation

### How Games Are Distinguished

**Current State**: Each game session creates a **single demonstration record** in Supabase:
- Each `POST /api/demonstrations` creates a new row in `ai_tank_demonstrations` table
- Each row has: `id` (UUID), `created_at`, `steps` (JSONB array), `metadata` (JSONB)
- Games are distinguished by **separate database rows** (each game = one row)

**Problem**: The metadata doesn't explicitly track `gameId` or `sessionId`, making it harder to:
- Query specific game sessions
- Analyze performance per game
- Debug specific games

**Solution**: Add `gameId` or `sessionId` to metadata (see recommendations below)

### Data Volume Per Game

**Per Step Size**:
- `state`: 152 floats = 152 * 8 bytes = 1,216 bytes
- `nextState`: 152 floats = 1,216 bytes  
- `action`: 1 int = 8 bytes
- `reward`: 1 float = 8 bytes
- `done`: 1 bool = 1 byte
- **Total per step**: ~2,450 bytes ≈ **2.4 KB**

**Per Game** (assuming 500 steps):
- 500 steps * 2.4 KB = **1,200 KB = 1.2 MB per game**

**Storage Math**:
- Supabase free tier: **500 MB** database storage
- Estimated games before limit: 500 MB / 1.2 MB ≈ **~400 games**
- If 10 games/day: ~40 days until limit
- If 100 games/day: ~4 days until limit

## Supabase Free Tier Limits

✅ **Unlimited API Requests** - No rate limits on data endpoints
⚠️ **500 MB Database Storage** - Could be limiting factor
✅ **5 GB Bandwidth** - Should be fine (egress)
✅ **50,000 MAU** - Not a concern for training

**Rate Limits** (not applicable to our use case):
- Verification: 360/hour per IP
- Token refresh: 1,800/hour per IP
- Anonymous sign-ins: 30/hour per IP

## Recommendations

### 1. Add Game Session Tracking ✅

**Add to metadata**:
```json
{
  "gameId": "uuid-or-timestamp",
  "sessionId": "browser-session-id",
  "episodeLength": 500,
  "timestamp": "2024-...",
  "playerId": "optional-user-id"
}
```

**Benefits**:
- Query specific game sessions
- Track performance over time
- Debug specific games
- Optional: Aggregate statistics per session

### 2. Current Approach is Good (Batch on Game End) ✅

**Current**: Send all steps at once when game ends
- ✅ Reduces API calls (1 request per game vs 500+)
- ✅ Atomic transaction (all or nothing)
- ✅ Better for network efficiency
- ✅ Matches natural game boundary

**Not Recommended**: Sending every few steps
- ❌ More API calls (50+ requests per game)
- ❌ Risk of losing data if browser closes
- ❌ Network overhead
- ❌ Harder to track game boundaries

**Recommendation**: Keep current approach (send at game end)

### 3. Storage Optimization Options

**Option A: Compression** (Future)
- Use gzip compression for `steps` JSONB
- Could reduce storage by 60-70%
- Tradeoff: Slightly more CPU on read/write

**Option B: Archival Strategy** (Recommended)
- Keep last N games (e.g., last 100 games)
- Archive older games to separate table or delete
- Query: `WHERE is_default=true ORDER BY created_at DESC LIMIT 100`

**Option C: Sampling** (For Training)
- Don't need ALL steps from ALL games
- Sample N steps per game for training
- Store full games, sample during training

### 4. Training Load Considerations

**Current Training Load**:
- Loads ALL default demonstrations
- Combines all steps from all games
- Trains on full dataset

**Example**:
- 100 games * 500 steps = 50,000 steps
- Each step is ~2.4 KB
- Total data: ~120 MB (in memory during training)
- **This is fine** - Go can handle this easily

**Recommendation**: 
- Add configurable limit: `GetDefaultDemonstrations(limit int)`
- Default to 1000 games (or reasonable limit)
- Can increase if needed

### 5. Monitoring Recommendations

**Track**:
- Total demonstration records count
- Total steps count
- Database storage usage
- Average steps per game

**Add Logging**:
```go
log.Printf("Loaded %d demonstration games with %d total steps", gameCount, totalSteps)
```

## Implementation Plan

1. ✅ **Add gameId to metadata** (see code changes below)
2. ✅ **Add storage monitoring** in Go service
3. ✅ **Add configurable limits** for demonstration loading
4. ⚠️ **Consider archival strategy** when approaching storage limit
5. ⚠️ **Monitor storage usage** in Supabase dashboard

## Code Changes Needed

### Frontend: Add gameId to metadata
```typescript
metadata: {
  gameId: crypto.randomUUID(), // or session-based ID
  episodeLength: demonstrationSteps.length,
  timestamp: new Date().toISOString(),
}
```

### Backend: Add storage monitoring
```go
// Log when loading demonstrations
log.Printf("Loading demonstrations: %d games, %d total steps", len(records), len(allSteps))
```

### Backend: Add configurable limits
```go
// Already implemented: GetDefaultDemonstrations(limit int)
// Can be tuned based on needs
```

