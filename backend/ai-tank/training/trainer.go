package training

import (
	"context"
	"fmt"
	"math"
	"math/rand"
	"sync"
	"time"

	"blog/backend/ai-tank/config"
	"blog/backend/ai-tank/game"
	"blog/backend/ai-tank/model"
	"blog/backend/ai-tank/types"
)

// SimulationResult contains steps from both agents' perspectives
type SimulationResult struct {
	PrimarySteps []types.Step
	EnemySteps   []types.Step
}

// Trainer manages the training process
type Trainer struct {
	agent             *model.DQNAgent
	enemyAgent        *model.DQNAgent // For self-play
	replayBuffer      *ReplayBuffer   // For primary agent
	enemyReplayBuffer *ReplayBuffer   // For enemy agent (in self-play mode)
	config            *types.GameConfig
	rand              *rand.Rand
	mu                sync.Mutex
	stats             *TrainingStats
	useSelfPlay       bool    // If true, both tanks use RL agents
	bestReward        float64 // Track best average reward for improvement detection
	bestLoss          float64 // Track best (lowest) loss for improvement detection
}

// TrainingStats tracks training statistics
type TrainingStats struct {
	Episodes      int
	TotalReward   float64
	AverageReward float64
	Epsilon       float64
	Loss          float64
	LastUpdate    time.Time
}

// ModelStorage is an interface for loading/saving model weights
// This breaks the import cycle between training and api packages
type ModelStorage interface {
	GetLatestModel() (*types.ModelWeights, error)
}

// NewTrainer creates a new trainer
// useSelfPlay: if true, both tanks use RL agents (self-play)
// useImitationLearning: if true, pre-train using rule-based demonstrations
// modelStorage: optional storage for loading default model weights
// demoStorage: optional storage for loading human demonstrations
func NewTrainer(useSelfPlay bool, useImitationLearning bool, modelStorage ModelStorage, demoStorage DemonstrationStorage) (*Trainer, error) {
	cfg, err := config.GetConfig()
	if err != nil {
		return nil, err
	}

	rng := rand.New(rand.NewSource(time.Now().UnixNano()))
	agent := model.NewDQNAgent(&cfg.RL.DQN, rng)

	// REQUIRED: Load best default model weights from storage before training
	// Training MUST start from human demonstration baseline - HARD ERROR if not available
	if modelStorage == nil {
		return nil, fmt.Errorf("FATAL: modelStorage is required but was nil - cannot load default model. Training requires a baseline model from human demonstrations")
	}

	// Try to get best default model (from imitation learning/human demonstrations)
	defaultStorage, ok := modelStorage.(interface {
		GetBestDefaultModel() (*types.ModelWeights, error)
	})
	if !ok {
		return nil, fmt.Errorf("FATAL: modelStorage does not implement GetBestDefaultModel() - cannot load default model. Training requires a baseline model from human demonstrations")
	}

	defaultWeights, err := defaultStorage.GetBestDefaultModel()
	if err != nil {
		return nil, fmt.Errorf("FATAL: No default model found in database. Training requires a baseline model from human demonstrations.\n"+
			"Error: %v\n"+
			"To fix this:\n"+
			"1. Play some games on the website in 'Play Your AI' mode\n"+
			"2. This will collect human demonstrations\n"+
			"3. The training service will automatically create a default model from these demonstrations\n"+
			"4. Then restart the training service", err)
	}

	if defaultWeights == nil {
		return nil, fmt.Errorf("FATAL: Default model is nil. Training requires a baseline model from human demonstrations.\n" +
			"Please play some games on the website first to collect demonstrations.")
	}

	// Load the default model weights
	if err := agent.SetWeights(defaultWeights); err != nil {
		return nil, fmt.Errorf("failed to load default model weights: %w", err)
	}

	fmt.Printf("✅ Loaded best default model from storage (Episodes: %d, Score: %.2f, Source: %s)\n",
		defaultWeights.Metadata.Episodes, defaultWeights.Metadata.EvalScore, defaultWeights.Metadata.Source)
	// Start with lower epsilon since we're starting from a trained baseline
	agent.SetEpsilon(0.2) // Low epsilon - model already has knowledge

	// Optional: Re-run imitation learning to incorporate any new demonstrations
	// Note: We already loaded the default model above, so this will refine it if new demos exist
	if useImitationLearning && demoStorage != nil {
		// Re-run imitation learning with any new demonstrations
		// This allows incorporating new human demonstrations into the existing default model
		err := ImitationLearning(agent, 50, rng, demoStorage, true) // 50 episodes of demonstrations, prefer human demos
		if err != nil {
			// Log but don't fail - we already have a default model loaded
			fmt.Printf("Warning: Additional imitation learning failed (will continue with loaded default): %v\n", err)
		} else {
			fmt.Printf("✅ Additional imitation learning completed - refined model with new demonstrations\n")

			// Evaluate the refined model
			// For now, we'll use a placeholder eval score - can be improved later
			refinedEvalScore := 10.0 // Placeholder - actual eval would run test games

			// Save as default model if it's better than existing
			if defaultStorage, ok := modelStorage.(interface {
				SaveDefaultModelIfBetter(*types.ModelWeights) (bool, error)
			}); ok {
				weights := agent.GetWeights()
				weights.Metadata.Source = "imitation_learning"
				weights.Metadata.EvalScore = refinedEvalScore
				weights.Metadata.Episodes = 0 // Pre-training doesn't count as episodes

				saved, err := defaultStorage.SaveDefaultModelIfBetter(weights)
				if err != nil {
					fmt.Printf("Warning: Failed to save refined default model: %v\n", err)
				} else if saved {
					fmt.Printf("✅ Saved refined default model (Eval Score: %.2f)\n", refinedEvalScore)
				} else {
					fmt.Printf("ℹ️  Existing default model is better or equal, keeping original\n")
				}
			}
		}
	}

	// Epsilon is already set to 0.2 from loading the default model above
	// No need to adjust further since we always start from a loaded default model

	// For self-play, create a copy of the agent for the enemy
	var enemyAgent *model.DQNAgent
	if useSelfPlay {
		enemyAgent = model.NewDQNAgent(&cfg.RL.DQN, rng)
		// Copy weights from main agent to enemy agent (they start the same)
		mainWeights := agent.GetWeights()
		if err := enemyAgent.SetWeights(mainWeights); err != nil {
			return nil, fmt.Errorf("failed to copy weights to enemy agent: %w", err)
		}
	}

	replayBuffer := NewReplayBuffer(cfg.RL.DQN.ReplayBufferSize)
	var enemyReplayBuffer *ReplayBuffer
	if useSelfPlay {
		// Create separate replay buffer for enemy agent in self-play mode
		enemyReplayBuffer = NewReplayBuffer(cfg.RL.DQN.ReplayBufferSize)
	}

	return &Trainer{
		agent:             agent,
		enemyAgent:        enemyAgent,
		replayBuffer:      replayBuffer,
		enemyReplayBuffer: enemyReplayBuffer,
		config:            cfg,
		rand:              rng,
		useSelfPlay:       useSelfPlay,
		bestReward:        -math.MaxFloat64, // Initialize to very negative value
		bestLoss:          math.MaxFloat64,  // Initialize to very large value
		stats: &TrainingStats{
			LastUpdate: time.Now(),
		},
	}, nil
}

