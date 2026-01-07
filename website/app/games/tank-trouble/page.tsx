'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { GameCanvas } from '@/app/games/tank-trouble/components/GameCanvas';
import { useGameLogic, type GameInstance } from '@/app/games/tank-trouble/components/GameLogic';
import { useGameInput } from '@/app/games/tank-trouble/hooks/useGameInput';
import { useTankImages } from '@/app/games/tank-trouble/hooks/useTankImages';
import { getInitialSpawnPositions } from '@/app/games/tank-trouble/utils/spawn';
import type { Tank, Bullet, Barrier, Sun, TankTroubleMapData } from '@/app/games/tank-trouble/types';
import { GAME_CONFIG } from '@/app/games/tank-trouble/config';
import mapData from '@/content/games/tank-trouble-map.json';

export default function TankTroublePage() {
  const mapDataTyped = mapData as TankTroubleMapData;
  const [tanks, setTanks] = useState<Tank[]>(() => 
    getInitialSpawnPositions(mapDataTyped, mapDataTyped.barriers as Barrier[], mapDataTyped.suns || [])
  );
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [lastShotTimes, setLastShotTimes] = useState({ blue: 0, red: 0 });
  const [gameOverWinner, setGameOverWinner] = useState<'blue' | 'red' | null>(null);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const tankImages = useTankImages();
  const gameInput = useGameInput({ gameOver: gameOverWinner !== null });
  
  useEffect(() => {
    setIsPaused(gameInput.isPaused);
  }, [gameInput.isPaused]);

  const handleTanksUpdate = useCallback((gameId: number, newTanks: Tank[]) => {
    if (gameId === 0) {
      setTanks(newTanks);
    }
  }, []);

  const handleBulletsUpdate = useCallback((gameId: number, newBullets: Bullet[]) => {
    if (gameId === 0) {
      setBullets(newBullets);
    }
  }, []);

  const handleLastShotTimesUpdate = useCallback((gameId: number, times: { blue: number; red: number }) => {
    if (gameId === 0) {
      setLastShotTimes(times);
    }
  }, []);

  const handleGameOver = useCallback((gameId: number, winner: 'blue' | 'red' | null) => {
    if (gameId === 0) {
      setGameOverWinner(winner);
      // Show play again button after a short delay
      setTimeout(() => {
        setShowPlayAgain(true);
      }, 1000);
    }
  }, []);

  // Create game instance array
  const gameInstances: GameInstance[] = [{
    id: 0,
    tanks,
    bullets,
    lastShotTimes,
    isPaused,
    speedMultiplier: 1,
    keysRef: gameInput.keysRef,
  }];

  const gameLogic = useGameLogic({
    mapData: mapDataTyped,
    barriers: mapDataTyped.barriers as Barrier[],
    suns: (mapDataTyped.suns || []) as Sun[],
    gameInstances,
    onTanksUpdate: handleTanksUpdate,
    onBulletsUpdate: handleBulletsUpdate,
    onLastShotTimesUpdate: handleLastShotTimesUpdate,
    onGameOver: handleGameOver,
  });

  // Game loop
  useEffect(() => {
    if (gameOverWinner || isPaused) return;

    const interval = setInterval(() => {
      gameLogic.gameTick({ gameId: 0 });
    }, 1000 / GAME_CONFIG.game.tickRate);

    return () => clearInterval(interval);
  }, [gameLogic, gameOverWinner, isPaused]);

  const handleRestart = useCallback(() => {
    const newTanks = getInitialSpawnPositions(
      mapDataTyped,
      mapDataTyped.barriers as Barrier[],
      mapDataTyped.suns || []
    );
    setTanks(newTanks);
    setBullets([]);
    setLastShotTimes({ blue: 0, red: 0 });
    setGameOverWinner(null);
    setShowPlayAgain(false);
    setIsPaused(false);
  }, [mapDataTyped]);

  return (
    <div className="flex flex-col items-center gap-4">
      <GameCanvas
        width={mapDataTyped.width}
        height={mapDataTyped.height}
        tanks={tanks}
        bullets={bullets}
        barriers={mapDataTyped.barriers as Barrier[]}
        suns={(mapDataTyped.suns || []) as Sun[]}
        isPaused={isPaused}
        tankImages={tankImages}
        gameOverWinner={gameOverWinner}
      />
      
      {showPlayAgain && gameOverWinner && (
        <div className="mt-4 text-center">
          <div className="mb-4 text-2xl font-bold">
            {gameOverWinner === 'blue' ? 'Blue Wins!' : 'Red Wins!'}
          </div>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
