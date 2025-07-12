import type { Predicate } from '../models';
import _check from '../_internal/_check';

/**
 * The "and" function compare the result of multiple predicate functions with same argument and check if all the functions return "true".
 *
 * @typedef { any } Type - The type of the value to pass to execute the predicates method
 * @param { ((value: Type) => boolean)[] } predicates
 * @returns { (value: Type) => boolean }
 * @example
 *  function sup10(value: number): boolean { return value > 10 }
 *  function odd(value: number): boolean { return value % 2 === 1 }
 *  const oddAndSup10: (value: number) => boolean = and(sup10, odd);
 *  oddAndSup10(5)       // false
 *  oddAndSup10(12)      // false
 *  oddAndSup10(11)      // true
 *  oddAndSup10(6)       // false
 */
export default function and<Type>(
    predicate1: Predicate<Type>,
    predicate2: Predicate<Type>,
    value: Type,
): boolean {
    return _check(
        (accumulator: boolean, current: boolean) => accumulator && current,
        [predicate1, predicate2],
        true,
        value,
        false,
    );
}