// TrainBatch runs a batch of simulations in parallel
func (t *Trainer) TrainBatch(ctx context.Context, numSimulations int) error {
	// Run simulations in parallel
	var wg sync.WaitGroup
	simChan := make(chan SimulationResult, numSimulations)

	// Launch simulations
	for i := 0; i < numSimulations; i++ {
		wg.Add(1)
		go func(simID int) {
			defer wg.Done()
			result := t.runSimulation(ctx, simID)

			// Only send if context hasn't been cancelled
			// Use select to avoid blocking if channel is closed or context is done
			select {
			case <-ctx.Done():
				// Context cancelled, don't send
				return
			case simChan <- result:
				// Successfully sent
			}
		}(i)
	}

	// Collect results and close channel when all simulations complete
	// Use a separate goroutine to close the channel after all workers finish
	go func() {
		wg.Wait()
		close(simChan)
	}()

	// Aggregate steps from all simulations
	// Pre-allocate with estimated capacity
	estimatedTotalSteps := numSimulations * 100 // Rough estimate
	allPrimarySteps := make([]types.Step, 0, estimatedTotalSteps)
	allEnemySteps := make([]types.Step, 0, estimatedTotalSteps)
	for {
		select {
		case <-ctx.Done():
			// Context cancelled - return what we have so far
			return nil
		case result, ok := <-simChan:
			if !ok {
				// Channel closed, all simulations done
				goto done
			}
			allPrimarySteps = append(allPrimarySteps, result.PrimarySteps...)
			allEnemySteps = append(allEnemySteps, result.EnemySteps...)
		}
	}
done:

	// Add primary agent steps to replay buffer
	for _, step := range allPrimarySteps {
		t.replayBuffer.Add(step)
	}

	// Calculate total reward from collected steps
	totalReward := 0.0
	for _, step := range allPrimarySteps {
		totalReward += step.Reward
	}

	// Train primary agent on batch if we have enough samples
	if t.replayBuffer.CanSample(t.config.RL.DQN.BatchSize) {
		batch := t.replayBuffer.Sample(t.config.RL.DQN.BatchSize)
		loss, err := t.agent.Train(batch)
		if err != nil {
			return err
		}

		t.mu.Lock()
		t.stats.Loss = loss
		t.stats.Epsilon = t.agent.GetEpsilon()
		t.stats.Episodes += numSimulations
		t.stats.TotalReward += totalReward
		if t.stats.Episodes > 0 {
			t.stats.AverageReward = t.stats.TotalReward / float64(t.stats.Episodes)
		}
		t.stats.LastUpdate = time.Now()
		t.mu.Unlock()
	}

	// In self-play mode, also train the enemy agent on its experiences
	if t.useSelfPlay && t.enemyAgent != nil && t.enemyReplayBuffer != nil && len(allEnemySteps) > 0 {
		// Add enemy steps to enemy replay buffer
		for _, step := range allEnemySteps {
			t.enemyReplayBuffer.Add(step)
		}

		// Train enemy agent if we have enough samples
		if t.enemyReplayBuffer.CanSample(t.config.RL.DQN.BatchSize) {
			enemyBatch := t.enemyReplayBuffer.Sample(t.config.RL.DQN.BatchSize)
			_, err := t.enemyAgent.Train(enemyBatch)
			if err != nil {
				// Log but don't fail - enemy training is secondary
				fmt.Printf("Warning: Enemy agent training failed: %v\n", err)
			}
		}
	}

	return nil
}

