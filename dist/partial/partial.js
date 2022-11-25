"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Complete the x first arguments of a function.
 * @example
 *  function bigSum(x: number, y: number, z: number): number { return x + y + z }
 *  const add15: (z: number) => number = partial(bigSum, 10, 5);
 *  const myNumber: number = add15(4);   // result: 19 => the calcul will be 10 + 5 + 4
 *
 * @param {(...args: T) => R} fn
 * @param {U} defaultArgs
 * @returns { (...args: Drop<Length<U>, T>) => R } return a function. When give arguments, add it to the first argument and execute the function
 */
function partial(fn, ...defaultArgs) {
    return function completeArgs(...args) {
        return fn(...defaultArgs, ...args);
    };
}
exports.default = partial;
//# sourceMappingURL=partial.js.map