import type { IsRestItems } from './isRestItems';
import type { List } from './types';

/**
 * Extract the first item of a List and return it in an array (to keep key name)
 * ! Can't keep key name when rest...
 * @example
 * type A = Head<[1, 2, string, number]>; // [1]
 * type B = Head<Parameters<(name: string, age: number, single: boolean) => true>>; // [name: string]
 * type C = Head<[]>; // never
 * type D = Head<[string]>; // [string]
 * type E = Head<any[]>; // never
 * type F = Head<[...any[]]>; // never
 * type H = Head<[string, ...number[]]>; // [string]
 * type I = Head<[test: number, test2: boolean, test3: number]>; // [test: number]
 * // ! Can't keep key name when rest...
 * type J = Head<[key: string, ...args: number[]]>; // [string]
 * type K = Head<[key: string]>; // [key: string]
 */
export type Head<T extends List> =
    IsRestItems<T> extends true
        ? T extends [infer F, ...any[]]
            ? [F]
            : never
        : T extends [any, ...infer R]
          ? T extends [...infer F, ...R]
              ? F
              : never
          : never;
