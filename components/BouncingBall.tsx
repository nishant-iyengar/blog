'use client';

import { useEffect, useRef, useState } from 'react';

interface BouncingBallProps {
  ballSize?: number;
  speed?: number;
}

// Physics constants (moved outside component to avoid dependency issues)
const G = 1.0; // Gravitational constant (scaled for simulation)
const mSun = 125.0; // Mass of the sun (proportional to size - sun is 2x ball, so much heavier)
const bounceDebounceMs = 50; // Minimum time between bounces (50ms)
const numSuns = 10; // Number of static suns
const sunDriftSpeed = 0.2; // slower drift speed for suns
const airFriction = 0.01; // Air friction factor (0.01 = 1% velocity loss per application)
const frictionIntervalMs = 7000; // Apply friction every 7 seconds (7000ms)
const maxBallSpeed = 6.0; // Maximum speed cap for the ball (pixels per frame)

export default function BouncingBall({ ballSize = 12, speed = 2.4 }: BouncingBallProps) {
  const ballRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const positionRef = useRef({ x: 100, y: 100 });
  const velocityRef = useRef({ x: speed, y: speed });
  const [isMobile, setIsMobile] = useState(false);
  const [sunPositions, setSunPositions] = useState<Array<{ x: number; y: number }>>([]);
  const sunPositionsRef = useRef<Array<{ x: number; y: number }>>([]);
  const sunVelocitiesRef = useRef<Array<{ x: number; y: number }>>([]); // Velocities for each sun
  const lastBounceTimeRef = useRef<number>(0); // Timestamp of last bounce
  const lastFrictionTimeRef = useRef<number>(0); // Timestamp of last friction application
  const sunSize = ballSize * 2; // Sun is 2x the ball size

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

  // Generate random sun positions on mount
  useEffect(() => {
    const generateSunPositions = () => {
      const sidebar = document.querySelector('aside');
      const sidebarWidth = sidebar ? sidebar.getBoundingClientRect().width : 0;
      const mobileNav = document.querySelector('nav.md\\:hidden');
      const navBarHeight = mobileNav ? mobileNav.getBoundingClientRect().height : 0;
      
      const boundaries = {
        left: sidebarWidth + sunSize,
        right: window.innerWidth - sunSize,
        top: navBarHeight + sunSize,
        bottom: window.innerHeight - sunSize,
      };
      
      // Get all tiles to avoid placing suns on them
      const allTiles = document.querySelectorAll('[data-post-tile], [data-photo-tile], [data-article-tile]');
      const tileRects: Array<{ x: number; y: number; width: number; height: number }> = [];
      allTiles.forEach((tile) => {
        const rect = tile.getBoundingClientRect();
        tileRects.push({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        });
      });
      
      // Check if a position overlaps with any tile
      const isPositionValid = (x: number, y: number): boolean => {
        const sunRadius = sunSize / 2;
        const margin = 5; // Extra margin to keep suns away from tiles
        
        for (const tile of tileRects) {
          // Check if sun center is within tile bounds (with margin)
          const sunLeft = x - sunRadius - margin;
          const sunRight = x + sunRadius + margin;
          const sunTop = y - sunRadius - margin;
          const sunBottom = y + sunRadius + margin;
          
          // Check for overlap
          if (sunRight >= tile.x && 
              sunLeft <= tile.x + tile.width &&
              sunBottom >= tile.y &&
              sunTop <= tile.y + tile.height) {
            return false; // Overlaps with a tile
          }
        }
        return true; // Position is valid
      };
      
      const positions: Array<{ x: number; y: number }> = [];
      const velocities: Array<{ x: number; y: number }> = [];
      const maxAttempts = 100; // Maximum attempts to find a valid position
      
      for (let i = 0; i < numSuns; i++) {
        let attempts = 0;
        let validPosition = false;
        let x = 0;
        let y = 0;
        
        // Keep trying until we find a valid position or hit max attempts
        while (!validPosition && attempts < maxAttempts) {
          x = boundaries.left + Math.random() * (boundaries.right - boundaries.left);
          y = boundaries.top + Math.random() * (boundaries.bottom - boundaries.top);
          
          if (isPositionValid(x, y)) {
            validPosition = true;
          }
          attempts++;
        }
        
        // Add position even if we hit max attempts (fallback)
        if (validPosition || attempts >= maxAttempts) {
          positions.push({ x, y });
          // Initialize random velocity (very slow, random direction)
          const angle = Math.random() * Math.PI * 2; // Random angle in radians
          velocities.push({
            x: Math.cos(angle) * sunDriftSpeed,
            y: Math.sin(angle) * sunDriftSpeed,
          });
        }
      }
      
      return { positions, velocities };
    };
    
    const { positions, velocities } = generateSunPositions();
    setSunPositions(positions);
    sunPositionsRef.current = positions;
    sunVelocitiesRef.current = velocities;
    
    // Regenerate on resize
    const handleResize = () => {
      const { positions: newPositions, velocities: newVelocities } = generateSunPositions();
      setSunPositions(newPositions);
      sunPositionsRef.current = newPositions;
      sunVelocitiesRef.current = newVelocities;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sunSize, numSuns]);


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
      
      // Update sun positions (drift and bounce)
      if (sunPositionsRef.current.length > 0 && sunVelocitiesRef.current.length > 0) {
        for (let i = 0; i < sunPositionsRef.current.length; i++) {
          const sun = sunPositionsRef.current[i];
          const velocity = sunVelocitiesRef.current[i];
          
          // Update position
          let newSunX = sun.x + velocity.x;
          let newSunY = sun.y + velocity.y;
          
          // Bounce off boundaries
          const sunRadius = sunSize / 2;
          if (newSunX - sunRadius <= boundaries.left) {
            newSunX = boundaries.left + sunRadius;
            sunVelocitiesRef.current[i].x = -velocity.x;
          } else if (newSunX + sunRadius >= boundaries.right) {
            newSunX = boundaries.right - sunRadius;
            sunVelocitiesRef.current[i].x = -velocity.x;
          }
          
          if (newSunY - sunRadius <= boundaries.top) {
            newSunY = boundaries.top + sunRadius;
            sunVelocitiesRef.current[i].y = -velocity.y;
          } else if (newSunY + sunRadius >= boundaries.bottom) {
            newSunY = boundaries.bottom - sunRadius;
            sunVelocitiesRef.current[i].y = -velocity.y;
          }
          
          // Update sun position
          sunPositionsRef.current[i] = { x: newSunX, y: newSunY };
        }
        
        // Update state for rendering (only update positions, not velocities)
        setSunPositions([...sunPositionsRef.current]);
      }
      
      // Apply gravitational force from all static suns
      const ballRadius = ballSize / 2;
      const ballCenterX = positionRef.current.x + ballRadius;
      const ballCenterY = positionRef.current.y + ballRadius;
      
      // Sum up gravitational forces from all suns
      let totalAccelerationX = 0;
      let totalAccelerationY = 0;
      
      // Only calculate gravity if we have sun positions
      if (sunPositionsRef.current.length > 0) {
        for (const sunPos of sunPositionsRef.current) {
          const sunCenterX = sunPos.x;
          const sunCenterY = sunPos.y;
        
        // Calculate distance and direction from ball to sun
        const dx = sunCenterX - ballCenterX;
        const dy = sunCenterY - ballCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply gravitational force using Newton's Law: F = G * (m1 * m2) / r^2
        // Acceleration of ball: a = F / m_ball = G * m_sun / r^2
        // Use minimum distance to prevent infinite acceleration
        const minDistance = 10;
        const effectiveDistance = Math.max(distance, minDistance);
        const distanceSquared = effectiveDistance * effectiveDistance;
        
        // Calculate gravitational acceleration: a = G * m_sun / r^2
        const gravitationalAcceleration = (G * mSun) / distanceSquared;
        
        // Normalize direction vector (from ball to sun)
        if (distance > 0) {
          const directionX = dx / distance;
          const directionY = dy / distance;
          
          // Accumulate acceleration from this sun
          totalAccelerationX += directionX * gravitationalAcceleration;
          totalAccelerationY += directionY * gravitationalAcceleration;
        }
      }
      }
      
      // Apply total gravitational acceleration to velocity
      velocityRef.current.x += totalAccelerationX;
      velocityRef.current.y += totalAccelerationY;
      
      // Apply air friction every 2-3 seconds to prevent infinite acceleration
      const now = Date.now();
      if (now - lastFrictionTimeRef.current >= frictionIntervalMs) {
        velocityRef.current.x *= (1 - airFriction);
        velocityRef.current.y *= (1 - airFriction);
        lastFrictionTimeRef.current = now;
      }
      
      // Clamp velocity to maximum speed
      const currentSpeed = Math.sqrt(velocityRef.current.x * velocityRef.current.x + velocityRef.current.y * velocityRef.current.y);
      if (currentSpeed > maxBallSpeed) {
        const scale = maxBallSpeed / currentSpeed;
        velocityRef.current.x *= scale;
        velocityRef.current.y *= scale;
      }
      
      let newX = positionRef.current.x + velocityRef.current.x;
      let newY = positionRef.current.y + velocityRef.current.y;
      
      // Check collisions with suns (circular collision detection)
      const sunRadius = sunSize / 2;
      const combinedRadius = ballRadius + sunRadius;
      
      if (sunPositionsRef.current.length > 0) {
        for (const sunPos of sunPositionsRef.current) {
          const sunCenterX = sunPos.x;
          const sunCenterY = sunPos.y;
          const ballCenterX = newX + ballRadius;
          const ballCenterY = newY + ballRadius;
          
          // Calculate distance between ball and sun centers
          const dx = sunCenterX - ballCenterX;
          const dy = sunCenterY - ballCenterY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Check if colliding (distance < sum of radii)
          if (distance < combinedRadius && distance > 0) {
            // Calculate collision normal (from ball to sun)
            const normalX = dx / distance;
            const normalY = dy / distance;
            
            // Reflect velocity off the sun's surface
            // Dot product of velocity and normal
            const dotProduct = velocityRef.current.x * normalX + velocityRef.current.y * normalY;
            
            // Reflect: v' = v - 2 * (v · n) * n
            velocityRef.current.x -= 2 * dotProduct * normalX;
            velocityRef.current.y -= 2 * dotProduct * normalY;
            
            // Push ball away from sun to prevent overlap
            const overlap = combinedRadius - distance;
            newX -= normalX * overlap;
            newY -= normalY * overlap;
            
            break; // Only handle one sun collision per frame
          }
        }
      }

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

      // Initialize position on first frame if not set
      if (positionRef.current.x === 100 && positionRef.current.y === 100) {
        positionRef.current = {
          x: Math.max(boundaries.left + 10, Math.min(boundaries.right - ballSize - 10, positionRef.current.x)),
          y: Math.max(boundaries.top + 10, Math.min(boundaries.bottom - ballSize - 10, positionRef.current.y)),
        };
        ball.style.left = `${positionRef.current.x}px`;
        ball.style.top = `${positionRef.current.y}px`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize position - will be set on first animate call
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={ballRef}
        className="fixed z-50 rounded-full bg-[#629C77] pointer-events-none"
        style={{
          width: `${ballSize}px`,
          height: `${ballSize}px`,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      />
      {sunPositions.map((sunPos, index) => (
        <div
          key={index}
          className="fixed z-40 pointer-events-none"
          style={{
            width: `${sunSize}px`,
            height: `${sunSize}px`,
            borderRadius: '50%',
            backgroundColor: 'rgba(98, 156, 119, 0.75)', // Same green as ball (#629C77) with 75% opacity
            boxShadow: '0 0 30px rgba(98, 156, 119, 0.8), 0 0 60px rgba(98, 156, 119, 0.6), 0 0 90px rgba(98, 156, 119, 0.4)',
            transform: 'translate(-50%, -50%)',
            left: `${sunPos.x}px`,
            top: `${sunPos.y}px`,
            border: 'none',
            outline: 'none',
          }}
        />
      ))}
    </>
  );
}

