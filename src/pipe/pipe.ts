import gatherArgs from '../gatherArgs/gatherArgs';
import { Pipe } from '../models/pipe.model'
import reduce from '../reduce/reduce';

/**
 * The "**pipe**" function execute multiple functions one after the other, and the argument of each function will be the response of the result of the previous execution function.
 * Start from the first function given to the last
 * @example
 *  function addOne(value: number): number { return value + 1 };
 *  function mulTwo(value: number): number { return value * 2 };
 *  function divSix(value: number): number { return value / 6 };
 *
 *  const result: number = pipe(
 *      addOne,
 *      mulTwo,
 *      divSix
 *  )(1997) // => result: 666 - The response will be divSix(mulTwo(addOne(1997))) => 1997 + 1 = 1998 => 1998 * 2 = 3996 => 3996 / 6 = 666
 *
 * @param { Function[] } fns Function[] - List of function. The first in array will be executed first
 * @returns { Pipe<FNS> } Return a function with as many arguments that first function given. This function will return the response type of last function given
 */
export default function pipe<FNS extends ((...args: any) => any)[]>(...fns: FNS & Pipe<FNS> extends FNS ? FNS : never): Pipe<FNS> {
    if(fns.length === 0) throw new Error('Pipe require at least one argument');

    return function piped(...args: any[]) {
        fns[0] = gatherArgs(fns[0])
        return reduce(function reduced(accumulator: any, fn: Function) {
            return fn(accumulator)
        }, args, fns);
    }
}