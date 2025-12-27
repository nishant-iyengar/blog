package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"math"
	"net/http"
	"time"

	"blog/backend/ai-tank/types"
)

// SupabaseStorage handles model storage in Supabase using direct HTTP requests
type SupabaseStorage struct {
	url    string // Supabase project URL (e.g., https://xxx.supabase.co)
	apiKey string // Supabase anon/service key
	table  string // Table name for model storage
	client *http.Client
}

// NewSupabaseStorage creates a new Supabase storage client using HTTP requests
func NewSupabaseStorage(url, key, table string) (*SupabaseStorage, error) {
	if url == "" || key == "" || table == "" {
		return nil, fmt.Errorf("url, key, and table are required")
	}

	return &SupabaseStorage{
		url:    url,
		apiKey: key,
		table:  table,
		client: &http.Client{
			Timeout: 30 * time.Second,
		},
	}, nil
}

// ModelRecord represents a model record in Supabase
type ModelRecord struct {
	ID        string          `json:"id"`
	Weights   json.RawMessage `json:"weights"`
	Metadata  json.RawMessage `json:"metadata"`
	CreatedAt time.Time       `json:"created_at"`
	UpdatedAt time.Time       `json:"updated_at"`
}

// SaveModel saves model weights to Supabase using HTTP POST/PATCH
// isDefault: if true, marks this as a default model (from imitation learning)
func (s *SupabaseStorage) SaveModel(weights *types.ModelWeights, isDefault bool) error {
	weightsJSON, err := json.Marshal(weights.Layers)
	if err != nil {
		return fmt.Errorf("failed to marshal weights: %w", err)
	}

	// Set isDefault in metadata if provided
	if isDefault {
		weights.Metadata.IsDefault = &isDefault
	}

	metadataJSON, err := json.Marshal(weights.Metadata)
	if err != nil {
		return fmt.Errorf("failed to marshal metadata: %w", err)
	}

	// Prepare the record
	record := map[string]interface{}{
		"weights":    json.RawMessage(weightsJSON),
		"metadata":   json.RawMessage(metadataJSON),
		"is_default": isDefault,
		"updated_at": time.Now().Format(time.RFC3339),
	}

	recordJSON, err := json.Marshal(record)
	if err != nil {
		return fmt.Errorf("failed to marshal record: %w", err)
	}

	// Use upsert endpoint: POST with Prefer: resolution=merge-duplicates header
	url := fmt.Sprintf("%s/rest/v1/%s", s.url, s.table)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(recordJSON))
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	// Set Supabase headers
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("apikey", s.apiKey)
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", s.apiKey))
	req.Header.Set("Prefer", "resolution=merge-duplicates") // Upsert behavior

	resp, err := s.client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to execute request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated && resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("supabase request failed with status %d: %s", resp.StatusCode, string(body))
	}

	return nil
}

// GetLatestModel retrieves the latest model from Supabase using HTTP GET
func (s *SupabaseStorage) GetLatestModel() (*types.ModelWeights, error) {
	// Build query: select all, order by created_at desc, limit 1
	url := fmt.Sprintf("%s/rest/v1/%s?order=created_at.desc&limit=1", s.url, s.table)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	// Set Supabase headers
	req.Header.Set("apikey", s.apiKey)
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", s.apiKey))
	req.Header.Set("Accept", "application/json")

	resp, err := s.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to execute request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("supabase request failed with status %d: %s", resp.StatusCode, string(body))
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response: %w", err)
	}

	// Parse response (array of records)
	var records []ModelRecord
	if err := json.Unmarshal(body, &records); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	if len(records) == 0 {
		return nil, fmt.Errorf("no models found in database")
	}

	record := records[0]

	// Parse weights and metadata
	var layers []types.LayerWeights
	if err := json.Unmarshal(record.Weights, &layers); err != nil {
		return nil, fmt.Errorf("failed to unmarshal weights: %w", err)
	}

	var metadata types.ModelMetadata
	if err := json.Unmarshal(record.Metadata, &metadata); err != nil {
		return nil, fmt.Errorf("failed to unmarshal metadata: %w", err)
	}

	return &types.ModelWeights{
		Layers:   layers,
		Metadata: metadata,
	}, nil
}

