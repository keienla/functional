'use strict';

import { _whenElse } from './../_internal/_when';
import { Predicate } from '../models/types.model';

/**
 * When the first method given pass, run the second method with the same arguments, else run the third method.
 * @example
 *  function isOdd(x: number): boolean { return x % 2 === 1 };
 *  function addOne(x: number): number { return x + 1 };
 *  function addTwo(x: number): number { return x + 2 };
 *  const transformEvenOrAdd: (x: number) => number = whenElse(isOdd, addOne, addTwo);
 *
 *  transformEvenOrAdd(11)       // 12
 *  transformEvenOrAdd(6)        // 8
 */
export default function whenElse<T, R, ER>(predicate: Predicate<T>, fn: (arg: T) => R, elseFn: (arg: T) => ER): (arg: T) => R | T | ER;
export default function whenElse<T, R, ER>(predicate: Predicate<T>, fn: (arg: T) => R): (elseFn: (arg: T) => ER) => (arg: T) => R | T | ER;
export default function whenElse<T, R, ER>(predicate: Predicate<T>): (fn: (arg: T) => R) => (elseFn: (arg: T) => ER) => (arg: T) => R | T | ER;
export default function whenElse<T, R, ER>(...args: any): any {
    return _whenElse(...args);
}
