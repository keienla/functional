import { Fn } from '../models';

/**
 * For a given function, gather an array of arguments multiple arguments.
 *
 * @param { (...args: T) => R } fn
 * @returns { (args: T) => R }
 * @example
 *  function sum(x: number, y: number): number { return x + y };
 *  const gatherSum: (args: [number, number]): number = gatherArgs(sum);
 *
 *  const number1: number = sum(10, 8);      // 18
 *  const number2: number = gatheredSum([10, 8]);  // 18
 *
 *  number1 === number2;     // true
 */
export default function gatherArgs<F extends Fn>(
    fn: F,
): Parameters<F> extends []
    ? () => ReturnType<F>
    : (args: Parameters<F>) => ReturnType<F> {
    return function gather(args?: Parameters<F>): ReturnType<F> {
        if (args && args.length) {
            return fn(...args);
        } else {
            return fn();
        }
    };
}
