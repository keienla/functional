import { Pipe, PipeArgs } from '../models/pipe.model';
import { Fn } from '../models/types.model';
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
export default function pipe<FNS extends [Fn, ...Fn[]]>(...fns: PipeArgs<FNS> & FNS): Pipe<FNS>;
//# sourceMappingURL=pipe.d.ts.map