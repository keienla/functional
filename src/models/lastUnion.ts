import type { OverloadedConsumerFromUnion } from './overloadedConsumerFromUnion';

/**
 * Get the last Consumer in the chain of Consumer && take it's property
 *
 * ! Problem with boolean, will try to find a solution in future when this will be used
 * @example
 * type A = LastUnion<'test1' | 'test2' | 'test3'>; // 'test3'
 * type B = LastUnion<string | number>; // number
 */
export type LastUnion<Union> =
    OverloadedConsumerFromUnion<Union> extends (a: infer A) => void ? A : never;

type testLastUnion1 = LastUnion<'test1' | 'test2' | 'test3'>; // 'test3'
type testLastUnion2 = LastUnion<string | number>; // number
type testLastUnion3 = LastUnion<boolean | string>; // number
