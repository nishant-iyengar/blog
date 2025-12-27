package model

import (
	"math"
	"math/rand"
	"time"

	"blog/backend/ai-tank/types"

	"gonum.org/v1/gonum/mat"
)

// DQNAgent implements a Deep Q-Network agent
type DQNAgent struct {
	QNetwork      *NeuralNetwork
	TargetNetwork *NeuralNetwork
	Config        *types.DQNConfig
	Epsilon       float64
	StepCount     int
	Rand          *rand.Rand
}

// NewDQNAgent creates a new DQN agent
func NewDQNAgent(config *types.DQNConfig, rng *rand.Rand) *DQNAgent {
	if rng == nil {
		rng = rand.New(rand.NewSource(time.Now().UnixNano()))
	}

	networkConfig := &NetworkConfig{
		InputSize:        config.ObservationSize,
		HiddenLayers:     config.HiddenLayers,
		OutputSize:       config.ActionSize,
		LearningRate:     config.LearningRate,
		Activation:       "relu",
		OutputActivation: "linear",
	}

	qNetwork := NewNeuralNetwork(networkConfig, rng)
	targetNetwork := NewNeuralNetwork(networkConfig, rng)

	// Copy weights from Q-network to target network
	copyNetworkWeights(qNetwork, targetNetwork)

	return &DQNAgent{
		QNetwork:      qNetwork,
		TargetNetwork: targetNetwork,
		Config:        config,
		Epsilon:       config.EpsilonStart,
		Rand:          rng,
	}
}

// SelectAction selects an action using epsilon-greedy policy
func (d *DQNAgent) SelectAction(observation []float64, training bool) int {
	// Exploration: random action
	if training && d.Rand.Float64() < d.Epsilon {
		return d.Rand.Intn(d.Config.ActionSize)
	}

	// Exploitation: best action according to Q-network
	qValues := d.QNetwork.Predict(observation)

	bestAction := 0
	bestQValue := qValues[0]
	for i := 1; i < len(qValues); i++ {
		if qValues[i] > bestQValue {
			bestQValue = qValues[i]
			bestAction = i
		}
	}

	return bestAction
}

// Train trains the network on a batch of steps using DQN algorithm
func (d *DQNAgent) Train(steps []types.Step) (float64, error) {
	if len(steps) == 0 {
		return 0, nil
	}

	batchSize := int(math.Min(float64(len(steps)), float64(d.Config.BatchSize)))

	// Prepare batch
	states := make([][]float64, batchSize)
	actions := make([]int, batchSize)
	rewards := make([]float64, batchSize)
	nextStates := make([][]float64, batchSize)
	dones := make([]bool, batchSize)

	for i := 0; i < batchSize; i++ {
		states[i] = steps[i].State
		actions[i] = steps[i].Action
		rewards[i] = steps[i].Reward
		nextStates[i] = steps[i].NextState
		dones[i] = steps[i].Done
	}

	// Get current Q-values
	currentQValues := make([][]float64, batchSize)
	for i, state := range states {
		currentQValues[i] = d.QNetwork.Predict(state)
	}

	// Get next Q-values from target network
	nextQValues := make([][]float64, batchSize)
	for i, nextState := range nextStates {
		nextQValues[i] = d.TargetNetwork.Predict(nextState)
	}

	// Compute target Q-values: r + gamma * max_a Q_target(s', a) if not done
	targets := make([][]float64, batchSize)
	totalLoss := 0.0

	for i := 0; i < batchSize; i++ {
		target := make([]float64, len(currentQValues[i]))
		copy(target, currentQValues[i])

		if dones[i] {
			target[actions[i]] = rewards[i]
		} else {
			// Find max Q-value for next state
			maxNextQ := nextQValues[i][0]
			for _, q := range nextQValues[i] {
				if q > maxNextQ {
					maxNextQ = q
				}
			}
			target[actions[i]] = rewards[i] + d.Config.Gamma*maxNextQ
		}

		targets[i] = target

		// Compute loss (MSE)
		diff := target[actions[i]] - currentQValues[i][actions[i]]
		totalLoss += diff * diff
	}

	// Update Q-network weights using gradient descent
	// For simplicity, we'll use a basic gradient descent update
	// In a full implementation, we'd use Adam optimizer
	err := d.updateWeights(states, targets, actions)
	if err != nil {
		return 0, err
	}

	// Update epsilon
	d.Epsilon = math.Max(
		d.Config.EpsilonEnd,
		d.Epsilon*d.Config.EpsilonDecay,
	)

	// Update target network periodically
	d.StepCount++
	if d.StepCount%d.Config.TargetUpdateFrequency == 0 {
		copyNetworkWeights(d.QNetwork, d.TargetNetwork)
	}

	avgLoss := totalLoss / float64(batchSize)
	return avgLoss, nil
}

