import type { Head } from './head';
import type { IsFinite } from './isFinite';
import type { PrependList } from './prepend';
import type { Tail } from './tail';
import type { List } from './types';

/**
 * Reverse a List
 * @example
 * type A = Reverse<[1, 2, 3]>; // [3, 2, 1]
 * type B = Reverse<[[2, 1], [3, 4]]>; // [[3, 4], [2, 1]]
 * type C = Reverse<[name: string, age: number, id: string, roles: string[]]>; // [roles: string[], id: string, age: number, name: string]
 */
export type Reverse<Items extends List, Prefix extends List = []> = {
    empty: Prefix;
    notEmpty: Reverse<Tail<Items>, PrependList<Head<Items>, Prefix>>;
    infinite: [];
}[Items extends [any, ...List]
    ? IsFinite<Items, 'notEmpty', 'infinite'>
    : 'empty'];
