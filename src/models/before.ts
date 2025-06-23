import type { AppendItem, AppendList } from './append';
import type { GetItemsBeforeRestItems } from './getItemsBeforeRestItems';
import type { GetTypeRestItems } from './getTypeRestItems';
import type { Head } from './head';
import type { IsFinite } from './isFinite';
import type { Length } from './length';
import type { Tail } from './tail';
import type { List } from './types';

/**
 * Get all the arguments before the index given
 * @example
 * type A = Before<0, [0, 1, 2]>; // []
 * type B = Before<5, ['a', 'b']>; // ['a', 'b']
 * type C = Before<3, ['a', 'b', 'c', 'd', 'e']>; // ['a', 'b', 'c']
 * type D = Before<5, []>; // []
 * type E = Before<2, [key1: string, key2: number, key3: boolean]>; // [key1: string, key2: number]
 * type F = Before<4, [string, ...args: number[]]>; // [string, number, number, number]
 */
export type Before<
    Size extends number,
    BaseItems extends List,
    Result extends List = [],
    ItemsWithoutRestType extends List = GetItemsBeforeRestItems<BaseItems>,
    RestType = GetTypeRestItems<BaseItems>,
> = {
    continue: Before<
        Size,
        BaseItems,
        AppendList<Head<ItemsWithoutRestType>, Result>,
        Tail<ItemsWithoutRestType>,
        RestType
    >;
    continueWithRest: Before<
        Size,
        BaseItems,
        AppendItem<RestType, Result>,
        Tail<ItemsWithoutRestType>,
        RestType
    >;
    finish: Result;
    finishWithHead: AppendList<Head<ItemsWithoutRestType>, Result>;
    nope: never;
    infinite: {
        ERROR: 'Cannot Before on an infinite array';
        TAGS: ['InfiniteArray', 'Infinite', 'Before'];
    };
}[IsFinite<ItemsWithoutRestType> extends true
    ? ItemsWithoutRestType extends List
        ? Length<Result> extends Size
            ? 'finish'
            : Length<Tail<ItemsWithoutRestType>> extends 0
              ? Length<ItemsWithoutRestType> extends 0
                  ? RestType extends undefined
                      ? 'finish'
                      : 'continueWithRest'
                  : RestType extends undefined
                    ? 'finishWithHead'
                    : 'continue'
              : 'continue'
        : 'nope'
    : 'infinite'];
