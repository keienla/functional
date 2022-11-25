import { Predicate } from '../models/types.model';
import { Curry } from '../models/curry.model';
/**
 * The "and" function compare the result of multiple predicate functions with same argument and check if all the functions return "true".
 * @example
 *  function sup10(value: number): boolean { return value > 10 }
 *  function odd(value: number): boolean { return value % 2 === 1 }
 *  const oddAndSup10: (value: number) => boolean = and(sup10, odd);
 *  oddOrSup10(5)       // false
 *  oddOrSup10(12)      // false
 *  oddOrSup10(11)      // true
 *  oddOrSup10(6)       // false
 * @typedef { any } T - The type of the value to pass to execute the predicates method
 * @param { ((value: T) => boolean)[] } predicates
 * @returns { (value: T) => boolean }
 */
export default function and<T>(predicate1: Predicate<T>, predicate2: Predicate<T>, value: T): boolean;
export default function and<T>(predicate1: Predicate<T>, predicate2: Predicate<T>): (value: T) => boolean;
export default function and<T>(predicate1: Predicate<T>): Curry<(predicate2: Predicate<T>, value: T) => boolean>;
//# sourceMappingURL=and.d.ts.map