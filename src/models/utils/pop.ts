import { AppendList } from "./append"
import { Head } from "./head"
import { IsNever } from "./isNever"
import { IsRestItems } from "./isRestItems"
import { Tail } from "./tail"
import { List } from "./types"

type PopLoop<T extends List, R extends List = []> = {
    continue: PopLoop<Tail<T>, AppendList<Head<T>, R>>
    finish: Pop<R>
    finishRest: R
    empty: never
}[
    T extends List
    ? IsNever<Head<T>> extends true
    ? IsRestItems<T> extends true
    ? 'finishRest'
    : 'finish'
    : 'continue'
    : 'empty'
]

// Return a new list without the last element
export type Pop<T extends List> =
    IsRestItems<T> extends false
    ? T extends [...infer Heads, any]
    ? Heads
    : []
    : PopLoop<T>

type testPop1 = PopLoop<[1, 2, 3, 4]>                                       // [1,2,3]
type testPop2 = PopLoop<[]>                                                 // []
type testPop3 = PopLoop<any[]>                                              // []
type testPop4 = PopLoop<[string, ...number[]]>                              // [string]
type testPop5 = PopLoop<[key1: string, key2: number, key3: boolean]>        // [key1: string, key2: number]
type testPop6 = PopLoop<[key1: string, key2: number, ...key3: boolean[]]>   // [string, number]