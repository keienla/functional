import {
    AppendList,
    Concat,
    Head,
    IsFinite,
    IsNever,
    Length,
    Tail,
    Tuple,
} from '../models';
import type { Blank } from './_blank';

// #region IsBlank
/**
 * Check if the item is Blank type
 * @example
 * type A = IsBlank<0> // false
 * type B = IsBlank<Blank> // true
 * type C = IsBlank<never> // false
 * const sh = Symbol('Hello');
 * type D = IsBlank<typeof sh> // false
 * const sb = Symbol('BLANK');
 * type E = IsBlank<typeof sb> // false
 */
export type IsBlank<Value, Is = true, Isnt = false> = IsNever<
    Value,
    Isnt,
    Value extends Blank ? Is : Isnt
>;
// #endregion IsBlank

// #region ReplaceBlank
/**
 * Merge two array. If the first array have some BLANK items, there will be replace by items of second group if exist
 * @example
 * type A = ReplaceBlank<[], []>; // []
 * type B = ReplaceBlank<[0, 1, 2, 3], []>; // [0, 1, 2, 3]
 * type C = ReplaceBlank<[0, 1, 2, 3], [4, 5, 6]>; // [0, 1, 2, 3]
 * type D = ReplaceBlank<[Blank, 1, 2, 3], ['Hello']>; // ['Hello', 1, 2, 3]
 * type E = ReplaceBlank<[0, 1, Blank, 3], ['Foo']>; // [0, 1, 'Foo', 3]
 * type F = ReplaceBlank<string[], []>; // 'ERROR'
 * type G = ReplaceBlank<[0, Blank, Blank, 3], [Blank, 'Bar']>; // [0, '__BLANK__', 'Foo', 3]
 * type H = ReplaceBlank<G, ['Foo']>; // [0, 'Foo', 'Bar', 3]
 */
export type ReplaceBlanks<
    Items extends Tuple,
    NewItems extends Tuple,
> = ReplaceBlanksFn<Items, NewItems>;

type ReplaceBlanksFn<
    Items extends Tuple,
    NewItems extends Tuple,
    Result extends Tuple = [],
> = {
    continueItems: ReplaceBlanksFn<
        Tail<Items>,
        NewItems,
        AppendList<Head<Items>, Result>
    >;
    continueNewItems: ReplaceBlanksFn<
        Tail<Items>,
        Tail<NewItems>,
        AppendList<Head<NewItems>, Result>
    >;
    finishItems: Result;
    finishNewItems: Concat<Result, Items>;
    infinite: {
        ERROR: 'Cannot ReplaceBlank on an infinite array';
        TAGS: ['InfiniteArray', 'Infinite', 'ReplaceBlank'];
    };
}[IsFinite<Items> extends true
    ? Length<Items> extends 0
        ? 'finishItems'
        : Length<NewItems> extends 0
          ? 'finishNewItems'
          : IsBlank<Head<Items>[0], 'continueNewItems', 'continueItems'>
    : 'infinite'];
// #endregion ReplaceBlank

// #region ExtractBlank
/**
 * Extract all arguments that are not initialized yet with a value
 * @example
 * type A = ExtractBlanks<[], []>; // []
 * type B = ExtractBlanks<[], [arg1: boolean]>; // [arg1: boolean]
 * type C = ExtractBlanks<['hello'], [arg1: string, arg2: boolean, arg3: number]>; // [arg2: boolean, arg3: number]
 * type D = ExtractBlanks<[Blank, true], [arg1: string, arg2: boolean, arg3: number]>; // [arg1: string, arg3: number]
 * type E = ExtractBlanks<['A', Blank, 'C'], string[]>; // [string, ...string[]]
 * type F = ExtractBlanks<['A', Blank, 'C'], [string, number, ...string[]]>; // [number, ...string[]]
 * type G = ExtractBlanks<string[], []>; // 'ERROR'
 */
export type ExtractBlanks<
    Given extends Tuple,
    Desired extends Tuple,
> = ExtractBlanksFn<Given, Desired>;

type ExtractBlanksFn<
    Given extends Tuple,
    Desired extends Tuple,
    Result extends Tuple = [],
> = {
    continue: ExtractBlanksFn<Tail<Given>, Tail<Desired>, Result>;
    addDesired: ExtractBlanksFn<
        Tail<Given>,
        Tail<Desired>,
        AppendList<IsNever<Head<Desired>, [Desired[0]], Head<Desired>>, Result>
    >;
    finish: Concat<Result, Desired>;
    infinite: {
        ERROR: 'Cannot ExtractBlank on an infinite array';
        TAGS: ['InfiniteArray', 'Infinite', 'ExtractBlank'];
    };
}[IsFinite<Given> extends true
    ? Length<Given> extends 0
        ? 'finish'
        : IsBlank<Head<Given>[0], 'addDesired', 'continue'>
    : 'infinite'];
// #endregion ExtractBlank
