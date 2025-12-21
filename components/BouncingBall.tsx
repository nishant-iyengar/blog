'use client';

import { useEffect, useRef, useState } from 'react';

interface BouncingBallProps {
  ballSize?: number;
  speed?: number;
}

export default function BouncingBall({ ballSize = 12, speed = 2 }: BouncingBallProps) {
  const ballRef = useRef<HTMLDivElement>(null);
  const slantRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const positionRef = useRef({ x: 100, y: 100 });
  const velocityRef = useRef({ x: speed, y: speed });
  const [isMobile, setIsMobile] = useState(false);
  const mousePositionRef = useRef<{ x: number; y: number } | null>(null);
  const previousMousePositionRef = useRef<{ x: number; y: number } | null>(null);
  const mouseVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [slantAngle, setSlantAngle] = useState(0); // Angle in degrees, starts at 0
  const slantLength = 40; // Length of the slant line
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

  // Track mouse/touch position and handle clicks for rotation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      
      // Calculate mouse velocity if we have a previous position
      if (previousMousePositionRef.current) {
        mouseVelocityRef.current = {
          x: newPos.x - previousMousePositionRef.current.x,
          y: newPos.y - previousMousePositionRef.current.y,
        };
      }
      
      previousMousePositionRef.current = newPos;
      mousePositionRef.current = newPos;
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Rotate slant 45 degrees clockwise on click
      setSlantAngle((prev) => (prev + 45) % 360);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const newPos = { x: touch.clientX, y: touch.clientY };
        
        // Calculate mouse velocity if we have a previous position
        if (previousMousePositionRef.current) {
          mouseVelocityRef.current = {
            x: newPos.x - previousMousePositionRef.current.x,
            y: newPos.y - previousMousePositionRef.current.y,
          };
        }
        
        previousMousePositionRef.current = newPos;
        mousePositionRef.current = newPos;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const newPos = { x: touch.clientX, y: touch.clientY };
        previousMousePositionRef.current = newPos;
        mousePositionRef.current = newPos;
        mouseVelocityRef.current = { x: 0, y: 0 }; // Reset velocity on new touch
        // Rotate slant 45 degrees clockwise on touch
        setSlantAngle((prev) => (prev + 45) % 360);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

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

    const checkCollisionWithSlant = (
      ballX: number,
      ballY: number,
      slantPos: { x: number; y: number },
      angleDeg: number
    ): { hit: boolean; normal?: { x: number; y: number }; closestPoint?: { x: number; y: number } } => {
      const ballRadius = ballSize / 2;
      const ballCenterX = ballX + ballRadius;
      const ballCenterY = ballY + ballRadius;

      // Convert angle to radians
      const angleRad = (angleDeg * Math.PI) / 180;
      
      // Calculate slant line endpoints
      const halfLength = slantLength / 2;
      const cosAngle = Math.cos(angleRad);
      const sinAngle = Math.sin(angleRad);
      
      const p1x = slantPos.x - halfLength * cosAngle;
      const p1y = slantPos.y - halfLength * sinAngle;
      const p2x = slantPos.x + halfLength * cosAngle;
      const p2y = slantPos.y + halfLength * sinAngle;

      // Find closest point on the slant line to the ball center
      const lineDx = p2x - p1x;
      const lineDy = p2y - p1y;
      const lineLengthSq = lineDx * lineDx + lineDy * lineDy;
      
      if (lineLengthSq === 0) return { hit: false };
      
      const t = Math.max(0, Math.min(1, 
        ((ballCenterX - p1x) * lineDx + (ballCenterY - p1y) * lineDy) / lineLengthSq
      ));
      
      const closestX = p1x + t * lineDx;
      const closestY = p1y + t * lineDy;
      
      // Calculate distance from ball center to closest point on line
      const dx = ballCenterX - closestX;
      const dy = ballCenterY - closestY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Check if ball is colliding with the slant (within ball radius + small margin for smoother detection)
      const collisionMargin = 1; // Small margin for smoother collision detection
      if (distance <= ballRadius + collisionMargin) {
        // Calculate normal vector to the slant (perpendicular to the slant line)
        // The normal points in the direction from the slant to the ball
        if (distance > 0) {
          // Calculate the normal vector perpendicular to the slant line
          const lineLength = Math.sqrt(lineLengthSq);
          const lineNormalX = -lineDy / lineLength;
          const lineNormalY = lineDx / lineLength;
          
          // Determine which side of the line the ball is on
          const toBallX = ballCenterX - slantPos.x;
          const toBallY = ballCenterY - slantPos.y;
          const dot = toBallX * lineNormalX + toBallY * lineNormalY;
          
          // Normal should point from slant to ball
          const normalX = dot >= 0 ? lineNormalX : -lineNormalX;
          const normalY = dot >= 0 ? lineNormalY : -lineNormalY;
          
          return {
            hit: true,
            normal: { x: normalX, y: normalY },
            closestPoint: { x: closestX, y: closestY }
          };
        }
      }

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

      // Check collision with slant (only if within valid boundaries)
      if (mousePositionRef.current) {
        const slantPos = mousePositionRef.current;
        // Only check collision if slant is within valid play area
        if (slantPos.x >= boundaries.left && 
            slantPos.x <= boundaries.right &&
            slantPos.y >= boundaries.top &&
            slantPos.y <= boundaries.bottom) {
          // Check collision along the movement path for smoother detection
          const currentCollision = checkCollisionWithSlant(positionRef.current.x, positionRef.current.y, slantPos, slantAngle);
          const futureCollision = checkCollisionWithSlant(newX, newY, slantPos, slantAngle);
          
          // Check if mouse and ball are moving in the same direction (to prevent bouncing)
          const mouseVel = mouseVelocityRef.current;
          const mouseVelMagnitude = Math.sqrt(mouseVel.x * mouseVel.x + mouseVel.y * mouseVel.y);
          const ballVelMagnitude = Math.sqrt(velocityRef.current.x * velocityRef.current.x + velocityRef.current.y * velocityRef.current.y);
          
          let isPushingFromBehind = false;
          
          // Check if mouse is pushing ball from behind (to prevent bounce, but no acceleration)
          if (mouseVelMagnitude > 0.1 && ballVelMagnitude > 0.1) {
            // Normalize velocities for comparison
            const mouseVelNormX = mouseVel.x / mouseVelMagnitude;
            const mouseVelNormY = mouseVel.y / mouseVelMagnitude;
            const ballVelNormX = velocityRef.current.x / ballVelMagnitude;
            const ballVelNormY = velocityRef.current.y / ballVelMagnitude;
            
            // Calculate dot product of normalized velocities
            const directionDot = mouseVelNormX * ballVelNormX + mouseVelNormY * ballVelNormY;
            
            // Check if ball is near the slant (within push range)
            const ballRadius = ballSize / 2;
            const ballCenterX = positionRef.current.x + ballRadius;
            const ballCenterY = positionRef.current.y + ballRadius;
            const distToSlant = Math.sqrt(
              (ballCenterX - slantPos.x) * (ballCenterX - slantPos.x) + 
              (ballCenterY - slantPos.y) * (ballCenterY - slantPos.y)
            );
            const pushRange = ballRadius + slantLength / 2 + 10; // Range for push effect
            
            // If mouse and ball are moving in similar direction (dot product > 0.3) and ball is near slant
            // Just prevent bounce, don't accelerate
            if (directionDot > 0.3 && distToSlant < pushRange) {
              isPushingFromBehind = true;
            }
          }
          
          // Handle collision bounce (only if not pushing from behind)
          // When pushing from behind, we skip all collision handling to prevent direction flips
          if (!isPushingFromBehind && futureCollision.hit && futureCollision.normal) {
            const normal = futureCollision.normal;
            
            // Check if ball is moving toward the slant
            const velocityDot = velocityRef.current.x * normal.x + velocityRef.current.y * normal.y;
            
            // Debounce: only bounce if enough time has passed since last bounce
            const currentTime = Date.now();
            const timeSinceLastBounce = currentTime - lastBounceTimeRef.current;
            
            if (velocityDot < 0 && timeSinceLastBounce >= bounceDebounceMs) { // Moving toward the slant and debounced
              // Update last bounce time
              lastBounceTimeRef.current = currentTime;
              
              // Reflect velocity vector off the slant normal
              const dot = velocityRef.current.x * normal.x + velocityRef.current.y * normal.y;
              velocityRef.current.x = velocityRef.current.x - 2 * dot * normal.x;
              velocityRef.current.y = velocityRef.current.y - 2 * dot * normal.y;
              
              // Position ball on the slant surface for smoother collision
              const ballRadius = ballSize / 2;
              if (futureCollision.closestPoint) {
                // Place ball at the closest point on the slant, offset by radius along normal
                newX = futureCollision.closestPoint.x + normal.x * (ballRadius + 0.5) - ballRadius;
                newY = futureCollision.closestPoint.y + normal.y * (ballRadius + 0.5) - ballRadius;
              } else {
                // Fallback: push ball away from slant center
                const pushDistance = ballRadius + 1;
                newX = slantPos.x + normal.x * pushDistance - ballRadius;
                newY = slantPos.y + normal.y * pushDistance - ballRadius;
              }
              
              // Ensure ball stays within boundaries after push
              newX = Math.max(boundaries.left, Math.min(boundaries.right - ballSize, newX));
              newY = Math.max(boundaries.top, Math.min(boundaries.bottom - ballSize, newY));
            }
          }
        }
      }

      positionRef.current = { x: newX, y: newY };
      ball.style.left = `${newX}px`;
      ball.style.top = `${newY}px`;

      // Update slant position
      const slant = slantRef.current;
      if (slant) {
        if (mousePositionRef.current) {
          const pos = mousePositionRef.current;
          slant.style.setProperty('display', 'block');
          slant.style.setProperty('left', `${pos.x}px`);
          slant.style.setProperty('top', `${pos.y}px`);
          slant.style.setProperty('transform', `translate(-50%, -50%) rotate(${slantAngle}deg)`);
        } else {
          slant.style.setProperty('display', 'none');
        }
      }

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
  }, [ballSize, isMobile, slantAngle]);

  // Hide cursor on mount
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = '';
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
      <div
        ref={slantRef}
        className="fixed z-40 pointer-events-none"
        style={{
          width: `${slantLength}px`,
          height: '5px',
          backgroundColor: '#629C77',
          borderRadius: '3px',
          transformOrigin: 'center',
          display: 'none',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        }}
      />
    </>
  );
}

