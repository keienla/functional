/**
 * Transform a function with only one array type argument into a function with N arguments to replace the previous array.
 *
 * @param { (a: T) => R } fn
 * @returns { (...args: T) => R }
 * @example
 *  function sum(numbers: number[]): number { return numbers.reduce((result, value) => result + value, 0 ) };
 *  const spreadSum: (...args: number[]): number = spreadArgs(sum);
 *
 *  const number1: number = sum([1, 2, 3, 4, 5, 6, 7, 8, 9]);      // 45
 *  const number2: number = spreadSum(1, 2, 3, 4, 5, 6, 7, 8, 9);  // 45
 *
 *  number1 === number2;     // true
 */
export default function spreadArgs<R>(fn: () => R): () => R;
export default function spreadArgs<T, R>(
    fn: (arg: T[]) => R,
): (...args: T[]) => R;
export default function spreadArgs<T, R>(fn: any): any {
    return function spread(...args: T[]): R {
        if (args.length) {
            return fn(args);
        } else {
            return fn();
        }
    };
}
