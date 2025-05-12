import { List } from './types';

// It adds a type E at the beginning of the given array of type
export type PrependItem<AddStart, Base extends List> = [AddStart, ...Base];
export type PrependList<AddStart extends List, Base extends List> = [
    ...AddStart,
    ...Base,
];

type testPrependItem1 = PrependItem<string, []>; // [string]
type testPrependItem2 = PrependItem<number, [1, 2]>; // [number, 1, 2]
type testPrependItem3 = PrependItem<[string], [1, 2]>; // [[string], 1, 2]
type testPrependItem4 = PrependItem<[key: string], [1, 2]>; // [[key: string], 1, 2]

type testPrependList1 = PrependList<[string], []>; // [string]
type testPrependList2 = PrependList<[string], [1, 2]>; // [string, 1, 2]
type testPrependList3 = PrependList<[key: string], [1, 2]>; // [key: string, 1, 2]
