import { List } from "./types"

// Get the length of a List
export type Length<Items extends List> =
    Items['length']

type testLength1 = Length<[]>                           // 0
type testLength2 = Length<[any, any]>                   // 2
type testLength3 = Length<[1, 2, 3]>                    // 3
type testLength4 = Length<[key1: 1, key2: 2, key3: 3]>  // 3
type testLength5 = Length<[string, ...number[]]>        // number
type testLength6 = Length<never>                        // never
type testLength7 = Length<any[]>                        // number