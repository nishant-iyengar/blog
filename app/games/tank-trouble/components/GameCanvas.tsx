import { useRef, useEffect } from 'react';
import type { Tank, Bullet, Barrier, Sun } from '@/app/games/tank-trouble/types';
import { GAME_CONFIG, TANK_SIZE } from '@/app/games/tank-trouble/config';

interface GameCanvasProps {
  width: number;
  height: number;
  tanks: Tank[];
  bullets: Bullet[];
  barriers: Barrier[];
  suns: Sun[];
  isPaused: boolean;
  tankImages: { blue: HTMLImageElement | null; red: HTMLImageElement | null };
}

export function GameCanvas({
  width,
  height,
  tanks,
  bullets,
  barriers,
  suns,
  isPaused,
  tankImages,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto-focus canvas on mount to enable immediate keyboard input
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Focus the canvas so keyboard events work immediately
      canvas.focus();
      
      // Also focus on click to ensure it stays focused
      const handleCanvasClick = () => {
        canvas.focus();
      };
      
      canvas.addEventListener('click', handleCanvasClick);
      
      return () => {
        canvas.removeEventListener('click', handleCanvasClick);
      };
    }
  }, []);

  // Render function
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#2D3748';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw barriers
    ctx.fillStyle = '#4A5568';
    for (const barrier of barriers) {
      ctx.fillRect(barrier.x, barrier.y, barrier.width, barrier.height);
    }

    // Draw suns
    for (const sun of suns) {
      const gradient = ctx.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, sun.size);
      gradient.addColorStop(0, 'rgba(98, 156, 119, 0.9)');
      gradient.addColorStop(0.7, 'rgba(98, 156, 119, 0.75)');
      gradient.addColorStop(1, 'rgba(98, 156, 119, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, sun.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw sun outline
      ctx.strokeStyle = 'rgba(98, 156, 119, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw tanks
    for (const tank of tanks) {
      if (tank.lives <= 0) continue;

      ctx.save();
      ctx.translate(tank.x + TANK_SIZE / 2, tank.y + TANK_SIZE / 2);
      ctx.rotate((tank.angle * Math.PI) / 180);
      ctx.translate(-TANK_SIZE / 2, -TANK_SIZE / 2);

      // Draw tank image
      const tankImage = tank.color === 'blue' ? tankImages.blue : tankImages.red;
      if (tankImage) {
        ctx.drawImage(tankImage, 0, 0, TANK_SIZE, TANK_SIZE);
      } else {
        // Fallback: draw colored rectangle if image not loaded
        ctx.fillStyle = tank.color === 'blue' ? '#3B82F6' : '#EF4444';
        ctx.fillRect(0, 0, TANK_SIZE, TANK_SIZE);
        ctx.strokeStyle = tank.color === 'blue' ? '#1E40AF' : '#DC2626';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, TANK_SIZE, TANK_SIZE);
      }

      ctx.restore();

      // Draw lives indicator
      ctx.fillStyle = tank.color === 'blue' ? '#3B82F6' : '#EF4444';
      for (let i = 0; i < tank.lives; i++) {
        ctx.beginPath();
        ctx.arc(
          tank.x + GAME_CONFIG.visual.livesIndicatorOffsetX + i * GAME_CONFIG.visual.livesIndicatorSpacing,
          tank.y + GAME_CONFIG.visual.livesIndicatorOffsetY,
          GAME_CONFIG.visual.livesIndicatorRadius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }

    // Draw bullets
    ctx.fillStyle = '#FBBF24';
    for (const bullet of bullets) {
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, GAME_CONFIG.bullet.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw UI
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `${GAME_CONFIG.visual.uiTextSize}px Inter`;
    ctx.fillText(`Blue: ${tanks[0]?.lives ?? 0} lives`, GAME_CONFIG.visual.uiTextOffsetX, GAME_CONFIG.visual.uiTextOffsetY);
    ctx.fillText(`Red: ${tanks[1]?.lives ?? 0} lives`, GAME_CONFIG.visual.uiTextOffsetX, GAME_CONFIG.visual.uiTextOffsetY + 20);
    
    // Draw pause indicator
    if (isPaused) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 48px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
      ctx.textAlign = 'left'; // Reset alignment
    }
  }, [width, height, tanks, bullets, barriers, suns, isPaused, tankImages]);

  return (
    <div className="flex flex-col items-start gap-4">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border-2 border-[#4A5568] rounded outline-none"
        style={{ transform: 'scale(1.3)', transformOrigin: 'top left' }}
        tabIndex={0}
        onFocus={(e) => e.target.focus()}
      />
      <div className="text-sm text-[#718096] space-y-2">
        <div>
          <strong>Player 1 (Blue):</strong> Arrow keys to move/rotate, Space to shoot
        </div>
        <div>
          <strong>Player 2 (Red):</strong> WASD to move/rotate, Q to shoot
        </div>
      </div>
    </div>
  );
}

