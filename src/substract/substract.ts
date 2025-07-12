import add from '../add/add';

/**
 * The "**substract**" function get two numbers and return the substract of the first number by the second
 *
 * @param { number } num1
 * @param { number } num2
 * @returns { number }
 * @example
 *  console.log(substract(5,3))       // 2
 */
export default function substract(num1: number, num2: number): number {
    return add(num1, -num2);
}
