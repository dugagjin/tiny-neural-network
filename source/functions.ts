/**
 * Sigmoid function to make the neuron output values between 0 and 1.
 * @param z input value
 */
export function sigmoid(z: number): number {
    return 1 / (1 + Math.exp(z * -1));
}

/**
 * Because we use sigmoid for activation we need
 * the derivative for backpropagation
 * @param z input value
 */
export function sigmoidDerivative(z: number): number {
    return sigmoid(z) * (1 - sigmoid(z));
}
