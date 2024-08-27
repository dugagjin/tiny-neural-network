import { describe, it, expect } from 'vitest';
import Network from './network';

describe('Network', () => {
  it('should create a network with the correct number of layers', () => {
    const network = new Network([2, 3, 1]);
    expect(network['layers']).toHaveLength(2);
  });

  it('should predict outputs for given inputs', () => {
    const network = new Network([2, 3, 1]);
    const input = [0.5, -0.2];
    const output = network.predict(input);

    expect(output).toHaveLength(1);
    expect(typeof output[0]).toBe('number');
  });

  it('should learn from training data', () => {
    const network = new Network([2, 3, 1]);
    const input = [0.5, -0.2];
    const expectation = [1];

    // First prediction
    const initialPrediction = network.predict(input);

    // Train the network
    for (let i = 0; i < 100; i++) {
      const prediction = network.predict(input);
      network.learn(prediction, expectation);
    }

    // New prediction after training
    const finalPrediction = network.predict(input);

    // Check if the prediction has changed after training
    expect(finalPrediction).not.toEqual(initialPrediction);

    // Check if the prediction is closer to the expectation
    const initialError = Math.abs(expectation[0]! - initialPrediction[0]!);
    const finalError = Math.abs(expectation[0]! - finalPrediction[0]!);
    expect(finalError).toBeLessThan(initialError);
  });

  it('should handle networks with multiple hidden layers', () => {
    const network = new Network([2, 4, 3, 2]);
    const input = [0.5, -0.2];
    const output = network.predict(input);

    expect(output).toHaveLength(2);
    output.forEach((value) => {
      expect(typeof value).toBe('number');
    });
  });

  it('should handle networks with different learning rates', () => {
    const network1 = new Network([2, 3, 1], 0.1);
    const network2 = new Network([2, 3, 1], 0.5);

    const input = [0.5, -0.2];
    const expectation = [1];

    // Train both networks
    for (let i = 0; i < 100; i++) {
      const prediction1 = network1.predict(input);
      network1.learn(prediction1, expectation);

      const prediction2 = network2.predict(input);
      network2.learn(prediction2, expectation);
    }

    // Final predictions
    const finalPrediction1 = network1.predict(input);
    const finalPrediction2 = network2.predict(input);

    // Check that the networks with different learning rates produce different results
    expect(finalPrediction1).not.toEqual(finalPrediction2);
  });
});
