import type { Predicate } from '../models';
import _defaultWhenElse from './../_internal/_when';

/**
 * When the first method given pass, run the second method with the same arguments.
 *
 * @param {Predicate<Type>} predicate Function to check a condition
 * @param {(arg: Type) => Result} fn Function to execute if predicate function is true
 * @returns {any}
 * @example
 *  function isOdd(x: number): boolean { return x % 2 === 1 };
 *  function addOne(x: number): number { return x + 1 };
 *  const transformEven: (x: number) => number = when(isOdd, addOne);
 *
 *  transformEven(11)       // 12
 *  transformEven(6)        // 6
 */
export default function when<Type, Result>(
    predicate: Predicate<Type>,
    fn: (arg: Type) => Result
): (arg: Type) => Result | Type {
    return _defaultWhenElse(predicate, fn);
}
