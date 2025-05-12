import curry from '../curry/curry';

/**
 * The "**substract**" function get two numbers and return the substract of the first number by the second
 *
 * @param { number } num1
 * @param { number } num2
 * @returns { number }
 * @example
 *  console.log(substract(5,3))       // 2
 *  console.log(substract(4)(1))      // 3
 */
export default curry(function substract(num1: number, num2: number): number {
    return num1 - num2;
});
