package training

import (
	"math"

	"blog/backend/ai-tank/config"
	"blog/backend/ai-tank/game"
	"blog/backend/ai-tank/types"
)

// PreviousState represents the previous game state for reward calculation
type PreviousState struct {
	AITank            *types.Tank
	EnemyTank         *types.Tank
	Bullets           []*types.Bullet
	AILives           int
	EnemyLives        int
	TickTime          int64
	AIPositionHistory []PositionHistory
	LastMovementTime  *int64
	LastShotTime      *int64
	EpisodeStartTime  *int64
	TimeoutApplied    bool
}

// CurrentState represents the current game state
type CurrentState struct {
	AITank     *types.Tank
	EnemyTank  *types.Tank
	Bullets    []*types.Bullet
	AILives    int
	EnemyLives int
	TickTime   int64
}

// PositionHistory tracks position over time
type PositionHistory struct {
	X        float64
	Y        float64
	TickTime int64
}

// RewardInfo contains reward and breakdown
type RewardInfo struct {
	Reward    float64
	Breakdown RewardBreakdown
}

// RewardBreakdown provides detailed reward components
type RewardBreakdown struct {
	Survival              *float64
	HitEnemy              *float64
	GotHit                *float64
	DistanceReward        *float64
	DodgedBullet          *float64
	ShotAccuracy          *float64
	LifeAdvantage         *float64
	Movement              *float64
	StagnationPenalty     *float64
	StalematePenalty      *float64
	RepetitiveActionPenalty *float64
	TimeoutPenalty        *float64
	InactivityPenalty     *float64
	LackOfAggressionPenalty *float64
}

