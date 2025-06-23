import type { IsRestItems } from './isRestItems';
import type { List } from './types';

/**
 * Extract the type of rest items, else return undefined if there is none
 * @example
 * type A = GetTypeRestItems<[string, number, boolean]>; // undefined
 * type B = GetTypeRestItems<[]>; // undefined
 * type C = GetTypeRestItems<[number, ...string[]]>; // string
 * type D = GetTypeRestItems<[...number[]]>; // number
 * type E = GetTypeRestItems<[hello: string, world: number | undefined]>; // undefined
 * type F = GetTypeRestItems<[hello: string, ...world: number[]]>; // number
 * type G = GetTypeRestItems<[...hello: string[]]>; // string
 * type H = GetTypeRestItems<[hello: string]>; // undefined
 * type I = GetTypeRestItems<[hello: string, world: number[]]>; // undefined
 * type J = GetTypeRestItems<[...boolean[][]]>; // boolean[]
 */
export type GetTypeRestItems<Items extends List> =
    IsRestItems<Items> extends true
        ? // Number is big enough to considere that's the type of the rest parameter
          // Could put something bigger
          Items[50]
        : undefined;
