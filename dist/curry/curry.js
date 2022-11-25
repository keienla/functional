"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Decompose a function to return another function while the user can set arguments.
 * @example
 *  function sum(x: number, y: number, z: number): number { return x + y + z };
 *  const sumCurry = curry(sum);
 *  sum(1,2,3) === sumCurry(1)(2)(3);        // true
 *  sum(1,2,3) === sumCurry(1,2)(3);         // true
 *  sum(1,2,3) === sumCurry(1)(2,3);         // true
 *
 * @param {(...args: P) => R} fn
 * @returns { Curry<P, R> }
 */
function curry(fn, args = []) {
    return function nested(...nextArgs) {
        if (nextArgs.length === 0)
            return curry(fn, args);
        const _args = [...args, ...nextArgs];
        if (fn.length - _args.length <= 0) {
            return fn(..._args);
        }
        return curry(fn, _args);
    };
}
exports.default = curry;
//# sourceMappingURL=curry.js.map