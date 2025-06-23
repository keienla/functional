import type { Length } from './length';
import type { PrependItem } from './prepend';
import type { Tail } from './tail';
import type { List } from './types';

/**
 * Get the length of a List. It's equal to it's position in the iterator
 * @see {@link Length}
 * @example
 * type A = Pos<[any, any]>; // 2
 * type B = Pos<[any, any, any]>; // 3
 * type C = Pos<[]>; // 0
 */
export type Pos<I extends List> = Length<I>;

/**
 * Increment the List. It's equal to add a new item in the List.
 * Can add a second parameter to change the type of the item to add if necessary
 * @see {@link PrependItem}
 * @example
 * type A = Next<[any, any]>; // [any, any, any]
 * type B = Next<[]>; // [any]
 * type C = Next<[], boolean>; // [boolean]
 */
export type Next<I extends List, Type extends any = any> = PrependItem<Type, I>;

/**
 * Decrement the List. It's equal to remove the last item in the List
 * @see {@link Tail}
 * @example
 * type A = Prev<[any, any, any]>; // [any, any]
 * type B = Prev<[]>; // []
 */
export type Prev<I extends List> = Tail<I>;

/**
 * Example of iterator
 */
type Iterator<
    Index extends number = 0,
    Type extends any = any,
    From extends List = [],
    I extends List = [],
> = {
    continue: Iterator<Index, Type, Next<From, Type>, Next<I>>;
    stop: From;
}[Pos<I> extends Index ? 'stop' : 'continue'];

type testIterator1 = Iterator<2>; // [any, any]
type testIterator2 = Iterator<2, number>; // [number, number]
type testIterator3 = Iterator<3, string, testIterator2>; // [string, string, string, number, number]
type testIterator6 = Iterator<5, any, [], Iterator<3>>; // [any, any], like => from 3 to 5
