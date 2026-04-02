'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface RotatingWordsProps {
  words: string[];
  interval?: number; // in milliseconds
  className?: string;
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function RotatingWords({
  words,
  interval = 3000,
  className = ''
}: RotatingWordsProps) {
  const safeWords = Array.isArray(words) ? words : [];
  const [orderedWords, setOrderedWords] = useState<string[]>(safeWords);

  useEffect(() => {
    if (safeWords.length <= 1) {
      setOrderedWords(safeWords);
      return;
    }

    setOrderedWords(shuffleArray(safeWords));

    const timer = setInterval(() => {
      setOrderedWords(shuffleArray(safeWords));
    }, interval);

    return () => clearInterval(timer);
  }, [safeWords, interval]);

  if (safeWords.length === 0) return null;
  if (safeWords.length === 1) return <span className={className}>{safeWords[0]}</span>;

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {orderedWords.map((word) => (
        <motion.span
          key={word}
          layout
          transition={{
            layout: {
              duration: 0.6,
              ease: [0.43, 0.13, 0.23, 0.96],
            },
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

