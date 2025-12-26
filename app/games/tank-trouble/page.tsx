'use client';

import { useState } from 'react';
import { UnifiedTrainingView } from '@/app/games/tank-trouble/components/UnifiedTrainingView';
import { PlayYourAI } from '@/app/games/tank-trouble/components/PlayYourAI';

export default function TankTroublePage() {
  const [view, setView] = useState<'training' | 'play'>('training');

  if (view === 'play') {
    return <PlayYourAI onBack={() => setView('training')} />;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold">Tank Trouble</h1>
        <button
          onClick={() => setView('play')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-medium"
        >
          Play your AI
        </button>
      </div>
      <UnifiedTrainingView />
    </div>
  );
}

