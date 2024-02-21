import type { Curry } from './../models/curry.model';

/**
 * Decompose a function to return another function while the user can set arguments.
 * @example
 *  function sum(x: number, y: number, z: number): number { return x + y + z };
 *  const sumCurry = curry(sum);
 *  sum(1,2,3) === sumCurry(1)(2)(3);        // true
 *  sum(1,2,3) === sumCurry(1,2)(3);         // true
 *  sum(1,2,3) === sumCurry(1)(2,3);         // true
 *
 * @param {(...args: P) => R} fn
 * @param {} defaultArgs - List of default args
 * @param {number=0} minArgsLength - When use some spread args or conditional function, this parameter will execute the fn only when this min size of args is set. Note that spread args and optional args will not be typed
 * @returns { Curry<P, R> }
 */
export default function curry<F extends (...args: any[]) => any, L extends number = 0>(fn: F, args: any[] = [], minArgsLength?: L): Curry<F, L> {
    const _minArgsLength: number = minArgsLength ?? 0
    return function nested(...nextArgs: any) {
        const _args = [...args, ...nextArgs];

        if (fn.length - _args.length <= 0 && _args.length >= _minArgsLength) {
            return fn(..._args);
        }

        return curry(fn, _args, minArgsLength);
    };
}

