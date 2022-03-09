'use strict';

import transpoline from './../transpoline/transpoline';
import curry from './../curry/curry';
import { Transpoline } from './../models/transpoline.model';
import { Predicate } from '../models/types.model';

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
export default curry(
    function check<T extends any>(
        checkMethod: (accumulator: boolean, current: boolean) => boolean,
        predicates: (Predicate<T>)[],
        defaultResult: boolean,
        value: T,
        stopIfValue: boolean | null
    ): boolean {
        const checking = (
            checkMethod: (accumulator: boolean, current: boolean) => boolean,
            predicates: ((value: T) => boolean)[],
            defaultResult: boolean,
            value: T,
            stopIfValue: boolean | null = null
        ): Transpoline<boolean> => {
            if(!predicates || !predicates.length || defaultResult === stopIfValue) return defaultResult;

            return () => {
                return checking(checkMethod, predicates.slice(1), checkMethod(defaultResult, predicates[0](value)), value, stopIfValue)
            }
        }

        return transpoline(checking)(checkMethod, predicates, defaultResult, value, stopIfValue);
    }
)
