package game

import (
	"encoding/json"
	"math"
	"math/rand"
	"os"
	"path/filepath"
	"time"

	"blog/backend/ai-tank/config"
	"blog/backend/ai-tank/model"
	"blog/backend/ai-tank/types"
)

// GameSimulation represents a single game simulation
type GameSimulation struct {
	config        *types.GameConfig
	agent         *model.DQNAgent  // Agent for tank 0 (blue)
	enemyAgent    *model.DQNAgent  // Agent for tank 1 (red) - for self-play
	ruleBasedAI   *RuleBasedAI     // Rule-based AI for demonstrations
	tanks         []*types.Tank
	bullets       []*types.Bullet
	barriers      []*types.Barrier
	suns          []*types.Sun
	mapWidth      float64
	mapHeight     float64
	tickTime      int64
	lastShotTimes map[string]int64 // "blue" or "red"
	rand          *rand.Rand
	episodeStart  int64
	useSelfPlay   bool // If true, both tanks use RL agents
}

// NewGameSimulation creates a new game simulation
// If enemyAgent is nil, the enemy will use rule-based AI
// If enemyAgent is provided, both tanks use RL (self-play)
func NewGameSimulation(agent *model.DQNAgent, enemyAgent *model.DQNAgent, rng *rand.Rand) (*GameSimulation, error) {
	cfg, err := config.GetConfig()
	if err != nil {
		return nil, err
	}

	// Load map data (for now, use default map dimensions from config)
	mapWidth := float64(cfg.Game.Map.Width)
	mapHeight := float64(cfg.Game.Map.Height)

	// Initialize tanks at spawn positions
	tanks := initializeTanks(cfg, mapWidth, mapHeight)

	// Load barriers and suns from map data
	barriers, suns := loadMapData(mapWidth, mapHeight)

	now := time.Now().UnixMilli()

	ruleBasedAI := NewRuleBasedAI(cfg)
	useSelfPlay := enemyAgent != nil

	return &GameSimulation{
		config:        cfg,
		agent:         agent,
		enemyAgent:    enemyAgent,
		ruleBasedAI:   ruleBasedAI,
		tanks:         tanks,
		bullets:       []*types.Bullet{},
		barriers:      barriers,
		suns:          suns,
		mapWidth:      mapWidth,
		mapHeight:     mapHeight,
		tickTime:      now,
		lastShotTimes: map[string]int64{"blue": 0, "red": 0},
		rand:          rng,
		episodeStart:  now,
		useSelfPlay:   useSelfPlay,
	}, nil
}

// initializeTanks creates initial tank positions
func initializeTanks(cfg *types.GameConfig, mapWidth, mapHeight float64) []*types.Tank {
	// Simple spawn positions (can be improved with proper spawn logic)
	spawnPadding := cfg.Game.Spawn.Padding
	
	blueTank := &types.Tank{
		X:     spawnPadding,
		Y:     spawnPadding,
		Angle: 45,
		Lives: cfg.Game.Tank.Lives,
		Color: "blue",
	}
	
	redTank := &types.Tank{
		X:     mapWidth - spawnPadding - cfg.Game.Tank.Size,
		Y:     mapHeight - spawnPadding - cfg.Game.Tank.Size,
		Angle: 225,
		Lives: cfg.Game.Tank.Lives,
		Color: "red",
	}
	
	return []*types.Tank{blueTank, redTank}
}

// MapDataJSON represents the map JSON structure
type MapDataJSON struct {
	Width       int                 `json:"width"`
	Height      int                 `json:"height"`
	Barriers    []MapBarrierJSON    `json:"barriers"`
	Suns        []MapSunJSON        `json:"suns,omitempty"` // Optional - no longer used but kept for backwards compatibility
	SpawnPoints []MapSpawnPointJSON `json:"spawnPoints"`
}

type MapBarrierJSON struct {
	X      float64 `json:"x"`
	Y      float64 `json:"y"`
	Width  float64 `json:"width"`
	Height float64 `json:"height"`
}

type MapSunJSON struct {
	X    float64 `json:"x"`
	Y    float64 `json:"y"`
	Size float64 `json:"size"`
}

type MapSpawnPointJSON struct {
	X     float64 `json:"x"`
	Y     float64 `json:"y"`
	Angle float64 `json:"angle"`
}

