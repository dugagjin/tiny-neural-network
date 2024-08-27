import { describe, it, expect } from 'vitest';
import Layer from './layer';

describe('Layer', () => {
  it('should create a layer with the correct number of neurons', () => {
    const layer = new Layer(3, 2, 0.1);
    expect(layer['neurons']).toHaveLength(3);
  });

  it('should predict outputs for given inputs', () => {
    const layer = new Layer(2, 3, 0.1);
    const input = [1, 2, 3];
    const output = layer.predict(input);

    expect(output).toHaveLength(2);
    output.forEach((value) => {
      expect(typeof value).toBe('number');
    });
  });

  it('should perform backpropagation', () => {
    const layer = new Layer(2, 3, 0.1);
    const errors = [0.1, 0.2];
    const result = layer.backPropagation(errors);

    expect(result).toHaveLength(2);
    result.forEach((value) => {
      expect(typeof value).toBe('number');
    });
  });

  it('should update weights', () => {
    const layer = new Layer(2, 3, 0.1);
    const oldWeights = layer['neurons'].map((neuron) => [...neuron['weights']]);

    layer.predict([1, 2, 3]);
    layer.backPropagation([0.1, 0.2]);
    layer.update();

    const newWeights = layer['neurons'].map((neuron) => neuron['weights']);
    expect(newWeights).not.toEqual(oldWeights);
  });
});
