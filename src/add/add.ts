'use strict';

import curry from '../curry/curry';

/**
 * The "add" function get two numbers and return the sum of those two numbers.
 * @example
 *  console.log(add(2,5))       // 7
 *  console.log(add(3)(4))      // 7
 * @param { number } num1
 * @param { number } num2
 * @returns { number }
 */
export default curry(function add(num1: number, num2: number) {
    return num1 + num2
})