// runSimulation runs a single simulation and returns collected steps from both agents' perspectives
func (t *Trainer) runSimulation(ctx context.Context, simID int) SimulationResult {
	// Pre-allocate slice with estimated capacity to reduce allocations
	// Estimate: maxSteps will be around 100-500 steps typically
	estimatedSteps := int(float64(t.config.RL.Reward.MaxEpisodeTimeMs) / (1000.0 / float64(t.config.Game.Timing.TickRate)))
	if estimatedSteps < 50 {
		estimatedSteps = 50
	}
	primarySteps := make([]types.Step, 0, estimatedSteps)
	enemySteps := make([]types.Step, 0, estimatedSteps)

	// Create a unique random number generator for this simulation
	// Use simID to ensure different random behavior across parallel simulations
	simRNG := rand.New(rand.NewSource(time.Now().UnixNano() + int64(simID*1000)))

	// Create game simulation with self-play if enabled
	sim, err := game.NewGameSimulation(t.agent, t.enemyAgent, simRNG)
	if err != nil {
		// If simulation creation fails, return empty steps
		return SimulationResult{PrimarySteps: primarySteps, EnemySteps: enemySteps}
	}

	// Run simulation at 1x speed (normal speed for training)
	tickInterval := 1000.0 / float64(t.config.Game.Timing.TickRate)
	ticksPerStep := 1 // Always run 1 tick per step

	// Calculate max steps
	maxSteps := int(float64(t.config.RL.Reward.MaxEpisodeTimeMs) / tickInterval)

	var previousState *PreviousState
	var previousObservation *types.Observation

	// For enemy agent (in self-play mode)
	var previousEnemyState *PreviousState
	var previousEnemyObservation *types.Observation
	var enemyDecision *types.AIDecision // Declare outside loop for scope

	for step := 0; step < maxSteps; step++ {
		// Check context cancellation
		select {
		case <-ctx.Done():
			return SimulationResult{PrimarySteps: primarySteps, EnemySteps: enemySteps}
		default:
		}

		// Get current state before ticking
		currentGameStateBeforeTick, _ := sim.GetState()

		// Convert to AIContext for observation and action selection
		currentAIContext := &AIContext{
			AITank:    currentGameStateBeforeTick.AITank,
			EnemyTank: currentGameStateBeforeTick.EnemyTank,
			Bullets:   currentGameStateBeforeTick.Bullets,
			Barriers:  currentGameStateBeforeTick.Barriers,
			Suns:      currentGameStateBeforeTick.Suns,
			MapWidth:  currentGameStateBeforeTick.MapWidth,
			MapHeight: currentGameStateBeforeTick.MapHeight,
			TickTime:  currentGameStateBeforeTick.TickTime,
		}

		// Extract observation and get action from agent
		observation := ExtractObservation(currentAIContext, t.config)
		action := t.agent.SelectAction(observation.Vector, true)

		// Convert action to decision
		decision := convertActionToDecision(action, currentGameStateBeforeTick.AITank.Angle, t.config)

		// Get enemy decision if self-play is enabled
		enemyDecision = nil // Reset each iteration
		if t.useSelfPlay && t.enemyAgent != nil {
			// Create enemy context (flipped perspective)
			enemyAIContext := &AIContext{
				AITank:    currentGameStateBeforeTick.EnemyTank,
				EnemyTank: currentGameStateBeforeTick.AITank, // Enemy's perspective
				Bullets:   currentGameStateBeforeTick.Bullets,
				Barriers:  currentGameStateBeforeTick.Barriers,
				Suns:      currentGameStateBeforeTick.Suns,
				MapWidth:  currentGameStateBeforeTick.MapWidth,
				MapHeight: currentGameStateBeforeTick.MapHeight,
				TickTime:  currentGameStateBeforeTick.TickTime,
			}
			enemyObservation := ExtractObservation(enemyAIContext, t.config)
			enemyAction := t.enemyAgent.SelectAction(enemyObservation.Vector, true)
			enemyDecision = convertActionToDecision(enemyAction, currentGameStateBeforeTick.EnemyTank.Angle, t.config)
			previousEnemyObservation = enemyObservation
		}

		// Run multiple ticks per step for speed multiplier
		decisions := map[int]*types.AIDecision{0: decision} // Tank 0 (AI) gets the decision
		if enemyDecision != nil {
			decisions[1] = enemyDecision // Tank 1 (Enemy) gets its decision
		}
		for tick := 0; tick < ticksPerStep; tick++ {
			done := sim.Tick(decisions)
			if done {
				// Episode ended
				if previousState != nil && previousObservation != nil {
					// Final step with done=true
					currentGameStateAfterTick, _ := sim.GetState()

					currentAIContextAfter := &AIContext{
						AITank:    currentGameStateAfterTick.AITank,
						EnemyTank: currentGameStateAfterTick.EnemyTank,
						Bullets:   currentGameStateAfterTick.Bullets,
						Barriers:  currentGameStateAfterTick.Barriers,
						Suns:      currentGameStateAfterTick.Suns,
						MapWidth:  currentGameStateAfterTick.MapWidth,
						MapHeight: currentGameStateAfterTick.MapHeight,
						TickTime:  currentGameStateAfterTick.TickTime,
					}

					currentObs := ExtractObservation(currentAIContextAfter, t.config)

					// Calculate final reward
					currentStateStruct := &CurrentState{
						AITank:     currentGameStateAfterTick.AITank,
						EnemyTank:  currentGameStateAfterTick.EnemyTank,
						Bullets:    currentGameStateAfterTick.Bullets,
						AILives:    currentGameStateAfterTick.AITank.Lives,
						EnemyLives: currentGameStateAfterTick.EnemyTank.Lives,
						TickTime:   currentGameStateAfterTick.TickTime,
					}

					rewardInfo := CalculateReward(previousState, currentStateStruct, decision, &t.config.RL)

					actionNum := decisionToAction(decision)
					step := types.Step{
						State:     previousObservation.Vector,
						Action:    actionNum,
						Reward:    rewardInfo.Reward,
						NextState: currentObs.Vector,
						Done:      true,
					}
					primarySteps = append(primarySteps, step)

					// Also collect enemy step if in self-play mode
					if t.useSelfPlay && t.enemyAgent != nil && previousEnemyState != nil && previousEnemyObservation != nil {
						// Calculate reward from enemy's perspective (flip the reward)
						enemyStateStruct := &CurrentState{
							AITank:     currentGameStateAfterTick.EnemyTank, // Enemy is "AI" from its perspective
							EnemyTank:  currentGameStateAfterTick.AITank,    // Primary AI is "enemy" from enemy's perspective
							Bullets:    currentGameStateAfterTick.Bullets,
							AILives:    currentGameStateAfterTick.EnemyTank.Lives,
							EnemyLives: currentGameStateAfterTick.AITank.Lives,
							TickTime:   currentGameStateAfterTick.TickTime,
						}
						enemyRewardInfo := CalculateReward(previousEnemyState, enemyStateStruct, enemyDecision, &t.config.RL)
						enemyActionNum := decisionToAction(enemyDecision)
						enemyObs := ExtractObservation(&AIContext{
							AITank:    currentGameStateAfterTick.EnemyTank,
							EnemyTank: currentGameStateAfterTick.AITank,
							Bullets:   currentGameStateAfterTick.Bullets,
							Barriers:  currentGameStateAfterTick.Barriers,
							Suns:      currentGameStateAfterTick.Suns,
							MapWidth:  currentGameStateAfterTick.MapWidth,
							MapHeight: currentGameStateAfterTick.MapHeight,
							TickTime:  currentGameStateAfterTick.TickTime,
						}, t.config)
						enemyStep := types.Step{
							State:     previousEnemyObservation.Vector,
							Action:    enemyActionNum,
							Reward:    enemyRewardInfo.Reward,
							NextState: enemyObs.Vector,
							Done:      true,
						}
						enemySteps = append(enemySteps, enemyStep)
					}
				}
				return SimulationResult{PrimarySteps: primarySteps, EnemySteps: enemySteps}
			}
		}

		// Get current state after ticking
		currentGameStateAfterTick, _ := sim.GetState()

		// Convert to AIContext for observation extraction
		currentAIContextAfter := &AIContext{
			AITank:    currentGameStateAfterTick.AITank,
			EnemyTank: currentGameStateAfterTick.EnemyTank,
			Bullets:   currentGameStateAfterTick.Bullets,
			Barriers:  currentGameStateAfterTick.Barriers,
			Suns:      currentGameStateAfterTick.Suns,
			MapWidth:  currentGameStateAfterTick.MapWidth,
			MapHeight: currentGameStateAfterTick.MapHeight,
			TickTime:  currentGameStateAfterTick.TickTime,
		}

		currentObs := ExtractObservation(currentAIContextAfter, t.config)

		// If we have a previous state, create a training step
		if previousState != nil && previousObservation != nil {
			currentStateStruct := &CurrentState{
				AITank:     currentGameStateAfterTick.AITank,
				EnemyTank:  currentGameStateAfterTick.EnemyTank,
				Bullets:    currentGameStateAfterTick.Bullets,
				AILives:    currentGameStateAfterTick.AITank.Lives,
				EnemyLives: currentGameStateAfterTick.EnemyTank.Lives,
				TickTime:   currentGameStateAfterTick.TickTime,
			}

			rewardInfo := CalculateReward(previousState, currentStateStruct, decision, &t.config.RL)

			// Get action from decision
			actionNum := decisionToAction(decision)

			step := types.Step{
				State:     previousObservation.Vector,
				Action:    actionNum,
				Reward:    rewardInfo.Reward,
				NextState: currentObs.Vector,
				Done:      false,
			}
			primarySteps = append(primarySteps, step)

			// Also collect enemy step if in self-play mode
			if t.useSelfPlay && t.enemyAgent != nil && previousEnemyState != nil && previousEnemyObservation != nil {
				// Calculate reward from enemy's perspective
				enemyStateStruct := &CurrentState{
					AITank:     currentGameStateAfterTick.EnemyTank,
					EnemyTank:  currentGameStateAfterTick.AITank,
					Bullets:    currentGameStateAfterTick.Bullets,
					AILives:    currentGameStateAfterTick.EnemyTank.Lives,
					EnemyLives: currentGameStateAfterTick.AITank.Lives,
					TickTime:   currentGameStateAfterTick.TickTime,
				}
				enemyRewardInfo := CalculateReward(previousEnemyState, enemyStateStruct, enemyDecision, &t.config.RL)
				enemyActionNum := decisionToAction(enemyDecision)
				enemyStep := types.Step{
					State:  previousEnemyObservation.Vector,
					Action: enemyActionNum,
					Reward: enemyRewardInfo.Reward,
					NextState: ExtractObservation(&AIContext{
						AITank:    currentGameStateAfterTick.EnemyTank,
						EnemyTank: currentGameStateAfterTick.AITank,
						Bullets:   currentGameStateAfterTick.Bullets,
						Barriers:  currentGameStateAfterTick.Barriers,
						Suns:      currentGameStateAfterTick.Suns,
						MapWidth:  currentGameStateAfterTick.MapWidth,
						MapHeight: currentGameStateAfterTick.MapHeight,
						TickTime:  currentGameStateAfterTick.TickTime,
					}, t.config).Vector,
					Done: false,
				}
				enemySteps = append(enemySteps, enemyStep)
			}
		}

		// Update previous state for next iteration
		previousState = &PreviousState{
			AITank:            currentGameStateAfterTick.AITank,
			EnemyTank:         currentGameStateAfterTick.EnemyTank,
			Bullets:           currentGameStateAfterTick.Bullets,
			AILives:           currentGameStateAfterTick.AITank.Lives,
			EnemyLives:        currentGameStateAfterTick.EnemyTank.Lives,
			TickTime:          currentGameStateAfterTick.TickTime,
			AIPositionHistory: []PositionHistory{},
			LastMovementTime:  &currentGameStateAfterTick.TickTime,
			LastShotTime:      nil,
			EpisodeStartTime:  nil, // Will be set from simulation if needed
			TimeoutApplied:    false,
		}

		if decision.ShouldShoot {
			previousState.LastShotTime = &currentGameStateAfterTick.TickTime
		}

		previousObservation = currentObs

		// Update enemy previous state if in self-play mode
		if t.useSelfPlay && t.enemyAgent != nil {
			previousEnemyState = &PreviousState{
				AITank:            currentGameStateAfterTick.EnemyTank,
				EnemyTank:         currentGameStateAfterTick.AITank,
				Bullets:           currentGameStateAfterTick.Bullets,
				AILives:           currentGameStateAfterTick.EnemyTank.Lives,
				EnemyLives:        currentGameStateAfterTick.AITank.Lives,
				TickTime:          currentGameStateAfterTick.TickTime,
				AIPositionHistory: []PositionHistory{},
				LastMovementTime:  &currentGameStateAfterTick.TickTime,
				LastShotTime:      nil,
				EpisodeStartTime:  nil,
				TimeoutApplied:    false,
			}
			if enemyDecision != nil && enemyDecision.ShouldShoot {
				previousEnemyState.LastShotTime = &currentGameStateAfterTick.TickTime
			}
			// Update enemy observation for next iteration
			enemyAIContextAfter := &AIContext{
				AITank:    currentGameStateAfterTick.EnemyTank,
				EnemyTank: currentGameStateAfterTick.AITank,
				Bullets:   currentGameStateAfterTick.Bullets,
				Barriers:  currentGameStateAfterTick.Barriers,
				Suns:      currentGameStateAfterTick.Suns,
				MapWidth:  currentGameStateAfterTick.MapWidth,
				MapHeight: currentGameStateAfterTick.MapHeight,
				TickTime:  currentGameStateAfterTick.TickTime,
			}
			previousEnemyObservation = ExtractObservation(enemyAIContextAfter, t.config)
		}
	}

	return SimulationResult{PrimarySteps: primarySteps, EnemySteps: enemySteps}
}

