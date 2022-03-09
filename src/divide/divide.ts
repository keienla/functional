'use strict';

import curry from '../curry/curry';

/**
 * The "divide" function get a numerator and denominator argument add make a division with those two numbers.
 * @example
 *  console.log(divide(50,100))       // 0.5
 * @param { number } numerator
 * @param { number } denominator
 * @returns { number }
 */
export default curry(function divide(numerator: number, denominator: number) {
    return numerator / denominator
})
