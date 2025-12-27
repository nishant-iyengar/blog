-- Supabase Table Setup for Human Demonstrations
-- Run this SQL in your Supabase SQL Editor

-- Create the table for storing human demonstrations
CREATE TABLE IF NOT EXISTS ai_tank_demonstrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  steps JSONB NOT NULL, -- Array of {state, action, nextState, done}
  metadata JSONB NOT NULL, -- {episodeLength, totalReward, timestamp, etc.}
  is_default BOOLEAN DEFAULT false, -- Flag to mark as default/baseline demonstrations
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_ai_tank_demonstrations_created_at 
  ON ai_tank_demonstrations(created_at DESC);

-- Index for filtering by default flag
CREATE INDEX IF NOT EXISTS idx_ai_tank_demonstrations_is_default 
  ON ai_tank_demonstrations(is_default);

-- Index on metadata timestamp for filtering
CREATE INDEX IF NOT EXISTS idx_ai_tank_demonstrations_metadata_timestamp 
  ON ai_tank_demonstrations((metadata->>'timestamp'));

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_demonstrations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at on row updates
CREATE TRIGGER update_ai_tank_demonstrations_updated_at
  BEFORE UPDATE ON ai_tank_demonstrations
  FOR EACH ROW
  EXECUTE FUNCTION update_demonstrations_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE ai_tank_demonstrations ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON ai_tank_demonstrations TO service_role;
GRANT SELECT ON ai_tank_demonstrations TO anon, authenticated;

-- Optional: Add comments
COMMENT ON TABLE ai_tank_demonstrations IS 'Stores human player demonstrations for imitation learning';
COMMENT ON COLUMN ai_tank_demonstrations.steps IS 'JSONB array of demonstration steps: [{state, action, nextState, done}, ...]';
COMMENT ON COLUMN ai_tank_demonstrations.metadata IS 'JSONB object with episode metadata: {episodeLength, totalReward, timestamp, etc.}';
COMMENT ON COLUMN ai_tank_demonstrations.is_default IS 'If true, these demonstrations are used as the default baseline for training';

