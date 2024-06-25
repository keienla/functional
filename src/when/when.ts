import type { Predicate } from '../models/utils';
import { _when } from './../_internal/_when';

/**
 * When the first method given pass, run the second method with the same arguments.
 *
 * @param {Predicate<T>} predicate Function to check a condition
 * @param {(arg: T) => R)} fn Function to execute if predicate function is true
 * @returns {any}
 * @example
 *  function isOdd(x: number): boolean { return x % 2 === 1 };
 *  function addOne(x: number): number { return x + 1 };
 *  const transformEven: (x: number) => number = when(isOdd, addOne);
 *
 *  transformEven(11)       // 12
 *  transformEven(6)        // 6
 */
export default function when<T, R>(predicate: Predicate<T>, fn: (arg: T) => R): (arg: T) => R | T;
export default function when<T, R>(predicate: Predicate<T>): (fn: (arg: T) => R) => (arg: T) => R | T;
export default function when<T, R>(...args: any): any {
    return _when(...args);
}
