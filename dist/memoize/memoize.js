"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("./../is/is");
/**
 * If the arguments have already been passed, return the cached result. Else execute the method and stock the result.
 *
 * @example
 *  function sum(x: number, y: number): number { return x + y };
 *  const memoizedSum: (x: number, y: number) => number = memoize(sum);
 *
 *  memoizedSum(3,8);        // 11 => not stocked so calcul the result
 *  memoizedSum(4,1);        // 5 => not stocked so calcul the result
 *  memoizedSum(3,8);        // 11 => the args has already been passed so calcul the result !
 *  memoizedSum(8,3);        // 11 => not stocked because the args are not in the same order.
 *
 * @param {Function} fn
 * @returns { (...args: any) => any }
 */
function memoize(fn) {
    let cache = {};
    return function memoized(...args) {
        const keys = Object.keys(cache);
        for (let key of keys) {
            if ((0, is_1.default)(cache[key].args, args)) {
                return cache[key].value;
            }
        }
        cache = Object.assign(Object.assign({}, cache), { [keys.length.toString()]: {
                args: args,
                value: fn(...args)
            } });
        return cache[keys.length.toString()].value;
    };
}
exports.default = memoize;
//# sourceMappingURL=memoize.js.map