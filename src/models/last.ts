import type { IsNever } from './isNever';
import type { Tail } from './tail';
import type { List } from './types';

/**
 * Get the last element of a List
 * @example
 * type A = Last<[1, 2, 3, 4]>; // [4]
 * type B = Last<[param1: number, param2: string]>; // [param2: string]
 * type C = Last<[]>; // never
 * type D = Last<any[]>; // never
 * type E = Last<[string, ...number[]]>; // never
 */
export type Last<Items extends List> =
    IsNever<Tail<Items>> extends true
        ? never
        : Items extends [...infer R, any]
          ? Items extends [...R, ...infer L]
              ? L
              : never
          : never;
