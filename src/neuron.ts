import { sigmoid, sigmoidDerivative } from './functions';
import { sum, multiply, subtract } from './helpers';

export default class Neuron {
  private readonly learningRate: number;
  private weights: number[];
  private input: number[];
  private output: number;
  private error: number;

  /**
   * Create a neuron with random weights for each input.
   * @param inputs amount of inputs for the neuron
   * @param learningRate how fast it learns (default = 0.1)
   */
  constructor(inputs: number, learningRate: number) {
    this.input = [];
    this.output = 0;
    this.error = 0;
    this.learningRate = learningRate;
    this.weights = Array.from({ length: inputs }, () => Math.random() - 0.5);
  }

  /**
   * Calculate the output of the neuron using its actual weights.
   * @param input input values
   * @returns output value
   */
  public predict(input: number[]): number {
    this.input = input;
    this.output = sum(multiply(input, this.weights));
    return sigmoid(this.output);
  }

  /**
   * Backpropagates the error.
   * @param error difference output and expected output
   * @returns scalar product of weights and error
   */
  public backPropagation(error: number): number[] {
    this.error = error;
    return this.weights.map((weight) => weight * error).slice(1);
  }

  /**
   * Update the weights of the neuron according the error.
   */
  public update(): void {
    const deltas = this.input.map(
      (input) =>
        input * sigmoidDerivative(this.output) * this.error * this.learningRate,
    );
    this.weights = subtract(this.weights, deltas);
  }
}
