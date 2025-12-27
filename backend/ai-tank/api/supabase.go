package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
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
func (s *SupabaseStorage) SaveModel(weights *types.ModelWeights) error {
	weightsJSON, err := json.Marshal(weights.Layers)
	if err != nil {
		return fmt.Errorf("failed to marshal weights: %w", err)
	}

	metadataJSON, err := json.Marshal(weights.Metadata)
	if err != nil {
		return fmt.Errorf("failed to marshal metadata: %w", err)
	}

	// Prepare the record
	record := map[string]interface{}{
		"weights":    json.RawMessage(weightsJSON),
		"metadata":   json.RawMessage(metadataJSON),
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
