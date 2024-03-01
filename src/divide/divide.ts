import curry from '../curry/curry';

/**
 * The "divide" function get a numerator and denominator argument add make a division with those two numbers.
 *
 * @param { number } numerator
 * @param { number } denominator
 * @returns { number }
 * @example
 *  console.log(divide(50,100))       // 0.5
 */
export default curry(function divide(numerator: number, denominator: number): number | never {
    if(denominator === 0) throw new Error('Can\'t divide by "0"')
    return numerator / denominator
})
