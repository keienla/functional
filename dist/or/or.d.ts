import { Predicate } from '../models/types.model';
import { Curry } from '../models/curry.model';
/**
 * Test two predicate function with the same value and return:
 *  - true: if predicate1 === true && predicate2 === true
 *  - true: if predicate1 === false && predicate2 === true
 *  - true: if predicate1 === true && predicate2 === false
 *  - false: if predicate1 === false && predicate2 === false
 * @example
 *  function sup10(value: number): boolean { return value > 10 }
 *  function odd(value: number): boolean { return value % 2 === 1 }
 *  const oddOrSup10: (value: number) => boolean = or(sup10, odd);
 *
 *  oddOrSup10(5)       // true
 *  oddOrSup10(12)      // true
 *  oddOrSup10(11)      // true
 *  oddOrSup10(6)       // false
 *
 * @typedef { T } T - The type of the value to pass to execute the predicates method
 * @param { ((value: T) => boolean)[] } predicates
 * @returns { (value: T) => boolean }
 */
export default function or<T>(predicate1: Predicate<T>, predicate2: Predicate<T>, value: T): boolean;
export default function or<T>(predicate1: Predicate<T>, predicate2: Predicate<T>): (value: T) => boolean;
export default function or<T>(predicate1: Predicate<T>): Curry<(predicate2: Predicate<T>, value: T) => boolean>;
//# sourceMappingURL=or.d.ts.map