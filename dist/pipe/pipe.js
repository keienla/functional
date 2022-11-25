"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gatherArgs_1 = require("../gatherArgs/gatherArgs");
const reduce_1 = require("../reduce/reduce");
/**
 * The "**pipe**" function execute multiple functions one after the other, and the argument of each function will be the response of the result of the previous execution function.
 * Start from the first function given to the last
 * @example
 *  function addOne(value: number): number { return value + 1 };
 *  function mulTwo(value: number): number { return value * 2 };
 *  function divSix(value: number): number { return value / 6 };
 *
 *  const result: number = pipe(
 *      addOne,
 *      mulTwo,
 *      divSix
 *  )(1997) // => result: 666 - The response will be divSix(mulTwo(addOne(1997))) => 1997 + 1 = 1998 => 1998 * 2 = 3996 => 3996 / 6 = 666
 *
 * @param { Function[] } fns Function[] - List of function. The first in array will be executed first
 * @returns { Pipe<FNS> } Return a function with as many arguments that first function given. This function will return the response type of last function given
 */
function pipe(...fns) {
    return function piped(...args) {
        fns[0] = (0, gatherArgs_1.default)(fns[0]);
        return (0, reduce_1.default)(function reduced(accumulator, fn) {
            return fn(accumulator);
        }, args, fns || []);
    };
}
exports.default = pipe;
//# sourceMappingURL=pipe.js.map