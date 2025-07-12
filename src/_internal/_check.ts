import type { Transpoline } from '../transpoline/transpoline.model';
import type { Predicate } from '../models';
import transpoline from './../transpoline/transpoline';

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
 * @param {((value: Type) => boolean)[]} predicates
 * @param {boolean} defaultResult
 * @param {Type} value
 * @param {boolean |null} stopIfValue Stop if the result at each step is equal to this result
 */
export default function _check<Type>(
    checkMethod: (accumulator: boolean, current: boolean) => boolean,
    predicates: Predicate<Type>[],
    defaultResult: boolean,
    value: Type,
    stopIfValue: boolean | null
): boolean {
    const checking = (
        checkMethod: (accumulator: boolean, current: boolean) => boolean,
        predicates: Predicate<Type>[],
        defaultResult: boolean,
        value: Type,
        stopIfValue: boolean | null = null
    ): Transpoline<boolean> => {
        if (!predicates || !predicates.length || defaultResult === stopIfValue)
        {return defaultResult;}

        return () => {
            return checking(
                checkMethod,
                predicates.slice(1),
                checkMethod(defaultResult, predicates[0](value)),
                value,
                stopIfValue
            );
        };
    };

    return transpoline(checking)(
        checkMethod,
        predicates,
        defaultResult,
        value,
        stopIfValue
    );
}
