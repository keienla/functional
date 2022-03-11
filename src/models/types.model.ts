export type TObject = {
    [key: string]: any
}

export type Predicate<T> = (value: T) => boolean;

const fn00 = (name: string, age: number, single: boolean) => true
const fn01 = (...args: string[]) => true
const fn02 = () => true

// #region Params
// Get the types of each argument in a function and return array of types
export type Params<F extends Function> =
    F extends ((...args: infer A) => any)
    ? A
    : never

type testParams1 = Params<typeof fn00>  // [string, number, boolean]
type testParams2 = Params<typeof fn01>  // string[]
type testParams3 = Params<typeof fn02>  // []
// #endregion

// #region Head
// Get the first element in a array of type
export type Head<T extends any[]> =
    T extends [infer HeadElement, ...any[]]
    ? HeadElement
    : never

type testHead1 = Head<[1, 2, string, number]>   // 1
type testHead2 = Head<Params<typeof fn00>>      // string
type testHead3 = Head<[]>                       // never
// #endregion

// #region Tail
// Get all the elements except first in an array of type
export type Tail<T extends any[]> =
    ((...t: T) => any) extends ((_: any, ...tail: infer TailsElement) => any)
    ? TailsElement
    : never

type testTail1 = Tail<[1, 2, string, number]>   // [2, string, number]
type testTail2 = Tail<Params<typeof fn00>>      // [number, boolean]
type testTail3 = Tail<testTail2>                // [boolean]
type testTail4 = Tail<testTail3>                // []
type testTail5 = Tail<testTail4>                // []
// #endregion

// #region HasTail
// Check if there is at least 2 value in an array
export type HasTail<T extends any[]> =
    T extends ([] | [any])
    ? false
    : true

type testHasTail1 = HasTail<Params<typeof fn00>>    // true, [2, string, number] => cause element > 1
type testHasTail2 = HasTail<Tail<Params<typeof fn00>>>  // true, [number, boolean] => cause element > 1
type testHasTail3 = HasTail<Tail<Tail<Params<typeof fn00>>>>  // false, [boolean] => cause there is only 1 element
// #endregion

// #region First
// Recursive type function
// Check all the elements and get the last parameter
export type First<T extends any[]> = Head<T> extends never
    ? never
    : T extends [first: infer F, ...rest: infer R] ? F : never

type testFirst1 = First<[1, 2, 3, 4]>     // 1
// #endregion

// #region Last
// Recursive type function
// Check all the elements and get the last parameter
export type Last<T extends any[]> = Tail<T> extends never
    ? never
    : T extends [...rest: infer U, last: infer L] ? L : never

type testLast1 = Last<[1, 2, 3, 4]>     // 4
// #endregion

// #region Prepend
// It adds a type E at the beginning of the given array of type
export type Prepend<Addend, A extends any[]> =
    ((_: Addend, ..._1: A) => any) extends ((...args: infer Result) => any)
    ? Result
    : A

type testPrepend1 = Prepend<string, []>         // [string]
type testPrepend2 = Prepend<number, [1, 2]>     // [number, 1, 2]
// #endregion

// #region Length
// Get the length of an array of element
export type Length<T extends any[]> =
    T['length']

type testLength1 = Length<[]>                       // 0
type testLength2 = Length<[any, any]>               // 2
type testLength3 = Length<[1, 2, 3]>                // 3
type testLength4 = Length<Prepend<any, [1, 2, 3]>>  // 4
// #endregion

// #region Drop
// Get all the arguments after the index given
export type Drop<N extends number, T extends any[], I extends any[] = []> = {
    continue: Drop<N, Tail<T>, Prepend<any, I>>
    return: T,
    infinite: {}
} [
    Length<I> extends N
    ? 'return'
    : IsFinite<T, 'continue', 'infinite'>
]

type testDrop1 = Drop<2, ['a', 'b', 'c', 'd']>  // ['c', 'd']
type testDrop2 = Drop<3, ['a', 'b', 'c', 'd']>  // ['d']
type testDrop3 = Drop<any, [0,1,2]>             // [0,1,2]
type testDrop4 = Drop<3, ['a']>                 // []
// #endregion