// loadMapData loads barriers from the shared map JSON file
// Single source of truth: shared/content/games/tank-trouble-map.json
func loadMapData(mapWidth, mapHeight float64) ([]*types.Barrier, []*types.Sun) {
	// Single path: shared/content/games/tank-trouble-map.json
	// Find project root by looking for shared directory
	var mapPath string
	
	// Start from current working directory and walk up to find shared/
	cwd, err := os.Getwd()
	if err == nil {
		current := cwd
		for i := 0; i < 10; i++ { // Max 10 levels up
			candidate := filepath.Join(current, "shared", "content", "games", "tank-trouble-map.json")
			if _, err := os.Stat(candidate); err == nil {
				mapPath = candidate
				break
			}
			parent := filepath.Dir(current)
			if parent == current {
				break // Reached filesystem root
			}
			current = parent
		}
	}
	
	// Fallback: try PROJECT_ROOT env var if set
	if mapPath == "" {
		if projectRoot := os.Getenv("PROJECT_ROOT"); projectRoot != "" {
			candidate := filepath.Join(projectRoot, "shared", "content", "games", "tank-trouble-map.json")
			if _, err := os.Stat(candidate); err == nil {
				mapPath = candidate
			}
		}
	}

	if mapPath == "" {
		// Map file not found - return empty to allow graceful degradation
		return []*types.Barrier{}, []*types.Sun{}
	}

	data, err := os.ReadFile(mapPath)
	if err != nil {
		// If read fails, return empty (fallback)
		return []*types.Barrier{}, []*types.Sun{}
	}

	var mapData MapDataJSON
	if err := json.Unmarshal(data, &mapData); err != nil {
		// If parse fails, return empty (fallback)
		return []*types.Barrier{}, []*types.Sun{}
	}

	// Convert JSON barriers to types.Barrier
	barriers := make([]*types.Barrier, 0, len(mapData.Barriers))
	for _, b := range mapData.Barriers {
		barriers = append(barriers, &types.Barrier{
			X:      b.X,
			Y:      b.Y,
			Width:  b.Width,
			Height: b.Height,
		})
	}

	// Suns are no longer used - return empty slice
	// (Suns have been removed from the game map)
	return barriers, []*types.Sun{}
}

// Tick advances the simulation by one step
// decisions: map of tank index to decision
func (gs *GameSimulation) Tick(decisions map[int]*types.AIDecision) bool {
	// Check if episode is done
	if gs.isDone() {
		return true
	}

	// Update tanks (AI decisions)
	gs.updateTanks(decisions)

	// Update bullets
	gs.updateBullets()

	// Check collisions
	gs.checkCollisions()

	// Increment tick time
	gs.tickTime += int64(1000.0 / float64(gs.config.Game.Timing.TickRate))
	
	return gs.isDone()
}

// updateTanks updates tank positions and actions
// decisions map: tank index -> decision
func (gs *GameSimulation) updateTanks(decisions map[int]*types.AIDecision) {
	for i, tank := range gs.tanks {
		if tank.Lives <= 0 || tank.Exploding || tank.Respawning {
			continue
		}

		// Get decision for this tank
		decision, ok := decisions[i]
		if !ok {
			// If decision not provided, use RL agent or rule-based AI
			if i == 0 {
				// Tank 0 (blue) - use main agent
				decision = gs.getAIDecision(tank, i)
			} else if gs.useSelfPlay && gs.enemyAgent != nil {
				// Tank 1 (red) - use enemy agent for self-play
				decision = gs.getEnemyAIDecision(tank, i)
			} else {
				// Tank 1 (red) - use rule-based AI
				enemyTank := gs.tanks[1-i]
				decision = gs.ruleBasedAI.MakeDecision(tank, enemyTank, gs.bullets, gs.barriers)
			}
		}

		// Apply movement
		gs.applyTankMovement(tank, decision)

		// Apply shooting
		if decision.ShouldShoot {
			gs.tryShoot(tank)
		}
	}
}

// getEnemyAIDecision gets the AI decision for the enemy tank (for self-play)
func (gs *GameSimulation) getEnemyAIDecision(tank *types.Tank, tankIndex int) *types.AIDecision {
	// Placeholder - will be set by trainer with actual observation/action
	// For now, return a basic decision
	return &types.AIDecision{
		AngleDelta:    0,
		MoveDirection: 0,
		ShouldShoot:   false,
	}
}

// getAIDecision gets the AI decision for a tank
// This is a fallback function used when decisions aren't provided in the decisions map.
// In normal operation, the trainer provides decisions directly, so this should rarely be called.
func (gs *GameSimulation) getAIDecision(tank *types.Tank, tankIndex int) *types.AIDecision {
	// Fallback: return a neutral decision (no movement, no shooting)
	// This should only be used if decisions aren't provided by the trainer
	return &types.AIDecision{
		AngleDelta:    0,
		MoveDirection: 0,
		ShouldShoot:   false,
	}
}

