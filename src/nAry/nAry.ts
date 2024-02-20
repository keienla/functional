import curry from '../curry/curry';
import { Curry } from '../models/curry.model';
import { Before, Params } from './../models/types.model';

/**
 * The nAry function will limit the number of arguments of a function. So if a function have 5 necessary arguments, you can decide to limite to X <= 5.
 * The function doesn't count spread args or conditional args
 * @example
 *  function fn1(arg1, arg2, arg3, ..., argN) { ... }
 *  const fn2 = nAry(fn1, 2); // So when i'll call fn2 now i'll can set only two arguments, the first and the second
 *  fn2(arg1, arg2) // will execute the function with only arg1 and arg2
 *
 * @param { (...args: any[]) => any } fn (args: any) => any
 * @param { number } length number
 * @typedef {Function} Fn Function - The function to limit the number of args
 * @typedef {number} length number - The number of args
 * @returns { Curry<Before<length, Args> => R> } Curry<Before<length, Args> => R>
 */
export default function nAry<
    Fn extends (...args: any[]) => any,
    length extends number,
    Args extends any[] = Params<Fn>,
    Response = ReturnType<Fn>
>(fn: Fn, length: length): Curry<(...args: Before<length, Args> extends any[] ? Before<length, Args> : []) => Response> {
    const max: number = fn.length <= length ? fn.length : length
    return curry(function limite(...args: Before<length, Args> extends any[] ? Before<length, Args> : []): Response {
        const limitArgs: any[] = args.slice(0, length)
        return fn(...limitArgs)
    }, [], max)
}