// #region Before
// Get all the arguments before the index given
export type Before<N extends number, T extends any[], R extends any[] = [], I extends any[] = []> = {
    continue: Before<N, Tail<T>, Prepend<Head<T>,R>, Next<I>>
    finish: Reverse<R>
    finishWithHead: Reverse<Prepend<Head<T>, R>>
    empty: never
    infinite: {}
} [
    T extends any[]
        ? IsFinite<T, Length<I> extends N
            ? 'finish'
            : Length<Tail<T>> extends 0
                ? 'finishWithHead'
                : 'continue', 'infinite'>
        : 'empty'
    // Length<I> extends N
    //     ? 'finish'
    //     : Length<Tail<T>> extends 0
    //         ? 'finishWithHead'
    //         : 'continue'
]

type testBefore1 = Before<0, [0, 1, 2]>                     // []
type testBefore2 = Before<5, ['a', 'b']>                    // ['a', 'b']
type testBefore3 = Before<3, ['a', 'b', 'c', 'd', 'e']>     // ['a', 'b', 'c']
// #region Cast
// If same type return first type else return second type
export type Cast<X, Y> =
    X extends Y
    ? X
    : Y

type testCast1 = Cast<[string], any>    // [string]
type testCast2 = Cast<[string], number> // number
// #endRegion

// #region Iterator
export type Pos<I extends any[]> =
    Length<I>

export type Next<I extends any[]> =
    Prepend<any, I>

export type Prev<I extends any[]> =
    Tail<I>

type testPos = Pos<[any, any]>          // 2
type testNext = Pos<Next<[any, any]>>   // 3
type testPrev = Pos<Prev<[any, any]>>   // 1

export type Iterator<Index extends number = 0, From extends any[] = [], I extends any[] = []> = {
    0: Iterator<Index, Next<From>, Next<I>>
    1: From
} [
    Pos<I> extends Index
    ? 1
    : 0
]

type testIterator1 = Iterator<2>                // [any, any]
type testIterator2 = Iterator<3, testIterator1> // [any, any, any, any, any]
type testIterator3 = Pos<testIterator1>         // 2
type testIterator4 = Pos<testIterator2>         // 5
// #endregion

// #region Reverse
export type Reverse<A extends any[], Prefix extends any[] = []> = {
    empty: Prefix,
    notEmpty: ((...args: A) => any) extends ((_: infer First, ...next: infer Next) => any)
        ? Reverse<Next, Prepend<First, Prefix>>
        : never,
    infinite: {
        ERROR: 'Cannot reverse an infinite array',
        CODENAME: ['InfiniteArray', 'Infinite']
    }
} [
    A extends [any, ...any[]]
        ? IsFinite<A, 'notEmpty', 'infinite'>
        : 'empty'
]

type testReverse1 = Reverse<[1, 2, 3]>          // [3, 2, 1]
type testReverse2 = Reverse<testReverse1>       // [1, 2, 3]
type testReverse3 = Reverse<[[2, 1], [3, 4]]>   // [[3, 4], [2, 1]]
// #endregion

// #region Concat
export type Concat<Left extends any[], Right extends any[]> = {
    emptyLeft: Right,
    oneLeft: Left extends [infer Unique]
        ? Prepend<Unique, Right>
        : never,
    multiLeft: ((..._: Reverse<Left>) => any) extends ((_: infer LeftLast, ..._1: infer ReversedLeftRest) => any)
        ? Concat<Reverse<ReversedLeftRest>, Prepend<LeftLast, Right>>
        : never,
    infiniteLeft: {
        ERROR: 'Left is not finite',
        CODENAME: ['InfiniteLeft', 'Infinite']
    }
}[
    Left extends [] ? 'emptyLeft' :
    Left extends [any] ? 'oneLeft' :
    IsFinite<Left, 'multiLeft', 'infiniteLeft'>
]

type testConcat1 = Concat<[1, 2], [3, 4]>       // [1, 2, 3, 4]
// #endregion

// #region Append
// Add a value at the end of the given array
export type Append<E, T extends any[]> =
    Concat<T, [E]>

type testAppend1 = Append<3, [1, 2]>    // [1, 2, 3]
// #endregion

// #region NotNull
export type NotNull<A,B> =
    A extends undefined
        ? B
        : A extends null
            ? B
            : A

type testNotNull1 = NotNull<number, string>     // number
type testNotNull2 = NotNull<undefined, string>  // string
type testNotNull3 = NotNull<null, string>       // string
type testNotNull4 = NotNull<null, [string, number]> // [string, number]
// #endregion

// #region definedType
export type returnedTypes = 'any' | 'string' | 'array' | 'object' | 'number' | 'function' | 'boolean' | 'undefined' | 'bigint' | 'symbol' | 'null' | 'regexp' | 'generator' | 'generatorfunction' | 'unknown';

