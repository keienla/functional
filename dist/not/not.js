"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uncurry_1 = require("./../uncurry/uncurry");
/**
 * For a function that return a boolean, make a function that will return the opposite value.
 * @example
 *  function isTrue(value: boolean): boolean { return value === true };
 *  const isFalse: (value: boolean) => boolean = not(isTrue);
 *
 *  isTrue(false);       // return false;
 *  isFalse(false);      // return true;
 *
 * @param { Fn } predicate
 * @returns { (...args: Args) => boolean }
 */
function not(predicate) {
    return function negated(...args) {
        const uncurried = (0, uncurry_1.default)(predicate);
        return !uncurried(...args);
    };
}
exports.default = not;
//# sourceMappingURL=not.js.map