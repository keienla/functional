import type { List } from './types';

/**
 * Return a new List without the first element
 * @example
 * type A = Tail<[1, 2, string, number]>; // [2, string, number]
 * type B = Tail<Parameters<(name: string, age: number, single: boolean) => true>>; // [age: number, single: boolean]
 * type C = Tail<Parameters<(name: string, ...args: string[]) => true>>; // [string[]]
 * type D = Tail<B>; // [single: boolean]
 * type E = Tail<C>; // []
 * type F = Tail<D>; // []
 * type G = Tail<[number[]]>; // []
 * type H = Tail<[...number[]]>; // number[]
 * type I = Tail<[number, ...string[]]>; // string[]
 * type J = Tail<[number, boolean, ...string[]]>; // [boolean, ...string[]]
 * type K = Tail<[number, string[]]>; // [string[]]
 */
export type Tail<L extends List> = L extends readonly []
    ? L
    : L extends readonly [any?, ...infer LTail]
      ? LTail
      : L;
