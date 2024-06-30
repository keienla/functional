import { IsRestItems } from "./isRestItems"
import { List } from "./types"

// Extract the first item of a List and return it in an array (to keep key name)
export type Head<T extends List> =
    IsRestItems<T> extends true
    ? T extends [infer F, ...any[]]
    ? [F]
    : never
    : T extends [any, ...infer R]
    ? T extends [...infer F, ...R]
    ? F
    : never
    : never

type testHead1 = Head<[1, 2, string, number]>                                           // [1]
type testHead2 = Head<Parameters<(name: string, age: number, single: boolean) => true>> // [name: string]
type testHead3 = Head<[]>                                                               // never
type testHead4 = Head<[string]>                                                         // [string]
type testHead5 = Head<any[]>                                                            // never
type testHead6 = Head<[...any[]]>                                                       // never
type testHead7 = Head<[string, ...number[]]>                                            // [string]
type testHead8 = Head<[test: number, test2: boolean, test3: number]>                    // [test: number]
// ! Can't keep key name when rest...
// TODO Refacto one day to try to make it possible, like this can keep key on almost everything
type testHead9 = Head<[key: string, ...args: number[]]>                                 // [string]
type testHead10 = Head<[key: string]>                                                   // [key: string]