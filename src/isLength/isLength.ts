import curry from "./../curry/curry";
import length from './../length/length';

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
const isLength = curry(function isLength(lgt: number, el: any): boolean {
    return length(el) === lgt;
})

export default isLength;
