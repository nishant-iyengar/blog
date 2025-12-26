/**
 * React Hook for RL Training
 * 
 * Provides a hook interface for training that can be used in React components.
 */

import { useEffect, useRef, useState } from 'react';
import { RLTrainingManager, type TrainingStats, type TrainingConfig } from './rl-training-manager';
import type { AIContext } from './types';
import type { AIDecision } from './types';
import { isKeyOf } from '@/lib/type-guards';

export function useRLTraining(config: Partial<TrainingConfig> = {}) {
  const [isTraining, setIsTraining] = useState(false);
  const [stats, setStats] = useState<TrainingStats | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const managerRef = useRef<RLTrainingManager | null>(null);
  const configRef = useRef(config);
  
  // Keep config ref up to date
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  // Memoize callbacks to prevent recreation
  const onEpisodeCompleteRef = useRef(config.onEpisodeComplete);
  const onTrainingUpdateRef = useRef(config.onTrainingUpdate);
  
  useEffect(() => {
    onEpisodeCompleteRef.current = config.onEpisodeComplete;
    onTrainingUpdateRef.current = config.onTrainingUpdate;
  }, [config.onEpisodeComplete, config.onTrainingUpdate]);

  useEffect(() => {
    const manager = new RLTrainingManager({
      ...configRef.current,
      onEpisodeComplete: (episodeStats) => {
        setStats((prev) => {
          // Preserve loss value from previous stats if it exists and is non-zero
          // This prevents loss from being reset to 0 when episodes complete
          const preservedLoss = (prev?.loss ?? 0) > 0 ? prev.loss : episodeStats.loss;
          return { ...episodeStats, loss: preservedLoss };
        });
        if (onEpisodeCompleteRef.current) {
          onEpisodeCompleteRef.current(episodeStats);
        }
      },
      onTrainingUpdate: (updateStats) => {
        setStats((prev) => {
          // Type guard to check if key is valid TrainingStats key
          const isValidTrainingStatsKey = (key: string): key is keyof TrainingStats => {
            const validKeys: readonly (keyof TrainingStats)[] = [
              'episode',
              'episodeReward',
              'episodeLength',
              'totalReward',
              'averageReward',
              'epsilon',
              'loss',
            ];
            return isKeyOf<TrainingStats>(key, validKeys);
          };
          
          // Filter out undefined values to prevent overwriting with undefined
          const definedUpdates: Partial<TrainingStats> = {};
          for (const [key, value] of Object.entries(updateStats)) {
            if (value !== undefined && isValidTrainingStatsKey(key)) {
              definedUpdates[key] = value;
            }
          }
          
          // If prev is null, initialize with default values and merge defined updates
          if (!prev) {
            const defaultStats: TrainingStats = {
              episode: 0,
              episodeReward: 0,
              episodeLength: 0,
              totalReward: 0,
              averageReward: 0,
              epsilon: 1.0,
              loss: 0,
            };
            return { ...defaultStats, ...definedUpdates };
          }
          // Only update if values actually changed to prevent infinite loops
          const hasChanges = Object.keys(definedUpdates).some(
            (key) => {
              if (isValidTrainingStatsKey(key)) {
                return prev[key] !== definedUpdates[key];
              }
              return false;
            }
          );
          return hasChanges ? { ...prev, ...definedUpdates } : prev;
        });
        if (onTrainingUpdateRef.current) {
          onTrainingUpdateRef.current(updateStats);
        }
      },
    });

    manager.initialize().then(() => {
      setIsInitialized(true);
      managerRef.current = manager;
      // Initialize stats with current manager stats to ensure all fields are present
      const initialStats = manager.getStats();
      setStats(initialStats);
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

  const saveModel = async (name: string, evalScore?: number, displayName?: string) => {
    if (managerRef.current) {
      await managerRef.current.saveModel(name, evalScore, displayName);
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

  const incrementEpisode = () => {
    if (managerRef.current) {
      managerRef.current.incrementEpisode();
    }
  };

  const canSaveModel = () => {
    return managerRef.current ? managerRef.current.canSaveModel() : false;
  };

  const getReplayBufferSize = () => {
    return managerRef.current ? managerRef.current.getReplayBufferSize() : 0;
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
    incrementEpisode,
    canSaveModel,
    getReplayBufferSize,
    get manager() {
      return managerRef.current;
    },
  };
}

