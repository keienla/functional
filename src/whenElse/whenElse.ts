import type { Predicate } from '../models';
import _defaultWhenElse from './../_internal/_when';

/**
 * When the first method given pass, run the second method with the same arguments, else run the third method.
 *
 * @param {Predicate<Type>} predicate Function to check a condition
 * @param {(arg: Type) => Result} fn Function to execute if predicate function is true
 * @param {(arg: Type) => ErrorResult} elseFn Function to execute if predicate function is false
 * @returns {any}
 * @example
 *  function isOdd(x: number): boolean { return x % 2 === 1 };
 *  function addOne(x: number): number { return x + 1 };
 *  function addTwo(x: number): number { return x + 2 };
 *  const transformEvenOrAdd: (x: number) => number = whenElse(isOdd, addOne, addTwo);
 *
 *  transformEvenOrAdd(11)       // 12
 *  transformEvenOrAdd(6)        // 8
 */
export default function whenElse<Type, Result, ErrorResult>(
    predicate: Predicate<Type>,
    fn: (arg: Type) => Result,
    elseFn: (arg: Type) => ErrorResult,
): (arg: Type) => Result | ErrorResult {
    return _defaultWhenElse(predicate, fn, elseFn);
}
