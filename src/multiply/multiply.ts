import curry from '../curry/curry';

/**
 * The "multiply" function get two numbers as argument and multiply the first with the second.
 *
 * @param { number } num1
 * @param { number } num2
 * @returns { number }
 * @example
 *  console.log(multiply(3,5))       // 15
 */
export default curry(function multiply(num1: number, num2: number): number {
    return num1 * num2;
});
