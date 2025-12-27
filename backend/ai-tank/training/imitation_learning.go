package training

import (
	"log"
	"math/rand"

	"blog/backend/ai-tank/config"
	"blog/backend/ai-tank/game"
	"blog/backend/ai-tank/model"
	"blog/backend/ai-tank/types"
)

// ImitationLearning pre-trains an agent using rule-based demonstrations
// This is a form of behavioral cloning - learning to imitate expert behavior
func ImitationLearning(agent *model.DQNAgent, numEpisodes int, rng *rand.Rand) error {
	log.Printf("[ImitationLearning] Starting with %d episodes", numEpisodes)
	
	cfg, err := config.GetConfig()
	if err != nil {
		return err
	}

	ruleBasedAI := game.NewRuleBasedAI(cfg)
	
	// Collect demonstrations from rule-based AI
	demonstrations := make([]types.Step, 0)
	
	for episode := 0; episode < numEpisodes; episode++ {
		// Create a simple game state for demonstration
		// We'll simulate a few game states and collect (state, action) pairs
		sim, err := game.NewGameSimulation(agent, nil, rng) // No enemy agent - use rule-based
		if err != nil {
			continue
		}
		
		// Run a short episode to collect demonstrations
		maxSteps := 100 // Short episodes for demonstrations
		for step := 0; step < maxSteps; step++ {
			// Get current state
			gameState, _ := sim.GetState()
			
			// Create AI context
			context := &AIContext{
				AITank:    gameState.AITank,
				EnemyTank: gameState.EnemyTank,
				Bullets:   gameState.Bullets,
				Barriers:  gameState.Barriers,
				Suns:      gameState.Suns,
				MapWidth:  gameState.MapWidth,
				MapHeight: gameState.MapHeight,
				TickTime:  gameState.TickTime,
			}
			
			// Extract observation
			observation := ExtractObservation(context, cfg)
			
			// Get rule-based decision
			ruleDecision := ruleBasedAI.MakeDecision(
				gameState.AITank,
				gameState.EnemyTank,
				gameState.Bullets,
				gameState.Barriers,
			)
			
			// Convert decision to action
			action := decisionToAction(ruleDecision)
			
			// Tick the simulation
			decisions := map[int]*types.AIDecision{0: ruleDecision}
			done := sim.Tick(decisions)
			
			if done {
				break
			}
			
			// Get next state
			nextGameState, _ := sim.GetState()
			nextContext := &AIContext{
				AITank:    nextGameState.AITank,
				EnemyTank: nextGameState.EnemyTank,
				Bullets:   nextGameState.Bullets,
				Barriers:  nextGameState.Barriers,
				Suns:      nextGameState.Suns,
				MapWidth:  nextGameState.MapWidth,
				MapHeight: nextGameState.MapHeight,
				TickTime:  nextGameState.TickTime,
			}
			nextObservation := ExtractObservation(nextContext, cfg)
			
		// Create demonstration step
		// For imitation learning, we use a small positive reward for following expert
		demonstration := types.Step{
			State:     observation.Vector,
			Action:    action,
			Reward:    0.1, // Small reward for imitating expert
			NextState: nextObservation.Vector,
			Done:      done,
		}
		
		// Log dimensions for debugging
		if len(demonstrations) == 0 {
			log.Printf("[ImitationLearning] First demonstration: state size=%d, nextState size=%d, action=%d", 
				len(demonstration.State), len(demonstration.NextState), demonstration.Action)
		}
		
		demonstrations = append(demonstrations, demonstration)
		}
	}
	
	// Train agent on demonstrations (supervised learning)
	// We'll do a few training iterations on the collected demonstrations
	batchSize := cfg.RL.DQN.BatchSize
	numBatches := len(demonstrations) / batchSize
	
	log.Printf("[ImitationLearning] Collected %d demonstrations, will train on %d batches (batch size: %d)", 
		len(demonstrations), numBatches, batchSize)
	
	// Train on all batches for better pre-training
	maxBatches := numBatches
	if maxBatches > 50 {
		maxBatches = 50 // Cap at 50 batches to avoid excessive pre-training
	}
	for i := 0; i < maxBatches; i++ {
		start := i * batchSize
		end := start + batchSize
		if end > len(demonstrations) {
			end = len(demonstrations)
		}
		
		batch := demonstrations[start:end]
		log.Printf("[ImitationLearning] Training batch %d/%d (size: %d)", i+1, numBatches, len(batch))
		_, err := agent.Train(batch)
		if err != nil {
			log.Printf("[ImitationLearning] ERROR in batch %d: %v", i+1, err)
			return err
		}
		log.Printf("[ImitationLearning] Completed batch %d/%d", i+1, numBatches)
	}
	
	log.Printf("[ImitationLearning] Completed pre-training")
	return nil
}

