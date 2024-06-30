import { IsRestItems } from "./isRestItems"
import { List } from "./types"

// Extract the type of rest items, else return undefined if there is none
export type GetTypeRestItems<Items extends List> = IsRestItems<Items> extends true
    // Number is big enough to considere that's the type of the rest parameter
    // Could put something bigger
    ? Items[50]
    : undefined

type GetTypeRestItems1 = GetTypeRestItems<[string, number, boolean]>                    // undefined
type GetTypeRestItems2 = GetTypeRestItems<[]>                                           // undefined
type GetTypeRestItems3 = GetTypeRestItems<[number, ...string[]]>                        // string
type GetTypeRestItems4 = GetTypeRestItems<[...number[]]>                                // number
type GetTypeRestItems5 = GetTypeRestItems<[hello: string, world: number | undefined]>   // undefined
type GetTypeRestItems6 = GetTypeRestItems<[hello: string, ...world: number[]]>          // number
type GetTypeRestItems7 = GetTypeRestItems<[...hello: string[]]>                         // string
type GetTypeRestItems8 = GetTypeRestItems<[hello: string]>                              // undefined
type GetTypeRestItems9 = GetTypeRestItems<[hello: string, world: number[]]>             // undefined