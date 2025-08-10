import { isBlank, replaceBlank } from '../blank/blank';
import type { Cast, Fn, Tuple } from '../models';
import type { Curry, CurryPartialParameters } from './curry.model';

/**
 * Transform a function into a curried version with advanced BLANK placeholder support.
 * 
 * Creates a curried function that enables flexible partial application patterns:
 * - Traditional currying: curry(fn)(arg1)(arg2)
 * - BLANK placeholders: curry(fn)(_, arg2)(arg1) 
 * - Mixed patterns: curry(fn)(arg1, _)(arg2)
 * - Preset defaults: curry(fn, defaultArg1, _)
 *
 * The BLANK placeholder (_) allows you to skip arguments and fill them later,
 * enabling powerful partial application workflows with complete type safety.
 *
 * @param {F} fn - The function to curry
 * @param {DefaultArgs} defaultParams - Optional preset arguments (can include BLANK placeholders)
 * @returns {Curry<F, DefaultArgs>} A curried function with BLANK placeholder support
 * @example
 *  import { _ } from '@keienla/functional/blank';
 *  
 *  function sum(x: number, y: number, z: number): number { return x + y + z };
 *  const sumCurry = curry(sum);
 *  
 *  // Traditional currying
 *  sum(1,2,3) === sumCurry(1)(2)(3);        // true
 *  sum(1,2,3) === sumCurry(1,2)(3);         // true
 *  sum(1,2,3) === sumCurry(1)(2,3);         // true
 *  
 *  // With BLANK placeholders
 *  sum(1,2,3) === sumCurry(_, 2, _)(1, 3);  // true
 *  sum(1,2,3) === sumCurry(1, _)(2, 3);     // true
 *  
 *  // Preset defaults with BLANK
 *  const sumWith10 = curry(sum, 10, _);
 *  sum(10,5,3) === sumWith10(5, 3);         // true
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
