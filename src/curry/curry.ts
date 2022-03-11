import { Curry } from './../models/curry.model';

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
 * @param {number=0} minArgsLength - When use some spread args or conditional function, this parameter will execute the fn only when this min size of args is set. Note that spread args and optional args will not be typed
 * @returns { Curry<P, R> }
 */
export default function curry<F extends (...args: any[]) => any>(fn: F, minArgsLength: number = 0, args: any[] = []): Curry<F> {
    return function nested(...nextArgs: any) {
        const _args = [...args, ...nextArgs];

        if (fn.length - _args.length <= 0 && _args.length >= minArgsLength) {
            return fn(..._args);
        }

        return curry(fn, minArgsLength, _args);
    };
}

