package training

import (
	"math"

	"blog/backend/ai-tank/game"
	"blog/backend/ai-tank/types"
)

// ExtractObservation extracts observation from game context
func ExtractObservation(context *AIContext, config *types.GameConfig) *types.Observation {
	features := make([]float64, 0)

	mapWidth := float64(config.Game.Map.Width)
	mapHeight := float64(config.Game.Map.Height)

	// 1. AI Tank state (4 features)
	features = append(features, game.Normalize(context.AITank.X, 0, mapWidth))
	features = append(features, game.Normalize(context.AITank.Y, 0, mapHeight))
	features = append(features, game.NormalizeAngle(context.AITank.Angle))
	features = append(features, game.Normalize(float64(context.AITank.Lives), 0, 3))

	// 2. Enemy Tank state (4 features)
	features = append(features, game.Normalize(context.EnemyTank.X, 0, mapWidth))
	features = append(features, game.Normalize(context.EnemyTank.Y, 0, mapHeight))
	features = append(features, game.NormalizeAngle(context.EnemyTank.Angle))
	features = append(features, game.Normalize(float64(context.EnemyTank.Lives), 0, 3))

	// 3. Relative position and distance (3 features)
	dx := context.EnemyTank.X - context.AITank.X
	dy := context.EnemyTank.Y - context.AITank.Y
	distance := math.Sqrt(dx*dx + dy*dy)
	maxDistance := math.Sqrt(mapWidth*mapWidth + mapHeight*mapHeight)

	features = append(features, game.Normalize(dx, -mapWidth, mapWidth))
	features = append(features, game.Normalize(dy, -mapHeight, mapHeight))
	features = append(features, game.Normalize(distance, 0, maxDistance))

	// 4. Angle to enemy (1 feature)
	angleToEnemy := math.Atan2(dy, dx) * 180 / math.Pi
	angleDiff := game.NormalizeAngleDifference(angleToEnemy - context.AITank.Angle)
	features = append(features, angleDiff)

	// 5. Bullet states (MAX_BULLETS * BULLET_FEATURES features)
	maxBullets := config.RL.Observation.MaxBullets
	bulletFeatures := config.RL.Observation.BulletFeatures

	// Collect active bullets
	activeBullets := make([]*types.Bullet, 0)
	for _, bullet := range context.Bullets {
		if !bullet.Exploding && len(activeBullets) < maxBullets {
			activeBullets = append(activeBullets, bullet)
		}
	}

	// Bullet speed for normalization (from config)
	bulletSpeed := config.Game.Tank.Speed * config.Game.Bullet.SpeedMultiplier

	for i := 0; i < maxBullets; i++ {
		if i < len(activeBullets) {
			bullet := activeBullets[i]
			features = append(features, game.Normalize(bullet.X, 0, mapWidth))
			features = append(features, game.Normalize(bullet.Y, 0, mapHeight))
			features = append(features, game.Normalize(bullet.Vx, -bulletSpeed*2, bulletSpeed*2))
			features = append(features, game.Normalize(bullet.Vy, -bulletSpeed*2, bulletSpeed*2))
			// Owner (0 or 1)
			if bullet.Owner == context.AITank.Color {
				features = append(features, 1.0)
			} else {
				features = append(features, 0.0)
			}
		} else {
			// Pad with zeros
			for j := 0; j < bulletFeatures; j++ {
				features = append(features, 0.0)
			}
		}
	}

	// 6. Sun states (MAX_SUNS * SUN_FEATURES features)
	maxSuns := config.RL.Observation.MaxSuns
	sunFeatures := config.RL.Observation.SunFeatures

	activeSuns := context.Suns
	if len(activeSuns) > maxSuns {
		activeSuns = activeSuns[:maxSuns]
	}

	for i := 0; i < maxSuns; i++ {
		if i < len(activeSuns) {
			sun := activeSuns[i]
			features = append(features, game.Normalize(sun.X, 0, mapWidth))
			features = append(features, game.Normalize(sun.Y, 0, mapHeight))
			features = append(features, game.Normalize(sun.Radius, 0, 100))
		} else {
			// Pad with zeros
			for j := 0; j < sunFeatures; j++ {
				features = append(features, 0.0)
			}
		}
	}

	// 7. Barrier distances in 8 directions (BARRIER_DIRECTIONS features)
	barrierDistances := getBarrierDistances(
		context.AITank.X+config.Game.Tank.Size/2,
		context.AITank.Y+config.Game.Tank.Size/2,
		context.Barriers,
		mapWidth,
		mapHeight,
	)
	for _, dist := range barrierDistances {
		features = append(features, game.Normalize(dist, 0, math.Max(mapWidth, mapHeight)))
	}

	// 8. Game state (2 features)
	features = append(features, game.Normalize(float64(context.TickTime%10000), 0, 10000))
	features = append(features, game.Normalize(mapWidth, 0, 2000))

	return &types.Observation{
		Vector: features,
		Size:   len(features),
	}
}

// AIContext represents the game context for AI decision making
type AIContext struct {
	AITank     *types.Tank
	EnemyTank  *types.Tank
	Bullets    []*types.Bullet
	Barriers   []*types.Barrier
	Suns       []*types.Sun
	MapWidth   int
	MapHeight  int
	TickTime   int64
}

// getBarrierDistances gets distances to nearest barriers in 8 directions
// Optimized with early exit conditions and reduced allocations
func getBarrierDistances(
	x, y float64,
	barriers []*types.Barrier,
	mapWidth, mapHeight float64,
) []float64 {
	directions := [][]float64{
		{1, 0},   // Right
		{1, 1},   // Down-right
		{0, 1},   // Down
		{-1, 1},  // Down-left
		{-1, 0},  // Left
		{-1, -1}, // Up-left
		{0, -1},  // Up
		{1, -1},  // Up-right
	}

	step := 5.0
	maxDistance := math.Max(mapWidth, mapHeight)
	distances := make([]float64, len(directions))

	// Pre-compute barrier bounds for faster collision checks
	barrierBounds := make([][4]float64, len(barriers))
	for i, barrier := range barriers {
		barrierBounds[i] = [4]float64{barrier.X, barrier.Y, barrier.X + barrier.Width, barrier.Y + barrier.Height}
	}

	for dirIdx, dir := range directions {
		distance := 0.0
		dirX := dir[0]
		dirY := dir[1]

		for distance < maxDistance {
			testX := x + dirX*distance
			testY := y + dirY*distance

			// Early exit: Check if out of bounds first (cheaper check)
			if testX < 0 || testX > mapWidth || testY < 0 || testY > mapHeight {
				break
			}

			// Check if hitting a barrier (optimized with pre-computed bounds)
			hitBarrier := false
			for _, bounds := range barrierBounds {
				if testX >= bounds[0] && testX <= bounds[2] &&
					testY >= bounds[1] && testY <= bounds[3] {
					hitBarrier = true
					break
				}
			}

			if hitBarrier {
				break
			}

			distance += step
		}

		distances[dirIdx] = distance
	}

	return distances
}

