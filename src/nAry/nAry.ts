import type { Curry } from '../models/curry.model';
import type { Before, Fn } from './../models/utils';
// import curry from '../curry/curry';
import arity from '../arity/arity';
import curry from '../curry/curry';

/**
 * The nAry function will limit the number of arguments of a function. So if a function have 5 necessary arguments, you can decide to limite to X <= 5.
 * The function doesn't count spread args or conditional args
 *
 * @param { (...args: any[]) => any } fn (args: any) => any
 * @param { number } length number
 * @typedef {Function} F Function - The function to limit the number of args
 * @typedef {number} length number - The number of args
 * @returns { Curry<Before<length, Args> => R> } Curry<Before<length, Args> => R>
 * @example
 *  function fn1(arg1, arg2, arg3, ..., argN) { ... }
 *  const fn2 = nAry(fn1, 2); // So when i'll call fn2 now i'll can set only two arguments, the first and the second
 *  fn2(arg1, arg2) // will execute the function with only arg1 and arg2
 */
export default function nAry<
    F extends Fn,
    Size extends number,
    Args extends any[] = Parameters<F>,
    Response = ReturnType<F>
>(fn: F, length: Size): Curry<(...args: Before<Size, Args> extends any[] ? Before<Size, Args> : []) => Response> {
    const max: number = fn.length <= length ? fn.length : length
    return curry(arity<F, Size>(function limite(...args) {
        const limitArgs: any[] = args.slice(0, length)
        return fn(...limitArgs)
    } as F, max as any), [])
}
