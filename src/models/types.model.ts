export type TObject = {
    [key: string]: any
}

export type List = any[]

export type Fn = (...args: any[]) => any

export type Predicate<T> = (value: T) => boolean;

// #region IsNever
export type IsNever<T, Never = true, NotNever = false> = [T] extends [never] ? Never : NotNever

type testIsNever1 = IsNever<never>    // true
type testIsNever2 = IsNever<any>      // false
type testIsNever3 = IsNever<never, 'IsNever'>    // 'IsNever'
type testIsNever4 = IsNever<string, true, 'NotNever'>    // 'NotNever'
// #endregion IsNever

// #region Head
export type Head<T extends List> =
    T extends [any, ...infer R]
    ? T extends [...infer F, ...R]
    ? F
    : never
    : never


type testHead1 = Head<[1, 2, string, number]>   // [1]
type testHead2 = Head<Parameters<(name: string, age: number, single: boolean) => true>>      // [name: string]
type testHead3 = Head<[]>                       // never
type testHead4 = Head<[string]>                 // [string]
type testHead5 = Head<any[]>                    // never
// #endregion

// #region Tail
// Get all the elements except first in an array of type
export type Tail<L extends List> =
    L extends readonly []
    ? L
    : L extends readonly [any?, ...infer LTail]
    ? LTail
    : L

type testTail1 = Tail<[1, 2, string, number]>   // [2, string, number]
type testTail2 = Tail<Parameters<(name: string, age: number, single: boolean) => true>>      // [age: number, single: boolean]
type testTail3 = Tail<Parameters<(name: string, ...args: string[]) => true>>      // [string[]]
type testTail4 = Tail<testTail2>                // [single: boolean]
type testTail5 = Tail<testTail3>                // []
type testTail6 = Tail<testTail4>                // []
type testTail7 = Tail<[number[]]>               // []
type testTail8 = Tail<[...number[]]>            // number[]
type testTail9 = Tail<[number, ...string[]]>    // string[]
type testTail10 = Tail<[number, boolean, ...string[]]>    // [boolean, ...string[]]
type testTail11 = Tail<[number, string[]]>       // [string[]]
// #endregion

// #region Last
// Recursive type function
// Check all the elements and get the last parameter
export type Last<T extends any[]> = IsNever<Tail<T>> extends true
    ? never
    : T extends [...infer R, any] ?
    T extends [...R, ...infer L]
    ? L
    : never
    : never

type testLast1 = Last<[1, 2, 3, 4]>     // [4]
type testLast2 = Last<[param1: number, param2: string]>     // [param2: string]
type testLast3 = Last<[]>               // never
type testLast4 = Last<any[]>            // never
type testLast5 = Last<[string, ...number[]]> // never
// #endregion

// #region Cast
// If same type return first type else return second type
export type Cast<X, Y> =
    X extends Y
    ? X
    : Y

type testCast1 = Cast<[string], any>    // [string]
type testCast2 = Cast<[string], number> // number
// #endRegion

// #region ValueOf
export type ValueOf<T> = T[keyof T];

type testValueOf = ValueOf<{ a: string, b: number }>      // string | number
// #endregion

// #region Length
// Get the length of an array of element
export type Length<T extends List> =
    T['length']

type testLength1 = Length<[]>                       // 0
type testLength2 = Length<[any, any]>               // 2
type testLength3 = Length<[1, 2, 3]>                // 3
type testLength4 = Length<[key1: 1, key2: 2, key3: 3]>                // 3
type testLength5 = Length<[string, ...number[]]>    // number
type testLength6 = Length<never>                    // never
type testLength7 = Length<any[]>                    // number
// #endregion

// #region IsDefinedNumber
// Check if the given type is a number or just the default number type
export type IsDefinedNumber<Number extends number, Defined = true, Undefined = false> =
    Number extends number
    ? number extends Number
    ? Undefined
    : Defined
    : Undefined

