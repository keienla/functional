"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("../curry/curry");
/**
 * The "**substract**" function get two numbers and return the substract of the first number by the second
 * @example
 *  console.log(substract(5,3))       // 2
 *  console.log(substract(4)(1))      // 3
 * @param { number } num1
 * @param { number } num2
 * @returns { number }
 */
exports.default = (0, curry_1.default)(function substract(num1, num2) {
    return num1 - num2;
});
//# sourceMappingURL=substract.js.map