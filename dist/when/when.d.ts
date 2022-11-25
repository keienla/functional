import { Predicate } from '../models/types.model';
/**
 * When the first method given pass, run the second method with the same arguments.
 * @example
 *  function isOdd(x: number): boolean { return x % 2 === 1 };
 *  function addOne(x: number): number { return x + 1 };
 *  const transformEven: (x: number) => number = when(isOdd, addOne);
 *
 *  transformEven(11)       // 12
 *  transformEven(6)        // 6
 */
export default function when<T, R>(predicate: Predicate<T>, fn: (arg: T) => R): (arg: T) => R | T;
export default function when<T, R>(predicate: Predicate<T>): (fn: (arg: T) => R) => (arg: T) => R | T;
//# sourceMappingURL=when.d.ts.map