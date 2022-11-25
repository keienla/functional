"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transpoline_1 = require("./../transpoline/transpoline");
const curry_1 = require("./../curry/curry");
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
exports.default = (0, curry_1.default)(function check(checkMethod, predicates, defaultResult, value, stopIfValue) {
    const checking = (checkMethod, predicates, defaultResult, value, stopIfValue = null) => {
        if (!predicates || !predicates.length || defaultResult === stopIfValue)
            return defaultResult;
        return () => {
            return checking(checkMethod, predicates.slice(1), checkMethod(defaultResult, predicates[0](value)), value, stopIfValue);
        };
    };
    return (0, transpoline_1.default)(checking)(checkMethod, predicates, defaultResult, value, stopIfValue);
});
//# sourceMappingURL=_check.js.map