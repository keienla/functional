/**
 * The "add" function gets two numbers and returns the sum with floating-point precision handling.
 * Automatically detects decimal precision and rounds to avoid floating-point errors.
 *
 * @param { number } num1 The first number to add
 * @param { number } num2 The second number to add
 * @returns { number } The sum of the two numbers with precise decimal handling
 * @example
 *  console.log(add(2, 5))        // 7
 *  console.log(add(0.1, 0.2))    // 0.3 (instead of 0.30000000000000004)
 *  console.log(add(1.5, 2.3))    // 3.8
 */
export default function add(num1: number, num2: number): number {
    // Handle special cases
    if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
        return num1 + num2;
    }

    // For integers, use simple addition
    if (Number.isInteger(num1) && Number.isInteger(num2)) {
        return num1 + num2;
    }

    // Get decimal places for each number
    const getDecimalPlaces = (num: number): number => {
        const str = num.toString();
        const decimalIndex = str.indexOf('.');
        return decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
    };

    const decimals1 = getDecimalPlaces(num1);
    const decimals2 = getDecimalPlaces(num2);
    const maxDecimals = Math.max(decimals1, decimals2);

    // Use the precision factor to avoid floating-point errors
    const factor = Math.pow(10, maxDecimals);
    const result = (Math.round(num1 * factor) + Math.round(num2 * factor)) / factor;

    // Round to the maximum decimal places to clean up any remaining precision errors
    return Math.round(result * factor) / factor;
}
