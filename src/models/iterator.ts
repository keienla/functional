import { Length } from './length';
import { PrependItem } from './prepend';
import { Tail } from './tail';
import { List } from './types';

// Return the length of the list
export type Pos<I extends List> = Length<I>;

// Increment the list
export type Next<I extends List, Type extends any = any> = PrependItem<Type, I>;

// Decrement the list
export type Prev<I extends List> = Tail<I>;

// For loop
export type Iterator<
    Index extends number = 0,
    Type extends any = any,
    From extends List = [],
    I extends List = [],
> = {
    continue: Iterator<Index, Type, Next<From, Type>, Next<I>>;
    stop: From;
}[Pos<I> extends Index ? 'stop' : 'continue'];

type testPos = Pos<[any, any]>; // 2
type testNext = Pos<Next<[any, any]>>; // 3
type testPrev = Pos<Prev<[any, any]>>; // 1

type testIterator1 = Iterator<2>; // [any, any]
type testIterator2 = Iterator<2, number>; // [number, number]
type testIterator3 = Iterator<3, string, testIterator2>; // [string, string, string, number, number]
type testIterator4 = Pos<testIterator1>; // 2
type testIterator5 = Pos<testIterator2>; // 5
type testIterator6 = Iterator<5, any, [], Iterator<3>>; // [any, any], like => from 3 to 5
