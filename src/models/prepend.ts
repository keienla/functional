import type { List } from './types';

/**
 * Add the given item to the start of the given array
 * @example
 * type A = PrependItem<string, []>; // [string]
 * type B = PrependItem<number, [1, 2]>; // [number, 1, 2]
 * type C = PrependItem<[string], [1, 2]>; // [[string], 1, 2]
 * type D = PrependItem<[key: string], [1, 2]>; // [[key: string], 1, 2]
 */
export type PrependItem<AddStart, Base extends List> = [AddStart, ...Base];

/**
 * Merge the two list and set the first one at the beginning if the second one
 * @example
 * type A = PrependList<[string], []>; // [string]
 * type B = PrependList<[string], [1, 2]>; // [string, 1, 2]
 * type C = PrependList<[key: string], [1, 2]>; // [key: string, 1, 2]
 */
export type PrependList<AddStart extends List, Base extends List> = [
    ...AddStart,
    ...Base,
];
