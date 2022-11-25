"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("../curry/curry");
/**
 * The "divide" function get a numerator and denominator argument add make a division with those two numbers.
 * @example
 *  console.log(divide(50,100))       // 0.5
 * @param { number } numerator
 * @param { number } denominator
 * @returns { number }
 */
exports.default = (0, curry_1.default)(function divide(numerator, denominator) {
    return numerator / denominator;
});
//# sourceMappingURL=divide.js.map