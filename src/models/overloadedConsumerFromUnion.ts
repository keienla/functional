import { Consumer, IntersectionFromUnion } from './intersectionFromUnion'

// Link all Union element with a & symbol
export type OverloadedConsumerFromUnion<Union> = IntersectionFromUnion<Union extends any ? Consumer<Union> : never>;

type testOverloadedConsumerFromUnion1 = OverloadedConsumerFromUnion<'test1' | 'test2' | 'test3'>    // Consumer<'test1'> & Consumer<'test2'> & Consumer<'test3'>
type testOverloadedConsumerFromUnion2 = OverloadedConsumerFromUnion<string | number>                // Consumer<string> & Consumer<number>
type testOverloadedConsumerFromUnion3 = OverloadedConsumerFromUnion<string>                         // (value: string) => void