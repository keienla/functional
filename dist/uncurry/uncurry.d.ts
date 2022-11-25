import { Uncurry } from '../models/uncurry.model';
import { Curry } from '../models/curry.model';
/**
 * Transform a deep function into a one list arguments function.
 * @example
 *  function sum(x: number): (y: number) => number {
 *      return function add(y: number): number {
 *          return x + y;
 *      }
 *  }
 *  const uncurriedSum: (x: number, y: number) => number = uncurry(sum);
 *  // So
 *  sum(5)(8) === sum(5, 8);     // true
 *
 * @param {Function} fn Function
 * @returns { (...args: any[]) => any } (...args: any[]) => any
 */
export default function uncurry<F extends ((...args: any[]) => any) | Curry<any>>(fn: F): Uncurry<F>;
//# sourceMappingURL=uncurry.d.ts.map