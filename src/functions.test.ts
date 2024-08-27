import { sigmoid, sigmoidDerivative } from './functions.js';
import { test, expect } from 'vitest';

test('sigmoid', () => {
  expect(sigmoid(0)).toBeCloseTo(0.5, 5);
  expect(sigmoid(1)).toBeCloseTo(0.7310585786300049, 5);
  expect(sigmoid(-1)).toBeCloseTo(0.2689414213699951, 5);
  expect(sigmoid(10)).toBeCloseTo(0.9999546021312976, 5);
  expect(sigmoid(-10)).toBeCloseTo(0.000045397868702434, 5);
});

test('sigmoidDerivative', () => {
  expect(sigmoidDerivative(0)).toBeCloseTo(0.25, 5);
  expect(sigmoidDerivative(1)).toBeCloseTo(0.19661193324148185, 5);
  expect(sigmoidDerivative(-1)).toBeCloseTo(0.19661193324148185, 5);
  expect(sigmoidDerivative(10)).toBeCloseTo(0.000045397868702434, 5);
  expect(sigmoidDerivative(-10)).toBeCloseTo(0.000045397868702434, 5);
});