// actionToDecision converts a discrete action to a game decision
func actionToDecision(action int, currentAngle float64, config *types.GameConfig) *types.AIDecision {
	decision := &types.AIDecision{
		AngleDelta:    0,
		MoveDirection: 0,
		ShouldShoot:   false,
	}

	rotationSpeed := config.Game.Tank.RotationSpeed

	switch action {
	case 0: // NO_ACTION
		// Do nothing
	case 1: // ROTATE_LEFT
		decision.AngleDelta = -rotationSpeed
	case 2: // ROTATE_RIGHT
		decision.AngleDelta = rotationSpeed
	case 3: // MOVE_FORWARD
		decision.MoveDirection = 1
	case 4: // MOVE_BACKWARD
		decision.MoveDirection = -1
	case 5: // SHOOT
		decision.ShouldShoot = true
	case 6: // ROTATE_LEFT_FORWARD
		decision.AngleDelta = -rotationSpeed
		decision.MoveDirection = 1
	case 7: // ROTATE_RIGHT_FORWARD
		decision.AngleDelta = rotationSpeed
		decision.MoveDirection = 1
	case 8: // ROTATE_LEFT_SHOOT
		decision.AngleDelta = -rotationSpeed
		decision.ShouldShoot = true
	case 9: // ROTATE_RIGHT_SHOOT
		decision.AngleDelta = rotationSpeed
		decision.ShouldShoot = true
	case 10: // MOVE_FORWARD_SHOOT
		decision.MoveDirection = 1
		decision.ShouldShoot = true
	case 11: // MOVE_BACKWARD_SHOOT
		decision.MoveDirection = -1
		decision.ShouldShoot = true
	case 12: // ROTATE_LEFT_BACKWARD
		decision.AngleDelta = -rotationSpeed
		decision.MoveDirection = -1
	case 13: // ROTATE_RIGHT_BACKWARD
		decision.AngleDelta = rotationSpeed
		decision.MoveDirection = -1
	}

	return decision
}

// applyTankMovement applies movement to a tank
func (gs *GameSimulation) applyTankMovement(tank *types.Tank, decision *types.AIDecision) {
	// Update angle
	tank.Angle += decision.AngleDelta
	if tank.Angle < 0 {
		tank.Angle += 360
	}
	if tank.Angle >= 360 {
		tank.Angle -= 360
	}

	// Calculate movement
	if decision.MoveDirection != 0 {
		angleRad := tank.Angle * math.Pi / 180
		speed := gs.config.Game.Tank.Speed
		
		dx := math.Cos(angleRad) * speed * float64(decision.MoveDirection)
		dy := math.Sin(angleRad) * speed * float64(decision.MoveDirection)
		
		newX := tank.X + dx
		newY := tank.Y + dy
		
		// Check if new position is valid
		if gs.isValidTankPosition(newX, newY, tank) {
			tank.X = newX
			tank.Y = newY
		}
	}
}

// isValidTankPosition checks if a tank position is valid
func (gs *GameSimulation) isValidTankPosition(x, y float64, tank *types.Tank) bool {
	tankSize := gs.config.Game.Tank.Size
	collisionSize := gs.config.Game.Tank.CollisionSize
	epsilon := gs.config.Game.Collision.Epsilon
	
	collisionOffset := (tankSize - collisionSize) / 2
	collisionX := x + collisionOffset
	collisionY := y + collisionOffset
	
	// Check boundaries
	if collisionX < -epsilon || collisionY < -epsilon ||
		collisionX+collisionSize > gs.mapWidth+epsilon ||
		collisionY+collisionSize > gs.mapHeight+epsilon {
		return false
	}
	
	// Check barriers
	for _, barrier := range gs.barriers {
		if checkRectCollision(collisionX, collisionY, collisionSize, collisionSize,
			barrier.X, barrier.Y, barrier.Width, barrier.Height) {
			return false
		}
	}
	
	return true
}

// checkRectCollision checks if two rectangles collide
func checkRectCollision(x1, y1, w1, h1, x2, y2, w2, h2 float64) bool {
	return x1 < x2+w2 && x1+w1 > x2 && y1 < y2+h2 && y1+h1 > y2
}

