import { LastUnion } from "./lastUnion";

export type PopUnion<Union> = Exclude<Union, LastUnion<Union>>;

type testPopUnion1 = PopUnion<'test1' | 'test2' | 'test3'>  // 'test1' | 'test2'
type testPopUnion2 = PopUnion<testPopUnion1>                // 'test1'
type testPopUnion3 = PopUnion<testPopUnion2>                // never
type testPopUnion4 = PopUnion<string | number>              // string