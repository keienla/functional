import type { Consumer, IntersectionFromUnion } from './intersectionFromUnion';

type Replace<T, U, V> = T extends U ? V : T;

// Link all Union element with a & symbol
export type OverloadedConsumerFromUnion<Union> = IntersectionFromUnion<
    Union extends any ? Consumer<Union> : never
>;

type testOverloadedConsumerFromUnion1 = OverloadedConsumerFromUnion<
    boolean | 'test1' | 'test2' | 'test3'
>; // Consumer<'test1'> & Consumer<'test2'> & Consumer<'test3'>
type T = Replace<testOverloadedConsumerFromUnion1, Consumer<true>, true>;
type testOverloadedConsumerFromUnion2 = OverloadedConsumerFromUnion<
    string | number
>; // Consumer<string> & Consumer<number>
type testOverloadedConsumerFromUnion3 = OverloadedConsumerFromUnion<
    boolean | string
>; // (value: string) => void
