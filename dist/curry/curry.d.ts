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
 * @returns { Curry<P, R> }
 */
export default function curry<F extends (...args: any[]) => any>(fn: F, args?: any[]): Curry<F>;
//# sourceMappingURL=curry.d.ts.map