// updateWeights performs gradient descent using backpropagation
// Implements proper gradient computation and weight updates for Q-learning
func (d *DQNAgent) updateWeights(states [][]float64, targets [][]float64, actions []int) error {
	learningRate := d.Config.LearningRate
	batchSize := len(states)

	// Gradient clipping threshold to prevent exploding gradients
	maxGradNorm := 10.0

	// Accumulate gradients across batch
	weightGrads := make([]*mat.Dense, len(d.QNetwork.Layers))
	biasGrads := make([]*mat.VecDense, len(d.QNetwork.Layers))

	// Initialize gradient accumulators
	for i, layer := range d.QNetwork.Layers {
		r, c := layer.Weights.Dims()
		weightGrads[i] = mat.NewDense(r, c, nil)
		biasGrads[i] = mat.NewVecDense(layer.Biases.Len(), nil)
	}

	// Process each sample in the batch
	for sampleIdx, state := range states {
		// Forward pass - store activations for backprop
		activations := make([]*mat.VecDense, len(d.QNetwork.Layers)+1)
		preActivations := make([]*mat.VecDense, len(d.QNetwork.Layers))

		input := mat.NewVecDense(len(state), state)
		activations[0] = input
		current := input

		// Forward pass storing activations
		for layerIdx, layer := range d.QNetwork.Layers {
			// Pre-activation: z = Wx + b
			r, _ := layer.Weights.Dims()
			output := mat.NewVecDense(r, nil)
			output.MulVec(layer.Weights, current)
			output.AddVec(output, layer.Biases)
			preActivations[layerIdx] = output

			// Apply activation
			activated := mat.NewVecDense(output.Len(), nil)
			activated.CopyVec(output)
			applyActivationToVec(activated, layer.Activation)
			activations[layerIdx+1] = activated
			current = activated
		}

		// Compute output error (only for the action taken)
		action := actions[sampleIdx]
		target := targets[sampleIdx]
		predicted := activations[len(activations)-1]

		// Error gradient for output layer (only for the action taken)
		outputError := mat.NewVecDense(predicted.Len(), nil)
		for i := 0; i < predicted.Len(); i++ {
			if i == action {
				// Only update the Q-value for the action taken
				error := target[action] - predicted.AtVec(action)
				outputError.SetVec(i, error)
			} else {
				outputError.SetVec(i, 0)
			}
		}

		// Backpropagate through layers
		delta := outputError
		for layerIdx := len(d.QNetwork.Layers) - 1; layerIdx >= 0; layerIdx-- {
			layer := d.QNetwork.Layers[layerIdx]
			activation := activations[layerIdx]
			preActivation := preActivations[layerIdx]

			// Apply activation derivative
			deltaWithDerivative := mat.NewVecDense(delta.Len(), nil)
			deltaWithDerivative.CopyVec(delta)
			applyActivationDerivative(deltaWithDerivative, preActivation, layer.Activation)

			// Compute weight gradients: grad_W = delta * activation^T
			// For matrix: grad_W[i,j] = delta[i] * activation[j]
			r, c := layer.Weights.Dims()
			for row := 0; row < r; row++ {
				for col := 0; col < c; col++ {
					grad := deltaWithDerivative.AtVec(row) * activation.AtVec(col)
					currentGrad := weightGrads[layerIdx].At(row, col)
					weightGrads[layerIdx].Set(row, col, currentGrad+grad)
				}
			}

			// Bias gradients: grad_b = delta
			for i := 0; i < deltaWithDerivative.Len(); i++ {
				currentBiasGrad := biasGrads[layerIdx].AtVec(i)
				biasGrads[layerIdx].SetVec(i, currentBiasGrad+deltaWithDerivative.AtVec(i))
			}

			// Propagate error to previous layer: delta_prev = W^T * delta
			if layerIdx > 0 {
				prevDelta := mat.NewVecDense(activation.Len(), nil)
				r, c := layer.Weights.Dims()
				weightsT := mat.NewDense(c, r, nil)
				weightsT.Copy(layer.Weights.T())
				prevDelta.MulVec(weightsT, deltaWithDerivative)
				delta = prevDelta
			}
		}
	}

	// Compute gradient norm for clipping
	totalGradNorm := 0.0
	for _, grad := range weightGrads {
		r, c := grad.Dims()
		for row := 0; row < r; row++ {
			for col := 0; col < c; col++ {
				g := grad.At(row, col) / float64(batchSize)
				totalGradNorm += g * g
			}
		}
	}
	for _, grad := range biasGrads {
		for i := 0; i < grad.Len(); i++ {
			g := grad.AtVec(i) / float64(batchSize)
			totalGradNorm += g * g
		}
	}

	gradNorm := math.Sqrt(totalGradNorm)
	scale := 1.0
	if gradNorm > maxGradNorm {
		// Scale down gradients to prevent exploding gradients
		scale = maxGradNorm / gradNorm
	}

	// Average gradients over batch and update weights (with clipping if needed)
	for layerIdx, layer := range d.QNetwork.Layers {
		r, c := layer.Weights.Dims()

		// Average gradients and apply clipping scale
		for row := 0; row < r; row++ {
			for col := 0; col < c; col++ {
				grad := weightGrads[layerIdx].At(row, col) / float64(batchSize) * scale
				currentWeight := layer.Weights.At(row, col)
				layer.Weights.Set(row, col, currentWeight+learningRate*grad)
			}
		}

		// Update biases
		for i := 0; i < layer.Biases.Len(); i++ {
			grad := biasGrads[layerIdx].AtVec(i) / float64(batchSize) * scale
			currentBias := layer.Biases.AtVec(i)
			layer.Biases.SetVec(i, currentBias+learningRate*grad)
		}
	}

	return nil
}

