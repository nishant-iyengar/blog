'use client';

import { useCallback } from 'react';
import { UnifiedTrainingView } from '@/app/games/tank-trouble/components/UnifiedTrainingView';
import { PlayYourAI } from '@/app/games/tank-trouble/components/PlayYourAI';

interface TankTroublePageProps {
  view: 'training' | 'play';
  onViewChange: (view: 'training' | 'play') => void;
}

export default function TankTroublePage({ view, onViewChange }: TankTroublePageProps) {
  // Memoize the onBack handler to prevent unnecessary re-renders
  const handleBack = useCallback(() => {
    onViewChange('training');
  }, [onViewChange]);

  if (view === 'play') {
    return <PlayYourAI onBack={handleBack} />;
  }

  return <UnifiedTrainingView />;
}

