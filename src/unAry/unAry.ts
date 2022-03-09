'use strict';

import _nAry from '../nAry/nAry';

/**
 * Return a function with multiples properties in object parameter as a function with only one property in it's object
 * @example
 *  function fn1(arg1, arg2, arg3, ..., argN) { ... }
 *  const fn2 = unAry(fn1, 'arg2'); // So when i'll call fn2 now i'll can set only one argument, 'arg2'
 *  fn2(arg2) // will execute the function with only arg2
 *
 * @param { (...args: any[]) => R } fn (args: any) => R
 * @typedef {object} A object - the object with arguments of the given method (when call for the last time)
 * @typedef {any} R any - the result of the fn given
 * @returns { (args: A) => R }
 */
export default function unAry<A extends object = object, R = any>(fn: (...args: any[]) => R): (args: A) => R {
    return _nAry<A, R>(fn, 1)
}