type IsDefinedNumber1 = IsDefinedNumber<number> // false
type IsDefinedNumber2 = IsDefinedNumber<1>      // true
type IsDefinedNumber3 = IsDefinedNumber<never>  // never
type IsDefinedNumber4 = IsDefinedNumber<2, 'Hello'>      // 'Hello'
type IsDefinedNumber5 = IsDefinedNumber<number, 'Hello', 'World'>      // 'World'
// #endregion

// #region IsFinite
// ! Keep it in case the new version doesn't work as expected
// export type IsFinite<A extends any[], Finite = true, Infinite = false> = {
//     empty: Finite,
//     notEmpty: ((...args: A) => any) extends ((_firstArgs: infer First, ...args: infer Rest) => any)
//     ? IsFinite<Rest, Finite, Infinite>
//     : never
//     infinite: Infinite
// }[
//     A extends [] ? 'empty'
//     : A extends (infer Element)[] ?
//     Element[] extends A ?
//     'infinite'
//     : 'notEmpty'
//     : never
// ]

export type IsFinite<
    A extends List,
    Finite = true,
    Infinite = false
> = IsDefinedNumber<Length<A>> extends true
    ? Finite
    : Infinite

type testIsFinite1 = IsFinite<[string, number], true, false>        // true
type testIsFinite2 = IsFinite<any[], true, false>                   // false
type testIsFinite3 = IsFinite<[], true, false>                      // true
type testIsFinite4 = IsFinite<never, true, false>                   // true
// #endregion

// #region Prepend
// It adds a type E at the beginning of the given array of type
export type PrependItem<AddStart, Base extends List> = [AddStart, ...Base]
export type PrependList<AddStart extends List, Base extends List> = [...AddStart, ...Base]

type testPrependItem1 = PrependItem<string, []>         // [string]
type testPrependItem2 = PrependItem<number, [1, 2]>     // [number, 1, 2]
type testPrependItem3 = PrependItem<[string], [1, 2]>     // [[string], 1, 2]
type testPrependItem4 = PrependItem<[key: string], [1, 2]>     // [[key: string], 1, 2]

type testPrependList1 = PrependList<[string], []>         // [string]
type testPrependList2 = PrependList<[string], [1, 2]>     // [string, 1, 2]
type testPrependList3 = PrependList<[key: string], [1, 2]>     // [key: string, 1, 2]
// #endregion

// #region Append
// Add a value at the end of the given array
export type AppendItem<AddEnd, Base extends List> = [...Base, AddEnd]
export type AppendList<AddEnd extends List, Base extends List> = [...Base, ...AddEnd]

type testAppendItem1 = AppendItem<string, []>         // [string]
type testAppendItem2 = AppendItem<number, [1, 2]>     // [1, 2, number]
type testAppendItem3 = AppendItem<[string], [1, 2]>     // [1, 2, [string]]
type testAppendItem4 = AppendItem<[key: string], [1, 2]>     // [1, 2, [key: string]]

type testAppendList1 = AppendList<[string], []>         // [string]
type testAppendList2 = AppendList<[string], [1, 2]>     // [1, 2, string]
type testAppendList3 = AppendList<[key: string], [1, 2]>     // [1, 2, key: string]
// #endregion

// #region Reverse
export type Reverse<A extends List, Prefix extends List = []> = {
    empty: Prefix,
    notEmpty: Reverse<Tail<A>, PrependList<Head<A>, Prefix>>,
    infinite: []
}[
    A extends [any, ...List]
    ? IsFinite<A, 'notEmpty', 'infinite'>
    : 'empty'
]

type testReverse1 = Reverse<[1, 2, 3]>          // [3, 2, 1]
type testReverse2 = Reverse<testReverse1>       // [1, 2, 3]
type testReverse3 = Reverse<[[2, 1], [3, 4]]>   // [[3, 4], [2, 1]]
type testReverse4 = Reverse<[name: string, age: number, id: string, roles: string[]]>   // [roles: string[], id: string, age: number, name: string]
// #endregion