// applyActivationDerivative applies the derivative of the activation function
// Modifies delta in-place based on activation type
func applyActivationDerivative(delta, preActivation *mat.VecDense, activation string) {
	length := delta.Len()

	switch activation {
	case "relu":
		// ReLU derivative: 1 if x > 0, else 0
		for i := 0; i < length; i++ {
			if preActivation.AtVec(i) <= 0 {
				delta.SetVec(i, 0)
			}
			// If > 0, derivative is 1, so delta stays the same
		}
	case "linear":
		// Linear derivative is 1, so no change needed
	default:
		// Default to ReLU
		for i := 0; i < length; i++ {
			if preActivation.AtVec(i) <= 0 {
				delta.SetVec(i, 0)
			}
		}
	}
}

// GetEpsilon returns the current epsilon value
func (d *DQNAgent) GetEpsilon() float64 {
	return d.Epsilon
}

// SetEpsilon sets the epsilon value (useful after pre-training)
func (d *DQNAgent) SetEpsilon(epsilon float64) {
	d.Epsilon = math.Max(d.Config.EpsilonEnd, math.Min(1.0, epsilon))
}

// GetWeights returns the Q-network weights in a format suitable for storage
func (d *DQNAgent) GetWeights() *types.ModelWeights {
	weights := d.QNetwork.GetWeights()

	layers := make([]types.LayerWeights, len(weights))
	config := d.QNetwork.Config

	// Reconstruct layer structure
	prevSize := config.InputSize
	for i, hiddenSize := range config.HiddenLayers {
		layerWeights := weights[i]
		weightSize := prevSize * hiddenSize
		biasSize := hiddenSize

		layers[i] = types.LayerWeights{
			Layer:   i,
			Weights: layerWeights[:weightSize],
			Biases:  layerWeights[weightSize : weightSize+biasSize],
		}
		prevSize = hiddenSize
	}

	// Output layer
	outputLayerIdx := len(weights) - 1
	outputLayerWeights := weights[outputLayerIdx]
	outputWeightSize := prevSize * config.OutputSize
	outputBiasSize := config.OutputSize

	layers[outputLayerIdx] = types.LayerWeights{
		Layer:   outputLayerIdx,
		Weights: outputLayerWeights[:outputWeightSize],
		Biases:  outputLayerWeights[outputWeightSize : outputWeightSize+outputBiasSize],
	}

	return &types.ModelWeights{
		Layers: layers,
		Metadata: types.ModelMetadata{
			Version:   1,
			Timestamp: "",
			EvalScore: 0.0,
			Episodes:  0,
		},
	}
}

// SetWeights sets the Q-network weights from a stored format
func (d *DQNAgent) SetWeights(weights *types.ModelWeights) error {
	// Convert to internal format
	internalWeights := make([][]float64, len(weights.Layers))
	for i, layer := range weights.Layers {
		internalWeights[i] = append(layer.Weights, layer.Biases...)
	}

	return d.QNetwork.SetWeights(internalWeights)
}

// copyNetworkWeights copies weights from source to target network
func copyNetworkWeights(source, target *NeuralNetwork) {
	for i, sourceLayer := range source.Layers {
		targetLayer := target.Layers[i]

		// Copy weights
		r, c := sourceLayer.Weights.Dims()
		for row := 0; row < r; row++ {
			for col := 0; col < c; col++ {
				targetLayer.Weights.Set(row, col, sourceLayer.Weights.At(row, col))
			}
		}

		// Copy biases
		for j := 0; j < sourceLayer.Biases.Len(); j++ {
			targetLayer.Biases.SetVec(j, sourceLayer.Biases.AtVec(j))
		}
	}
}
