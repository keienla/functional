'use strict';

/**
 * For a given function, gather an array of arguments multiple arguments.
 * @example
 *  function sum(x: number, y: number): number { return x + y };
 *  const gatherSum: (args: [number, number]): number = gatherArgs(sum);
 *
 *  const number1: number = sum(10, 8);      // 18
 *  const number2: number = gatheredSum([10, 8]);  // 18
 *
 *  number1 === number2;     // true
 *
 * @param { (...args: T) => R } fn
 * @returns { (args: T) => R }
 */
export default function gatherArgs<R>(fn: () => R): () => R;
export default function gatherArgs<T extends any[], R>(fn: (...args: T) => R): (arg: T) => R;
export default function gatherArgs<T extends any[], R>(fn: (() => R) | ((...args: T) => R)): (() => R) | ((arg: T) => R) {
    return function gather(args?: T): R {
        if(args && args.length) {
            return fn(...args);
        } else {
            return fn()
        }
    }
}
