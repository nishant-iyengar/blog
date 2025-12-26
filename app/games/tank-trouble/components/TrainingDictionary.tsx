/**
 * Training Dictionary Component
 * 
 * Provides definitions and explanations for training-related terms
 */

'use client';

import React, { useState } from 'react';

export function TrainingDictionary() {
  const [isDictionaryVisible, setIsDictionaryVisible] = useState(true);

  if (!isDictionaryVisible) {
    return (
      <div className="flex-shrink-0">
        <button
          onClick={() => setIsDictionaryVisible(true)}
          className="p-2 bg-white border border-gray-300 rounded shadow hover:bg-gray-50 text-sm text-gray-600 hover:text-gray-800 sticky top-4"
        >
          Show Dictionary
        </button>
      </div>
    );
  }

  return (
    <div className="w-80 flex-shrink-0">
      <div className="p-4 bg-white border border-gray-300 rounded shadow sticky top-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Dictionary</h3>
          <button
            onClick={() => setIsDictionaryVisible(false)}
            className="text-gray-500 hover:text-gray-700 text-sm px-2 py-1 rounded hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Game</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              A game is a single complete game session from start to finish. A game ends when one tank loses all lives, 
              a game times out (after the configured max episode time), or both tanks are eliminated. Each game is a learning 
              opportunity for the AI to improve its strategy.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Reward</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              A numerical score given to the AI for its actions. Positive rewards encourage good behavior 
              (hitting enemies, dodging bullets, maintaining optimal distance), while negative rewards 
              discourage bad behavior (getting hit, stalling, being passive). The AI learns to maximize 
              total reward over time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Steps per Game (Length)</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              The number of game ticks (frames) that occurred during a game. Each step represents 
              one decision-making moment where the AI chooses an action. Longer games mean more 
              decisions were made before the game ended.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Epsilon</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              The exploration rate (0.0 to 1.0). Higher values mean the AI makes more random decisions 
              to explore new strategies. Lower values mean it relies more on learned knowledge. Epsilon 
              decreases over time as the AI becomes more confident in its decisions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Loss</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              The neural network training loss - measures how far off the AI's predictions are from 
              the optimal values. Lower loss means better predictions. This decreases as the AI learns 
              from experience.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Average Reward</h4>
            <p className="text-gray-600 text-xs leading-relaxed">
              The mean reward per game across all training games. Higher average reward indicates 
              the AI is performing better and making more effective decisions over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

