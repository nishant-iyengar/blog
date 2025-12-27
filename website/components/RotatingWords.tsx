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
  const [orderedWords, setOrderedWords] = useState<string[]>(words);

  useEffect(() => {
    if (words.length <= 1) {
      setOrderedWords(words);
      return;
    }

    // Initialize with shuffled order
    setOrderedWords(shuffleArray(words));

    const timer = setInterval(() => {
      // Shuffle the words array to get a new random ordering
      setOrderedWords(shuffleArray(words));
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  if (words.length === 0) return null;
  if (words.length === 1) return <span className={className}>{words[0]}</span>;

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

