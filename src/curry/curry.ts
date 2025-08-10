import { isBlank, replaceBlank } from '../blank/blank';
import type { Cast, Fn, Tuple } from '../models';
import type { Curry, CurryPartialParameters } from './curry.model';

/**
 * TODO DESCRIPTION WITH BLANK TEST AND ALL + UPDATE THE .md FILE WITH THE NEW DESCRIPTION
 * Decompose a function to return another function while the user can set arguments.
 *
 * @param {(...args: P) => R} fn
 * @param {} defaultParams - List of default args
 * @returns { Curry<P, R> }
 * @example
 *  function sum(x: number, y: number, z: number): number { return x + y + z };
 *  const sumCurry = curry(sum);
 *  sum(1,2,3) === sumCurry(1)(2)(3);        // true
 *  sum(1,2,3) === sumCurry(1,2)(3);         // true
 *  sum(1,2,3) === sumCurry(1)(2,3);         // true
 */
export default function curry<
    F extends Fn,
    DefaultArgs extends CurryPartialParameters<Parameters<F>>,
>(fn: F, ...defaultParams: DefaultArgs): Curry<F, Cast<DefaultArgs, Tuple>> {
    return function nested(...nextArgs: any[]) {
        const _args = replaceBlank(
            defaultParams || [],
            nextArgs,
        ) as Parameters<F>;

        if (_args.some((arg) => isBlank(arg))) {
            return curry(
                fn,
                ...(_args as unknown as CurryPartialParameters<Parameters<F>>),
            );
        }

        if (fn.length - _args.length <= 0) {
            return fn(..._args);
        }

        return curry(
            fn,
            ...(_args as unknown as CurryPartialParameters<Parameters<F>>),
        );
    } as Curry<F, Cast<DefaultArgs, Tuple>>;
}
