import { List } from "./types"

// Return a new List without the first element
export type Tail<L extends List> =
    L extends readonly []
    ? L
    : L extends readonly [any?, ...infer LTail]
    ? LTail
    : L

type testTail1 = Tail<[1, 2, string, number]>                                           // [2, string, number]
type testTail2 = Tail<Parameters<(name: string, age: number, single: boolean) => true>> // [age: number, single: boolean]
type testTail3 = Tail<Parameters<(name: string, ...args: string[]) => true>>            // [string[]]
type testTail4 = Tail<testTail2>                                                        // [single: boolean]
type testTail5 = Tail<testTail3>                                                        // []
type testTail6 = Tail<testTail4>                                                        // []
type testTail7 = Tail<[number[]]>                                                       // []
type testTail8 = Tail<[...number[]]>                                                    // number[]
type testTail9 = Tail<[number, ...string[]]>                                            // string[]
type testTail10 = Tail<[number, boolean, ...string[]]>                                  // [boolean, ...string[]]
type testTail11 = Tail<[number, string[]]>                                              // [string[]]