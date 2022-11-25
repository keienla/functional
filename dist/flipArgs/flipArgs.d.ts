/**
 * Flip the fist and the second argument. So like this the first argument become the second and the second the first. The other arguments don't move.
 * @example
 *  function calc(x: number, y: number, z: number): number { return (x / y) + z }
 *  const inversedCalc: (y: number, x: number, z: number) => number = flipArgs(calc);
 *
 *  const number1 = calc(10, 5, 8);          // 10
 *  const number2 = inversedCalc(10, 5, 8);  // 8.5
 *
 *  number1 !== number2
 *
 * @param { (a: T1, b: T2, ...args: T) => R } fn
 * @returns { (arg1: T2, arg2: T1, ...args: T) => R }
 */
export default function flipArgs<T1, T2, T extends any[], R>(fn: (a: T1, b: T2, ...args: T) => R): (arg1: T2, arg2: T1, ...args: T) => R;
//# sourceMappingURL=flipArgs.d.ts.map