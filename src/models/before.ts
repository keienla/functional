import { AppendItem, AppendList } from './append';
import { GetItemsBeforeRestItems } from './getItemsBeforeRestItems';
import { GetTypeRestItems } from './getTypeRestItems';
import { Head } from './head';
import { IsFinite } from './isFinite';
import { Length } from './length';
import { Tail } from './tail';
import { List } from './types';

// Get all the arguments before the index given
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

type testBefore1 = Before<0, [0, 1, 2]>; // []
type testBefore2 = Before<5, ['a', 'b']>; // ['a', 'b']
type testBefore3 = Before<3, ['a', 'b', 'c', 'd', 'e']>; // ['a', 'b', 'c']
type TestBefore4 = Before<5, []>; // []
type TestBefore5 = Before<2, [key1: string, key2: number, key3: boolean]>; // [key1: string, key2: number]
type TestBefore6 = Before<4, [string, ...args: number[]]>; // [string, number, number, number]
