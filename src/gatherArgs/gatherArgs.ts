/**
 * For a given function, gather an array of arguments multiple arguments.
 *
 * @param { (...args: T) => R } fn
 * @returns { (args: T) => R }
 * @example
 *  function sum(x: number, y: number): number { return x + y };
 *  const gatherSum: (args: [number, number]): number = gatherArgs(sum);
 *
 *  const number1: number = sum(10, 8);      // 18
 *  const number2: number = gatheredSum([10, 8]);  // 18
 *
 *  number1 === number2;     // true
 */
export default function gatherArgs<Fn extends (...args: any[]) => any, R = Fn extends (...args: any[]) => (infer Response) ? Response : any>(fn: Fn): Parameters<Fn> extends [] ? () => R : (args: Parameters<Fn>) => R {
    return function gather(args?: Parameters<Fn>): R {
        if (args && args.length) {
            return fn(...args);
        } else {
            return fn()
        }
    }
}
