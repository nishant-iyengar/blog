package types

// GameConfig represents the shared game configuration loaded from JSON
type GameConfig struct {
	Game GameConfigGame `json:"game"`
	RL   RLConfig       `json:"rl"`
	Model ModelConfig   `json:"model"`
}

type GameConfigGame struct {
	Tank      TankConfig      `json:"tank"`
	Bullet    BulletConfig    `json:"bullet"`
	Timing    TimingConfig    `json:"timing"`
	Sun       SunConfig       `json:"sun"`
	Spawn     SpawnConfig     `json:"spawn"`
	Collision CollisionConfig `json:"collision"`
	Map       MapConfig       `json:"map"`
}

type TankConfig struct {
	Size          float64 `json:"size"`
	CollisionSize float64 `json:"collisionSize"`
	Speed         float64 `json:"speed"`
	RotationSpeed float64 `json:"rotationSpeed"`
	Lives         int     `json:"lives"`
	SpawnOffset    float64 `json:"spawnOffset"`
}

type BulletConfig struct {
	SpeedMultiplier float64 `json:"speedMultiplier"`
	MaxPerTank      int     `json:"maxPerTank"`
	MaxAge          int     `json:"maxAge"`
	FadeDuration    int     `json:"fadeDuration"`
	Radius          float64 `json:"radius"`
	CollisionSize   float64 `json:"collisionSize"`
}

type TimingConfig struct {
	TickRate        int `json:"tickRate"`
	ShootingCooldown int `json:"shootingCooldown"`
}

type SunConfig struct {
	GravitationalConstant float64 `json:"gravitationalConstant"`
	Mass                  float64 `json:"mass"`
	InfluenceRadius       float64 `json:"influenceRadius"`
	MinDistance           float64 `json:"minDistance"`
}

type SpawnConfig struct {
	Padding     float64 `json:"padding"`
	MaxAttempts int     `json:"maxAttempts"`
	MinDistance float64 `json:"minDistance"`
}

type CollisionConfig struct {
	Epsilon          float64 `json:"epsilon"`
	BulletMinVelocity float64 `json:"bulletMinVelocity"`
}

type MapConfig struct {
	Width  int `json:"width"`
	Height int `json:"height"`
}

type RLConfig struct {
	Reward      RewardConfig      `json:"reward"`
	Observation ObservationConfig `json:"observation"`
	Action      ActionConfig      `json:"action"`
	DQN         DQNConfig        `json:"dqn"`
	Training    TrainingConfig   `json:"training"`
}

type RewardConfig struct {
	TimeoutPenalty              float64 `json:"timeoutPenalty"`
	MaxEpisodeTimeMs            int     `json:"maxEpisodeTimeMs"`
	SurvivalRewardPerTick       float64 `json:"survivalRewardPerTick"`
	HitEnemyReward              float64 `json:"hitEnemyReward"`
	GotHitPenalty               float64 `json:"gotHitPenalty"`
	OptimalDistanceToEnemy      float64 `json:"optimalDistanceToEnemy"`
	InactivityThresholdMs       int     `json:"inactivityThresholdMs"`
	SignificantMovementThreshold float64 `json:"significantMovementThreshold"`
	AggressionCheckIntervalMs   int     `json:"aggressionCheckIntervalMs"`
	DodgeRewardPerBullet        float64 `json:"dodgeRewardPerBullet"`
	RecentBulletThresholdMs     int     `json:"recentBulletThresholdMs"`
	PositionHistorySize         int     `json:"positionHistorySize"`
	PositionRepeatThreshold     float64 `json:"positionRepeatThreshold"`
	ThreatDistance              float64 `json:"threatDistance"`
	BulletMatchDistance         float64 `json:"bulletMatchDistance"`
	MovementAwayThreshold       float64 `json:"movementAwayThreshold"`
	ShotAccuracyMaxDistance     float64 `json:"shotAccuracyMaxDistance"`
	MovementRewardMax           float64 `json:"movementRewardMax"`
	MovementRewardMultiplier    float64 `json:"movementRewardMultiplier"`
	StagnationPenalty           float64 `json:"stagnationPenalty"`
	StalematePenalty            float64 `json:"stalematePenalty"`
	RepetitiveActionPenalty     float64 `json:"repetitiveActionPenalty"`
	PositionDiversityReward     float64 `json:"positionDiversityReward"`
	LifeAdvantageReward         float64 `json:"lifeAdvantageReward"`
	InactivityBasePenalty       float64 `json:"inactivityBasePenalty"`
	InactivityMaxPenalty        float64 `json:"inactivityMaxPenalty"`
	InactivityScalingFactor     float64 `json:"inactivityScalingFactor"`
	LackOfAggressionPenalty     float64 `json:"lackOfAggressionPenalty"`
}

type ObservationConfig struct {
	MaxBullets       int `json:"maxBullets"`
	MaxSuns          int `json:"maxSuns"`
	BarrierDirections int `json:"barrierDirections"`
	BulletFeatures   int `json:"bulletFeatures"`
	SunFeatures      int `json:"sunFeatures"`
	Size             int `json:"size"`
}