// // #region Pop
// // Remove the last element of a Tuple
// export type Pop<T extends List, R extends List = []> = {
//     continue: Pop<Tail<T>, PrependList<Head<T>, R>>
//     finish: Reverse<R>
//     empty: never
// }[
//     T extends List
//     ? IsNever<Head<T>> extends true
//     ? 'finish'
//     : IsNever<Last<T>> extends true
//     ? Length<T> extends 0
//     ? 'finish'
//     : 'continue'
//     : Length<T> extends 0
//     ? 'finish'
//     : Length<T> extends 1
//     ? 'finish'
//     : 'continue'
//     : 'empty'
// ]

// export type Pop2<T extends List> =
//     IsRestItems<T> extends false
//     ? T extends [...infer Heads, any]
//     ? Heads
//     : []
//     : never

// type testPop1 = Pop<[1, 2, 3, 4]> // [1,2,3]
// type testPop2 = Pop<[]> // []
// type testPop3 = Pop<any[]> // []
// type testPop4 = Pop<[string, ...number[]]>
// type testPop5 = Pop<[key1: string, key2: number, key3: boolean]>
// // #endregion

// // #region Drop
// // Get all the arguments after the index given
// export type Drop<N extends number, T extends any[], I extends any[] = []> = {
//     continue: Drop<N, Tail<T>, Prepend<any, I>>
//     return: T,
//     infinite: {}
// }[
//     Length<I> extends N
//     ? 'return'
//     : IsFinite<T, 'continue', 'infinite'>
// ]

// type testDrop1 = Drop<2, ['a', 'b', 'c', 'd']>  // ['c', 'd']
// type testDrop2 = Drop<3, ['a', 'b', 'c', 'd']>  // ['d']
// type testDrop3 = Drop<any, [0, 1, 2]>             // [0,1,2]
// type testDrop4 = Drop<3, ['a']>                 // []
// // #endregion

// // #region Before
// // Get all the arguments before the index given
// export type Before<N extends number, T extends any[], R extends any[] = [], I extends any[] = []> = {
//     continue: Before<N, Tail<T>, Prepend<Head<T>, R>, Next<I>>
//     finish: Reverse<R>
//     finishWithHead: Reverse<Prepend<Head<T>, R>>
//     empty: never
//     infinite: '[BEFORE] Infinite Loop Error'
// }[
//     T extends any[]
//     ? IsFinite<T, Length<I> extends N
//         ? 'finish'
//         : Length<Tail<T>> extends 0
//         ? Length<T> extends 0
//         ? 'finish'
//         : 'finishWithHead'
//         : 'continue', 'infinite'>
//     : 'empty'
// ]

// type testBefore1 = Before<0, [0, 1, 2]>                     // []
// type testBefore2 = Before<5, ['a', 'b']>                    // ['a', 'b']
// type testBefore3 = Before<3, ['a', 'b', 'c', 'd', 'e']>     // ['a', 'b', 'c']
// type TestBefore4 = Before<5, []>                            // []

// // #region Iterator
// export type Pos<I extends any[]> =
//     Length<I>

// export type Next<I extends any[], Type extends any = any> =
//     Prepend<Type, I>

// export type Prev<I extends any[]> =
//     Tail<I>

// type testPos = Pos<[any, any]>          // 2
// type testNext = Pos<Next<[any, any]>>   // 3
// type testPrev = Pos<Prev<[any, any]>>   // 1

// export type Iterator<Index extends number = 0, Type extends any = any, From extends any[] = [], I extends any[] = []> = {
//     continue: Iterator<Index, Type, Next<From, Type>, Next<I>>
//     stop: From
// }[
//     Pos<I> extends Index
//     ? 'stop'
//     : 'continue'
// ]

// type testIterator1 = Iterator<2>                // [any, any]
// type testIterator2 = Iterator<2, number>        // [number, number]
// type testIterator3 = Iterator<3, string, testIterator2> // [string, string, string, number, number]
// type testIterator4 = Pos<testIterator1>         // 2
// type testIterator5 = Pos<testIterator2>         // 5
// type testIterator6 = Iterator<5, any, [], Iterator<3>>   // [any, any], like => from 3 to 5
// // #endregion

// // #region Concat
// export type Concat<Left extends any[], Right extends any[]> = [...Left, ...Right]

