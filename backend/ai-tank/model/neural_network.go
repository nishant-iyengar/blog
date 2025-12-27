package model

import (
	"fmt"
	"log"
	"math"
	"math/rand"

	"gonum.org/v1/gonum/mat"
)

// NeuralNetwork represents a multi-layer perceptron
type NeuralNetwork struct {
	Layers []*Layer
	Config *NetworkConfig
	Rand   *rand.Rand
}

// NetworkConfig defines the network architecture
type NetworkConfig struct {
	InputSize        int
	HiddenLayers     []int
	OutputSize       int
	LearningRate     float64
	Activation       string // "relu" or "linear"
	OutputActivation string
}

// Layer represents a single dense layer
type Layer struct {
	Weights    *mat.Dense    // [outputSize x inputSize]
	Biases     *mat.VecDense // [outputSize]
	Activation string
}

// NewNeuralNetwork creates a new neural network with He initialization for weights
func NewNeuralNetwork(config *NetworkConfig, rng *rand.Rand) *NeuralNetwork {
	log.Printf("[NewNeuralNetwork] Creating network: input=%d, hidden=%v, output=%d",
		config.InputSize, config.HiddenLayers, config.OutputSize)

	nn := &NeuralNetwork{
		Layers: make([]*Layer, 0),
		Config: config,
		Rand:   rng,
	}

	// Build layers
	prevSize := config.InputSize
	for layerIdx, hiddenSize := range config.HiddenLayers {
		log.Printf("[NewNeuralNetwork] Creating hidden layer %d: input=%d, output=%d",
			layerIdx, prevSize, hiddenSize)
		layer := NewLayer(prevSize, hiddenSize, config.Activation, rng)
		nn.Layers = append(nn.Layers, layer)
		prevSize = hiddenSize
	}

	// Output layer
	log.Printf("[NewNeuralNetwork] Creating output layer: input=%d, output=%d",
		prevSize, config.OutputSize)
	outputLayer := NewLayer(prevSize, config.OutputSize, config.OutputActivation, rng)
	nn.Layers = append(nn.Layers, outputLayer)

	log.Printf("[NewNeuralNetwork] Network created with %d layers", len(nn.Layers))
	return nn
}

// NewLayer creates a new dense layer with He initialization
func NewLayer(inputSize, outputSize int, activation string, rng *rand.Rand) *Layer {
	// He initialization: weights ~ N(0, sqrt(2/inputSize))
	stdDev := math.Sqrt(2.0 / float64(inputSize))

	weightsData := make([]float64, inputSize*outputSize)
	for i := range weightsData {
		weightsData[i] = rng.NormFloat64() * stdDev
	}
	weights := mat.NewDense(outputSize, inputSize, weightsData)

	// Biases initialized to zero
	biases := mat.NewVecDense(outputSize, nil)

	return &Layer{
		Weights:    weights,
		Biases:     biases,
		Activation: activation,
	}
}

// Forward performs a forward pass through the network
func (nn *NeuralNetwork) Forward(input *mat.VecDense) *mat.VecDense {
	current := input

	for layerIdx, layer := range nn.Layers {
		// Validate dimensions (only log on error to avoid CPU overhead)
		weightRows, weightCols := layer.Weights.Dims()
		currentLen := current.Len()

		if weightCols != currentLen {
			panic(fmt.Sprintf("dimension mismatch at layer %d: weights cols=%d, input len=%d",
				layerIdx, weightCols, currentLen))
		}

		// Compute: output = activation(weights * input + biases)
		// Use MulVec for matrix-vector multiplication: weights is [outputSize x inputSize], current is [inputSize]
		// Result will be [outputSize]
		output := mat.NewVecDense(weightRows, nil)
		output.MulVec(layer.Weights, current)

		// Add biases
		output.AddVec(output, layer.Biases)

		// Apply activation (in-place on vector)
		applyActivationToVec(output, layer.Activation)

		// Prepare for next layer - output is already a vector
		current = output
	}
	return current
}

// Predict returns Q-values for all actions
func (nn *NeuralNetwork) Predict(observation []float64) []float64 {
	if len(observation) != nn.Config.InputSize {
		panic(fmt.Sprintf("observation size mismatch: got %d, expected %d",
			len(observation), nn.Config.InputSize))
	}

	input := mat.NewVecDense(len(observation), observation)
	output := nn.Forward(input)

	result := make([]float64, output.Len())
	for i := 0; i < output.Len(); i++ {
		result[i] = output.AtVec(i)
	}

	return result
}

// GetWeights returns all weights and biases as a structure suitable for JSON serialization
func (nn *NeuralNetwork) GetWeights() [][]float64 {
	weights := make([][]float64, len(nn.Layers))
	for i, layer := range nn.Layers {
		// Flatten weights matrix: [outputSize * inputSize]
		r, c := layer.Weights.Dims()
		weightsData := make([]float64, r*c)
		for row := 0; row < r; row++ {
			for col := 0; col < c; col++ {
				weightsData[row*c+col] = layer.Weights.At(row, col)
			}
		}

		// Get biases
		biasesData := make([]float64, layer.Biases.Len())
		for j := 0; j < layer.Biases.Len(); j++ {
			biasesData[j] = layer.Biases.AtVec(j)
		}

		// Store as [weights, biases]
		weights[i] = append(weightsData, biasesData...)
	}
	return weights
}

// SetWeights sets weights and biases from a structure
func (nn *NeuralNetwork) SetWeights(weights [][]float64) error {
	if len(weights) != len(nn.Layers) {
		return ErrInvalidWeights
	}

	for i, layer := range nn.Layers {
		// Extract weights and biases
		r, c := layer.Weights.Dims()
		expectedSize := r*c + layer.Biases.Len()

		if len(weights[i]) != expectedSize {
			return ErrInvalidWeights
		}

		// Set weights
		weightsData := weights[i][:r*c]
		for row := 0; row < r; row++ {
			for col := 0; col < c; col++ {
				layer.Weights.Set(row, col, weightsData[row*c+col])
			}
		}

		// Set biases
		biasesData := weights[i][r*c:]
		for j := 0; j < layer.Biases.Len(); j++ {
			layer.Biases.SetVec(j, biasesData[j])
		}
	}
	return nil
}

// applyActivation applies the activation function in-place
func applyActivation(m *mat.Dense, activation string) {
	r, c := m.Dims()
	data := m.RawMatrix().Data

	switch activation {
	case "relu":
		for i := 0; i < r*c; i++ {
			if data[i] < 0 {
				data[i] = 0
			}
		}
	case "linear":
		// No change
	default:
		// Default to ReLU
		for i := 0; i < r*c; i++ {
			if data[i] < 0 {
				data[i] = 0
			}
		}
	}
}

// applyActivationToVec applies the activation function in-place to a vector
func applyActivationToVec(v *mat.VecDense, activation string) {
	length := v.Len()

	switch activation {
	case "relu":
		for i := 0; i < length; i++ {
			val := v.AtVec(i)
			if val < 0 {
				v.SetVec(i, 0)
			}
		}
	case "linear":
		// No change
	default:
		// Default to ReLU
		for i := 0; i < length; i++ {
			val := v.AtVec(i)
			if val < 0 {
				v.SetVec(i, 0)
			}
		}
	}
}

// Errors
var (
	ErrInvalidWeights = &ModelError{Message: "invalid weights structure"}
)

type ModelError struct {
	Message string
}

func (e *ModelError) Error() string {
	return e.Message
}
