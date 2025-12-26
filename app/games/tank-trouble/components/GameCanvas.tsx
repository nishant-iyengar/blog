import { useRef, useEffect } from 'react';
import type { Tank, Bullet, Barrier, Sun } from '@/app/games/tank-trouble/types';
import { GAME_CONFIG, TANK_SIZE, SUN_INFLUENCE_RADIUS, BULLET_MAX_AGE } from '@/app/games/tank-trouble/config';

interface GameCanvasProps {
  width: number;
  height: number;
  tanks: Tank[];
  bullets: Bullet[];
  barriers: Barrier[];
  suns: Sun[];
  isPaused: boolean;
  tankImages: { blue: HTMLImageElement | null; red: HTMLImageElement | null };
  gameOverWinner: 'blue' | 'red' | null;
  scale?: number; // Optional scale factor for display
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
  gameOverWinner,
  scale = 1,
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

    // Scale factor for crisp rendering
    const scale = 2;
    canvas.width = width * scale;
    canvas.height = height * scale;
    
    // Scale the context so all drawing operations are scaled
    ctx.scale(scale, scale);

    const now = Date.now(); // Current time for animations

    // Clear canvas
    ctx.fillStyle = '#2D3748';
    ctx.fillRect(0, 0, width, height);

    // Draw barriers
    ctx.fillStyle = '#4A5568';
    for (const barrier of barriers) {
      ctx.fillRect(barrier.x, barrier.y, barrier.width, barrier.height);
    }

    // Draw gravitational field arrows (before suns so they appear behind)
    ctx.strokeStyle = 'rgba(98, 156, 119, 0.3)';
    ctx.fillStyle = 'rgba(98, 156, 119, 0.3)';
    ctx.lineWidth = 1 / scale;
    for (const sun of suns) {
      const gridSpacing = 30;
      const arrowLength = 8;
      const arrowHeadSize = 3;
      
      // Draw arrows in a grid around the sun
      for (let x = sun.x - SUN_INFLUENCE_RADIUS; x <= sun.x + SUN_INFLUENCE_RADIUS; x += gridSpacing) {
        for (let y = sun.y - SUN_INFLUENCE_RADIUS; y <= sun.y + SUN_INFLUENCE_RADIUS; y += gridSpacing) {
          const dx = sun.x - x;
          const dy = sun.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only draw if within influence radius and not too close to sun
          if (distance > sun.size + 5 && distance < SUN_INFLUENCE_RADIUS) {
            const angle = Math.atan2(dy, dx);
            const normalizedDx = dx / distance;
            const normalizedDy = dy / distance;
            
            // Draw arrow line
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(
              x + normalizedDx * arrowLength,
              y + normalizedDy * arrowLength
            );
            ctx.stroke();
            
            // Draw arrowhead
            ctx.save();
            ctx.translate(x + normalizedDx * arrowLength, y + normalizedDy * arrowLength);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-arrowHeadSize, -arrowHeadSize / 2);
            ctx.lineTo(-arrowHeadSize, arrowHeadSize / 2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          }
        }
      }
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
      ctx.lineWidth = 2 / scale;
      ctx.stroke();
    }

