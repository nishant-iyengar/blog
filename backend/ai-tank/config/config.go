package config

import (
	"encoding/json"
	"os"
	"path/filepath"

	"blog/backend/ai-tank/types"
)

var GlobalConfig *types.GameConfig

// LoadConfig loads the shared game configuration from JSON
func LoadConfig() (*types.GameConfig, error) {
	// Try multiple paths to find the config file
	possiblePaths := []string{
		"shared/config/game-config.json",
		"../shared/config/game-config.json",
		"../../shared/config/game-config.json",
		filepath.Join(os.Getenv("PROJECT_ROOT"), "shared/config/game-config.json"),
	}

	var configPath string
	for _, path := range possiblePaths {
		if _, err := os.Stat(path); err == nil {
			configPath = path
			break
		}
	}

	if configPath == "" {
		// Default to relative path from backend/
		configPath = "../shared/config/game-config.json"
	}

	data, err := os.ReadFile(configPath)
	if err != nil {
		return nil, err
	}

	var config types.GameConfig
	err = json.Unmarshal(data, &config)
	if err != nil {
		return nil, err
	}

	GlobalConfig = &config
	return &config, nil
}

// GetConfig returns the global config, loading it if necessary
func GetConfig() (*types.GameConfig, error) {
	if GlobalConfig != nil {
		return GlobalConfig, nil
	}
	return LoadConfig()
}

