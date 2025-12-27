import { useEffect, useRef, useState } from 'react';

interface UseGameInputOptions {
  gameOver?: boolean;
}

// Pre-compute game keys as Set for O(1) lookup instead of O(n) array.includes()
const GAME_KEYS_SET = new Set(['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'w', 'a', 's', 'd', 'q', 'p']);

export function useGameInput(options?: UseGameInputOptions) {
  const keysRef = useRef<Set<string>>(new Set());
  const [isPaused, setIsPaused] = useState(false);
  const gameOverRef = useRef(options?.gameOver ?? false);

  useEffect(() => {
    gameOverRef.current = options?.gameOver ?? false;
  }, [options?.gameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip processing if game is over
      if (gameOverRef.current) {
        return;
      }
      // Normalize key to lowercase, handle special cases
      let key: string;
      
      // Handle space key
      if (e.key === ' ' || e.code === 'Space') {
        key = ' ';
      }
      // Handle arrow keys - they come as "ArrowUp", "ArrowDown", etc.
      else if (e.key.startsWith('Arrow') || e.code.startsWith('Arrow')) {
        const arrowDir = e.key.replace('Arrow', '').toLowerCase() || e.code.replace('Arrow', '').toLowerCase();
        key = `arrow${arrowDir}`;
      }
      // Regular letter keys - use code for more reliable detection
      else {
        // e.code gives "KeyP", "KeyW", etc. - remove "Key" prefix
        if (e.code.startsWith('Key')) {
          key = e.code.replace('Key', '').toLowerCase(); // 'KeyW' -> 'w', 'KeyP' -> 'p', etc.
        } else {
          key = e.key.toLowerCase();
        }
      }
      
      // Use Set for O(1) lookup instead of O(n) array.includes()
      if (GAME_KEYS_SET.has(key)) {
        e.preventDefault(); // Prevent default browser behavior (scrolling, etc.) - prevents the "ding" sound
        e.stopPropagation(); // Stop event from bubbling
        
        // Handle pause toggle
        if (key === 'p') {
          setIsPaused((prev) => !prev);
          return; // Don't add 'p' to keys set
        }
        
        keysRef.current.add(key);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Skip processing if game is over
      if (gameOverRef.current) {
        return;
      }
      
      // Normalize key to lowercase, handle special cases
      let key: string;
      
      // Handle space key
      if (e.key === ' ' || e.code === 'Space') {
        key = ' ';
      }
      // Handle arrow keys
      else if (e.key.startsWith('Arrow') || e.code.startsWith('Arrow')) {
        const arrowDir = e.key.replace('Arrow', '').toLowerCase() || e.code.replace('Arrow', '').toLowerCase();
        key = `arrow${arrowDir}`;
      }
      // Regular letter keys
      else {
        // e.code gives "KeyP", "KeyW", etc. - remove "Key" prefix
        if (e.code.startsWith('Key')) {
          key = e.code.replace('Key', '').toLowerCase(); // 'KeyW' -> 'w', 'KeyP' -> 'p', etc.
        } else {
          key = e.key.toLowerCase();
        }
      }
      
      // Use Set for O(1) lookup instead of O(n) array.includes()
      if (GAME_KEYS_SET.has(key)) {
        e.preventDefault(); // Prevent default browser behavior
        e.stopPropagation(); // Stop event from bubbling
        
        // Don't remove 'p' from keys set since we never added it
        if (key !== 'p') {
          keysRef.current.delete(key);
        }
      }
    };

    // Use capture phase to catch events early and prevent default behavior
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
    };
  }, []);

  return { keysRef, isPaused };
}