export type TypeName<A> =
    unknown extends A
        ? [keyof A] extends [never]
            ? 'unknown'
            : 'any'
    : A extends Array<any>
        ? 'array'
    : A extends string
        ? 'string'
    : A extends number
        ? 'number'
    : A extends Function
        ? 'function'
    : A extends boolean
        ? 'boolean'
    : A extends undefined
        ? 'undefined'
    : A extends Symbol
        ? 'symbol'
    : A extends RegExp
        ? 'regexp'
    : A extends Generator
        ? 'generator'
    : A extends null
        ? 'null'
    : A extends bigint
        ? 'bigint'
    : A extends object
        ? 'object'
    : 'unknown'

const testTypeNameSymbol = Symbol('qzd');
const testTypeNameRegexp = /a/g;
function* testTypeNameGeneratorFunction() {}
const testTypeNameGenerator = testTypeNameGeneratorFunction();

type testTypeName1 = TypeName<[]>                           // 'array'
type testTypeName2 = TypeName<[0,1]>                        // 'array'
type testTypeName3 = TypeName<''>                           // 'string'
type testTypeName4 = TypeName<0>                            // 'number'
type testTypeName5 = TypeName<() => {}>                     // 'function'
type testTypeName6 = TypeName<false>                        // 'boolean'
type testTypeName7 = TypeName<true>                         // 'boolean'
type testTypeName8 = TypeName<undefined>                    // 'undefined'
type testTypeName9 = TypeName<typeof testTypeNameSymbol>    // 'symbol'
type testTypeName10 = TypeName<typeof testTypeNameRegexp>   // 'regexp'
type testTypeName11 = TypeName<typeof testTypeNameGenerator>// 'generator'
type testTypeName12 = TypeName<null>                        // 'null'
type testTypeName13 = TypeName<{}>                          // 'object'
type testTypeName14 = TypeName<any>                         // 'any'
type testTypeName15 = TypeName<unknown>                     // 'unknown'

type Tqzd = testTypeName14 extends 'any' ? 'true' : 'false'

type truc = any extends 'any' ? 'true' : 'false'
// #endregion

// #region TypeOf
export type TypeOf<T> =
    T extends Array<infer U>
    ? ([U] extends [never] ? any : TypeOf<U>)[]
    : T extends string
    ? string
    : T extends number
    ? number
    : T extends (...args: infer A) => infer R
    ? (...args: A) => R
    : T extends boolean
    ? boolean
    : T extends undefined
    ? undefined
    : T extends Symbol
    ? Symbol
    : T extends RegExp
    ? RegExp
    : T extends Generator
    ? Generator
    : T extends null
    ? null
    : T extends bigint
    ? bigint
    : T extends object
    ? T
    : unknown

const testTypeOfFunction = (a: string): number => {return 0}
type testTypeOf1 = TypeOf<[]>                           // any[]
type testTypeOf2 = TypeOf<string[]>                     // string[]
type testTypeOf3 = TypeOf<[0,1]>                        // number[]
type testTypeOf4 = TypeOf<''>                           // string
type testTypeOf5 = TypeOf<string>                      // string
type testTypeOf6 = TypeOf<0>                            // number
type testTypeOf7 = TypeOf<() => {}>                     // () => {}
type testTypeOf8 = TypeOf<typeof testTypeOfFunction>    // (a: string) => number
type testTypeOf9 = TypeOf<false>                        // boolean
type testTypeOf10 = TypeOf<true>                        // boolean
type testTypeOf11 = TypeOf<undefined>                   // undefined
type testTypeOf12 = TypeOf<typeof testTypeNameSymbol>   // Symbol
type testTypeOf13 = TypeOf<typeof testTypeNameRegexp>   // RegExp
type testTypeOf14 = TypeOf<typeof testTypeNameGenerator>// Generator
type testTypeOf15 = TypeOf<null>                        // null
type testTypeOf16 = TypeOf<{}>                          // object
type testTypeOf17 = TypeOf<{a: number, b: string}>      // {a: number, b: string}
// #endregion

// #region ValueOf
export type ValueOf<T> = T[keyof T];

type testValueOf = ValueOf<{a: string, b: number}>      // string | number
// #endregion

// #region IntersectionFromUnion
// Check if it's a Union or not
// If not return the value else return never
type Consumer<Value> = (value: Value) => void;

