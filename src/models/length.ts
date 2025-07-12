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

/**
 * Check if two Lists have the same length
 * @example
 * type A = IsLength<[], []>; // true
 * type B = IsLength<[], [1, 2, 3]>; // false
 * type C = IsLength<[1, 2, 3], [4, 5, 6]>; // true
 * type D = IsLength<[1, 2, 3], [4, 5]>; // false
 * type E = IsLength<[],[],'Foo', 'Bar'> // 'Foo'
 * type F = IsLength<[],[1],'Foo', 'Bar'> // 'Bar'
 */
export type IsLengthList<
    Items extends List,
    ComparatorList extends List,
    Is = true,
    Isnt = false,
> = Length<Items> extends Length<ComparatorList> ? Is : Isnt;

/**
 * Check if two numbers are equal
 * @example
 * type A = IsLength<0, 0>; // true
 * type B = IsLength<0, 1>; // false
 * type C = IsLength<1, 1>; // true
 * type D = IsLength<1, 2>; // false
 * type E = IsLength<0, 0, 'Foo', 'Bar'>; // 'Foo'
 * type F = IsLength<0, 1, 'Foo', 'Bar'>; // 'Bar'
 */
export type IsLength<
    Length1 extends number,
    Length2 extends number,
    Is = true,
    Isnt = false,
> = Length1 extends Length2 ? Is : Isnt;
