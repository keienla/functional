import { Length, Drop, Cast } from './../models/types.model';
/**
 * Complete the x first arguments of a function.
 * @example
 *  function bigSum(x: number, y: number, z: number): number { return x + y + z }
 *  const add15: (z: number) => number = partial(bigSum, 10, 5);
 *  const myNumber: number = add15(4);   // result: 19 => the calcul will be 10 + 5 + 4
 *
 * @param {(...args: T) => R} fn
 * @param {U} defaultArgs
 * @returns { (...args: Drop<Length<U>, T>) => R } return a function. When give arguments, add it to the first argument and execute the function
 */
export default function partial<Fn extends (...args: any[]) => any, U extends Partial<Args>, Response = ReturnType<Fn>, Args extends any[] = Fn extends (...args: infer A) => any ? A : [], GivenArgs = U extends any[] ? U : any[]>(fn: Fn, ...defaultArgs: U): (...args: Cast<Drop<Length<Cast<GivenArgs, any[]>>, Args>, any[]>) => Response;
//# sourceMappingURL=partial.d.ts.map