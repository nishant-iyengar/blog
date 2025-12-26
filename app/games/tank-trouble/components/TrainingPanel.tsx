/**
 * Training Panel Component
 * 
 * UI component for controlling and monitoring RL training.
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { TrainingStats, TrainingConfig } from '../ai-tank/rl-training-manager';
import { useRLTraining } from '../ai-tank/rl-training-hook';

interface TrainingPanelProps {
  onTrainingStateChange?: (isTraining: boolean) => void;
  training?: ReturnType<typeof useRLTraining> | null;
}

export function TrainingPanel({ onTrainingStateChange, training: externalTraining }: TrainingPanelProps) {
  const [config, setConfig] = useState<Partial<TrainingConfig>>({
    episodes: 1000,
    trainEvery: 4,
    saveEvery: 100,
    selfPlay: true,
    // TODO: Implement headless mode later - this will allow faster training by skipping rendering
    // headless: false,
  });

  const internalTraining = useRLTraining({
    ...config,
    onEpisodeComplete: (episodeStats) => {
      console.log('Episode complete:', episodeStats);
    },
  });

  // Use external training if provided, otherwise use internal
  const training = externalTraining || internalTraining;

  const handleStart = () => {
    training.startTraining();
    onTrainingStateChange?.(true);
  };

  const handleStop = () => {
    training.stopTraining();
    onTrainingStateChange?.(false);
  };

  const handleSave = async () => {
    const timestamp = Date.now();
    await training.saveModel(`indexeddb://tank-ai-${timestamp}`);
    alert(`Model saved! (tank-ai-${timestamp})`);
  };

  if (!training.isInitialized) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <p>Initializing training system...</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg h-full flex flex-col">
      <h3 className="text-lg font-bold mb-4">RL Training Control</h3>

      {/* Controls */}
      <div className="flex gap-2 mb-4">
        {!training.isTraining ? (
          <button
            onClick={handleStart}
            style={{ backgroundColor: '#bbf7d0' }}
            className="px-4 py-2 bg-green-200 text-green-700 rounded hover:bg-green-300 font-medium"
          >
            Start Training
          </button>
        ) : (
          <button
            onClick={handleStop}
            style={{ backgroundColor: '#fecaca' }}
            className="px-4 py-2 bg-red-200 text-red-700 rounded hover:bg-red-300 font-medium"
          >
            Stop Training
          </button>
        )}
        <button
          onClick={handleSave}
          style={{ backgroundColor: '#bfdbfe' }}
          className="px-4 py-2 bg-blue-200 text-blue-700 rounded hover:bg-blue-300 font-medium"
        >
          Save Model
        </button>
      </div>

      {/* Configuration */}
      <div className="mb-4 space-y-2">
        <label className="block">
          <span className="text-sm">Train Every N Steps:</span>
          <input
            type="number"
            value={config.trainEvery}
            onChange={(e) => setConfig({ ...config, trainEvery: parseInt(e.target.value) || 4 })}
            className="ml-2 px-2 py-1 border rounded"
            disabled={training.isTraining}
          />
        </label>
        <label className="block">
          <span className="text-sm">Save Every N Episodes:</span>
          <input
            type="number"
            value={config.saveEvery}
            onChange={(e) => setConfig({ ...config, saveEvery: parseInt(e.target.value) || 100 })}
            className="ml-2 px-2 py-1 border rounded"
            disabled={training.isTraining}
          />
        </label>
        {/* TODO: Implement headless mode later - this will allow faster training by skipping rendering
            When implemented, add a checkbox here to toggle headless mode */}
      </div>

      {/* Status */}
      <div className="mt-4 text-sm">
        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${training.isTraining ? 'bg-green-500' : 'bg-gray-400'}`} />
        <span>{training.isTraining ? 'Training Active' : 'Training Stopped'}</span>
      </div>
    </div>
  );
}

