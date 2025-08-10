import type { List } from './types';

/**
 * Add a value at the end of the given array
 * @example
 * type A = AppendItem<string, []>; // [string]
 * type B = AppendItem<number, [1, 2]>; // [1, 2, number]
 * type C = AppendItem<[string], [1, 2]>; // [1, 2, [string]]
 * type D = AppendItem<[key: string], [1, 2]>; // [1, 2, [key: string]]
 */
export type AppendItem<AddEnd, Base extends List> = [...Base, AddEnd];

/**
 * Add the values at the end of the given array
 * @example
 * type A = AppendList<[string], []>; // [string]
 * type B = AppendList<[string], [1, 2]>; // [1, 2, string]
 * type C = AppendList<[key: string], [1, 2]>; // [1, 2, key: string]
 */
export type AppendList<AddEnd extends List, Base extends List> = [
    ...Base,
    ...AddEnd,
];
