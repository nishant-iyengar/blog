'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import mapDataJson from '@/shared/content/games/tank-trouble-map.json';
import type { Tank, Bullet, TankTroubleMapData, Barrier, Sun } from '@/app/games/tank-trouble/types';
import {
  isObject,
  isNumber,
  isArray,
  hasPropertyOfType,
  parseAndValidate,
} from '@/lib/type-guards';

// Type guard for TankTroubleMapData
function isTankTroubleMapData(data: unknown): data is TankTroubleMapData {
  if (!isObject(data)) {
    return false;
  }
  
  return (
    hasPropertyOfType(data, 'width', isNumber) &&
    hasPropertyOfType(data, 'height', isNumber) &&
    hasPropertyOfType(data, 'barriers', (val): val is Barrier[] => isArray(val)) &&
    hasPropertyOfType(data, 'spawnPoints', (val): val is Array<{ x: number; y: number; angle: number }> => isArray(val)) &&
    (!('suns' in data) || hasPropertyOfType(data, 'suns', (val): val is Sun[] => isArray(val)))
  );
}

// Validate and construct map data without type assertions
function validateMapData(data: unknown): TankTroubleMapData {
  const parsed = parseAndValidate(
    data,
    isTankTroubleMapData,
    'Invalid map data structure: missing or invalid required properties'
  );
  
  return {
    width: parsed.width,
    height: parsed.height,
    barriers: parsed.barriers,
    spawnPoints: parsed.spawnPoints,
    suns: parsed.suns || [],
  };
}

const mapData: TankTroubleMapData = validateMapData(mapDataJson);

import { useGameInput } from '@/app/games/tank-trouble/hooks/useGameInput';
import { useTankImages } from '@/app/games/tank-trouble/hooks/useTankImages';
import { useMultiGameLogic, type GameInstance as GameLogicInstance } from '@/app/games/tank-trouble/components/GameLogic';
import { GameCanvas } from '@/app/games/tank-trouble/components/GameCanvas';
import { getInitialSpawnPositions } from '@/app/games/tank-trouble/utils/spawn';
import { DEFAULT_AI_CONFIG, type AIConfig, rlModelManager } from '@/app/games/tank-trouble/ai-tank';
import { DQNAgent, DEFAULT_DQN_CONFIG } from '@/app/games/tank-trouble/ai-tank/rl-dqn-model';
import { TensorFlowJSModel, type ExtendedRLModel } from '@/app/games/tank-trouble/ai-tank/rl-model';
import type { AIDecision } from '@/app/games/tank-trouble/ai-tank/types';
import { extractObservation, type Observation } from '@/app/games/tank-trouble/ai-tank/rl-observation';
import { keysToAction } from '@/app/games/tank-trouble/ai-tank/rl-actions';
// import { listSavedModels, type SavedModel } from '@/app/games/tank-trouble/ai-tank/rl-model-storage'; // Commented out - using Supabase instead
import { TICK_INTERVAL } from '@/app/games/tank-trouble/config';

interface PlayYourAIProps {
  onBack: () => void;
}

