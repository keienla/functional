import type { Uncurry } from '../uncurry/uncurry.model';
import type { Curry } from '../curry/curry.model';
import type { Cast, Fn } from '../models';
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
export default function not<F extends Fn>(
    predicate: F,
): (...args: Parameters<Cast<Uncurry<F>, Fn>>) => boolean {
    return function negated(
        ...args: Parameters<Cast<Uncurry<F>, Fn>>
    ): boolean {
        const uncurried = uncurry(predicate) as any;
        return !uncurried(...(args as any));
    };
}
