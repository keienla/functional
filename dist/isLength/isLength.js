"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("./../curry/curry");
const length_1 = require("./../length/length");
/**
 * Check if the length of the element corresponding to the given number.
 * @example
 *  const el: number[] = [0, 1, 2, 3, 4];
 *
 *  isLength(5, el);     // true
 *  isLength(10, 10);    // false
 *
 * @param {any} el
 * @param {number} lgt
 * @returns {boolean}
 */
const isLength = (0, curry_1.default)(function isLength(lgt, el) {
    return (0, length_1.default)(el) === lgt;
});
exports.default = isLength;
//# sourceMappingURL=isLength.js.map