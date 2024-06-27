import type { UncurryArgs } from '../uncurry/uncurry.model';
import type { Curry } from '../curry/curry.model';
import type { Cast } from '../models';
import uncurry from './../uncurry/uncurry';

/**
 * For a function that return a boolean, make a function that will return the opposite value.
 *
 * @param { Fn } predicate
 * @returns { (...args: Args) => boolean }
 * @example
 *  function isTrue(value: boolean): boolean { return value === true };
 *  const isFalse: (value: boolean) => boolean = not(isTrue);
 *
 *  isTrue(false);       // return false;
 *  isFalse(false);      // return true;
 */
export default function not<
    Fn extends ((...args: any) => any) | Curry<any>,
>(predicate: Fn): (...args: Cast<UncurryArgs<Fn>, any[]>) => boolean {
    return function negated(...args: Cast<UncurryArgs<Fn>, any[]>): boolean {
        const uncurried = uncurry(predicate);
        return !uncurried(...args)
    }
}
