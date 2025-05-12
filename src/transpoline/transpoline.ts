import type { Transpoline, TranspolineResult } from './transpoline.model';

/**
 * The transpoline function is used to manage recursive functions. It wrap the recursive function in a loop. Under the hood, it call the recursive function piece by piece until it no longer produces recursive calls.
 *
 * The method can be used for big recursive functions. By use them, you'll not have probleme with call stack of Javascript because it'll recursive as many method that are run one after the other, and not like one method inside one method inside one method...
 *
 * To see more about call stack: https://www.freecodecamp.org/news/understanding-the-javascript-call-stack-861e41ae61d4/
 *
 * Since few year (ES2015), Javascript implement PTC (proper tail calls). It permit to ovoid those problems of call stack. To use them you need to:
 *  - use 'use strict' mode
 *  - the recursive function must be in tail position (https://2ality.com/2015/06/tail-call-optimization.html#checking-whether-a-function-call-is-in-a-tail-position)
 *
 * But for transpoline work, you have to change the default recursive function for something similar.
 *
 * @param { (...args: T) => R } fn
 * @returns { (...args: T) => R }
 * @example
 *  // for a given number, add number below. Ex: defaultRecursive(5) = 5 + 4 + 3 + 2 + 1
 *  function defaultRecursive(n: number, sum = 0): number {
 *      if(number === 0) return sum;
 *      return defaultRecursive(n - 1, sum + n)
 *  }
 *  // Same method but for transpoline
 *  function recursiveForTranspoline(n: number, sum = 0): number {
 *      if(number === 0) return sum;
 *      // Same except the return is in a function
 *      return () => {
 *          return recursiveForTranspoline(n - 1, sum + n);
 *      }
 *  }
 *
 *  const transpolineRecursive = transpoline(recursiveForTranspoline);
 */
export default function transpoline<T extends any[], R>(
    fn: Transpoline<(...args: T) => R>,
): (...args: T) => TranspolineResult<R> {
    return function transpolined(...args: T): TranspolineResult<R> {
        var result = fn(...args);

        while (result instanceof Function) {
            result = result();
        }

        return result as TranspolineResult<R>;
    };
}
