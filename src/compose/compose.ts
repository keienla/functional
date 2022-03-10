import pipe from './../pipe/pipe';

/**
 * Add multiple function inside others. The last argument will be the first function to execute.
 *
 * The functions will be run one after the other, and the argument of each function will be the response of the result of the previous execution function.
 * @example
 *  function addOne(value: number): number { return value + 1 };
 *  function mulTwo(value: number): number { return value * 2 };
 *  function divSix(value: number): number { return value / 6 };
 *
 *  const result: number = pipe(
 *      divSix,
 *      mulTwo,
 *      addOne
 *  )(1997) // => result: 666 - The response will be divSix(mulTwo(addOne(1997))) => 1997 + 1 = 1998 => 1998 * 2 = 3996 => 3996 / 6 = 666
 *
 * @param { Function[] } fns Function[] - List of function. The first in array will be executed first
 * @returns { piped(value: any) => any } Return a function with one argument, the default value to pass to execute the list of functions
 */
export default function compose(...args: any[]): (...args: any[]) => any {
    return pipe(...args.reverse());
}
