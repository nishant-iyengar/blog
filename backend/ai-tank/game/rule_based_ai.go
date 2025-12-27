package game

import (
	"math"

	"blog/backend/ai-tank/types"
)

// RuleBasedAI implements a simple rule-based AI for generating demonstrations
// This is a simplified version of the TypeScript rule-based controller
type RuleBasedAI struct {
	config *types.GameConfig
}

// NewRuleBasedAI creates a new rule-based AI
func NewRuleBasedAI(config *types.GameConfig) *RuleBasedAI {
	return &RuleBasedAI{
		config: config,
	}
}

// MakeDecision makes a rule-based decision for a tank
func (ai *RuleBasedAI) MakeDecision(tank *types.Tank, enemyTank *types.Tank, bullets []*types.Bullet, barriers []*types.Barrier) *types.AIDecision {
	decision := &types.AIDecision{
		AngleDelta:    0,
		MoveDirection: 0,
		ShouldShoot:   false,
	}

	// Calculate distance and angle to enemy
	dx := enemyTank.X - tank.X
	dy := enemyTank.Y - tank.Y
	distance := math.Sqrt(dx*dx + dy*dy)
	angleToEnemy := math.Atan2(dy, dx) * 180 / math.Pi

	// Normalize angle difference
	angleDiff := angleToEnemy - tank.Angle
	for angleDiff > 180 {
		angleDiff -= 360
	}
	for angleDiff < -180 {
		angleDiff += 360
	}

	// Check for urgent threats (bullets close to tank)
	hasUrgentThreat := false
	tankCenterX := tank.X + ai.config.Game.Tank.Size/2
	tankCenterY := tank.Y + ai.config.Game.Tank.Size/2
	threatDistance := 50.0

	for _, bullet := range bullets {
		if bullet.Owner == tank.Color || bullet.Exploding {
			continue
		}

		bulletDist := Distance(bullet.X, bullet.Y, tankCenterX, tankCenterY)
		if bulletDist < threatDistance {
			hasUrgentThreat = true
			break
		}
	}

	// If urgent threat, dodge
	if hasUrgentThreat {
		// Move away from closest threat
		closestBullet := findClosestThreat(tank, bullets)
		if closestBullet != nil {
			threatDx := tankCenterX - closestBullet.X
			threatDy := tankCenterY - closestBullet.Y
			escapeAngle := math.Atan2(threatDy, threatDx) * 180 / math.Pi

			escapeAngleDiff := escapeAngle - tank.Angle
			for escapeAngleDiff > 180 {
				escapeAngleDiff -= 360
			}
			for escapeAngleDiff < -180 {
				escapeAngleDiff += 360
			}

			if math.Abs(escapeAngleDiff) > 10 {
				if escapeAngleDiff > 0 {
					decision.AngleDelta = ai.config.Game.Tank.RotationSpeed
				} else {
					decision.AngleDelta = -ai.config.Game.Tank.RotationSpeed
				}
			}
			decision.MoveDirection = 1 // Move forward
		}
	} else {
		// Attack: face enemy and move toward them
		if math.Abs(angleDiff) > 10 {
			if angleDiff > 0 {
				decision.AngleDelta = ai.config.Game.Tank.RotationSpeed
			} else {
				decision.AngleDelta = -ai.config.Game.Tank.RotationSpeed
			}
		}

		// Move toward enemy if not too close
		if distance > 50 {
			decision.MoveDirection = 1
		} else if distance < 30 {
			decision.MoveDirection = -1 // Back away if too close
		}

		// Shoot if facing enemy
		if math.Abs(angleDiff) < 30 {
			decision.ShouldShoot = true
		}
	}

	return decision
}

// findClosestThreat finds the closest threatening bullet
func findClosestThreat(tank *types.Tank, bullets []*types.Bullet) *types.Bullet {
	tankCenterX := tank.X + 12 // Approximate center
	tankCenterY := tank.Y + 12
	minDist := math.MaxFloat64
	var closest *types.Bullet

	for _, bullet := range bullets {
		if bullet.Owner == tank.Color || bullet.Exploding {
			continue
		}

		dist := Distance(bullet.X, bullet.Y, tankCenterX, tankCenterY)
		if dist < minDist {
			minDist = dist
			closest = bullet
		}
	}

	return closest
}

