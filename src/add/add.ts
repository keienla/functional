import curry from '../curry/curry';

/**
 * The "add" function get two numbers and return the sum of those two numbers.
 *
 * @param { number } num1
 * @param { number } num2
 * @returns { number }
 * @example
 *  console.log(add(2,5))       // 7
 *  console.log(add(3)(4))      // 7
 */
export default curry(function add(num1: number, num2: number) {
    return num1 + num2;
});
