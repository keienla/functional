import type { Arity } from "./arity.model"
import { Fn } from "../models";

/**
 * Create a new function with a given number of arguments. It can be usefull for functions with spread args to create a function with limited args
 *
 * @param { F } fn The function to trigger
 * @param { Length } length The number of wanted arguments
 * @return { Arity<F, Length> }
 *
 * @example
 *  function textAndNumbersSum(text: string, ...numbers: number[]) {
 *     return text + ': ' + numbers.reduce((acc, n) => n + acc, 0)
 *  }
 *  const arityTextAndNumbersSum5 = arity(textAndNumbersSum, 5)
 *  console.log(arityTextAndNumbersSum5('Hello', 1, 2, 3, 4)) // "Hello: 10"
*
 *  // Will have a type error because of too much arguments
 *  // If ignore the error will output the response limited to the number of arguments desired
 *  // So here the 5 firsts
 *  console.log(arityTextAndNumbersSum5('World', 2, 4, 6, 8, 10, 12)) // "World: 20"
 *  // Will have a type error because of not enough arguments
 *  // Will throw an error because first argument is undefined
 *  console.log(arityTextAndNumbersSum5()) // Throw error
 */
export default function arity<
    F extends Fn,
    Length extends number
>(fn: F, length: Length): Arity<F, Length> {
    function arityFn(...args: any[]) {
        if (args.length > length) args.length = length
        return fn.apply((this as F), (args))
    }

    // As arityFn as no size argument
    // That can create problems with some functions that use Function.length
    // And as this parameter is readonly and in this case always return 0
    // Use defineProperty to return the wanted length of arguments
    Object.defineProperty(arityFn, "length", {
        configurable: true,
        get: function () { return length; }
    });

    return arityFn as Arity<F, Length>
}
