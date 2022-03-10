import curry from '../curry/curry';

/**
 * The "multiply" function get two numbers as argument and multiply the first with the second.
 * @example
 *  console.log(multiply(3,5))       // 15
 * @param { number } num1
 * @param { number } num2
 * @returns { number }
 */
export default curry(function multiply(num1: number, num2: number) {
    return num1 * num2
})
