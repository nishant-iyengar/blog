-- Supabase Table Setup for AI Tank Models
-- Run this SQL in your Supabase SQL Editor

-- Create the table for storing AI model weights
CREATE TABLE IF NOT EXISTS ai_tank_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  weights JSONB NOT NULL,
  metadata JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries (ordering by created_at DESC)
CREATE INDEX IF NOT EXISTS idx_ai_tank_models_created_at 
  ON ai_tank_models(created_at DESC);

-- Optional: Create index on metadata fields for filtering
-- This allows you to query by episodes, eval_score, etc.
CREATE INDEX IF NOT EXISTS idx_ai_tank_models_metadata_episodes 
  ON ai_tank_models((metadata->>'episodes'));

CREATE INDEX IF NOT EXISTS idx_ai_tank_models_metadata_timestamp 
  ON ai_tank_models((metadata->>'timestamp'));

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on row updates
CREATE TRIGGER update_ai_tank_models_updated_at
  BEFORE UPDATE ON ai_tank_models
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for better security
ALTER TABLE ai_tank_models ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to do everything (for backend)
-- This uses the service_role key which bypasses RLS
-- If you're using anon key, you'll need different policies

-- Policy: Allow authenticated users to read (if using auth)
-- CREATE POLICY "Allow authenticated read" ON ai_tank_models
--   FOR SELECT
--   TO authenticated
--   USING (true);

-- Policy: Allow service role full access (recommended for backend)
-- Note: Service role key bypasses RLS, so this is mainly for documentation
-- If you're using service role key, RLS is effectively bypassed

-- Grant necessary permissions
GRANT ALL ON ai_tank_models TO service_role;
GRANT SELECT ON ai_tank_models TO anon, authenticated;

-- Optional: Add a comment to document the table
COMMENT ON TABLE ai_tank_models IS 'Stores AI tank model weights and training metadata';
COMMENT ON COLUMN ai_tank_models.weights IS 'JSONB array of layer weights and biases';
COMMENT ON COLUMN ai_tank_models.metadata IS 'JSONB object with version, timestamp, evalScore, and episodes';

