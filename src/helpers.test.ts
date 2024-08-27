import { test, expect } from 'vitest';
import { add, subtract, multiply, sum } from './helpers.js';

test('add throws error when any array is empty', () => {
  const arr1 = [1, 2, 3];
  const arr2: number[] = [];
  expect(() => add(arr1, arr2)).toThrow('Array is empty.');
});

test('add throws error when arrays have different lengths', () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2];
  expect(() => add(arr1, arr2)).toThrow('Arrays length are not equal.');
});

test('add correctly adds two arrays of the same length', () => {
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];
  expect(add(arr1, arr2)).toEqual([5, 7, 9]);
});

test('subtract throws error when any array is empty', () => {
  const arr1 = [1, 2, 3];
  const arr2: number[] = [];
  expect(() => subtract(arr1, arr2)).toThrow('Array is empty.');
});

test('subtract throws error when arrays have different lengths', () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2];
  expect(() => subtract(arr1, arr2)).toThrow('Arrays length are not equal.');
});

test('subtract correctly subtracts two arrays of the same length', () => {
  const arr1 = [5, 7, 9];
  const arr2 = [1, 2, 3];
  expect(subtract(arr1, arr2)).toEqual([4, 5, 6]);
});

test('multiply throws error when any array is empty', () => {
  const arr1 = [1, 2, 3];
  const arr2: number[] = [];
  expect(() => multiply(arr1, arr2)).toThrow('Array is empty.');
});

test('multiply throws error when arrays have different lengths', () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2];
  expect(() => multiply(arr1, arr2)).toThrow('Arrays length are not equal.');
});

test('multiply correctly multiplies two arrays of the same length', () => {
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];
  expect(multiply(arr1, arr2)).toEqual([4, 10, 18]);
});

test('sum throws error when the array is empty', () => {
  const arr: number[] = [];
  expect(() => sum(arr)).toThrow('Array is empty.');
});

test('sum correctly sums the elements of a non-empty array', () => {
  const arr = [1, 2, 3];
  expect(sum(arr)).toEqual(6);
});
