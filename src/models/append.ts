import { List } from "./types"

// Add a value at the end of the given array
export type AppendItem<AddEnd, Base extends List> = [...Base, AddEnd]
export type AppendList<AddEnd extends List, Base extends List> = [...Base, ...AddEnd]

type testAppendItem1 = AppendItem<string, []>               // [string]
type testAppendItem2 = AppendItem<number, [1, 2]>           // [1, 2, number]
type testAppendItem3 = AppendItem<[string], [1, 2]>         // [1, 2, [string]]
type testAppendItem4 = AppendItem<[key: string], [1, 2]>    // [1, 2, [key: string]]

type testAppendList1 = AppendList<[string], []>             // [string]
type testAppendList2 = AppendList<[string], [1, 2]>         // [1, 2, string]
type testAppendList3 = AppendList<[key: string], [1, 2]>    // [1, 2, key: string]