import { Predicate } from '../models/types.model';
declare const _default: import("../models/curry.model").Curry<(<T extends unknown>(checkMethod: (accumulator: boolean, current: boolean) => boolean, predicates: Predicate<T>[], defaultResult: boolean, value: T, stopIfValue: boolean | null) => boolean)>;
/**
 * With the check method given, verify the accumulation of predicates methods with a given value
 * @example
 *  const and = check(
 *      (accumulator: boolean, current: boolean) => accumulator && current,
 *      [predicate1, predicate2],
 *      true,
 *      1,
 *      false
 *  )
 *  // will check all the predicates
 *  // if predicate(1) === false, so check will be: true && false === false => will stop and return false
 *  // if predicate(1) === true && predicate2(1) === true, will check true && true && true => true
 *  // if predicate(1) === true && predicate2(1) === false, will check true && true && false => false
 * @param {(accumulator: boolean, current: boolean) => boolean} checkMethod
 * @param {((value: T) => boolean)[]} predicates
 * @param {boolean} defaultResult
 * @param {T} value
 * @param {boolean |null} stopIfValue Stop if the result at each step is equal to this result
 */
export default _default;
//# sourceMappingURL=_check.d.ts.map