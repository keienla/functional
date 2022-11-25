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
declare const isLength: import("../models/curry.model").Curry<(lgt: number, el: any) => boolean>;
export default isLength;
//# sourceMappingURL=isLength.d.ts.map