// tryShoot attempts to shoot a bullet
func (gs *GameSimulation) tryShoot(tank *types.Tank) {
	// Check cooldown
	lastShot := gs.lastShotTimes[tank.Color]
	cooldown := int64(gs.config.Game.Timing.ShootingCooldown)
	if gs.tickTime-lastShot < cooldown {
		return
	}
	
	// Check bullet limit
	bulletCount := 0
	for _, bullet := range gs.bullets {
		if bullet.Owner == tank.Color && !bullet.Exploding {
			bulletCount++
		}
	}
	if bulletCount >= gs.config.Game.Bullet.MaxPerTank {
		return
	}
	
	// Create bullet
	angleRad := tank.Angle * math.Pi / 180
	tankSize := gs.config.Game.Tank.Size
	bulletSpeed := gs.config.Game.Tank.Speed * gs.config.Game.Bullet.SpeedMultiplier
	
	bulletX := tank.X + tankSize/2 + math.Cos(angleRad)*tankSize/2
	bulletY := tank.Y + tankSize/2 + math.Sin(angleRad)*tankSize/2
	
	bullet := &types.Bullet{
		X:         bulletX,
		Y:         bulletY,
		Angle:     tank.Angle,
		Speed:     bulletSpeed,
		Owner:     tank.Color,
		CreatedAt: gs.tickTime,
		Vx:        math.Cos(angleRad) * bulletSpeed,
		Vy:        math.Sin(angleRad) * bulletSpeed,
		Exploding: false,
	}
	
	gs.bullets = append(gs.bullets, bullet)
	gs.lastShotTimes[tank.Color] = gs.tickTime
}

// updateBullets updates bullet positions
// Optimized to avoid memory allocations from slice operations
func (gs *GameSimulation) updateBullets() {
	tickInterval := 1000.0 / float64(gs.config.Game.Timing.TickRate)
	fadeDuration := int64(gs.config.Game.Bullet.FadeDuration)
	maxAge := int64(gs.config.Game.Bullet.MaxAge)
	
	// Use two-pass approach: mark for removal, then compact
	// This avoids multiple slice allocations
	writeIdx := 0
	
	for i := 0; i < len(gs.bullets); i++ {
		bullet := gs.bullets[i]
		shouldRemove := false
		
		if bullet.Exploding {
			// Remove old exploding bullets
			if bullet.ExplosionStartTime != nil && gs.tickTime-*bullet.ExplosionStartTime > fadeDuration {
				shouldRemove = true
			} else {
				// Keep exploding bullet, just move it forward
				if writeIdx != i {
					gs.bullets[writeIdx] = bullet
				}
				writeIdx++
			}
			continue
		}
		
		// Check age
		age := gs.tickTime - bullet.CreatedAt
		if age > maxAge {
			shouldRemove = true
		}
		
		if !shouldRemove {
			// Update position
			dt := tickInterval / 1000.0
			bullet.X += bullet.Vx * dt
			bullet.Y += bullet.Vy * dt
			
			// Apply sun gravity (if enabled)
			if gs.config.Game.Sun.GravitationalConstant != 0 {
				gs.applySunGravity(bullet, dt)
			}
			
			// Check boundaries
			gs.checkBulletBoundaries(bullet)
			
			// Keep bullet, move it forward if needed
			if writeIdx != i {
				gs.bullets[writeIdx] = bullet
			}
			writeIdx++
		}
	}
	
	// Trim slice to remove deleted elements
	gs.bullets = gs.bullets[:writeIdx]
}

// applySunGravity applies gravitational force from suns
func (gs *GameSimulation) applySunGravity(bullet *types.Bullet, dt float64) {
	G := gs.config.Game.Sun.GravitationalConstant
	mSun := gs.config.Game.Sun.Mass
	influenceRadius := gs.config.Game.Sun.InfluenceRadius
	
	for _, sun := range gs.suns {
		dx := sun.X - bullet.X
		dy := sun.Y - bullet.Y
		dist := math.Sqrt(dx*dx + dy*dy)
		
		if dist < influenceRadius && dist > gs.config.Game.Sun.MinDistance {
			// Calculate gravitational acceleration
			accel := (G * mSun) / (dist * dist)
			accelX := (dx / dist) * accel
			accelY := (dy / dist) * accel
			
			// Update velocity
			bullet.Vx += accelX * dt
			bullet.Vy += accelY * dt
		}
	}
}