// DebugSimulationStep represents a single step in a debug simulation
type DebugSimulationStep struct {
	StepNumber      int                `json:"stepNumber"`
	GameState       *game.GameState    `json:"gameState"`
	Observation     *types.Observation `json:"observation"`
	Action          int                `json:"action"`
	ActionName      string             `json:"actionName"`
	Reward          float64            `json:"reward"`
	RewardBreakdown *RewardBreakdown   `json:"rewardBreakdown"`
	Done            bool               `json:"done"`
	TickTime        int64              `json:"tickTime"`
}

// RunDebugSimulation runs simulations continuously and streams game state at a throttled frame rate
// Auto-restarts when a game ends. Returns a channel that yields DebugSimulationStep at a throttled rate
// Throttles to 60 FPS (or configurable) for smooth visualization without overwhelming the client
func (t *Trainer) RunDebugSimulation(ctx context.Context) <-chan DebugSimulationStep {
	stepChan := make(chan DebugSimulationStep, 10) // Buffered to prevent blocking

	go func() {
		defer close(stepChan)

		// Throttle to 60 FPS for visualization (16.67ms per frame)
		// This is much more reasonable than streaming 72 ticks/sec
		// For comparison: most multiplayer games send updates at 10-20 Hz
		targetFPS := 60.0
		frameInterval := time.Duration(1000.0/targetFPS) * time.Millisecond // ~16.67ms per frame

		for {
			// Check context cancellation before starting new game
			select {
			case <-ctx.Done():
				return
			default:
			}

			// Create a unique random number generator for this game
			simRNG := rand.New(rand.NewSource(time.Now().UnixNano()))

			// Create game simulation
			sim, err := game.NewGameSimulation(t.agent, t.enemyAgent, simRNG)
			if err != nil {
				// If simulation creation fails, wait a bit and retry
				select {
				case <-ctx.Done():
					return
				case <-time.After(100 * time.Millisecond):
					continue
				}
			}

			// Run simulation at 1x speed, but throttle streaming to target FPS
			tickInterval := 1000.0 / float64(t.config.Game.Timing.TickRate)
			maxTicks := int(float64(t.config.RL.Reward.MaxEpisodeTimeMs) / tickInterval)

			var previousState *PreviousState
			var previousObservation *types.Observation
			tickNumber := 0
			lastFrameTime := time.Now() // Initialize frame timing for throttling

			for tick := 0; tick < maxTicks; tick++ {
				// Check context cancellation
				select {
				case <-ctx.Done():
					return
				default:
				}

				// Get current state before ticking
				currentGameStateBeforeTick, _ := sim.GetState()

				// Convert to AIContext for observation and action selection
				currentAIContext := &AIContext{
					AITank:    currentGameStateBeforeTick.AITank,
					EnemyTank: currentGameStateBeforeTick.EnemyTank,
					Bullets:   currentGameStateBeforeTick.Bullets,
					Barriers:  currentGameStateBeforeTick.Barriers,
					Suns:      currentGameStateBeforeTick.Suns,
					MapWidth:  currentGameStateBeforeTick.MapWidth,
					MapHeight: currentGameStateBeforeTick.MapHeight,
					TickTime:  currentGameStateBeforeTick.TickTime,
				}

				// Extract observation and get action from agent
				observation := ExtractObservation(currentAIContext, t.config)
				action := t.agent.SelectAction(observation.Vector, false) // No exploration for visualization

				// Convert action to decision
				decision := convertActionToDecision(action, currentGameStateBeforeTick.AITank.Angle, t.config)
				actionName := getActionName(action)

				// Get enemy decision if in self-play mode
				decisions := map[int]*types.AIDecision{0: decision}
				if t.useSelfPlay && t.enemyAgent != nil {
					// Get enemy observation (from enemy's perspective)
					enemyContext := &AIContext{
						AITank:    currentGameStateBeforeTick.EnemyTank, // Enemy is "AI" from its perspective
						EnemyTank: currentGameStateBeforeTick.AITank,    // Our AI is "enemy" from enemy's perspective
						Bullets:   currentGameStateBeforeTick.Bullets,
						Barriers:  currentGameStateBeforeTick.Barriers,
						Suns:      currentGameStateBeforeTick.Suns,
						MapWidth:  currentGameStateBeforeTick.MapWidth,
						MapHeight: currentGameStateBeforeTick.MapHeight,
						TickTime:  currentGameStateBeforeTick.TickTime,
					}
					enemyObservation := ExtractObservation(enemyContext, t.config)
					enemyAction := t.enemyAgent.SelectAction(enemyObservation.Vector, false)
					enemyDecision := convertActionToDecision(enemyAction, currentGameStateBeforeTick.EnemyTank.Angle, t.config)
					decisions[1] = enemyDecision
				}

				// Run one tick
				done := sim.Tick(decisions)

				// Get current state after ticking
				currentGameStateAfterTick, _ := sim.GetState()

				// Calculate reward if we have previous state
				var reward float64
				var rewardBreakdown *RewardBreakdown
				if previousState != nil && previousObservation != nil {
					currentStateStruct := &CurrentState{
						AITank:     currentGameStateAfterTick.AITank,
						EnemyTank:  currentGameStateAfterTick.EnemyTank,
						Bullets:    currentGameStateAfterTick.Bullets,
						AILives:    currentGameStateAfterTick.AITank.Lives,
						EnemyLives: currentGameStateAfterTick.EnemyTank.Lives,
						TickTime:   currentGameStateAfterTick.TickTime,
					}

					rewardInfo := CalculateReward(previousState, currentStateStruct, decision, &t.config.RL)
					reward = rewardInfo.Reward
					rewardBreakdown = &rewardInfo.Breakdown
				}

				// Throttle streaming to target FPS (don't send every tick)
				now := time.Now()
				timeSinceLastFrame := now.Sub(lastFrameTime)

				// Only send frame if enough time has passed (throttle to target FPS) or game is done
				if timeSinceLastFrame >= frameInterval || done {
					// Send game state at throttled rate for smooth visualization
					debugStep := DebugSimulationStep{
						StepNumber:      tickNumber,
						GameState:       currentGameStateAfterTick,
						Observation:     observation,
						Action:          action,
						ActionName:      actionName,
						Reward:          reward,
						RewardBreakdown: rewardBreakdown,
						Done:            done,
						TickTime:        currentGameStateAfterTick.TickTime,
					}

					select {
					case <-ctx.Done():
						return
					case stepChan <- debugStep:
						lastFrameTime = now // Update last frame time only when we actually send
					}
				}

				if done {
					// Game ended, break to start a new game
					break
				}

				// Small sleep to prevent CPU spinning when throttling
				// This helps when we're skipping frames due to throttling
				if timeSinceLastFrame < frameInterval {
					time.Sleep(time.Millisecond) // Small sleep to yield CPU
				}

				// Update previous state for next iteration
				previousState = &PreviousState{
					AITank:            currentGameStateAfterTick.AITank,
					EnemyTank:         currentGameStateAfterTick.EnemyTank,
					Bullets:           currentGameStateAfterTick.Bullets,
					AILives:           currentGameStateAfterTick.AITank.Lives,
					EnemyLives:        currentGameStateAfterTick.EnemyTank.Lives,
					TickTime:          currentGameStateAfterTick.TickTime,
					AIPositionHistory: []PositionHistory{},
					LastMovementTime:  &currentGameStateAfterTick.TickTime,
					LastShotTime:      nil,
					EpisodeStartTime:  nil,
					TimeoutApplied:    false,
				}

				if decision.ShouldShoot {
					previousState.LastShotTime = &currentGameStateAfterTick.TickTime
				}

				previousObservation = observation
				tickNumber++
			}

			// Small delay before starting next game
			select {
			case <-ctx.Done():
				return
			case <-time.After(500 * time.Millisecond):
				// Continue to next iteration (new game)
			}
		}
	}()

	return stepChan
}