// type testConcat1 = Concat<[1, 2], [3, 4]>       // [1, 2, 3, 4]
// type testConcat2 = Concat<[], [1, 2]>       // [1, 2]
// // #endregion

// // #region definedType
// export type returnedTypes = 'any' | 'string' | 'array' | 'object' | 'number' | 'function' | 'boolean' | 'undefined' | 'bigint' | 'symbol' | 'null' | 'regexp' | 'generator' | 'generatorfunction' | 'unknown';

// export type TypeName<A> =
//     unknown extends A
//     ? [keyof A] extends [never]
//     ? 'unknown'
//     : 'any'
//     : A extends Array<any>
//     ? 'array'
//     : A extends string
//     ? 'string'
//     : A extends number
//     ? 'number'
//     : A extends Function
//     ? 'function'
//     : A extends boolean
//     ? 'boolean'
//     : A extends undefined
//     ? 'undefined'
//     : A extends Symbol
//     ? 'symbol'
//     : A extends RegExp
//     ? 'regexp'
//     : A extends Generator
//     ? 'generator'
//     : A extends null
//     ? 'null'
//     : A extends bigint
//     ? 'bigint'
//     : A extends object
//     ? 'object'
//     : 'unknown'

// const testTypeNameSymbol = Symbol('qzd');
// const testTypeNameRegexp = /a/g;
// function* testTypeNameGeneratorFunction() { }
// const testTypeNameGenerator = testTypeNameGeneratorFunction();

// type testTypeName1 = TypeName<[]>                           // 'array'
// type testTypeName2 = TypeName<[0, 1]>                        // 'array'
// type testTypeName3 = TypeName<''>                           // 'string'
// type testTypeName4 = TypeName<0>                            // 'number'
// type testTypeName5 = TypeName<() => {}>                     // 'function'
// type testTypeName6 = TypeName<false>                        // 'boolean'
// type testTypeName7 = TypeName<true>                         // 'boolean'
// type testTypeName8 = TypeName<undefined>                    // 'undefined'
// type testTypeName9 = TypeName<typeof testTypeNameSymbol>    // 'symbol'
// type testTypeName10 = TypeName<typeof testTypeNameRegexp>   // 'regexp'
// type testTypeName11 = TypeName<typeof testTypeNameGenerator>// 'generator'
// type testTypeName12 = TypeName<null>                        // 'null'
// type testTypeName13 = TypeName<{}>                          // 'object'
// type testTypeName14 = TypeName<any>                         // 'any'
// type testTypeName15 = TypeName<unknown>                     // 'unknown'
// // #endregion

// // #region TypeOf
// export type TypeOf<T> =
//     T extends Array<infer U>
//     ? ([U] extends [never] ? any : TypeOf<U>)[]
//     : T extends string
//     ? string
//     : T extends number
//     ? number
//     : T extends (...args: infer A) => infer R
//     ? (...args: A) => R
//     : T extends boolean
//     ? boolean
//     : T extends undefined
//     ? undefined
//     : T extends Symbol
//     ? Symbol
//     : T extends RegExp
//     ? RegExp
//     : T extends Generator
//     ? Generator
//     : T extends null
//     ? null
//     : T extends bigint
//     ? bigint
//     : T extends object
//     ? T
//     : unknown

// const testTypeOfFunction = (a: string): number => { return 0 }
// type testTypeOf1 = TypeOf<[]>                           // any[]
// type testTypeOf2 = TypeOf<string[]>                     // string[]
// type testTypeOf3 = TypeOf<[0, 1]>                        // number[]
// type testTypeOf4 = TypeOf<''>                           // string
// type testTypeOf5 = TypeOf<string>                      // string
// type testTypeOf6 = TypeOf<0>                            // number
// type testTypeOf7 = TypeOf<() => {}>                     // () => {}
// type testTypeOf8 = TypeOf<typeof testTypeOfFunction>    // (a: string) => number
// type testTypeOf9 = TypeOf<false>                        // boolean
// type testTypeOf10 = TypeOf<true>                        // boolean
// type testTypeOf11 = TypeOf<undefined>                   // undefined
// type testTypeOf12 = TypeOf<typeof testTypeNameSymbol>   // Symbol
// type testTypeOf13 = TypeOf<typeof testTypeNameRegexp>   // RegExp
// type testTypeOf14 = TypeOf<typeof testTypeNameGenerator>// Generator
// type testTypeOf15 = TypeOf<null>                        // null
// type testTypeOf16 = TypeOf<{}>                          // object
// type testTypeOf17 = TypeOf<{ a: number, b: string }>      // {a: number, b: string}
// // #endregion

