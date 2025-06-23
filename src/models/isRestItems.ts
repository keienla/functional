import type { IsFinite } from './isFinite';
import type { List } from './types';

/**
 * Check if the given array contain rest items
 *
 * - Can add a second parameter to return if IS REST ITEM
 * - Can add a third parameter to return if IS NO REST ITEM
 *
 * ! If the given value is "any[]", will return true as an infinite list is considered as rest items
 * @example
 * type A = IsRestItems<[...any[]]>; // true
 * type B = IsRestItems<any[]>; // true
 * type C = IsRestItems<[string]>; // false
 * type D = IsRestItems<[string[]]>; // false
 * type E = IsRestItems<never>; // false
 * type F = IsRestItems<[hello: string, world: number | undefined]>; // false
 * type G = IsRestItems<[hello: string, ...world: number[]]>; // true
 * type H = IsRestItems<[...hello: string[]]>; // true
 * type I = IsRestItems<[hello: string]>; // false
 * type J = IsRestItems<[hello: string, world: number[]]>; // false
 * type K = IsRestItems<any[], 'Hello'>; // 'Hello'
 * type L = IsRestItems<[any], 'Hello', 'World'>; // 'World'
 */
export type IsRestItems<Items extends List, Is = true, Isnt = false> =
    IsFinite<Items> extends true ? Isnt : Is;
