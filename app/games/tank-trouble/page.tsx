'use client';

import { useState, useRef, useEffect } from 'react';
import mapData from '@/content/games/tank-trouble-map.json';
import type { Tank, Bullet, TankTroubleMapData } from '@/app/games/tank-trouble/types';
import { useGameInput } from '@/app/games/tank-trouble/hooks/useGameInput';
import { useTankImages } from '@/app/games/tank-trouble/hooks/useTankImages';
import { useGameLogic } from '@/app/games/tank-trouble/components/GameLogic';
import { GameCanvas } from '@/app/games/tank-trouble/components/GameCanvas';
import { getInitialSpawnPositions } from '@/app/games/tank-trouble/utils/spawn';

export default function TankTroublePage() {
  const typedMapData = mapData as TankTroubleMapData;
  const barriersRef = useRef(typedMapData.barriers);
  const sunsRef = useRef(typedMapData.suns || []);

  const [tanks, setTanks] = useState<Tank[]>(() =>
    getInitialSpawnPositions(typedMapData, barriersRef.current, sunsRef.current)
  );
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [lastShotTimes, setLastShotTimes] = useState({ blue: 0, red: 0 });
  const [gameOverWinner, setGameOverWinner] = useState<'blue' | 'red' | null>(null);

  const { keysRef, isPaused } = useGameInput({ gameOver: gameOverWinner !== null });
  const tankImagesRef = useTankImages();

  const handleGameOver = (winner: 'blue' | 'red' | null) => {
    setGameOverWinner(winner);
  };

  const handleRestart = () => {
    setGameOverWinner(null);
    setTanks(getInitialSpawnPositions(typedMapData, barriersRef.current, sunsRef.current));
    setBullets([]);
    setLastShotTimes({ blue: 0, red: 0 });
  };

  // Handle restart on any key press when game is over
  useEffect(() => {
    if (!gameOverWinner) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Use capture phase to catch event before useGameInput stops propagation
      if (gameOverWinner) {
        e.preventDefault();
        e.stopPropagation();
        handleRestart();
      }
    };
    
    // Use capture phase (true) to catch event before useGameInput
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [gameOverWinner]);

  const { gameTick } = useGameLogic({
    isPaused: isPaused || gameOverWinner !== null,
    keysRef,
    mapData: typedMapData,
    barriers: barriersRef.current,
    suns: sunsRef.current,
    tanks,
    bullets,
    lastShotTimes,
    onTanksUpdate: setTanks,
    onBulletsUpdate: setBullets,
    onLastShotTimesUpdate: setLastShotTimes,
    onGameOver: handleGameOver,
  });

  // Game loop
  useEffect(() => {
    const animationFrameRef = { current: undefined as number | undefined };

    const gameLoop = () => {
      gameTick();
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameTick]);

  return (
    <GameCanvas
      width={typedMapData.width}
      height={typedMapData.height}
      tanks={tanks}
      bullets={bullets}
      barriers={barriersRef.current}
      suns={sunsRef.current}
      isPaused={isPaused}
      tankImages={tankImagesRef.current}
      gameOverWinner={gameOverWinner}
    />
  );
}