// // #region IntersectionFromUnion
// // Check if it's a Union or not
// // If not return the value else return never
// type Consumer<Value> = (value: Value) => void;

// type IntersectionFromUnion<T> =
//     (T extends any ? Consumer<T> : never) extends (Consumer<infer ResultIntersection>)
//     ? ResultIntersection
//     : never

// type testIntersectionFromUnion1 = IntersectionFromUnion<'test1' | 'test2' | 'test3'>    // never
// type testIntersectionFromUnion2 = IntersectionFromUnion<string | number>                // never
// type testIntersectionFromUnion3 = IntersectionFromUnion<string>                         // string
// // #endregion

// // #region OverloadedConsumerFromUnion
// // Link all Union element with a & symbol
// type OverloadedConsumerFromUnion<Union> = IntersectionFromUnion<Union extends any ? Consumer<Union> : never>;

// type testOverloadedConsumerFromUnion1 = OverloadedConsumerFromUnion<'test1' | 'test2' | 'test3'>    // Consumer<'test1'> & Consumer<'test2'> & Consumer<'test3'>
// type testOverloadedConsumerFromUnion2 = OverloadedConsumerFromUnion<string | number>                // Consumer<string> & Consumer<number>
// type testOverloadedConsumerFromUnion3 = OverloadedConsumerFromUnion<string>                         // (value: string) => void
// // #endregion

// // #region UnionLast
// // Get the last Consumer in the chain of Consumer && take it's property
// export type UnionLast<Union> = OverloadedConsumerFromUnion<Union> extends ((a: infer A) => void) ? A : never;

// type testUnionLast1 = UnionLast<'test1' | 'test2' | 'test3'>            // 'test3'
// type testUnionLast2 = UnionLast<string | number>                        // number

// export type HeadTruc<T> =
//     T extends (infer HeadElement | any)
//     ? HeadElement
//     : never
// // #endregion

// // #region UnionExcludeLast
// export type UnionExcludingLast<Union> = Exclude<Union, UnionLast<Union>>;

// type testUnionExcludingLast1 = UnionExcludingLast<'test1' | 'test2' | 'test3'>          // 'test1' | 'test2'
// type testUnionExcludingLast2 = UnionExcludingLast<testUnionExcludingLast1>              // 'test1'
// type testUnionExcludingLast3 = UnionExcludingLast<testUnionExcludingLast2>              // never
// type testUnionExcludingLast4 = UnionExcludingLast<string | number>                      // string
// // #endregion

// // #region Tuple
// export type Tuple<A = any> = Array<A>;

// type testTuple1 = Tuple<string>     // string[]
// // #endregion

// // #region TupleFromUnionRec
// // While RemainingUnion is not empty, run and add the last property at the beginning of CurrentTuple
// export type TupleFromUnion<RemainingUnion, CurrentTuple extends any[] = []> = {
//     0: TupleFromUnion<UnionExcludingLast<RemainingUnion>, Prepend<UnionLast<RemainingUnion>, CurrentTuple>>
//     1: CurrentTuple
// }[
//     [RemainingUnion] extends [never]
//     ? 1
//     : 0
// ]

// type testTupleFromUnion1 = TupleFromUnion<'test1' | 'test2' | 'test3'>      // ['test1', 'test2', 'test3']
// type testTupleFromUnion2 = TupleFromUnion<string | number>                  // [string, number]
// type testTupleFromUnion3 = TupleFromUnion<number>                  // [string, number]
// // #endregion

// // #region SameValueInterface
// export type SameValueInterface<T, R> = {
//     [K in keyof T]: R
// }

// interface svi1 {
//     a: string,
//     b: number,
//     c: boolean
// }

