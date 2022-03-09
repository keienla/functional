'use strict';

import is from './../is/is';

/**
 * If the arguments have already been passed, return the cached result. Else execute the method and stock the result.
 *
 * @example
 *  function sum(x: number, y: number): number { return x + y };
 *  const memoizedSum: (x: number, y: number) => number = memoize(sum);
 *
 *  memoizedSum(3,8);        // 11 => not stocked so calcul the result
 *  memoizedSum(4,1);        // 5 => not stocked so calcul the result
 *  memoizedSum(3,8);        // 11 => the args has already been passed so calcul the result !
 *  memoizedSum(8,3);        // 11 => not stocked because the args are not in the same order.
 *
 * @param {Function} fn
 * @returns { (...args: any) => any }
 */
export default function memoize<T extends (...args: any[]) => any>(fn: T) {
    let cache: { [key: string]: { args: any[], value: any } } = {};

    return function memoized(...args: T extends (...args: infer A) => any ? A : any[]): T extends (...args: any[]) => infer R ? R : any {
        const keys: string[] = Object.keys(cache);

        for(let key of keys) {
            if(is(cache[key].args, args)) {
                return cache[key].value
            }
        }

        cache = { ...cache, [keys.length.toString()] : {
            args: args,
            value: fn(...args)
        }}

        return cache[keys.length.toString()].value;
    }
}