// checkBulletBoundaries checks if bullet hits boundaries
func (gs *GameSimulation) checkBulletBoundaries(bullet *types.Bullet) {
	bulletRadius := gs.config.Game.Bullet.Radius
	
	if bullet.X-bulletRadius < 0 || bullet.X+bulletRadius > gs.mapWidth ||
		bullet.Y-bulletRadius < 0 || bullet.Y+bulletRadius > gs.mapHeight {
		// Bullet hit boundary - explode
		bullet.Exploding = true
		explosionTime := gs.tickTime
		bullet.ExplosionStartTime = &explosionTime
	}
}

// checkCollisions checks for bullet-tank and bullet-barrier collisions
// Optimized to avoid unnecessary iterations
func (gs *GameSimulation) checkCollisions() {
	for i := 0; i < len(gs.bullets); i++ {
		bullet := gs.bullets[i]
		
		if bullet.Exploding {
			continue
		}
		
		// Check bullet-barrier collisions (early exit on hit)
		hitBarrier := false
		for _, barrier := range gs.barriers {
			if checkBulletBarrierCollision(bullet, barrier, gs.config) {
				bullet.Exploding = true
				explosionTime := gs.tickTime
				bullet.ExplosionStartTime = &explosionTime
				hitBarrier = true
				break
			}
		}
		
		if hitBarrier {
			continue
		}
		
		// Check bullet-tank collisions
		for _, tank := range gs.tanks {
			if tank.Lives <= 0 || tank.Exploding || tank.Respawning || bullet.Owner == tank.Color {
				continue
			}
			
			if checkBulletTankCollision(bullet, tank, gs.config) {
				// Tank hit
				tank.Lives--
				bullet.Exploding = true
				explosionTime := gs.tickTime
				bullet.ExplosionStartTime = &explosionTime
				break
			}
		}
	}
}

// checkBulletBarrierCollision checks if bullet collides with barrier
func checkBulletBarrierCollision(bullet *types.Bullet, barrier *types.Barrier, config *types.GameConfig) bool {
	bulletRadius := config.Game.Bullet.Radius
	return bullet.X+bulletRadius >= barrier.X &&
		bullet.X-bulletRadius <= barrier.X+barrier.Width &&
		bullet.Y+bulletRadius >= barrier.Y &&
		bullet.Y-bulletRadius <= barrier.Y+barrier.Height
}

// checkBulletTankCollision checks if bullet collides with tank
func checkBulletTankCollision(bullet *types.Bullet, tank *types.Tank, config *types.GameConfig) bool {
	bulletRadius := config.Game.Bullet.Radius
	tankSize := config.Game.Tank.Size
	tankCenterX := tank.X + tankSize/2
	tankCenterY := tank.Y + tankSize/2
	
	dx := bullet.X - tankCenterX
	dy := bullet.Y - tankCenterY
	dist := math.Sqrt(dx*dx + dy*dy)
	
	return dist < tankSize/2+bulletRadius
}

// isDone checks if the episode is done
func (gs *GameSimulation) isDone() bool {
	// Check if any tank has no lives
	for _, tank := range gs.tanks {
		if tank.Lives <= 0 {
			return true
		}
	}
	
	// Check timeout
	maxEpisodeTime := int64(gs.config.RL.Reward.MaxEpisodeTimeMs)
	if gs.tickTime-gs.episodeStart >= maxEpisodeTime {
		return true
	}
	
	return false
}

// GameState represents the current game state
type GameState struct {
	AITank    *types.Tank        `json:"AITank"`
	EnemyTank *types.Tank        `json:"EnemyTank"`
	Bullets   []*types.Bullet    `json:"Bullets"`
	Barriers  []*types.Barrier   `json:"Barriers"`
	Suns      []*types.Sun       `json:"Suns"`
	MapWidth  int                `json:"MapWidth"`
	MapHeight int                `json:"MapHeight"`
	TickTime  int64              `json:"TickTime"`
}

// GetState returns the current game state
func (gs *GameSimulation) GetState() (*GameState, *types.AIDecision) {
	aiTank := gs.tanks[0] // Blue tank is AI
	enemyTank := gs.tanks[1] // Red tank is enemy
	
	state := &GameState{
		AITank:    aiTank,
		EnemyTank: enemyTank,
		Bullets:   gs.bullets,
		Barriers:  gs.barriers,
		Suns:      gs.suns,
		MapWidth:  int(gs.mapWidth),
		MapHeight: int(gs.mapHeight),
		TickTime:  gs.tickTime,
	}
	
	decision := gs.getAIDecision(aiTank, 0)
	
	return state, decision
}

