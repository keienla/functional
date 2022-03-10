import reduce from '../reduce/reduce';

/**
 * Add multiple function inside others. The first argument will be the first function to execute.
 *
 * The functions will be run one after the other, and the argument of each function will be the response of the result of the previous execution function.
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
 * @returns { piped(value: any) => any } Return a function with one argument, the default value to pass to execute the list of functions
 */
export default function pipe(...fns: Function[]): (arg: any) => any {
    if(fns.length === 0) throw new Error('Pipe require at least one argument');

    return function piped(value) {
        return reduce(function reduced(accumulator: any, fn: Function) {
            return fn(accumulator)
        }, value, fns);
    }
}
