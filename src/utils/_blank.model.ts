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
import { _BLANK } from './_blank';

export type BLANK = typeof _BLANK;

// #region IsBlank
export type IsBlank<Value, Is = true, Isnt = false> = Value extends BLANK
    ? Is
    : Isnt;

type IsBlankTest1 = IsBlank<0>; // false
type IsBlankTest2 = IsBlank<never>; // never
type IsBlankTest3 = IsBlank<BLANK>; // true
type IsBlankTest4 = IsBlank<null>; // false
type IsBlankTest5 = IsBlank<undefined>; // false
type IsBlankTest6 = IsBlank<typeof _BLANK>; // true
const sh = Symbol('Hello');
type tSh = typeof sh;
type IsBlankTest7 = IsBlank<tSh>; // false
const sb = Symbol('BLANK');
type tSb = typeof sb;
type IsBlankTest8 = IsBlank<tSb>; // false
// #endregion IsBlank

// #region ReplaceBlank
export type ReplaceBlank<
    Items extends Tuple,
    NewItems extends Tuple,
> = ReplaceBlankFn<Items, NewItems>;

type ReplaceBlankFn<
    Items extends Tuple,
    NewItems extends Tuple,
    Result extends Tuple = [],
> = {
    continueItems: ReplaceBlankFn<
        Tail<Items>,
        NewItems,
        AppendList<Head<Items>, Result>
    >;
    continueNewItems: ReplaceBlankFn<
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

type ReplaceBlankTest1 = ReplaceBlank<[], []>; // []
type ReplaceBlankTest2 = ReplaceBlank<[0, 1, 2, 3], []>; // [0, 1, 2, 3]
type ReplaceBlankTest3 = ReplaceBlank<[0, 1, 2, 3], [4, 5, 6]>; // [0, 1, 2, 3]
type ReplaceBlankTest4 = ReplaceBlank<[BLANK, 1, 2, 3], ['Hello']>; // ['Hello', 1, 2, 3]
type ReplaceBlankTest5 = ReplaceBlank<string[], []>; // 'ERROR'
// #endregion ReplaceBlank

// #region ExtractBlank
export type ExtractBlank<
    Given extends Tuple,
    Desired extends Tuple,
> = ExtractBlankFn<Given, Desired>;

type ExtractBlankFn<
    Given extends Tuple,
    Desired extends Tuple,
    Result extends Tuple = [],
> = {
    continue: ExtractBlankFn<Tail<Given>, Tail<Desired>, Result>;
    addDesired: ExtractBlankFn<
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

type ExtractBlankTest1 = ExtractBlank<[], []>; // []
type ExtractBlankTest2 = ExtractBlank<
    ['hello'],
    [arg1: string, arg2: boolean, arg3: number]
>; // [arg2: boolean, arg3: number]
type ExtractBlankTest3 = ExtractBlank<
    [BLANK, true],
    [arg1: string, arg2: boolean, arg3: number]
>; // [arg1: string, arg3: number]
type ExtractBlankTest4 = ExtractBlank<['A', BLANK, 'C'], string[]>; // [string, ...string[]]
type ExtractBlankTest5 = ExtractBlank<
    ['A', BLANK, 'C'],
    [string, number, ...string[]]
>; // [number, ...string[]]
type ExtractBlankTest6 = ExtractBlank<string[], []>; // 'ERROR'
// #endregion ExtractBlank
