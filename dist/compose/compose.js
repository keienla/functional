"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pipe_1 = require("./../pipe/pipe");
/**
 * The "compose" function execute multiple functions one after the other, and the argument of each function will be the response of the result of the previous execution function.
 * @example
 *  function addOne(value: number): number { return value + 1 };
 *  function mulTwo(value: number): number { return value * 2 };
 *  function divSix(value: number): number { return value / 6 };
 *
 *  const result: number = compose(
 *      divSix,
 *      mulTwo,
 *      addOne
 *  )(1997) // => result: 666 - The response will be divSix(mulTwo(addOne(1997))) => 1997 + 1 = 1998 => 1998 * 2 = 3996 => 3996 / 6 = 666
 *
 * @param { Function[] } fns Function[] - List of function. The last in array will be executed first
 * @returns { Pipe<Reverse<FNS>> } Return a function with as many arguments that last function given. This function will return the response type of first function given
 */
function compose(...fns) {
    return (0, pipe_1.default)(...fns.reverse());
}
exports.default = compose;
//# sourceMappingURL=compose.js.map