    // Draw tanks
    for (const tank of tanks) {
      // Draw tank explosion
      if (tank.exploding && tank.explosionStartTime) {
        const explosionDuration = 500;
        const elapsed = now - tank.explosionStartTime;
        if (elapsed < explosionDuration) {
          const progress = elapsed / explosionDuration;
          const maxRadius = TANK_SIZE * 2;
          const currentRadius = maxRadius * progress;
          const alpha = 1 - progress;
          
          // Draw explosion particles
          for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8;
            const distance = currentRadius * (0.5 + Math.random() * 0.5);
            const x = tank.x + TANK_SIZE / 2 + Math.cos(angle) * distance;
            const y = tank.y + TANK_SIZE / 2 + Math.sin(angle) * distance;
            
            ctx.fillStyle = `rgba(255, ${100 + Math.random() * 155}, 0, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        continue; // Don't draw tank while exploding
      }
      
      // Draw respawn animation
      if (tank.respawning && tank.respawnStartTime && tank.respawnTargetX !== undefined) {
        const respawnDuration = 300;
        const elapsed = now - tank.respawnStartTime;
        if (elapsed < respawnDuration) {
          const progress = elapsed / respawnDuration;
          const alpha = progress;
          const scale = 0.5 + progress * 0.5;
          
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.translate(tank.x + TANK_SIZE / 2, tank.y + TANK_SIZE / 2);
          ctx.scale(scale, scale);
          ctx.rotate((tank.angle * Math.PI) / 180);
          ctx.translate(-TANK_SIZE / 2, -TANK_SIZE / 2);
          
          const tankImage = tank.color === 'blue' ? tankImages.blue : tankImages.red;
          if (tankImage) {
            ctx.drawImage(tankImage, 0, 0, TANK_SIZE, TANK_SIZE);
          } else {
            ctx.fillStyle = tank.color === 'blue' ? '#3B82F6' : '#EF4444';
            ctx.fillRect(0, 0, TANK_SIZE, TANK_SIZE);
          }
          ctx.restore();
          continue;
        }
      }
      
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
        ctx.lineWidth = 2 / scale;
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
    for (const bullet of bullets) {
      // Handle bullet explosion (from collisions)
      if (bullet.exploding && bullet.explosionStartTime) {
        const explosionDuration = 300;
        const elapsed = now - bullet.explosionStartTime;
        if (elapsed < explosionDuration) {
          const progress = elapsed / explosionDuration;
          const maxRadius = GAME_CONFIG.bullet.radius * 4;
          const currentRadius = maxRadius * progress;
          const alpha = 1 - progress;
          
          ctx.fillStyle = `rgba(255, ${100 + Math.random() * 155}, 0, ${alpha})`;
          ctx.beginPath();
          ctx.arc(bullet.x, bullet.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        continue;
      }
      
      // Calculate fade alpha for bullets that are expiring (after 7 seconds)
      const age = now - bullet.createdAt;
      const fadeDuration = GAME_CONFIG.bullet.fadeDuration;
      let alpha = 1;
      
      if (age > BULLET_MAX_AGE) {
        // Bullet is fading out
        const fadeProgress = (age - BULLET_MAX_AGE) / fadeDuration;
        alpha = Math.max(0, 1 - fadeProgress);
      }
      
      // Only draw if still visible
      if (alpha > 0) {
        // Extract RGB values and apply alpha
        const r = bullet.owner === 'blue' ? 59 : 239;
        const g = bullet.owner === 'blue' ? 130 : 68;
        const b = bullet.owner === 'blue' ? 246 : 68;
        
        ctx.save();
        ctx.globalAlpha = alpha;
        
        // Draw simple rectangle bullet with rounded corners
        const bulletLength = 6;
        const bulletWidth = 3;
        const radius = 1; // Small border radius
        const angleRad = (bullet.angle * Math.PI) / 180;
        
        // Translate and rotate to bullet position and angle
        ctx.translate(bullet.x, bullet.y);
        ctx.rotate(angleRad);
        
        // Draw rounded rectangle
        const x = -bulletLength / 2;
        const y = -bulletWidth / 2;
        const w = bulletLength;
        const h = bulletWidth;
        
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + w - radius, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
        ctx.lineTo(x + w, y + h - radius);
        ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
        ctx.lineTo(x + radius, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Draw UI
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `${GAME_CONFIG.visual.uiTextSize}px Inter`;
    ctx.fillText(`Blue: ${tanks[0]?.lives ?? 0} lives`, GAME_CONFIG.visual.uiTextOffsetX, GAME_CONFIG.visual.uiTextOffsetY);
    ctx.fillText(`Red: ${tanks[1]?.lives ?? 0} lives`, GAME_CONFIG.visual.uiTextOffsetX, GAME_CONFIG.visual.uiTextOffsetY + 12);
    
    // Draw instructions in top-right corner
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = `${GAME_CONFIG.visual.uiTextSize - 1}px Inter`;
    const instructionY = GAME_CONFIG.visual.uiTextOffsetY;
    const instructionX = width - GAME_CONFIG.visual.uiTextOffsetX;
    ctx.fillText('Player 1 (Blue): Arrows + Space', instructionX, instructionY);
    ctx.fillText('Player 2 (Red): WASD + Q', instructionX, instructionY + 12);
    ctx.textAlign = 'left'; // Reset alignment
    
    // Draw game over screen
    if (gameOverWinner) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 32px Inter';
      ctx.textAlign = 'center';
      const winnerText = gameOverWinner === 'blue' ? 'BLUE WINS!' : 'RED WINS!';
      ctx.fillText(winnerText, width / 2, height / 2 - 20);
      ctx.font = '20px Inter';
      ctx.fillText('Press any key to play again', width / 2, height / 2 + 20);
      ctx.textAlign = 'left'; // Reset alignment
    }
    
    // Draw pause indicator
    if (isPaused && !gameOverWinner) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 48px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSED', width / 2, height / 2);
      ctx.textAlign = 'left'; // Reset alignment
    }
  }, [width, height, tanks, bullets, barriers, suns, isPaused, tankImages, gameOverWinner]);

  // Calculate display size: internal resolution is 2x for crisp rendering, then apply scale
  const displayWidth = width * 2 * scale;
  const displayHeight = height * 2 * scale;

  return (
    <canvas
      ref={canvasRef}
      className="border-2 border-[#4A5568] rounded outline-none"
      style={{ 
        width: `${displayWidth}px`, 
        height: `${displayHeight}px`,
        display: 'block',
      }}
      tabIndex={0}
      onFocus={(e) => e.target.focus()}
    />
  );
}

