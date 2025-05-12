import type { Arity } from '../arity/arity.model';
import type { Curry } from '../curry/curry.model';
import type { Fn } from '../models';
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
export default function unAry<F extends Fn>(fn: F): Curry<Arity<F, 1>> {
    return _nAry(fn, 1);
}
