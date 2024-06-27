import { Head } from "./head"
import { IsFinite } from "./isFinite"
import { PrependList } from "./prepend"
import { Tail } from "./tail"
import { List } from "./types"

// Reverse a List
export type Reverse<Items extends List, Prefix extends List = []> = {
    empty: Prefix,
    notEmpty: Reverse<Tail<Items>, PrependList<Head<Items>, Prefix>>,
    infinite: []
}[
    Items extends [any, ...List]
    ? IsFinite<Items, 'notEmpty', 'infinite'>
    : 'empty'
]

type testReverse1 = Reverse<[1, 2, 3]>                                                  // [3, 2, 1]
type testReverse2 = Reverse<testReverse1>                                               // [1, 2, 3]
type testReverse3 = Reverse<[[2, 1], [3, 4]]>                                           // [[3, 4], [2, 1]]
type testReverse4 = Reverse<[name: string, age: number, id: string, roles: string[]]>   // [roles: string[], id: string, age: number, name: string]