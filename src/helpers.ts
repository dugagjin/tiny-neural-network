/**
 * Checks if one or more arrays are empty.
 * @param arrays one or more arrays.
 */
function errorIfEmpty<T>(...arrays: T[][]): void {
  if (arrays.some((arr) => arr.length === 0)) {
    throw new Error(`Array is empty.`);
  }
}

/**
 * Checks if two arrays have the same length.
 * @param arr1 generic array
 * @param arr2 generic array
 * @returns void
 */
function errorIfNotEqual<T>(...arrays: T[][]): void {
  const length = arrays[0].length;
  if (arrays.some((arr) => arr.length !== length)) {
    throw new Error(`Arrays length are not equal.`);
  }
}

/**
 * Add each element of two arrays.
 * @param arr1 array of numbers
 * @param arr2 array of numbers
 * @returns result of adding both arrays
 */
export function add(arr1: number[], arr2: number[]): number[] {
  errorIfEmpty(arr1, arr2);
  errorIfNotEqual(arr1, arr2);
  return arr1.map((n, i) => n + arr2[i]);
}

/**
 * Subtract each element of two arrays.
 * @param arr1 array of numbers
 * @param arr2 array of numbers
 * @returns Subtracted result of both arrays
 */
export function subtract(arr1: number[], arr2: number[]): number[] {
  errorIfEmpty(arr1, arr2);
  errorIfNotEqual(arr1, arr2);
  return arr1.map((n, i) => n - arr2[i]);
}

/**
 * Multiplies each element of two arrays.
 * @param arr1 array of numbers
 * @param arr2 array of numbers
 * @returns Multiplied result of both arrays
 */
export function multiply(arr1: number[], arr2: number[]): number[] {
  errorIfEmpty(arr1, arr2);
  errorIfNotEqual(arr1, arr2);
  return arr1.map((n, i) => n * arr2[i]);
}

/**
 * Sum all the values of an array.
 * @param arr array of numbers
 */
export function sum(arr: number[]): number {
  errorIfEmpty(arr);
  return arr.reduce((total, number) => total + number);
}
