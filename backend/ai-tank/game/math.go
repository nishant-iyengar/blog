package game

import "math"

// Distance calculates Euclidean distance between two points
func Distance(x1, y1, x2, y2 float64) float64 {
	dx := x2 - x1
	dy := y2 - y1
	return math.Sqrt(dx*dx + dy*dy)
}

// Normalize normalizes a value to [0, 1] range
func Normalize(value, min, max float64) float64 {
	if max == min {
		return 0.5
	}
	return math.Max(0, math.Min(1, (value-min)/(max-min)))
}

// NormalizeAngle normalizes angle to [0, 1] range (0-360 degrees -> 0-1)
func NormalizeAngle(angle float64) float64 {
	normalized := math.Mod(angle, 360)
	if normalized < 0 {
		normalized += 360
	}
	return normalized / 360
}

// NormalizeAngleDifference normalizes angle difference to [-1, 1] range
func NormalizeAngleDifference(angleDiff float64) float64 {
	for angleDiff > 180 {
		angleDiff -= 360
	}
	for angleDiff < -180 {
		angleDiff += 360
	}
	return angleDiff / 180
}

// GetTankCenter returns the center coordinates of a tank
func GetTankCenter(tankX, tankY, tankSize float64) (float64, float64) {
	return tankX + tankSize/2, tankY + tankSize/2
}

