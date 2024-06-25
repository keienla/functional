import type { Compose, ComposeArgs } from '../models/compose.model'
import type { Fn } from '../models/utils';
import pipe from './../pipe/pipe';

/**
 * The "compose" function execute multiple functions one after the other, and the argument of each function will be the response of the result of the previous execution function.
 *
 * @param { Function[] } fns Function[] - List of function. The last in array will be executed first
 * @returns { Pipe<Reverse<FNS>> } Return a function with as many arguments that last function given. This function will return the response type of first function given
 * @example
 *  function addOne(value: number): number { return value + 1 };
 *  function mulTwo(value: number): number { return value * 2 };
 *  function divSix(value: number): number { return value / 6 };
 *
 *  const result: number = compose(
 *      divSix,
 *      mulTwo,
 *      addOne
 *  )(1997) // => result: 666 - The response will be divSix(mulTwo(addOne(1997))) => 1997 + 1 = 1998 => 1998 * 2 = 3996 => 3996 / 6 = 666
 */
export default function compose<
    FNS extends [Fn, ...Fn[]],
>(...fns: ComposeArgs<FNS> & FNS): Compose<FNS> {
    return pipe(...fns.reverse() as [Fn, ...Fn[]]);
}