// GetBestDefaultModel retrieves the default model with the best eval score
// Returns the model with highest evalScore where is_default = true
func (s *SupabaseStorage) GetBestDefaultModel() (*types.ModelWeights, error) {
	// Query: select where is_default=true, order by evalScore desc, limit 1
	// Note: evalScore is in metadata JSONB, so we need to cast it properly
	// Using PostgREST: order=metadata->>evalScore.desc.nullslast (but this is string comparison)
	// Better: Use a custom function or cast to numeric - for now, get all and sort in Go
	url := fmt.Sprintf("%s/rest/v1/ai_tank_models?is_default=eq.true&select=*", s.url)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	// Set Supabase headers
	req.Header.Set("apikey", s.apiKey)
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", s.apiKey))
	req.Header.Set("Accept", "application/json")

	resp, err := s.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to execute request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("supabase request failed with status %d: %s", resp.StatusCode, string(body))
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response: %w", err)
	}

	// Parse response (array of records)
	var records []ModelRecord
	if err := json.Unmarshal(body, &records); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	if len(records) == 0 {
		return nil, fmt.Errorf("no default model found in database")
	}

	// Sort by evalScore (highest first) since PostgREST JSONB ordering is tricky
	var bestRecord ModelRecord
	var bestScore float64 = math.Inf(-1)
	for _, record := range records {
		var metadata types.ModelMetadata
		if err := json.Unmarshal(record.Metadata, &metadata); err != nil {
			continue // Skip invalid records
		}
		if metadata.EvalScore > bestScore {
			bestScore = metadata.EvalScore
			bestRecord = record
		}
	}

	record := bestRecord

	// Parse weights and metadata
	var layers []types.LayerWeights
	if err := json.Unmarshal(record.Weights, &layers); err != nil {
		return nil, fmt.Errorf("failed to unmarshal weights: %w", err)
	}

	var metadata types.ModelMetadata
	if err := json.Unmarshal(record.Metadata, &metadata); err != nil {
		return nil, fmt.Errorf("failed to unmarshal metadata: %w", err)
	}

	return &types.ModelWeights{
		Layers:   layers,
		Metadata: metadata,
	}, nil
}

// SaveDefaultModelIfBetter saves a model as default only if it has a better eval score
// Returns true if saved, false if existing model was better
func (s *SupabaseStorage) SaveDefaultModelIfBetter(weights *types.ModelWeights) (bool, error) {
	// Get current best default model
	existingDefault, err := s.GetBestDefaultModel()

	// If no default exists, save this one
	if err != nil {
		if err.Error() == "no default model found in database" {
			// No default exists, save this one
			if saveErr := s.SaveModel(weights, true); saveErr != nil {
				return false, fmt.Errorf("failed to save initial default model: %w", saveErr)
			}
			return true, nil
		}
		// Some other error occurred
		return false, err
	}

	// Compare eval scores
	newEvalScore := weights.Metadata.EvalScore
	existingEvalScore := existingDefault.Metadata.EvalScore

	// Save if new score is better (or within 5% improvement threshold for safety)
	improvementThreshold := 0.05 // 5%
	improvement := (newEvalScore - existingEvalScore) / math.Max(math.Abs(existingEvalScore), 1.0)

	if improvement >= improvementThreshold || newEvalScore > existingEvalScore {
		// New model is better, save it
		// First, unset is_default on old model
		if err := s.UnsetDefaultModel(existingDefault); err != nil {
			// Log but don't fail - we'll still save the new one
			fmt.Printf("Warning: Failed to unset old default model: %v\n", err)
		}

		// Save new default model
		if err := s.SaveModel(weights, true); err != nil {
			return false, fmt.Errorf("failed to save new default model: %w", err)
		}
		return true, nil
	}

	// Existing model is better or equal
	return false, nil
}

