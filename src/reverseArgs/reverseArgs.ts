import type { Fn, Reverse } from './../models/utils';

/**
 * Reverse the arguments of the given function. Like this the first argument will be the last, the second the N - 1, ...
 * /!\ The function with spread can't be reversed.
 *
 * @param { (...args: T) => R } fn
 * @returns { (...args: Reverse<T>) => R }
 * @example
 *  function divide(x: number, y: number): number { return x / y }
 *  const inversedDivide: (y: number, x: number) => number = reverseArgs(divide);
 *
 *  const number1 = divide(10, 5);           // 2
 *  const number2 = inversedDivide(10, 5);   // 0.5
 *
 *  number1 !== number2
 */
export default function reverseArgs<
    F extends Fn,
    R = ReturnType<F>,
    Args extends any[] = F extends (...args: infer A) => any ? A : []
>(fn: F): (...args: Reverse<Args>) => R {
    return function reversed(...args: Reverse<Args>): R {
        return fn(...args.reverse());
    };
}
