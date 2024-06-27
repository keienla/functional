import type { Curry } from '../models/curry.model';
import type { Before, Fn } from '../models/utils';
import _nAry from '../nAry/nAry';

/**
 * The unAry function is the same that nAry but with only one parameter allowed
 * The function doesn't count spread args or conditional args
 *
 * @param { Fn } fn (args: any) => any
 * @typedef {Function} F Function - The function to limit the number of args
 * @returns { Curry<Before<1, Args> => R> } Curry<Before<length, Args> => R>
 * @example
 *  function fn1(arg1, arg2, arg3, ..., argN) { ... }
 *  const fn2 = unAry(fn1); // So when i'll call fn2 now i'll can set only one argument, the first
 *  fn2(arg1) // will execute the function with only arg1
 */
export default function unAry<
    F extends Fn,
    Args extends any[] = Parameters<F>,
    Response = ReturnType<F>
>(fn: F): Curry<(...args: Before<1, Args> extends any[] ? Before<1, Args> : []) => Response> {
    return _nAry(fn, 1)
}