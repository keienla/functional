/**
 * Transform a tuple to an Union
 * @example
 * type A = TupleToUnion<[1, 2, 3]>; // 1 | 2 | 3
 * type B = TupleToUnion<[1, 2, 3, 4, 5]>; // 1 | 2 | 3 | 4 | 5
 * type C = TupleToUnion<[key1: string, key2: number]>; // string | number
 * type D = TupleToUnion<[[key1: string, key2: number], [key1: string, key2: number]]>; // [key1: string, key2: number], [key1: string, key2: number]
 * type E = TupleToUnion<['Value1', 'Value2']>; // 'Value1' | 'Value2'
 */
export type TupleToUnion<T extends any[]> = T[number];
