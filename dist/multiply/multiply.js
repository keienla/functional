"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("../curry/curry");
/**
 * The "multiply" function get two numbers as argument and multiply the first with the second.
 * @example
 *  console.log(multiply(3,5))       // 15
 * @param { number } num1
 * @param { number } num2
 * @returns { number }
 */
exports.default = (0, curry_1.default)(function multiply(num1, num2) {
    return num1 * num2;
});
//# sourceMappingURL=multiply.js.map