export type TupleToUnion<T extends any[]> = T[number];

type TupleToUnionTest1 = TupleToUnion<[1, 2, 3]>; // 1 | 2 | 3
type TupleToUnionTest2 = TupleToUnion<[1, 2, 3, 4, 5]>; // 1 | 2 | 3 | 4 | 5
type TupleToUnionTest3 = TupleToUnion<[key1: string, key2: number]>; // string | number
type TupleToUnionTest4 = TupleToUnion<
    [[key1: string, key2: number], [key1: string, key2: number]]
>; // [key1: string, key2: number], [key1: string, key2: number]
type TupleToUnionTest5 = TupleToUnion<['Value1', 'Value2']>; // 'Value1' | 'Value2'
