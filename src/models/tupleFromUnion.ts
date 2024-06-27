import { LastUnion } from "./lastUnion"
import { PopUnion } from "./popUnion"
import { PrependItem } from "./prepend"
import { List } from "./types"
import { IsNever } from "./isNever"

// While RemainingUnion is not empty, run and add the last property at the beginning of CurrentTuple
export type TupleFromUnion<RemainingUnion, CurrentTuple extends List = []> = {
    0: TupleFromUnion<PopUnion<RemainingUnion>, PrependItem<LastUnion<RemainingUnion>, CurrentTuple>>
    1: CurrentTuple
}[
    IsNever<RemainingUnion, 1, 0>
]

type testTupleFromUnion1 = TupleFromUnion<'test1' | 'test2' | 'test3'>  // ['test1', 'test2', 'test3']
type testTupleFromUnion2 = TupleFromUnion<string | number>              // [string, number]
type testTupleFromUnion3 = TupleFromUnion<number>                       // [string, number]