export function PlayYourAI({ onBack }: PlayYourAIProps) {
  const typedMapData = mapData;
  const barriers = typedMapData.barriers || [];
  const suns: Sun[] = []; // Suns removed from map - always use empty array
  const aiConfig = DEFAULT_AI_CONFIG;

  // Model loading from Supabase
  const [isLoadingModel, setIsLoadingModel] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);
  const [dqnAgent, setDqnAgent] = useState<DQNAgent | null>(null);

  // Game state
  const [tanks, setTanks] = useState<Tank[]>(() => {
    const initialTanks = getInitialSpawnPositions(typedMapData, barriers, suns);
    return initialTanks;
  });
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [lastShotTimes, setLastShotTimes] = useState<{ blue: number; red: number }>({ blue: 0, red: 0 });
  const [gameOverWinner, setGameOverWinner] = useState<'blue' | 'red' | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Demonstration collection state
  const [demonstrationSteps, setDemonstrationSteps] = useState<Array<{
    state: number[];
    action: number;
    reward: number;
    nextState: number[];
    done: boolean;
  }>>([]);
  // Use refs to avoid dependency cycles in useEffect
  const previousObservationRef = useRef<Observation | null>(null);
  const previousActionRef = useRef<number | null>(null); // Capture action that was actually taken
  const [isSavingDemonstrations, setIsSavingDemonstrations] = useState(false);
  const [demonstrationSaveStatus, setDemonstrationSaveStatus] = useState<string | null>(null);

  const tankImages = useTankImages();
  const gameInput = useGameInput({ gameOver: gameOverWinner !== null });

  // Load latest model from Supabase
  // Note: This callback depends on dqnAgent, but we only load once on mount
  const loadLatestModelFromSupabase = useCallback(async () => {
    setIsLoadingModel(true);
    setModelError(null);
    setIsModelLoaded(false);

    try {
      // Initialize DQN agent if not already done
      let agentToUse = dqnAgent;
      if (!agentToUse) {
        const agent = new DQNAgent(DEFAULT_DQN_CONFIG);
        await agent.initialize();
        setDqnAgent(agent);
        agentToUse = agent;
        
        // Set up model for game controller
        const model = new TensorFlowJSModel({
          name: 'TankTroubleRL',
          type: 'discrete',
          observationSize: DEFAULT_DQN_CONFIG.observationSize,
          actionSize: DEFAULT_DQN_CONFIG.actionSize,
        });
        
        const extendedModel: ExtendedRLModel = {
          isLoaded: () => {
            // Agent is initialized after initialize() is called above
            return true;
          },
          load: async (path: string) => {
            // This is a placeholder - we load weights directly from Supabase
            // The path parameter is not used when loading from Supabase
            if (agentToUse) {
              await agentToUse.load(path);
            }
          },
          getInfo: () => model.getInfo(),
          agent: agentToUse,
          predict: async (obs, angle) => {
            // Now async! This allows us to properly call the agent's async predict method
            if (!agentToUse) {
              console.warn('Agent not initialized, returning default decision');
              return {
                angleDelta: 0,
                moveDirection: 0,
                shouldShoot: false,
              };
            }
            
            try {
              // Call the agent's async predict method
              const decision = await agentToUse.predict(obs, angle);
              return decision;
            } catch (error) {
              console.error('Error in agent predict:', error);
              return {
                angleDelta: 0,
                moveDirection: 0,
                shouldShoot: false,
              };
            }
          },
        };
        
        rlModelManager.setModel(extendedModel);
      }

      // Ensure we have an agent at this point
      if (!agentToUse) {
        throw new Error('Failed to initialize DQN agent');
      }

      // Fetch latest model from API
      const response = await fetch('/api/backend/models/latest');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Failed to fetch model: ${response.statusText}`);
      }

      const modelData = await response.json();
      
      // Log model data structure for debugging
      console.log('Model data received from Supabase:', {
        layersCount: modelData.layers?.length || 0,
        hasMetadata: !!modelData.metadata,
        metadata: modelData.metadata,
      });
      
      // Convert Supabase format to TensorFlow.js format
      // Supabase format: { layers: [{ weights: number[], biases: number[] }, ...], metadata: {...} }
      // We need: Array<{ weights: number[], biases: number[] }>
      const weightsData = modelData.layers.map((layer: any, index: number) => {
        const weights = layer.weights || layer.Weights || [];
        const biases = layer.biases || layer.Biases || [];
        
        // Log layer info and verify non-zero values
        const nonZeroWeights = weights.filter((w: number) => Math.abs(w) > 1e-10).length;
        const nonZeroBiases = biases.filter((b: number) => Math.abs(b) > 1e-10).length;
        const totalWeights = weights.length;
        const totalBiases = biases.length;
        const weightSample = weights.slice(0, 10); // First 10 weights
        const biasSample = biases.slice(0, 5); // First 5 biases
        
        console.log(`Layer ${index}:`, {
          weightsCount: totalWeights,
          biasesCount: totalBiases,
          nonZeroWeights,
          nonZeroBiases,
          weightSample,
          biasSample,
          allZeros: nonZeroWeights === 0 && nonZeroBiases === 0,
        });
        
        return { weights, biases };
      });

      // Load weights into the agent
      await agentToUse.loadWeightsFromJSON(weightsData);
      
      // Verify loaded weights by checking a sample prediction
      // Create a test observation with proper structure
      const testObs = {
        vector: new Array(DEFAULT_DQN_CONFIG.observationSize).fill(0.5),
        size: DEFAULT_DQN_CONFIG.observationSize,
      };
      try {
        const testAction = await agentToUse.selectAction(testObs, false);
        console.log('Model verification - test action:', testAction, '(should be 0-', DEFAULT_DQN_CONFIG.actionSize - 1, ')');
        
        // Also test a full prediction
        const testDecision = await agentToUse.predict(testObs, 0);
        console.log('Model verification - test decision:', testDecision);
      } catch (err) {
        console.error('Model verification failed:', err);
      }
      
      setIsModelLoaded(true);
      console.log('Successfully loaded latest model from Supabase', modelData.metadata);
    } catch (error) {
      console.error('Failed to load model from Supabase:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setModelError(errorMessage);
      setIsModelLoaded(false);
    } finally {
      setIsLoadingModel(false);
    }
  }, [dqnAgent]);

  // Auto-load latest model on mount (only once)
  useEffect(() => {
    loadLatestModelFromSupabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Intentionally only run on mount - dqnAgent is initialized inside loadLatestModelFromSupabase
  }, []); // Empty deps - only run once on mount

  // Save demonstrations to backend
  const saveDemonstrations = useCallback(async () => {
    if (demonstrationSteps.length === 0) {
      return;
    }

    setIsSavingDemonstrations(true);
    setDemonstrationSaveStatus(null);

    try {
      // Generate unique game ID for this session
      const gameId = crypto.randomUUID();
      
      const response = await fetch('http://localhost:8080/api/demonstrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          steps: demonstrationSteps,
          isDefault: true,
          metadata: {
            gameId: gameId, // Unique identifier for this game session
            episodeLength: demonstrationSteps.length,
            totalReward: 0, // Not calculated for human demonstrations
            timestamp: new Date().toISOString(),
            // Note: Each game creates one demonstration record with all steps
            // This allows us to distinguish between different game sessions
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      setDemonstrationSaveStatus(`✅ Saved ${result.steps} demonstration steps`);
      
      // Clear demonstrations after successful save
      setDemonstrationSteps([]);
      previousObservationRef.current = null;
      previousActionRef.current = null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setDemonstrationSaveStatus(`❌ Failed to save: ${errorMessage}`);
      console.error('Failed to save demonstrations:', error);
    } finally {
      setIsSavingDemonstrations(false);
    }
  }, [demonstrationSteps]);

  // Reset game
  const resetGame = useCallback(() => {
    // Save demonstrations before resetting if game ended
    if (gameOverWinner !== null && demonstrationSteps.length > 0) {
      saveDemonstrations();
    }

    const initialTanks = getInitialSpawnPositions(typedMapData, barriers, suns);
    setTanks(initialTanks);
    setBullets([]);
    setLastShotTimes({ blue: 0, red: 0 });
    setGameOverWinner(null);
    setIsPaused(false);
    // Reset demonstration state refs
    previousObservationRef.current = null;
    previousActionRef.current = null;
    // Don't reset demonstrationSteps here - let saveDemonstrations clear them
  }, [typedMapData, barriers, suns, gameOverWinner, demonstrationSteps, saveDemonstrations]);

  // Game logic instance
  const gameLogicInstance: GameLogicInstance = useMemo(() => ({
    id: 0,
    tanks,
    bullets,
    lastShotTimes,
    gameMode: 'person-vs-ai',
    gameId: 'play-ai-game',
    isPaused,
    speedMultiplier: 1,
    episodeStartTime: Date.now(),
    keysRef: gameInput.keysRef,
  }), [tanks, bullets, lastShotTimes, isPaused, gameInput.keysRef]);

  // No timeout in PlayYourAI mode - games can run indefinitely since we're not training
  const maxEpisodeTimeMs = Number.MAX_SAFE_INTEGER;

  const gameLogic = useMultiGameLogic({
    mapData: typedMapData,
    barriers,
    suns,
    aiConfig,
    trainingManager: null, // No training in play mode
    maxEpisodeTimeMs,
    gameInstances: [gameLogicInstance],
    onTanksUpdate: (gameId, updatedTanks) => {
      setTanks(updatedTanks);
      
      // Check for game over
      if (updatedTanks[0]?.lives <= 0 || updatedTanks[1]?.lives <= 0) {
        const winner = updatedTanks[0]?.lives <= 0 ? 'red' : 'blue';
        setGameOverWinner(winner);
      }
    },
    onBulletsUpdate: (gameId, updatedBullets) => {
      setBullets(updatedBullets);
    },
    onLastShotTimesUpdate: (gameId, times) => {
      setLastShotTimes(times);
    },
    onGameOver: (gameId, winner) => {
      setGameOverWinner(winner);
    },
  });

  // Collect demonstration steps during gameplay
  // IMPORTANT: We need to capture the action that was actually taken, not current keyboard state
  // Flow: BEFORE tick -> capture state + action, AFTER tick -> capture nextState
  useEffect(() => {
    if (isPaused || !isModelLoaded || gameOverWinner !== null || tanks.length < 2) {
      return;
    }

    // Extract observation from blue tank's perspective (human player)
    const blueTank = tanks[0];
    const redTank = tanks[1];

    if (!blueTank || !redTank) {
      return;
    }

    // Create AIContext from blue tank's perspective
    const context = {
      aiTank: blueTank,      // Blue tank is "AI" from its perspective
      enemyTank: redTank,    // Red tank is "enemy"
      bullets: bullets,
      barriers: barriers,
      suns: suns,
      mapWidth: typedMapData.width,
      mapHeight: typedMapData.height,
      tickTime: Date.now(),
      config: DEFAULT_AI_CONFIG,
    };

    const currentObservation = extractObservation(context);

    // If we have a previous observation AND previous action, we can create a step
    // This means an action was taken that transitioned from previousObservation to currentObservation
    const prevObs = previousObservationRef.current;
    const prevAction = previousActionRef.current;
    
    if (prevObs && prevAction !== null) {
      // Check if game ended (this tick)
      const done = blueTank.lives <= 0 || redTank.lives <= 0;

      // Create step with reward (0.1 for imitation learning - encourages following expert)
      // Note: We store observations (normalized feature vectors) which contain all game state information
      // State = observation before action was applied
      // Action = action that was actually applied (captured before previous tick)
      // NextState = observation after action was applied
      const step = {
        state: prevObs.vector,                 // Game state (observation) BEFORE action
        action: prevAction,                     // Action that was applied
        reward: 0.1,                            // Small positive reward for imitation learning
        nextState: currentObservation.vector,  // Game state (observation) AFTER action
        done: done,
      };

      setDemonstrationSteps((prev) => [...prev, step]);
    }

    // Capture the action that corresponds to current keyboard state
    // This action will be applied in the next game tick
    // Note: Since ticks are frequent (72 FPS = ~14ms) and keys don't change rapidly,
    // the action we capture here is very close to what was applied during the previous tick
    const nextAction = keysToAction(gameInput.keysRef.current);

    // Update refs for next iteration (refs don't trigger re-renders)
    // previousObservation becomes the "state" for the next step
    // previousAction becomes the "action" that was applied (or will be applied)
    previousObservationRef.current = currentObservation;
    previousActionRef.current = nextAction;
  }, [tanks, bullets, barriers, suns, gameInput.keysRef, isPaused, isModelLoaded, gameOverWinner, typedMapData]);

  // Save demonstrations when game ends
  useEffect(() => {
    if (gameOverWinner !== null && demonstrationSteps.length > 0 && !isSavingDemonstrations) {
      saveDemonstrations();
    }
  }, [gameOverWinner, demonstrationSteps.length, isSavingDemonstrations, saveDemonstrations]);

  // Game loop
  useEffect(() => {
    if (isPaused || !isModelLoaded || gameOverWinner !== null) {
      return;
    }

    let lastTickTime = Date.now();
    const gameLoop = async () => {
      const now = Date.now();
      if (now - lastTickTime >= TICK_INTERVAL) {
        await gameLogic.gameTick({ skipIntervalCheck: false });
        lastTickTime = now;
      }
      requestAnimationFrame(gameLoop);
    };

    const frameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, isModelLoaded, gameOverWinner, gameLogic]);

  // Handle pause
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPaused(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const scale = 1.0; // Full size for play mode

  return (
    <div className="flex flex-col items-center gap-4 w-full p-4">
      {/* Header */}
      <div className="w-full max-w-4xl flex items-center justify-between">
        <h1 className="text-2xl font-bold">Play Your AI</h1>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Back to Training
        </button>
      </div>

      {/* Model Loading Status */}
      <div className="w-full max-w-4xl p-4 bg-white border border-gray-300 rounded shadow">
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold">AI Model:</label>
          {isLoadingModel ? (
            <span className="text-sm text-gray-600">Loading latest model from Supabase...</span>
          ) : isModelLoaded ? (
            <span className="text-sm text-green-600">✓ Latest model loaded from Supabase</span>
          ) : modelError ? (
            <div className="flex flex-col gap-1">
              <span className="text-sm text-red-600">✗ Failed to load model</span>
              <span className="text-xs text-gray-500">{modelError}</span>
              <button
                onClick={loadLatestModelFromSupabase}
                className="mt-2 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          ) : (
            <span className="text-sm text-gray-600">Ready to load</span>
          )}
        </div>
        
        {/* Demonstration Collection Status */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold">Demonstration Collection:</label>
            {demonstrationSteps.length > 0 ? (
              <span className="text-sm text-blue-600">
                📝 {demonstrationSteps.length} steps collected
              </span>
            ) : (
              <span className="text-sm text-gray-500">Not collecting</span>
            )}
            {isSavingDemonstrations && (
              <span className="text-sm text-gray-600">Saving...</span>
            )}
            {demonstrationSaveStatus && (
              <span className={`text-sm ${demonstrationSaveStatus.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
                {demonstrationSaveStatus}
              </span>
            )}
          </div>
        </div>
        {/* Commented out: IndexedDB model selection
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold">Select AI Model:</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoadingModels}
          >
            <option value="">{isLoadingModels ? 'Loading models...' : '-- Select a model --'}</option>
            {savedModels.map((model) => (
              <option key={model.path} value={model.path}>
                {model.createdAtString}{model.evalScore !== undefined ? ` (Eval: ${model.evalScore.toFixed(2)})` : ''}
              </option>
            ))}
          </select>
          {isModelLoaded && (
            <span className="text-sm text-green-600">✓ Model loaded</span>
          )}
        </div>
        */}
      </div>

      {/* Game Info */}
      <div className="w-full max-w-4xl p-4 bg-white border border-gray-300 rounded shadow">
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <div>
              <span className="text-sm text-gray-600">You (Blue): </span>
              <span className="font-semibold text-blue-600">{tanks[0]?.lives ?? 0} lives</span>
            </div>
            <div>
              <span className="text-sm text-gray-600">AI (Red): </span>
              <span className="font-semibold text-red-600">{tanks[1]?.lives ?? 0} lives</span>
            </div>
          </div>
          {isPaused && (
            <div className="text-lg font-semibold text-gray-600">PAUSED (Press ESC to resume)</div>
          )}
          {gameOverWinner && (
            <div className="text-lg font-semibold">
              {gameOverWinner === 'blue' ? (
                <span className="text-blue-600">You Win!</span>
              ) : (
                <span className="text-red-600">AI Wins!</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Game Canvas */}
      {isModelLoaded ? (
        <div className="flex justify-center">
          <GameCanvas
            width={typedMapData.width}
            height={typedMapData.height}
            tanks={tanks}
            bullets={bullets}
            barriers={barriers}
            suns={suns}
            isPaused={isPaused}
            tankImages={tankImages}
            gameOverWinner={gameOverWinner}
            scale={scale}
          />
        </div>
      ) : (
        <div className="w-full max-w-4xl p-8 bg-gray-100 border border-gray-300 rounded text-center">
          <div className="text-lg text-gray-600">
            {isLoadingModel ? 'Loading model from Supabase...' : 'Waiting for AI model to load from Supabase'}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="w-full max-w-4xl p-4 bg-white border border-gray-300 rounded shadow">
        <div className="text-sm text-gray-600">
          <div className="font-semibold mb-2">Controls:</div>
          <div>Player 1 (Blue - You): Arrow keys to move, Space to shoot</div>
          <div>Press ESC to pause/resume</div>
          {gameOverWinner && (
            <button
              onClick={resetGame}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Play Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

