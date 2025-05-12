import { IsRestItems } from './isRestItems';
import { Pop } from './pop';
import { List } from './types';

// Get all items with type before the rest item
export type GetItemsBeforeRestItems<Items extends List> =
    IsRestItems<Items> extends true ? Pop<Items> : Items;

type GetItemsBeforeRestItems1 = GetItemsBeforeRestItems<
    [string, number, boolean]
>; // [string, number, boolean]
type GetItemsBeforeRestItems2 = GetItemsBeforeRestItems<[]>; // []
type GetItemsBeforeRestItems3 = GetItemsBeforeRestItems<[number, ...string[]]>; // [number]
type GetItemsBeforeRestItems4 = GetItemsBeforeRestItems<[...number[]]>; // []
type GetItemsBeforeRestItems5 = GetItemsBeforeRestItems<
    [hello: string, world: number | undefined]
>; // [hello: string, world: number | undefined]
type GetItemsBeforeRestItems6 = GetItemsBeforeRestItems<
    [hello: string, ...world: number[]]
>; // [string]
type GetItemsBeforeRestItems7 = GetItemsBeforeRestItems<[...hello: string[]]>; // []
type GetItemsBeforeRestItems8 = GetItemsBeforeRestItems<[hello: string]>; // [hello: string]
type GetItemsBeforeRestItems9 = GetItemsBeforeRestItems<
    [hello: string, world: number[]]
>; // [hello: string, world: number[]]
