'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import mapDataJson from '@/content/games/tank-trouble-map.json';
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
import { listSavedModels, type SavedModel } from '@/app/games/tank-trouble/ai-tank/rl-model-storage';
import { TICK_INTERVAL } from '@/app/games/tank-trouble/config';

interface PlayYourAIProps {
  onBack: () => void;
}

export function PlayYourAI({ onBack }: PlayYourAIProps) {
  const typedMapData = mapData;
  const barriers = typedMapData.barriers || [];
  const suns = typedMapData.suns || [];
  const aiConfig = DEFAULT_AI_CONFIG;

  // Model selection
  const [savedModels, setSavedModels] = useState<SavedModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  // Game state
  const [tanks, setTanks] = useState<Tank[]>(() => {
    const initialTanks = getInitialSpawnPositions(typedMapData, barriers, suns);
    return initialTanks;
  });
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [lastShotTimes, setLastShotTimes] = useState<{ blue: number; red: number }>({ blue: 0, red: 0 });
  const [gameOverWinner, setGameOverWinner] = useState<'blue' | 'red' | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const tankImages = useTankImages();
  const gameInput = useGameInput({ gameOver: gameOverWinner !== null });

  // Load saved models
  const loadSavedModels = useCallback(async () => {
    setIsLoadingModels(true);
    try {
      const models = await listSavedModels();
      setSavedModels(models);
    } catch (error) {
      console.error('Failed to load models:', error);
    } finally {
      setIsLoadingModels(false);
    }
  }, []);

  useEffect(() => {
    loadSavedModels();
  }, [loadSavedModels]);

  // Load selected model
  useEffect(() => {
    if (!selectedModel) {
      setIsModelLoaded(false);
      return;
    }

    const loadModel = async () => {
      try {
        await rlModelManager.loadModel(selectedModel);
        setIsModelLoaded(true);
      } catch (error) {
        console.error('Failed to load model:', error);
        alert(`Failed to load model: ${error instanceof Error ? error.message : String(error)}`);
        setIsModelLoaded(false);
      }
    };

    loadModel();
  }, [selectedModel]);

  // Reset game
  const resetGame = useCallback(() => {
    const initialTanks = getInitialSpawnPositions(typedMapData, barriers, suns);
    setTanks(initialTanks);
    setBullets([]);
    setLastShotTimes({ blue: 0, red: 0 });
    setGameOverWinner(null);
    setIsPaused(false);
  }, [typedMapData, barriers, suns]);

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

  // Game loop
  useEffect(() => {
    if (isPaused || !isModelLoaded || gameOverWinner !== null) {
      return;
    }

    let lastTickTime = Date.now();
    const gameLoop = () => {
      const now = Date.now();
      if (now - lastTickTime >= TICK_INTERVAL) {
        gameLogic.gameTick({ skipIntervalCheck: false });
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

      {/* Model Selection */}
      <div className="w-full max-w-4xl p-4 bg-white border border-gray-300 rounded shadow">
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
            {selectedModel ? 'Loading model...' : 'Please select an AI model to play against'}
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

