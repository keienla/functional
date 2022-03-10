import { Params } from "../models/types.model";

/**
 * For a given function, gather an array of arguments multiple arguments.
 * @example
 *  function sum(x: number, y: number): number { return x + y };
 *  const gatherSum: (args: [number, number]): number = gatherArgs(sum);
 *
 *  const number1: number = sum(10, 8);      // 18
 *  const number2: number = gatheredSum([10, 8]);  // 18
 *
 *  number1 === number2;     // true
 *
 * @param { (...args: T) => R } fn
 * @returns { (args: T) => R }
 */
export default function gatherArgs<Fn extends (...args: any[]) => any, R = Fn extends (...args: any[]) => (infer Response) ? Response : any>(fn: Fn): Params<Fn> extends [] ? () => R : (args: Params<Fn>) => R{
    return function gather(args?: Params<Fn>): R {
        if(args && args.length) {
            return fn(...args);
        } else {
            return fn()
        }
    }
}
