import { UncurryArgs } from '../models/uncurry.model';
import { Curry } from '../models/curry.model';
import { Cast } from '../models/types.model';
/**
 * For a function that return a boolean, make a function that will return the opposite value.
 * @example
 *  function isTrue(value: boolean): boolean { return value === true };
 *  const isFalse: (value: boolean) => boolean = not(isTrue);
 *
 *  isTrue(false);       // return false;
 *  isFalse(false);      // return true;
 *
 * @param { Fn } predicate
 * @returns { (...args: Args) => boolean }
 */
export default function not<Fn extends ((...args: any) => any) | Curry<any>>(predicate: Fn): (...args: Cast<UncurryArgs<Fn>, any[]>) => boolean;
//# sourceMappingURL=not.d.ts.map