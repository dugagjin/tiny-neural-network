/**
 * Tanh function to make the neuron output values between 0 and 1.
 * @param z input value
 */
export function tanh(z: number): number {
    return Math.tanh(z);
}

/**
 * Because we use tanh for activation we need
 * the derivative for backpropagation
 * @param z input value
 */
export function tanhDerivative(z: number): number {
    return 1 - Math.pow(Math.tanh(z), 2);
}
