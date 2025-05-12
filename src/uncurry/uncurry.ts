import type { Uncurry } from './uncurry.model';
import type { Curry } from '../curry/curry.model';
import reduce from '../reduce/reduce';
import { Fn } from '../models';

/**
 * Transform a deep function into a one list arguments function.
 *
 * @param {Function} fn Function
 * @returns { Fn } (...args: any[]) => any
 * @example
 *  function sum(x: number): (y: number) => number {
 *      return function add(y: number): number {
 *          return x + y;
 *      }
 *  }
 *  const uncurriedSum = uncurry(sum);
 *  console.log(uncurriedSum(2,5)) // 7
 *  // Will throw an error
 *  uncurriedSum(8)(3)
 */
export default function uncurry<F extends Fn | Curry<any>>(fn: F): Uncurry<F> {
    return function uncurried(...args: any[]): any {
        return reduce(
            (f: any, current: any, index: number) => {
                if (index === args.length - 1) {
                    return f[0](...f[1], current);
                }
                if (f[0].length === [...f[1], current].length) {
                    return [f[0](...f[1], current), []];
                }
                return [f[0], [...f[1], current]];
            },
            [fn, []] as any,
            args,
        );
    } as Uncurry<F>;
}
