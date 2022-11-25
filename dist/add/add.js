"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("../curry/curry");
/**
 * The "add" function get two numbers and return the sum of those two numbers.
 * @example
 *  console.log(add(2,5))       // 7
 *  console.log(add(3)(4))      // 7
 * @param { number } num1
 * @param { number } num2
 * @returns { number }
 */
exports.default = (0, curry_1.default)(function add(num1, num2) {
    return num1 + num2;
});
//# sourceMappingURL=add.js.map