// getActionName returns a human-readable name for an action
func getActionName(action int) string {
	actionNames := map[int]string{
		0:  "NO_ACTION",
		1:  "ROTATE_LEFT",
		2:  "ROTATE_RIGHT",
		3:  "MOVE_FORWARD",
		4:  "MOVE_BACKWARD",
		5:  "SHOOT",
		6:  "ROTATE_LEFT_FORWARD",
		7:  "ROTATE_RIGHT_FORWARD",
		8:  "ROTATE_LEFT_SHOOT",
		9:  "ROTATE_RIGHT_SHOOT",
		10: "MOVE_FORWARD_SHOOT",
		11: "MOVE_BACKWARD_SHOOT",
		12: "ROTATE_LEFT_BACKWARD",
		13: "ROTATE_RIGHT_BACKWARD",
	}
	if name, ok := actionNames[action]; ok {
		return name
	}
	return fmt.Sprintf("UNKNOWN_ACTION_%d", action)
}

// convertActionToDecision converts a discrete action to a game decision
// Action definitions are standardized in shared/config/game-config.json
// This function implements the mapping defined by rl.action.actions
func convertActionToDecision(action int, currentAngle float64, config *types.GameConfig) *types.AIDecision {
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

// decisionToAction converts a decision to a discrete action number
// Maps all 14 possible actions: 0=NO_ACTION, 1-2=ROTATE, 3-4=MOVE, 5=SHOOT,
// 6-7=ROTATE+MOVE_FORWARD, 8-9=ROTATE+SHOOT, 10-11=MOVE+SHOOT, 12-13=ROTATE+MOVE_BACKWARD
func decisionToAction(decision *types.AIDecision) int {
	// Check for shooting actions first (they take priority)
	if decision.ShouldShoot {
		if decision.MoveDirection > 0 {
			return 10 // MOVE_FORWARD_SHOOT
		} else if decision.MoveDirection < 0 {
			return 11 // MOVE_BACKWARD_SHOOT
		} else if decision.AngleDelta < 0 {
			return 8 // ROTATE_LEFT_SHOOT
		} else if decision.AngleDelta > 0 {
			return 9 // ROTATE_RIGHT_SHOOT
		}
		return 5 // SHOOT
	}

	// Movement actions
	if decision.MoveDirection > 0 {
		if decision.AngleDelta < 0 {
			return 6 // ROTATE_LEFT_FORWARD
		} else if decision.AngleDelta > 0 {
			return 7 // ROTATE_RIGHT_FORWARD
		}
		return 3 // MOVE_FORWARD
	} else if decision.MoveDirection < 0 {
		if decision.AngleDelta < 0 {
			return 12 // ROTATE_LEFT_BACKWARD
		} else if decision.AngleDelta > 0 {
			return 13 // ROTATE_RIGHT_BACKWARD
		}
		return 4 // MOVE_BACKWARD
	}

	// Rotation-only actions
	if decision.AngleDelta < 0 {
		return 1 // ROTATE_LEFT
	} else if decision.AngleDelta > 0 {
		return 2 // ROTATE_RIGHT
	}

	return 0 // NO_ACTION
}

// GetStats returns current training statistics
func (t *Trainer) GetStats() *TrainingStats {
	t.mu.Lock()
	defer t.mu.Unlock()

	stats := *t.stats
	return &stats
}

// HasImproved checks if the model has improved and updates best metrics
// Returns true if model improved (better reward or lower loss)
// improvementThreshold: minimum improvement to consider (e.g., 0.1 for 10% improvement)
func (t *Trainer) HasImproved(improvementThreshold float64) bool {
	t.mu.Lock()
	defer t.mu.Unlock()

	improved := false

	// Check reward improvement (higher is better)
	// Only check if we have enough episodes to have meaningful averages
	if t.stats.Episodes >= 100 {
		rewardImproved := false
		if t.bestReward == -math.MaxFloat64 {
			// First time - initialize with current reward
			t.bestReward = t.stats.AverageReward
		} else if t.stats.AverageReward > t.bestReward {
			// Check if improvement is significant (above threshold)
			if t.bestReward <= 0 {
				// If best was negative, any positive is improvement
				if t.stats.AverageReward > 0 {
					rewardImproved = true
				} else {
					// Both negative - check absolute improvement
					improvement := t.stats.AverageReward - t.bestReward
					if improvement >= improvementThreshold {
						rewardImproved = true
					}
				}
			} else {
				// Both positive - check percentage improvement
				improvementPercent := (t.stats.AverageReward - t.bestReward) / math.Abs(t.bestReward)
				if improvementPercent >= improvementThreshold {
					rewardImproved = true
				}
			}

			if rewardImproved {
				t.bestReward = t.stats.AverageReward
				improved = true
			}
		}
	}

	// Check loss improvement (lower is better)
	// Only check if we have meaningful loss values
	if t.stats.Loss > 0 {
		lossImproved := false
		if t.bestLoss == math.MaxFloat64 {
			// First time - initialize with current loss
			t.bestLoss = t.stats.Loss
		} else if t.stats.Loss < t.bestLoss {
			// Check if improvement is significant
			if t.bestLoss > 0 {
				improvementPercent := (t.bestLoss - t.stats.Loss) / t.bestLoss
				if improvementPercent >= improvementThreshold {
					lossImproved = true
				}
			}

			if lossImproved {
				t.bestLoss = t.stats.Loss
				improved = true
			}
		}
	}

	return improved
}

// GetBestMetrics returns the best reward and loss seen so far
func (t *Trainer) GetBestMetrics() (bestReward, bestLoss float64) {
	t.mu.Lock()
	defer t.mu.Unlock()
	return t.bestReward, t.bestLoss
}

// GetModelWeights returns the current model weights
func (t *Trainer) GetModelWeights() *types.ModelWeights {
	return t.agent.GetWeights()
}

// SetModelWeights sets the model weights
func (t *Trainer) SetModelWeights(weights *types.ModelWeights) error {
	return t.agent.SetWeights(weights)
}

// ReplayBuffer stores training steps
// Uses a circular buffer approach to avoid memory leaks from slice operations.
// When full, new elements overwrite the oldest ones in a circular fashion.
type ReplayBuffer struct {
	buffer []types.Step
	size   int
	next   int // Next position to write (wraps around when buffer is full)
	count  int // Number of elements currently in buffer (max = size)
	mu     sync.Mutex
}

// NewReplayBuffer creates a new replay buffer
func NewReplayBuffer(size int) *ReplayBuffer {
	return &ReplayBuffer{
		buffer: make([]types.Step, size), // Pre-allocate full capacity
		size:   size,
		next:   0,
		count:  0,
	}
}

// Add adds a step to the buffer
// Uses circular buffer: when full, overwrites oldest element (FIFO behavior)
func (rb *ReplayBuffer) Add(step types.Step) {
	rb.mu.Lock()
	defer rb.mu.Unlock()

	// Write to next position
	rb.buffer[rb.next] = step

	// Update next position (wrap around when we reach the end)
	rb.next = (rb.next + 1) % rb.size

	// Update count (don't exceed size)
	if rb.count < rb.size {
		rb.count++
	}
	// When count == size, we're full and count stays at size
}

// Sample samples a batch of steps randomly from the buffer
func (rb *ReplayBuffer) Sample(batchSize int) []types.Step {
	rb.mu.Lock()
	defer rb.mu.Unlock()

	if rb.count < batchSize {
		batchSize = rb.count
	}

	if batchSize == 0 {
		return []types.Step{}
	}

	// Use a map to track which indices we've already sampled (avoid duplicates)
	indices := make(map[int]bool, batchSize)
	samples := make([]types.Step, 0, batchSize)
	rng := rand.New(rand.NewSource(time.Now().UnixNano()))

	for len(samples) < batchSize {
		// Pick a random logical index (0 to count-1)
		logicalIdx := rng.Intn(rb.count)

		// Skip if we've already sampled this index
		if indices[logicalIdx] {
			continue
		}

		indices[logicalIdx] = true

		// Convert logical index to physical buffer position
		// When buffer is full: oldest element is at 'next', newest is at 'next-1'
		// Logical 0 = oldest, logical count-1 = newest
		var physicalIdx int
		if rb.count < rb.size {
			// Buffer not full: elements are at positions 0, 1, 2, ..., count-1
			physicalIdx = logicalIdx
		} else {
			// Buffer full: oldest is at 'next', wrap around
			// Logical 0 maps to physical 'next', logical 1 to 'next+1', etc.
			physicalIdx = (rb.next + logicalIdx) % rb.size
		}

		samples = append(samples, rb.buffer[physicalIdx])
	}

	return samples
}

// CanSample checks if we can sample a batch
func (rb *ReplayBuffer) CanSample(batchSize int) bool {
	rb.mu.Lock()
	defer rb.mu.Unlock()
	return rb.count >= batchSize
}

// Size returns the current buffer size
func (rb *ReplayBuffer) Size() int {
	rb.mu.Lock()
	defer rb.mu.Unlock()
	return rb.count
}
