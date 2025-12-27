'use client';

import { UnifiedTrainingView } from '@/app/games/tank-trouble/components/UnifiedTrainingView';
import { PlayYourAI } from '@/app/games/tank-trouble/components/PlayYourAI';

interface TankTroublePageProps {
  view: 'training' | 'play';
  onViewChange: (view: 'training' | 'play') => void;
}

export default function TankTroublePage({ view, onViewChange }: TankTroublePageProps) {
  if (view === 'play') {
    return <PlayYourAI onBack={() => onViewChange('training')} />;
  }

  return <UnifiedTrainingView />;
}

