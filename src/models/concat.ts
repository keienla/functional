import { AppendList } from "./append"
import { List } from "./types"

// Merge two arrays
export type Concat<Left extends List, Right extends List> = AppendList<Right, Left>

type testConcat1 = Concat<[1, 2], [3, 4]>   // [1, 2, 3, 4]
type testConcat2 = Concat<[], [1, 2]>       // [1, 2]