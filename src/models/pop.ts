import type { AppendList } from './append';
import type { Head } from './head';
import type { IsNever } from './isNever';
import type { IsRestItems } from './isRestItems';
import type { Tail } from './tail';
import type { List } from './types';

/**
 * Return a new List without the last element
 * @example
 * type A = PopLoop<[1, 2, 3, 4]>; // [1,2,3]
 * type B = PopLoop<[]>; // []
 * type C = PopLoop<any[]>; // []
 * type D = PopLoop<[string, ...number[]]>; // [string]
 * type E = PopLoop<[key1: string, key2: number, key3: boolean]>; // [key1: string, key2: number]
 * type F = PopLoop<[key1: string, key2: number, ...key3: boolean[]]>; // [string, number]
 */
export type Pop<T extends List> =
    IsRestItems<T> extends false
        ? T extends [...infer Heads, any]
            ? Heads
            : []
        : PopLoop<T>;

type PopLoop<T extends List, R extends List = []> = {
    continue: PopLoop<Tail<T>, AppendList<Head<T>, R>>;
    finish: Pop<R>;
    finishRest: R;
    empty: never;
}[T extends List
    ? IsNever<Head<T>> extends true
        ? IsRestItems<T> extends true
            ? 'finishRest'
            : 'finish'
        : 'continue'
    : 'empty'];
