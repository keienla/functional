import type { Length, Drop, Cast, Fn } from './../models';

/**
 * Complete the x first arguments of a function.
 *
 * @param {(...args: T) => R} fn
 * @param {U} defaultArgs
 * @returns { (...args: Drop<Length<U>, T>) => R } return a function. When give arguments, add it to the first argument and execute the function
 * @example
 *  function bigSum(x: number, y: number, z: number): number { return x + y + z }
 *  const add15: (z: number) => number = partial(bigSum, 10, 5);
 *  const myNumber: number = add15(4);   // result: 19 => the calcul will be 10 + 5 + 4
 */
export default function partial<
    F extends Fn,
    U extends Partial<Args>,
    Response = ReturnType<F>,
    Args extends any[] = F extends (...args: infer A) => any ? A : [],
    GivenArgs = U extends any[] ? U : any[]
>(fn: F, ...defaultArgs: U): (...args: Cast<Drop<Length<Cast<GivenArgs, any[]>>, Args>, any[]>) => Response {
    return function completeArgs(...args: Cast<Drop<Length<Cast<GivenArgs, any[]>>, Args>, any[]>): Response {
        return fn(...defaultArgs, ...(args as any[]));
    };
}
