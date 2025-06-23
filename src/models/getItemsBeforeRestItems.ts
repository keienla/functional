import type { IsRestItems } from './isRestItems';
import type { Pop } from './pop';
import type { List } from './types';

/**
 * Get all items with type before the rest items
 * @example
 * type A = GetItemsBeforeRestItems<[string, number, boolean]>; // [string, number, boolean]
 * type B = GetItemsBeforeRestItems<[]>; // []
 * type C = GetItemsBeforeRestItems<[number, ...string[]]>; // [number]
 * type D = GetItemsBeforeRestItems<[...number[]]>; // []
 * type E = GetItemsBeforeRestItems<[hello: string, world: number | undefined]>; // [hello: string, world: number | undefined]
 * type F = GetItemsBeforeRestItems<[hello: string, ...world: number[]]>; // [string]
 * type G = GetItemsBeforeRestItems<[...hello: string[]]>; // []
 * type H = GetItemsBeforeRestItems<[hello: string]>; // [hello: string]
 * type I = GetItemsBeforeRestItems<[hello: string, world: number[]]>; // [hello: string, world: number[]]
 */
export type GetItemsBeforeRestItems<Items extends List> =
    IsRestItems<Items> extends true ? Pop<Items> : Items;
