'use client';

import { useEffect, useRef, useState } from 'react';

interface BouncingBallProps {
  ballSize?: number;
  speed?: number;
}

export default function BouncingBall({ ballSize = 12, speed = 2.5 }: BouncingBallProps) {
  const ballRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const positionRef = useRef({ x: 100, y: 100 });
  const velocityRef = useRef({ x: speed, y: speed });
  const [isMobile, setIsMobile] = useState(false);
  const lastBounceTimeRef = useRef<number>(0); // Timestamp of last bounce
  const bounceDebounceMs = 50; // Minimum time between bounces (50ms)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
      
      // Reposition ball if it goes out of bounds after resize
      const ball = ballRef.current;
      if (ball) {
        const sidebar = document.querySelector('aside');
        const sidebarWidth = sidebar ? sidebar.getBoundingClientRect().width : 0;
        const mobileNav = document.querySelector('nav.md\\:hidden');
        const navBarHeight = mobileNav ? mobileNav.getBoundingClientRect().height : 0;
        
        const boundaries = {
          left: sidebarWidth,
          right: window.innerWidth,
          top: navBarHeight,
          bottom: window.innerHeight,
        };
        
        // Clamp position to valid bounds
        positionRef.current = {
          x: Math.max(boundaries.left, Math.min(boundaries.right - ballSize, positionRef.current.x)),
          y: Math.max(boundaries.top, Math.min(boundaries.bottom - ballSize, positionRef.current.y)),
        };
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [ballSize]);


  useEffect(() => {
    const ball = ballRef.current;
    if (!ball) return;

    const getBoundaries = () => {
      // Dynamically detect sidebar width
      const sidebar = document.querySelector('aside');
      const sidebarWidth = sidebar ? sidebar.getBoundingClientRect().width : 0;
      
      // Dynamically detect navigation bar height (mobile nav bar at top)
      const mobileNav = document.querySelector('nav.md\\:hidden');
      const navBarHeight = mobileNav ? mobileNav.getBoundingClientRect().height : 0;
      
      return {
        left: sidebarWidth,
        right: window.innerWidth,
        top: navBarHeight,
        bottom: window.innerHeight,
      };
    };

    const getPostTilePositions = (): Array<{ x: number; y: number; width: number; height: number }> => {
      const tiles: Array<{ x: number; y: number; width: number; height: number }> = [];
      // Get all tiles: post tiles, photo tiles (animals and photos), and article tiles
      const allTiles = document.querySelectorAll('[data-post-tile], [data-photo-tile], [data-article-tile]');
      
      allTiles.forEach((tile) => {
        const rect = tile.getBoundingClientRect();
        tiles.push({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        });
      });
      
      return tiles;
    };

    const checkCollisionWithTile = (
      ballX: number,
      ballY: number,
      tile: { x: number; y: number; width: number; height: number }
    ): { hit: boolean; side?: 'left' | 'right' | 'top' | 'bottom' } => {
      const ballRadius = ballSize / 2;
      const ballCenterX = ballX + ballRadius;
      const ballCenterY = ballY + ballRadius;

      // Find the closest point on the tile rectangle to the ball center
      const closestX = Math.max(tile.x, Math.min(ballCenterX, tile.x + tile.width));
      const closestY = Math.max(tile.y, Math.min(ballCenterY, tile.y + tile.height));

      // Calculate distance from ball center to closest point
      const dx = ballCenterX - closestX;
      const dy = ballCenterY - closestY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Check if ball is colliding (distance <= radius)
      if (distance > ballRadius) {
        return { hit: false };
      }

      // Determine which side the collision is on
      // Check if we're near a corner or an edge
      const margin = 2; // Small margin for edge detection
      const distToLeft = Math.abs(ballCenterX - tile.x);
      const distToRight = Math.abs(ballCenterX - (tile.x + tile.width));
      const distToTop = Math.abs(ballCenterY - tile.y);
      const distToBottom = Math.abs(ballCenterY - (tile.y + tile.height));

      // If ball is within the tile bounds, determine exit direction based on velocity
      const isInsideX = ballCenterX >= tile.x && ballCenterX <= tile.x + tile.width;
      const isInsideY = ballCenterY >= tile.y && ballCenterY <= tile.y + tile.height;

      if (isInsideX && isInsideY) {
        // Ball is inside tile, bounce based on which edge is closest
        const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
        if (minDist === distToLeft) return { hit: true, side: 'left' };
        if (minDist === distToRight) return { hit: true, side: 'right' };
        if (minDist === distToTop) return { hit: true, side: 'top' };
        if (minDist === distToBottom) return { hit: true, side: 'bottom' };
      }

      // Ball is outside but colliding, determine which edge
      if (distToLeft < margin && ballCenterY >= tile.y && ballCenterY <= tile.y + tile.height) {
        return { hit: true, side: 'left' };
      }
      if (distToRight < margin && ballCenterY >= tile.y && ballCenterY <= tile.y + tile.height) {
        return { hit: true, side: 'right' };
      }
      if (distToTop < margin && ballCenterX >= tile.x && ballCenterX <= tile.x + tile.width) {
        return { hit: true, side: 'top' };
      }
      if (distToBottom < margin && ballCenterX >= tile.x && ballCenterX <= tile.x + tile.width) {
        return { hit: true, side: 'bottom' };
      }

      // Default to closest edge
      const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);
      if (minDist === distToLeft) return { hit: true, side: 'left' };
      if (minDist === distToRight) return { hit: true, side: 'right' };
      if (minDist === distToTop) return { hit: true, side: 'top' };
      if (minDist === distToBottom) return { hit: true, side: 'bottom' };

      return { hit: false };
    };

    const animate = () => {
      const boundaries = getBoundaries();
      const tiles = getPostTilePositions();
      
      let newX = positionRef.current.x + velocityRef.current.x;
      let newY = positionRef.current.y + velocityRef.current.y;

      // Check collisions with window boundaries (with debounce)
      const currentTime = Date.now();
      const timeSinceLastBounce = currentTime - lastBounceTimeRef.current;
      
      if (newX <= boundaries.left && timeSinceLastBounce >= bounceDebounceMs) {
        newX = boundaries.left;
        velocityRef.current.x = -velocityRef.current.x;
        lastBounceTimeRef.current = currentTime;
      } else if (newX + ballSize >= boundaries.right && timeSinceLastBounce >= bounceDebounceMs) {
        newX = boundaries.right - ballSize;
        velocityRef.current.x = -velocityRef.current.x;
        lastBounceTimeRef.current = currentTime;
      }

      if (newY <= boundaries.top && timeSinceLastBounce >= bounceDebounceMs) {
        newY = boundaries.top;
        velocityRef.current.y = -velocityRef.current.y;
        lastBounceTimeRef.current = currentTime;
      } else if (newY + ballSize >= boundaries.bottom && timeSinceLastBounce >= bounceDebounceMs) {
        newY = boundaries.bottom - ballSize;
        velocityRef.current.y = -velocityRef.current.y;
        lastBounceTimeRef.current = currentTime;
      }

      // Check collisions with PostTiles (with debounce)
      const currentTimeForTiles = Date.now();
      const timeSinceLastBounceForTiles = currentTimeForTiles - lastBounceTimeRef.current;
      
      if (timeSinceLastBounceForTiles >= bounceDebounceMs) {
        for (const tile of tiles) {
          const collision = checkCollisionWithTile(newX, newY, tile);
          if (collision.hit) {
            lastBounceTimeRef.current = currentTimeForTiles;
            
            if (collision.side === 'left' || collision.side === 'right') {
              velocityRef.current.x = -velocityRef.current.x;
              // Adjust position to prevent ball from going into tile
              if (collision.side === 'left') {
                newX = tile.x - ballSize - 1;
              } else {
                newX = tile.x + tile.width + 1;
              }
            } else if (collision.side === 'top' || collision.side === 'bottom') {
              velocityRef.current.y = -velocityRef.current.y;
              // Adjust position to prevent ball from going into tile
              if (collision.side === 'top') {
                newY = tile.y - ballSize - 1;
              } else {
                newY = tile.y + tile.height + 1;
              }
            }
            break; // Only handle one collision per frame
          }
        }
      }

      positionRef.current = { x: newX, y: newY };
      ball.style.left = `${newX}px`;
      ball.style.top = `${newY}px`;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize position
    const boundaries = getBoundaries();
    positionRef.current = {
      x: Math.max(boundaries.left + 10, Math.min(boundaries.right - ballSize - 10, positionRef.current.x)),
      y: Math.max(boundaries.top + 10, Math.min(boundaries.bottom - ballSize - 10, positionRef.current.y)),
    };
    ball.style.left = `${positionRef.current.x}px`;
    ball.style.top = `${positionRef.current.y}px`;

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [ballSize, isMobile]);

  return (
    <div
      ref={ballRef}
      className="fixed z-50 rounded-full bg-[#629C77] pointer-events-none"
      style={{
        width: `${ballSize}px`,
        height: `${ballSize}px`,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      }}
    />
  );
}