// CalculateReward calculates reward based on state transition
func CalculateReward(
	previous *PreviousState,
	current *CurrentState,
	action *types.AIDecision,
	config *types.RLConfig,
) *RewardInfo {
	totalReward := 0.0
	breakdown := RewardBreakdown{}

	// Apply timeout penalty if episode exceeded max episode time (only once)
	if previous.EpisodeStartTime != nil && !previous.TimeoutApplied {
		episodeElapsed := current.TickTime - *previous.EpisodeStartTime
		if episodeElapsed >= int64(config.Reward.MaxEpisodeTimeMs) {
			timeoutPenalty := config.Reward.TimeoutPenalty
			totalReward += timeoutPenalty
			breakdown.TimeoutPenalty = &timeoutPenalty
		}
	}

	// 1. Survival reward (small positive per tick)
	survivalReward := config.Reward.SurvivalRewardPerTick
	totalReward += survivalReward
	breakdown.Survival = &survivalReward

	// 2. Hit enemy (large positive)
	if current.EnemyLives < previous.EnemyLives {
		hitReward := config.Reward.HitEnemyReward
		totalReward += hitReward
		breakdown.HitEnemy = &hitReward
	}

	// 3. Got hit (large negative)
	if current.AILives < previous.AILives {
		hitPenalty := config.Reward.GotHitPenalty
		totalReward += hitPenalty
		breakdown.GotHit = &hitPenalty
	}

	// 4. Distance to enemy (shaped reward)
	prevDistance := getDistance(previous.AITank, previous.EnemyTank)
	currDistance := getDistance(current.AITank, current.EnemyTank)
	optimalDistance := config.Reward.OptimalDistanceToEnemy

	prevDistanceError := math.Abs(prevDistance-optimalDistance) / optimalDistance
	currDistanceError := math.Abs(currDistance-optimalDistance) / optimalDistance

	distanceImprovement := prevDistanceError - currDistanceError
	distanceReward := distanceImprovement * 2
	totalReward += distanceReward
	breakdown.DistanceReward = &distanceReward

	// 5. Dodged bullet (positive)
	dodgedReward := checkDodgedBullet(previous, current, config)
	if dodgedReward > 0 {
		totalReward += dodgedReward
		breakdown.DodgedBullet = &dodgedReward
	}

	// 6. Shot accuracy (reward for shots that get close to enemy)
	if action.ShouldShoot {
		recentBulletThresholdMs := int64(config.Reward.RecentBulletThresholdMs)
		accuracyReward := 0.0

		for _, bullet := range current.Bullets {
			if bullet.Owner == current.AITank.Color &&
				current.TickTime-bullet.CreatedAt < recentBulletThresholdMs {
				closestApproach := getClosestBulletApproach(bullet, current.EnemyTank)
				reward := math.Max(0, 5*(1-closestApproach/config.Reward.ShotAccuracyMaxDistance))
				accuracyReward += reward
			}
		}

		if accuracyReward > 0 {
			totalReward += accuracyReward
			breakdown.ShotAccuracy = &accuracyReward
		}
	}

	// 7. Life advantage
	currLifeDiff := current.AILives - current.EnemyLives

	if currLifeDiff > 0 {
		lifeAdvantageReward := config.Reward.LifeAdvantageReward
		totalReward += lifeAdvantageReward
		breakdown.LifeAdvantage = &lifeAdvantageReward
	}

	// 8. Movement reward - favor forward movement over backward
	movementDistance := getDistance(previous.AITank, current.AITank)
	moved := movementDistance > 0.1

	if moved {
		// Check if moving backward without good reason (e.g., dodging bullets)
		isMovingBackward := action.MoveDirection < 0
		
		// Calculate base movement reward
		baseMovementReward := math.Min(config.Reward.MovementRewardMax, movementDistance*config.Reward.MovementRewardMultiplier)
		
		// Check if there's a good reason to move backward (e.g., bullet nearby)
		hasNearbyThreat := false
		for _, bullet := range current.Bullets {
			if bullet.Owner != current.AITank.Color && !bullet.Exploding {
				dist := getDistanceToTank(bullet, current.AITank, 24.0)
				if dist < config.Reward.ThreatDistance {
					hasNearbyThreat = true
					break
				}
			}
		}
		
		// Penalize backward movement unless there's a threat
		var movementReward float64
		if isMovingBackward && !hasNearbyThreat {
			// Reduce reward for backward movement when not needed
			movementReward = baseMovementReward * 0.3 // Only 30% of normal reward
		} else {
			movementReward = baseMovementReward
		}
		
		totalReward += movementReward
		breakdown.Movement = &movementReward
	} else {
		stagnationPenalty := config.Reward.StagnationPenalty
		totalReward += stagnationPenalty
		breakdown.StagnationPenalty = &stagnationPenalty
		breakdown.Movement = &stagnationPenalty
	}

	// 9. Stalemate detection
	tankDistance := getDistance(current.AITank, current.EnemyTank)
	prevTankDistance := getDistance(previous.AITank, previous.EnemyTank)
	distanceChange := math.Abs(tankDistance - prevTankDistance)

	// Stalemate: tanks aren't changing relative positions much, and AI isn't moving much
	isStalemate := distanceChange < 5 && movementDistance < 2

	if isStalemate {
		stalematePenalty := config.Reward.StalematePenalty
		totalReward += stalematePenalty
		breakdown.StalematePenalty = &stalematePenalty
	}

	// 10. Repetitive action penalty
	if action.ShouldShoot && !moved && len(current.Bullets) >= len(previous.Bullets) {
		repetitiveActionPenalty := config.Reward.RepetitiveActionPenalty
		totalReward += repetitiveActionPenalty
		breakdown.RepetitiveActionPenalty = &repetitiveActionPenalty
	}

	// 11. Position diversity reward
	if len(previous.AIPositionHistory) > 0 {
		positionRepeatThreshold := config.Reward.PositionRepeatThreshold
		positionHistorySize := config.Reward.PositionHistorySize

		startIdx := 0
		if len(previous.AIPositionHistory) > positionHistorySize {
			startIdx = len(previous.AIPositionHistory) - positionHistorySize
		}

		isRepeatingPosition := false
		for i := startIdx; i < len(previous.AIPositionHistory); i++ {
			pos := previous.AIPositionHistory[i]
			dist := game.Distance(current.AITank.X, current.AITank.Y, pos.X, pos.Y)
			if dist < positionRepeatThreshold {
				isRepeatingPosition = true
				break
			}
		}

		if !isRepeatingPosition && moved {
			diversityReward := config.Reward.PositionDiversityReward
			totalReward += diversityReward
			if breakdown.Movement != nil {
				*breakdown.Movement += diversityReward
			} else {
				breakdown.Movement = &diversityReward
			}
		}
	}

	// 12. Inactivity penalty (tank sitting still for more than 1.5 seconds)
	inactivityThreshold := int64(config.Reward.InactivityThresholdMs)
	significantMovementThreshold := config.Reward.SignificantMovementThreshold

	if moved && movementDistance >= significantMovementThreshold {
		// Tank moved significantly, update last movement time
		// This will be tracked in the environment state
	} else {
		// Tank didn't move significantly, check if it's been inactive too long
		// Match TypeScript: previous.lastMovementTime || previous.episodeStartTime || previous.tickTime
		lastMovementTime := previous.TickTime
		if previous.LastMovementTime != nil {
			lastMovementTime = *previous.LastMovementTime
		} else if previous.EpisodeStartTime != nil {
			lastMovementTime = *previous.EpisodeStartTime
		}

		timeSinceLastMovement := current.TickTime - lastMovementTime

		if timeSinceLastMovement >= inactivityThreshold {
			// Stronger penalty that scales with inactivity duration
			inactivityDuration := timeSinceLastMovement - inactivityThreshold
			scalingPenalty := math.Min(config.Reward.InactivityMaxPenalty, 
				config.Reward.InactivityBasePenalty-float64(inactivityDuration)/1000*config.Reward.InactivityScalingFactor)
			totalReward += scalingPenalty
			breakdown.InactivityPenalty = &scalingPenalty
		}
	}

	// 13. Lack of aggression penalty
	// Penalize if tank is not being aggressive enough (not shooting, not moving toward enemy, etc.)
	aggressionCheckInterval := int64(config.Reward.AggressionCheckIntervalMs)
	timeSinceLastShot := int64(math.MaxInt64)
	if previous.LastShotTime != nil {
		timeSinceLastShot = current.TickTime - *previous.LastShotTime
	}

	// Check if tank is being passive:
	// - Not shooting for a while (more than 2 seconds)
	// - Moving away from enemy
	// - Not closing distance to enemy
	isPassive := timeSinceLastShot > aggressionCheckInterval && // Not shooting
		!action.ShouldShoot && // Not about to shoot
		movementDistance < 2 // Not moving much

	// Also check if moving away from enemy
	distanceToEnemyChange := currDistance - prevDistance
	isMovingAway := distanceToEnemyChange > config.Reward.MovementAwayThreshold

	if isPassive || (isMovingAway && !action.ShouldShoot) {
		lackOfAggressionPenalty := config.Reward.LackOfAggressionPenalty
		totalReward += lackOfAggressionPenalty
		breakdown.LackOfAggressionPenalty = &lackOfAggressionPenalty
	}

	return &RewardInfo{
		Reward:    totalReward,
		Breakdown: breakdown,
	}
}