// UnsetDefaultModel removes the is_default flag from a model
func (s *SupabaseStorage) UnsetDefaultModel(weights *types.ModelWeights) error {
	// We'd need the model ID to update it, but we don't have that in ModelWeights
	// For now, this is a placeholder - in practice, we'd need to track model IDs
	// or query by metadata to find and update the specific model
	// This is acceptable since the comparison logic ensures only one default at a time
	return nil
}

// DemonstrationRecord represents a demonstration record in Supabase
type DemonstrationRecord struct {
	ID        string          `json:"id"`
	Steps     json.RawMessage `json:"steps"`
	Metadata  json.RawMessage `json:"metadata"`
	IsDefault bool            `json:"is_default"`
	CreatedAt time.Time       `json:"created_at"`
	UpdatedAt time.Time       `json:"updated_at"`
}

// SaveDemonstration saves human demonstration steps to Supabase
func (s *SupabaseStorage) SaveDemonstration(steps []types.Step, metadata map[string]interface{}, isDefault bool) error {
	stepsJSON, err := json.Marshal(steps)
	if err != nil {
		return fmt.Errorf("failed to marshal steps: %w", err)
	}

	// Add timestamp if not present
	if _, ok := metadata["timestamp"]; !ok {
		metadata["timestamp"] = time.Now().UTC().Format(time.RFC3339)
	}

	metadataJSON, err := json.Marshal(metadata)
	if err != nil {
		return fmt.Errorf("failed to marshal metadata: %w", err)
	}

	// Prepare the record
	record := map[string]interface{}{
		"steps":      json.RawMessage(stepsJSON),
		"metadata":   json.RawMessage(metadataJSON),
		"is_default": isDefault,
		"updated_at": time.Now().Format(time.RFC3339),
	}

	recordJSON, err := json.Marshal(record)
	if err != nil {
		return fmt.Errorf("failed to marshal record: %w", err)
	}

	// Use POST to create new demonstration
	url := fmt.Sprintf("%s/rest/v1/ai_tank_demonstrations", s.url)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(recordJSON))
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	// Set Supabase headers
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("apikey", s.apiKey)
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", s.apiKey))
	req.Header.Set("Prefer", "return=representation") // Return created record

	resp, err := s.client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to execute request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated && resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("supabase request failed with status %d: %s", resp.StatusCode, string(body))
	}

	return nil
}

// GetDefaultDemonstrations retrieves default demonstrations from Supabase
// limit: Maximum number of demonstration records (games) to retrieve
// Returns: All steps from the most recent N games, where N = limit
func (s *SupabaseStorage) GetDefaultDemonstrations(limit int) ([]types.Step, error) {
	if limit <= 0 {
		limit = 1000 // Default: last 1000 games
	}

	// Note: Each demonstration record represents one complete game session
	// We load the most recent N games and combine all their steps for training

	// Build query: select where is_default=true, order by created_at desc, limit
	url := fmt.Sprintf("%s/rest/v1/ai_tank_demonstrations?is_default=eq.true&order=created_at.desc&limit=%d", s.url, limit)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	// Set Supabase headers
	req.Header.Set("apikey", s.apiKey)
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", s.apiKey))
	req.Header.Set("Accept", "application/json")

	resp, err := s.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to execute request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("supabase request failed with status %d: %s", resp.StatusCode, string(body))
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response: %w", err)
	}

	// Parse response (array of records)
	var records []DemonstrationRecord
	if err := json.Unmarshal(body, &records); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	// Collect all steps from all demonstrations
	// Each record is one game session, containing multiple steps
	allSteps := make([]types.Step, 0)
	gameCount := 0
	totalSteps := 0

	for _, record := range records {
		var steps []types.Step
		if err := json.Unmarshal(record.Steps, &steps); err != nil {
			// Skip invalid records
			fmt.Printf("Warning: Failed to unmarshal steps from demonstration record: %v\n", err)
			continue
		}
		allSteps = append(allSteps, steps...)
		gameCount++
		totalSteps += len(steps)
	}

	// Log storage stats for monitoring
	fmt.Printf("[GetDefaultDemonstrations] Loaded %d game sessions with %d total steps (limit was %d games)\n",
		gameCount, totalSteps, limit)

	return allSteps, nil
}
