import type { List } from './types';

/**
 * Get the length of a List
 * @example
 * type A = Length<[]>; // 0
 * type B = Length<[any, any]>; // 2
 * type C = Length<[1, 2, 3]>; // 3
 * type D = Length<[key1: 1, key2: 2, key3: 3]>; // 3
 * type E = Length<[string, ...number[]]>; // number
 * type F = Length<never>; // never
 * type G = Length<any[]>; // number
 */
export type Length<Items extends List> = Items['length'];