// Helper functions

func getDistance(tank1, tank2 *types.Tank) float64 {
	return game.Distance(tank1.X, tank1.Y, tank2.X, tank2.Y)
}

func getDistanceToTank(bullet *types.Bullet, tank *types.Tank, tankSize float64) float64 {
	tankCenterX, tankCenterY := game.GetTankCenter(tank.X, tank.Y, tankSize)
	return game.Distance(bullet.X, bullet.Y, tankCenterX, tankCenterY)
}

func getClosestBulletApproach(bullet *types.Bullet, tank *types.Tank) float64 {
	// Simplified: just use current distance
	// In a full implementation, we'd predict the bullet path
	// Get tank size from config
	cfg, err := config.GetConfig()
	tankSize := 24.0 // Default fallback
	if err == nil {
		tankSize = cfg.Game.Tank.Size
	}
	return getDistanceToTank(bullet, tank, tankSize)
}

func checkDodgedBullet(previous *PreviousState, current *CurrentState, rlConfig *types.RLConfig) float64 {
	threatDistance := rlConfig.Reward.ThreatDistance
	bulletMatchDistance := rlConfig.Reward.BulletMatchDistance
	// Get tank size from config
	gameCfg, err := config.GetConfig()
	tankSize := 24.0 // Default fallback
	if err == nil {
		tankSize = gameCfg.Game.Tank.Size
	}

	// Find bullets that were threatening AI in previous state
	var threateningBullets []*types.Bullet
	for _, bullet := range previous.Bullets {
		if bullet.Owner == previous.AITank.Color || bullet.Exploding {
			continue
		}
		dist := getDistanceToTank(bullet, previous.AITank, tankSize)
		if dist < threatDistance {
			threateningBullets = append(threateningBullets, bullet)
		}
	}

	// Create map of current bullets by owner
	currentBulletsByOwner := make(map[string][]*types.Bullet)
	for _, bullet := range current.Bullets {
		if !bullet.Exploding {
			currentBulletsByOwner[bullet.Owner] = append(currentBulletsByOwner[bullet.Owner], bullet)
		}
	}

	// Check if any threatening bullets are now gone or far away
	dodgedCount := 0
	tankCenterX, tankCenterY := game.GetTankCenter(current.AITank.X, current.AITank.Y, tankSize)

	for _, prevBullet := range threateningBullets {
		ownerBullets := currentBulletsByOwner[prevBullet.Owner]

		// Check if a similar bullet still exists
		stillThreatening := false
		for _, currBullet := range ownerBullets {
			dist := game.Distance(currBullet.X, currBullet.Y, prevBullet.X, prevBullet.Y)
			if dist < bulletMatchDistance {
				stillThreatening = true
				break
			}
		}

		if !stillThreatening {
			// Bullet is gone - check if closest bullet from same owner is now far away
			minDistance := math.MaxFloat64
			for _, currBullet := range ownerBullets {
				dist := game.Distance(currBullet.X, currBullet.Y, tankCenterX, tankCenterY)
				if dist < minDistance {
					minDistance = dist
				}
			}

			if minDistance > threatDistance {
				dodgedCount++
			}
		}
	}

	// Match TypeScript: return dodgedCount * 10 (10 points per dodged bullet)
	return float64(dodgedCount) * 10
}

