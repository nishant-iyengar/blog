package training

import (
	"log"
	"math/rand"

	"blog/backend/ai-tank/config"
	"blog/backend/ai-tank/game"
	"blog/backend/ai-tank/model"
	"blog/backend/ai-tank/types"
)

// DemonstrationStorage is an interface for loading demonstrations
// This breaks the import cycle between training and api packages
type DemonstrationStorage interface {
	GetDefaultDemonstrations(limit int) ([]types.Step, error)
}

// ImitationLearning pre-trains an agent using rule-based and/or human demonstrations
// This is a form of behavioral cloning - learning to imitate expert behavior
// If demoStorage is provided and useHumanDemos is true, loads human demonstrations from storage
func ImitationLearning(agent *model.DQNAgent, numEpisodes int, rng *rand.Rand, demoStorage DemonstrationStorage, useHumanDemos bool) error {
	log.Printf("[ImitationLearning] Starting with %d episodes (useHumanDemos: %v)", numEpisodes, useHumanDemos)
	
	cfg, err := config.GetConfig()
	if err != nil {
		return err
	}

	// Load human demonstrations from storage if available
	demonstrations := make([]types.Step, 0)
	humanDemoCount := 0
	if useHumanDemos && demoStorage != nil {
		log.Printf("[ImitationLearning] Loading default human demonstrations from storage...")
		// Load human demonstrations: limit to last 500 games to balance storage and training data
		// Each game typically has 200-1000 steps, so this gives us ~100k-500k steps
		// Adjust limit based on storage constraints and training needs
		humanDemos, err := demoStorage.GetDefaultDemonstrations(500) // Load last 500 games
		if err != nil {
			log.Printf("[ImitationLearning] Warning: Failed to load human demonstrations: %v", err)
		} else {
			humanDemoCount = len(humanDemos)
			log.Printf("[ImitationLearning] Loaded %d human demonstration steps from Supabase (from most recent 500 games)", humanDemoCount)
			demonstrations = append(demonstrations, humanDemos...)
		}
	}

	ruleBasedAI := game.NewRuleBasedAI(cfg)
	
	// Collect additional demonstrations from rule-based AI if needed
	
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
	
	totalDemos := len(demonstrations)
	if totalDemos == 0 {
		log.Printf("[ImitationLearning] Warning: No demonstrations collected, skipping pre-training")
		return nil
	}

	log.Printf("[ImitationLearning] Collected %d total demonstrations, will train on %d batches (batch size: %d)", 
		totalDemos, numBatches, batchSize)
	
	// Train on all batches for better pre-training
	// If we have human demonstrations, train more batches
	maxBatches := numBatches
	if useHumanDemos && humanDemoCount > 0 {
		// Use more batches when we have human demonstrations
		maxBatches = numBatches * 2
		if maxBatches > 100 {
			maxBatches = 100 // Cap at 100 batches
		}
	} else if maxBatches > 50 {
		maxBatches = 50 // Cap at 50 batches for rule-based only
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

