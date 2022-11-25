"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Reverse the arguments of the given function. Like this the first argument will be the last, the second the N - 1, ...
 * /!\ The function with spread can't be reversed.
 * @example
 *  function divide(x: number, y: number): number { return x / y }
 *  const inversedDivide: (y: number, x: number) => number = reverseArgs(divide);
 *
 *  const number1 = divide(10, 5);           // 2
 *  const number2 = inversedDivide(10, 5);   // 0.5
 *
 *  number1 !== number2
 *
 * @param { (...args: T) => R } fn
 * @returns { (...args: Reverse<T>) => R }
 */
function reverseArgs(fn) {
    return function reversed(...args) {
        return fn(...args.reverse());
    };
}
exports.default = reverseArgs;
//# sourceMappingURL=reverseArgs.js.map