type ActionDefinition struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type ActionConfig struct {
	NumDiscreteActions int                `json:"numDiscreteActions"`
	Actions            []ActionDefinition `json:"actions"`
}

type DQNConfig struct {
	ObservationSize      int       `json:"observationSize"`
	ActionSize           int       `json:"actionSize"`
	LearningRate         float64   `json:"learningRate"`
	HiddenLayers         []int     `json:"hiddenLayers"`
	Gamma                float64   `json:"gamma"`
	EpsilonStart         float64   `json:"epsilonStart"`
	EpsilonEnd           float64   `json:"epsilonEnd"`
	EpsilonDecay         float64   `json:"epsilonDecay"`
	BatchSize            int       `json:"batchSize"`
	ReplayBufferSize     int       `json:"replayBufferSize"`
	TargetUpdateFrequency int       `json:"targetUpdateFrequency"`
}

type TrainingConfig struct {
	SimulationsPerBatch int `json:"simulationsPerBatch"`
	SpeedMultiplier     int `json:"speedMultiplier"`
	SaveIntervalMinutes int `json:"saveIntervalMinutes"`
}

type ModelConfig struct {
	Architecture ArchitectureConfig `json:"architecture"`
	Weights      WeightsConfig      `json:"weights"`
}

type ArchitectureConfig struct {
	InputSize       int      `json:"inputSize"`
	HiddenLayers    []int    `json:"hiddenLayers"`
	OutputSize      int      `json:"outputSize"`
	Activation      string   `json:"activation"`
	OutputActivation string  `json:"outputActivation"`
}

type WeightsConfig struct {
	Format    string            `json:"format"`
	Structure []LayerStructure  `json:"structure"`
}

type LayerStructure struct {
	Layer  int    `json:"layer"`
	Type   string `json:"type"`
	Weights string `json:"weights"`
	Biases  string `json:"biases"`
}

// Game state types (matching TypeScript interfaces)
type Tank struct {
	X                  float64 `json:"X"`
	Y                  float64 `json:"Y"`
	Angle              float64 `json:"Angle"` // degrees
	Lives              int     `json:"Lives"`
	Color              string  `json:"Color"` // "blue" or "red"
	Exploding          bool    `json:"Exploding"`
	ExplosionStartTime *int64  `json:"ExplosionStartTime,omitempty"`
	Respawning         bool    `json:"Respawning"`
	RespawnStartTime   *int64  `json:"RespawnStartTime,omitempty"`
	RespawnTargetX     *float64 `json:"RespawnTargetX,omitempty"`
	RespawnTargetY     *float64 `json:"RespawnTargetY,omitempty"`
	RespawnTargetAngle *float64 `json:"RespawnTargetAngle,omitempty"`
	InvincibleUntil    *int64  `json:"InvincibleUntil,omitempty"`
}

type Bullet struct {
	X                  float64 `json:"X"`
	Y                  float64 `json:"Y"`
	Angle              float64 `json:"Angle"`
	Speed              float64 `json:"Speed"`
	Owner              string  `json:"Owner"` // "blue" or "red"
	CreatedAt          int64   `json:"CreatedAt"` // timestamp in milliseconds
	Vx                 float64 `json:"Vx"` // velocity x component
	Vy                 float64 `json:"Vy"` // velocity y component
	Exploding          bool    `json:"Exploding"`
	ExplosionStartTime *int64  `json:"ExplosionStartTime,omitempty"`
}

type Barrier struct {
	X      float64 `json:"X"`
	Y      float64 `json:"Y"`
	Width  float64 `json:"Width"`
	Height float64 `json:"Height"`
}

type Sun struct {
	X      float64 `json:"X"`
	Y      float64 `json:"Y"`
	Radius float64 `json:"Radius"` // Note: field is Radius, not Size
}

type AIDecision struct {
	AngleDelta     float64
	MoveDirection  int // 1 = forward, -1 = backward, 0 = none
	ShouldShoot    bool
	ShootAngle     *float64
}

type Observation struct {
	Vector []float64
	Size   int
}

type Step struct {
	State     []float64
	Action    int
	Reward    float64
	NextState []float64
	Done      bool
}

// Model weights structure for storage
type ModelWeights struct {
	Layers   []LayerWeights `json:"layers"`
	Metadata ModelMetadata  `json:"metadata"`
}

type LayerWeights struct {
	Layer   int       `json:"layer"`
	Weights []float64 `json:"weights"` // flattened matrix
	Biases  []float64 `json:"biases"`
}

type ModelMetadata struct {
	Version   int     `json:"version"`
	Timestamp string  `json:"timestamp"`
	EvalScore float64 `json:"evalScore"`
	Episodes  int     `json:"episodes"`
	IsDefault *bool   `json:"isDefault,omitempty"` // nil = false, true = this is a default model
	Source    string  `json:"source,omitempty"`    // "imitation_learning", "rl_training", etc.
}

