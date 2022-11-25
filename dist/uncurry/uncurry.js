"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reduce_1 = require("../reduce/reduce");
/**
 * Transform a deep function into a one list arguments function.
 * @example
 *  function sum(x: number): (y: number) => number {
 *      return function add(y: number): number {
 *          return x + y;
 *      }
 *  }
 *  const uncurriedSum: (x: number, y: number) => number = uncurry(sum);
 *  // So
 *  sum(5)(8) === sum(5, 8);     // true
 *
 * @param {Function} fn Function
 * @returns { (...args: any[]) => any } (...args: any[]) => any
 */
function uncurry(fn) {
    return function uncurried(...args) {
        return (0, reduce_1.default)((f, current, index) => {
            if (index === args.length - 1) {
                return f[0](...f[1], current);
            }
            if (f[0].length === [...f[1], current].length) {
                return [f[0](...f[1], current), []];
            }
            return [f[0], [...f[1], current]];
        }, [fn, []], args);
    };
}
exports.default = uncurry;
//# sourceMappingURL=uncurry.js.map