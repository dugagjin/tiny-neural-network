import { test, expect } from 'vitest';
import Neuron from './neuron';

test('Neuron initializes with correct number of weights and learning rate', () => {
  const inputs = 3;
  const learningRate = 0.1;
  const neuron = new Neuron(inputs, learningRate);

  expect(neuron['weights']).toHaveLength(inputs);
  expect(neuron['learningRate']).toBe(learningRate);
});

test('Neuron predict method returns correct output', () => {
  const inputs = 3;
  const learningRate = 0.1;
  const neuron = new Neuron(inputs, learningRate);
  const inputValues = [0.5, -0.2, 0.1];

  const output = neuron.predict(inputValues);

  // Since weights are random, we can't predict the exact output, but we can check if it's a number
  expect(typeof output).toBe('number');
});

test('Neuron backPropagation method returns correct error propagation', () => {
  const inputs = 3;
  const learningRate = 0.1;
  const neuron = new Neuron(inputs, learningRate);
  const error = 0.5;

  const errorPropagation = neuron.backPropagation(error);

  // Check if the error propagation has the correct length
  expect(errorPropagation).toHaveLength(inputs - 1);
});

test('Neuron update method adjusts weights correctly', () => {
  const inputs = 3;
  const learningRate = 0.1;
  const neuron = new Neuron(inputs, learningRate);
  const inputValues = [0.5, -0.2, 0.1];
  const error = 0.5;

  neuron.predict(inputValues);
  neuron.backPropagation(error);
  const oldWeights = [...neuron['weights']];

  neuron.update();

  // Check if weights have been updated
  expect(neuron['weights']).not.toEqual(oldWeights);
});
