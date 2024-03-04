import type { Curry } from './../models/curry.model';
import { Params } from '../models/types.model';
import { _BLANK, isBlank, replaceBlank } from '../utils/_blank'

/**
 * Decompose a function to return another function while the user can set arguments.
 *
 * @param {(...args: P) => R} fn
 * @param {} defaultArgs - List of default args
 * @returns { Curry<P, R> }
 * @example
 *  function sum(x: number, y: number, z: number): number { return x + y + z };
 *  const sumCurry = curry(sum);
 *  sum(1,2,3) === sumCurry(1)(2)(3);        // true
 *  sum(1,2,3) === sumCurry(1,2)(3);         // true
 *  sum(1,2,3) === sumCurry(1)(2,3);         // true
 */
export default function curry<F extends (...args: any[]) => any>(fn: F, args: Params<F>[] = []): Curry<F> {
    return function nested(...nextArgs: any[]) {
        const _args = replaceBlank(args, nextArgs);

        if ((fn.length - _args.length) <= 0) {
            return fn(..._args);
        }

        return curry(fn, _args);
    };
}