// interface svi2 {
//     d: () => {}
// }

// type testSameValueInterface1 = SameValueInterface<svi1, string>         // { a: string, b: string, c: string }
// type testSameValueInterface2 = SameValueInterface<svi2, boolean>        // { d: boolean }
// type testSameValueInterface3 = SameValueInterface<svi1 & svi2, number>  // { a: number, b: number, c: number, d: number }
// // #endregion

// // #region IsRestItems
// type RestFn1 = (hello: string, world?: number) => string
// type RestFn2 = (hello: string, ...world: number[]) => string
// type RestFn3 = (...hello: number[]) => string
// type RestFn4 = (hello: string) => string
// type RestFn5 = (hello: string, world: number[]) => string

// export type IsRestItems<Items extends any[]> = IsFinite<Items> extends true
//     ? false
//     : true

// type IsRestItems1 = IsRestItems<[...any[]]>   // true
// type IsRestItems2 = IsRestItems<any[]>    // true
// type IsRestItems3 = IsRestItems<[string]>    // false
// type IsRestItems4 = IsRestItems<[string[]]>    // false
// type IsRestItems6 = IsRestItems<never>    // false
// type IsRestItems7 = IsRestItems<Parameters<RestFn1>>    // false
// type IsRestItems8 = IsRestItems<Parameters<RestFn2>>    // true
// type IsRestItems9 = IsRestItems<Parameters<RestFn3>>    // true
// type IsRestItems10 = IsRestItems<Parameters<RestFn4>>   // false
// type IsRestItems11 = IsRestItems<Parameters<RestFn5>>   // false
// // #endregion IsRestItems

// // #region GetTypeRestItems
// export type GetTypeRestItems<Items extends any[]> = IsRestItems<Items> extends true
//     ? Items[50]
//     : undefined

// type GetTypeRestItems1 = GetTypeRestItems<[string, number, boolean]>    // undefined
// type GetTypeRestItems2 = GetTypeRestItems<[]>                           // undefined
// type GetTypeRestItems3 = GetTypeRestItems<[number, ...string[]]>        // string
// type GetTypeRestItems4 = GetTypeRestItems<[...number[]]>                // number
// type GetTypeRestItems5 = GetTypeRestItems<Parameters<RestFn1>>          // undefined
// type GetTypeRestItems6 = GetTypeRestItems<Parameters<RestFn2>>          // number
// type GetTypeRestItems7 = GetTypeRestItems<Parameters<RestFn3>>          // number
// type GetTypeRestItems8 = GetTypeRestItems<Parameters<RestFn4>>          // undefined
// type GetTypeRestItems9 = GetTypeRestItems<Parameters<RestFn5>>          // undefined
// // #endregion GetTypeRestItems

// // #region GetItemsBeforeRestItems
// export type GetItemsBeforeRestItems<Items extends any[]> = IsRestItems<Items> extends true
//     ? Pop<Items>
//     : Items

// type GetItemsBeforeRestItems1 = GetItemsBeforeRestItems<[string, number, boolean]>    // [string, number, boolean]
// type GetItemsBeforeRestItems2 = GetItemsBeforeRestItems<[]>                           // []
// type GetItemsBeforeRestItems3 = GetItemsBeforeRestItems<[number, ...string[]]>        // [number]
// type GetItemsBeforeRestItems4 = GetItemsBeforeRestItems<[...number[]]>                // []
// type GetItemsBeforeRestItems5 = GetItemsBeforeRestItems<Parameters<RestFn1>>          // [string, number | undefined]
// type GetItemsBeforeRestItems6 = GetItemsBeforeRestItems<Parameters<RestFn2>>          // [string]
// type GetItemsBeforeRestItems7 = GetItemsBeforeRestItems<Parameters<RestFn3>>          // []
// type GetItemsBeforeRestItems8 = GetItemsBeforeRestItems<Parameters<RestFn4>>          // [string]
// type GetItemsBeforeRestItems9 = GetItemsBeforeRestItems<Parameters<RestFn5>>          // [string, number[]]
// // #endregion GetItemsBeforeRestItems