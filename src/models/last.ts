import { IsNever } from "./isNever"
import { Tail } from "./tail"
import { List } from "./types"

// Get the last element of a List
export type Last<Items extends List> = IsNever<Tail<Items>> extends true
    ? never
    : Items extends [...infer R, any] ?
    Items extends [...R, ...infer L]
    ? L
    : never
    : never

type testLast1 = Last<[1, 2, 3, 4]>     // [4]
type testLast2 = Last<[param1: number, param2: string]>     // [param2: string]
type testLast3 = Last<[]>               // never
type testLast4 = Last<any[]>            // never
type testLast5 = Last<[string, ...number[]]> // never