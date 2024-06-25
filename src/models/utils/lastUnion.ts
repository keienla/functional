import { OverloadedConsumerFromUnion } from "./overloadedConsumerFromUnion";

// Get the last Consumer in the chain of Consumer && take it's property
export type LastUnion<Union> = OverloadedConsumerFromUnion<Union> extends ((a: infer A) => void) ? A : never;

type testLastUnion1 = LastUnion<'test1' | 'test2' | 'test3'>    // 'test3'
type testLastUnion2 = LastUnion<string | number>                // number