import Neuron from './neuron';
import { add } from './helpers';

export default class Layer {
  private readonly neurons: Neuron[];

  /**
   * Create a layer of neurons.
   * @param size amount of neurons
   * @param inputs amount of inputs for one neuron
   */
  constructor(size: number, inputs: number, learningRate: number) {
    this.neurons = Array.from(
      { length: size },
      () => new Neuron(inputs, learningRate),
    );
  }

  /**
   * Calculate the output of each neuron using their actual weights.
   * @param input input values
   * @returns output values
   */
  public predict(input: number[]): number[] {
    return this.neurons.map((neuron) => neuron.predict(input));
  }

  /**
   * Backpropagates the errors of each neuron in that layer.
   * @param error difference outputs and expected outputs
   * @returns scalar product of weights and error of each neuron
   */
  public backPropagation(errors: number[]): number[] {
    return this.neurons
      .map((neuron, i) => neuron.backPropagation(errors[i]!))
      .reduce(add);
  }

  /**
   * Update the weights of each neuron in that layer according the error.
   */
  public update(): void {
    this.neurons.forEach((neuron) => neuron.update());
  }
}
