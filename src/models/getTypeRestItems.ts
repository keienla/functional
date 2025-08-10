import type { IsRestItems } from './isRestItems';
import type { List } from './types';

/**
 * Extract the type of rest items, else return never if there is none
 * @example
 * type A = GetTypeRestItems<[string, number, boolean]>; // never
 * type B = GetTypeRestItems<[]>; // never
 * type C = GetTypeRestItems<[number, ...string[]]>; // string
 * type D = GetTypeRestItems<[...number[]]>; // number
 * type E = GetTypeRestItems<[hello: string, world: number | never]>; // never
 * type F = GetTypeRestItems<[hello: string, ...world: number[]]>; // number
 * type G = GetTypeRestItems<[...hello: string[]]>; // string
 * type H = GetTypeRestItems<[hello: string]>; // never
 * type I = GetTypeRestItems<[hello: string, world: number[]]>; // never
 * type J = GetTypeRestItems<[...boolean[][]]>; // boolean[]
 */
export type GetTypeRestItems<Items extends List> =
    IsRestItems<Items> extends true
        ? // Number is big enough to considere that's the type of the rest parameter
          // Could put something bigger
          Items[50]
        : never;
