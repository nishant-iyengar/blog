/**
 * React Hook for RL Training
 * 
 * Provides a hook interface for training that can be used in React components.
 */

import { useEffect, useRef, useState } from 'react';
import { RLTrainingManager, type TrainingStats, type TrainingConfig } from './rl-training-manager';
import type { AIContext } from './types';
import type { AIDecision } from './types';

export function useRLTraining(config: Partial<TrainingConfig> = {}) {
  const [isTraining, setIsTraining] = useState(false);
  const [stats, setStats] = useState<TrainingStats | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const managerRef = useRef<RLTrainingManager | null>(null);

  useEffect(() => {
    const manager = new RLTrainingManager({
      ...config,
      onEpisodeComplete: (episodeStats) => {
        setStats(episodeStats);
        if (config.onEpisodeComplete) {
          config.onEpisodeComplete(episodeStats);
        }
      },
      onTrainingUpdate: (updateStats) => {
        setStats((prev) => prev ? { ...prev, ...updateStats } : null);
        if (config.onTrainingUpdate) {
          config.onTrainingUpdate(updateStats);
        }
      },
    });

    manager.initialize().then(() => {
      setIsInitialized(true);
      managerRef.current = manager;
    });

    return () => {
      if (managerRef.current) {
        managerRef.current.dispose();
      }
    };
  }, []);

  const startTraining = () => {
    if (managerRef.current && isInitialized) {
      managerRef.current.start();
      setIsTraining(true);
    }
  };

  const stopTraining = () => {
    if (managerRef.current) {
      managerRef.current.stop();
      setIsTraining(false);
    }
  };

  const step = async (context: AIContext, decision: AIDecision, actionTaken?: number) => {
    if (managerRef.current && isTraining) {
      await managerRef.current.step(context, decision, actionTaken);
    }
  };

  const saveModel = async (name: string) => {
    if (managerRef.current) {
      await managerRef.current.saveModel(name);
    }
  };

  const loadModel = async (name: string) => {
    if (managerRef.current) {
      await managerRef.current.loadModel(name);
    }
  };

  const resetEpisode = (context: AIContext) => {
    if (managerRef.current) {
      managerRef.current.resetEpisode(context);
    }
  };

  return {
    isTraining,
    isInitialized,
    stats,
    startTraining,
    stopTraining,
    step,
    saveModel,
    loadModel,
    resetEpisode,
    manager: managerRef.current,
  };
}

