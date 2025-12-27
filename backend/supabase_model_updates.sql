-- Updates to ai_tank_models table for default model tracking
-- Run this SQL in your Supabase SQL Editor after running supabase_setup.sql

-- Add is_default column to track default (imitation learning) models
ALTER TABLE ai_tank_models 
ADD COLUMN IF NOT EXISTS is_default BOOLEAN DEFAULT false;

-- Create index for efficient querying of default models by eval score
CREATE INDEX IF NOT EXISTS idx_ai_tank_models_is_default_eval 
ON ai_tank_models(is_default, ((metadata->>'evalScore')::float) DESC NULLS LAST);

-- Create index on is_default alone for simple queries
CREATE INDEX IF NOT EXISTS idx_ai_tank_models_is_default 
ON ai_tank_models(is_default) 
WHERE is_default = true;

-- Update existing models to explicitly set is_default = false if NULL
UPDATE ai_tank_models 
SET is_default = false 
WHERE is_default IS NULL;

-- Add comment to document the new column
COMMENT ON COLUMN ai_tank_models.is_default IS 'If true, this is a default baseline model created from human demonstrations via imitation learning. Only the model with the best eval score should be marked as default.';

