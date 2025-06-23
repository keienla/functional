import type { IsDefinedNumber } from './isDefinedNumber';
import type { Length } from './length';
import type { List } from './types';

/**
 * Check if the given array has a finite length
 *
 * - Can add a second parameter to return if the list IS FINITE
 * - Can add a third parameter to return if the list IS INFINITE
 * @example
 * type A = IsFinite<[string, number]> // true
 * type B = IsFinite<any[]> // false
 * type C = IsFinite<[]> // true
 * type D = IsFinite<[boolean, ...string[]]> // false
 * type E = IsFinite<never> // true
 * type F = IsFinite<[string], 'Foo'> // 'Foo'
 * type G = IsFinite<any[], 'Foo', 'Bar'> // 'Bar'
 */
export type IsFinite<A extends List, Finite = true, Infinite = false> =
    IsDefinedNumber<Length<A>> extends true ? Finite : Infinite;
