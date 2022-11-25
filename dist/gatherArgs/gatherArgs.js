"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * For a given function, gather an array of arguments multiple arguments.
 * @example
 *  function sum(x: number, y: number): number { return x + y };
 *  const gatherSum: (args: [number, number]): number = gatherArgs(sum);
 *
 *  const number1: number = sum(10, 8);      // 18
 *  const number2: number = gatheredSum([10, 8]);  // 18
 *
 *  number1 === number2;     // true
 *
 * @param { (...args: T) => R } fn
 * @returns { (args: T) => R }
 */
function gatherArgs(fn) {
    return function gather(args) {
        if (args && args.length) {
            return fn(...args);
        }
        else {
            return fn();
        }
    };
}
exports.default = gatherArgs;
//# sourceMappingURL=gatherArgs.js.map