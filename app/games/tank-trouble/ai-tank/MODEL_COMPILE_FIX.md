# Model Compile Fix

## Issue

**Error**: `Failed to save model weights: Model is not compiled. Cannot save uncompiled model.`

## Root Cause

When a TensorFlow.js model is loaded from IndexedDB using `tf.loadLayersModel()`, the model is loaded **without** being compiled. TensorFlow.js models must be compiled (with an optimizer and loss function) before they can be saved.

The issue occurs in the `load()` method of `DQNAgent`:
- Line 756: `const newQNetwork = await tf.loadLayersModel(path);` - loads model without compilation
- The loaded model is then used, but if someone tries to save it again, it fails because it's not compiled

## Solution

After loading a model from IndexedDB, it must be compiled with the same optimizer and loss function that was used during training.

## Files to Fix

- `ai-tank/rl-dqn-model.ts` - `load()` method needs to compile the model after loading

