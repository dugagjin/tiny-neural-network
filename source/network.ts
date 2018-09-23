import Layer from './layer';
import { subtract } from './helpers';

export default class Network {
    private readonly layers: Layer[];

    /**
     * Create a neural network of an arbitrary architecture.
     * First number of the array is the number of inputs and last number
     * of the array is the number of outputs.
     * @param size architecture of neural network
     */
    constructor(size: number[], learningRate = 0.1) {
        this.layers = [];
        for (let i = 0; i < size.length - 1; i++) {
            const layer = new Layer(size[i + 1], size[i] + 1, learningRate);
            this.layers.push(layer);
        }
    }

    /**
     * Calculate the output of each neuron of each layer with
     * the actual weights.
     * @param input input values
     * @returns output values
     */
    public predict(input: number[]): number[] {
        return this.layers.reduce((inputArr, layer) => {
            inputArr = [1].concat(inputArr);
            return layer.predict(inputArr);
        }, input);
    }

    /**
     * Backpropagates the errors of each neuron of each layer.
     * Update the weights of each neuron in each layer according the error.
     * @param error difference outputs and expected outputs
     */
    public learn(prediction: number[], expectation: number[]): void {
        const errors = subtract(prediction, expectation);
        this.layers
            .reverse()
            .reduce((error, layer) => layer.backPropagation(error), errors);
        this.layers.reverse().forEach(layer => layer.update());
    }
}
