"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const length_1 = require("./../length/length");
const curry_1 = require("../curry/curry");
/**
 * Check if two elements have the same length.
 * If one of the element type can't have a length that can be calculated, return false.
 * @example
 *  const el1: string = 'ab';
 *  const el2: number[] = [1, 2];
 *  const el3: number = 2;
 *
 *  sameLength(el1, el1);    // true
 *  sameLength(el1, el2);    // true
 *  sameLength(el1, el3);    // false
 *
 * @param {any} el1
 * @param {any} el2
 * @returns {boolean} boolean
 */
exports.default = (0, curry_1.default)(function sameLength(el1, el2) {
    const el1Length = (0, length_1.default)(el1);
    const el2Length = (0, length_1.default)(el2);
    if (el1Length === null || el2Length === null)
        return false;
    return el1Length === el2Length;
});
//# sourceMappingURL=sameLength.js.map