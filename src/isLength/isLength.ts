import curry from './../curry/curry';
import getLength from './../length/length';

/**
 * Check if the length of the element corresponding to the given number.
 *
 * @param {any} el
 * @param {number} length
 * @returns {boolean}
 * @example
 *  const el: number[] = [0, 1, 2, 3, 4];
 *
 *  isLength(5, el);     // true
 *  isLength(10, 10);    // false
 */
const isLength = curry(function isLength(length: number, el: any): boolean {
    return getLength(el) === length;
});

export default isLength;