type IntersectionFromUnion<T> =
    (T extends any ? Consumer<T> : never) extends (Consumer<infer ResultIntersection>)
    ? ResultIntersection
    : never

type testIntersectionFromUnion1 = IntersectionFromUnion<'test1' | 'test2' | 'test3'>    // never
type testIntersectionFromUnion2 = IntersectionFromUnion<string | number>                // never
type testIntersectionFromUnion3 = IntersectionFromUnion<string>                         // string
// #endregion

// #region OverloadedConsumerFromUnion
// Link all Union element with a & symbol
type OverloadedConsumerFromUnion<Union> = IntersectionFromUnion<Union extends any ? Consumer<Union> : never>;

type testOverloadedConsumerFromUnion1 = OverloadedConsumerFromUnion<'test1' | 'test2' | 'test3'>    // Consumer<'test1'> & Consumer<'test2'> & Consumer<'test3'>
type testOverloadedConsumerFromUnion2 = OverloadedConsumerFromUnion<string | number>                // Consumer<string> & Consumer<number>
type testOverloadedConsumerFromUnion3 = OverloadedConsumerFromUnion<string>                         // (value: string) => void
// #endregion

// #region UnionLast
// Get the last Consumer in the chain of Consumer && take it's property
export type UnionLast<Union> = OverloadedConsumerFromUnion<Union> extends ((a: infer A) => void) ? A : never;

type testUnionLast1 = UnionLast<'test1' | 'test2' | 'test3'>            // 'test3'
type testUnionLast2 = UnionLast<string | number>                        // number

export type HeadTruc<T> =
    T extends (infer HeadElement | any)
    ? HeadElement
    : never
// #endregion

// #region UnionExcludeLast
export type UnionExcludingLast<Union> = Exclude<Union, UnionLast<Union>>;

type testUnionExcludingLast1 = UnionExcludingLast<'test1' | 'test2' | 'test3'>          // 'test1' | 'test2'
type testUnionExcludingLast2 = UnionExcludingLast<testUnionExcludingLast1>              // 'test1'
type testUnionExcludingLast3 = UnionExcludingLast<testUnionExcludingLast2>              // never
type testUnionExcludingLast4 = UnionExcludingLast<string | number>                      // string
// #endregion

// #region Tuple
export type Tuple<A = any> = Array<A>;

type testTuple1 = Tuple<string>     // string[]
// #endregion

// #region TupleFromUnionRec
// While RemainingUnion is not empty, run and add the last property at the beginning of CurrentTuple
export type TupleFromUnion<RemainingUnion, CurrentTuple extends any[] = []> = {
    0: TupleFromUnion<UnionExcludingLast<RemainingUnion>, Prepend<UnionLast<RemainingUnion>, CurrentTuple>>
    1: CurrentTuple
} [
    [RemainingUnion] extends [never]
    ? 1
    : 0
]

type testTupleFromUnion1 = TupleFromUnion<'test1' | 'test2' | 'test3'>      // ['test1', 'test2', 'test3']
type testTupleFromUnion2 = TupleFromUnion<string | number>                  // [string, number]
type testTupleFromUnion3 = TupleFromUnion<number>                  // [string, number]
// #endregion

// #region SameValueInterface
export type SameValueInterface<T, R> = {
    [K in keyof T]: R
}

interface svi1 {
    a: string,
    b: number,
    c: boolean
}

interface svi2 {
    d: () => {}
}

type testSameValueInterface1 = SameValueInterface<svi1, string>         // { a: string, b: string, c: string }
type testSameValueInterface2 = SameValueInterface<svi2, boolean>        // { d: boolean }
type testSameValueInterface3 = SameValueInterface<svi1 & svi2, number>  // { a: number, b: number, c: number, d: number }
// #endregion

// #region IsFinite
export type IsFinite<A extends any[], Finite, Infinite> = {
    empty: Finite,
    notEmpty: ((...args: A) => any) extends ((_firstArgs: infer First, ...args: infer Rest) => any)
        ? IsFinite<Rest, Finite, Infinite>
        : never
    infinite: Infinite
}[
    A extends [] ? 'empty'
    : A extends (infer Element)[] ?
        Element[] extends A ?
        'infinite'
        : 'notEmpty'
    : never
]

type testIsFinite1 = IsFinite<[string, number], true, false>        // true
type testIsFinite2 = IsFinite<any[], true, false>                   // false
type testIsFinite3 = IsFinite<[], true, false>                      // true
// #endregion
