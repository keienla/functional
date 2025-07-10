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
 * @params {Tuple} Items The default list with some items that can be BLANK item
 * @params {Tuple} NewItems The items to add to the first group and replace the BLANK items
 * @params {true|false} AddRestingItems If there is some items in NewItems
 *  - if false (default): the remaining items of NewItems will be ignored
 *  - if true: the remaining items of NewItems will be added to the result
 * @example
 * type A = ReplaceBlanks<[], []>; // []
 * type B = ReplaceBlanks<[0, 1, 2, 3], []>; // [0, 1, 2, 3]
 * type C = ReplaceBlanks<[0, 1, 2, 3], [4, 5, 6]>; // [0, 1, 2, 3]
 * type D = ReplaceBlanks<[0, 1, 2, 3], [4, 5, 6], true>; // [0, 1, 2, 3, 4, 5, 6]
 * type E = ReplaceBlanks<[Blank, 1, 2, 3], ['Hello']>; // ['Hello', 1, 2, 3]
 * type F = ReplaceBlanks<[0, 1, Blank, 3], ['Foo', 'Bar']>; // [0, 1, 'Foo', 3]
 * type G = ReplaceBlanks<[0, 1, Blank, 3], ['Foo', 'Bar'], true>; // [0, 1, 'Foo', 3, 'Bar']
 * type H = ReplaceBlanks<string[], []>; // 'ERROR'
 * type I = ReplaceBlanks<[0, Blank, Blank, 3], [Blank, 'Bar']>; // [0, '__BLANK__', 'Foo', 3]
 * type J = ReplaceBlanks<I, ['Foo']>; // [0, 'Foo', 'Bar', 3]
 */
export type ReplaceBlanks<
    Items extends Tuple,
    NewItems extends Tuple,
    AddRestingItems extends boolean = false,
> = ReplaceBlanksFn<Items, NewItems, AddRestingItems>;

type ReplaceBlanksFn<
    Items extends Tuple,
    NewItems extends Tuple,
    AddRestingItems extends boolean = false,
    Result extends Tuple = [],
> = {
    continueItems: ReplaceBlanksFn<
        Tail<Items>,
        NewItems,
        AddRestingItems,
        AppendList<Head<Items>, Result>
    >;
    continueNewItems: ReplaceBlanksFn<
        Tail<Items>,
        Tail<NewItems>,
        AddRestingItems,
        AppendList<Head<NewItems>, Result>
    >;
    finishItems: AddRestingItems extends false
        ? Result
        : Concat<Result, NewItems>;
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

// #region RemoveBlanks
/**
 * Remove all the items that are Blank
 * @param {Tuple} Given The tuple to remove the Blank items
 * @returns {Tuple}
 * @example
 * type A = RemoveBlanks<[]>; // []
 * type B = RemoveBlanks<[0, 1, 2, 3]>; // [0, 1, 2, 3]
 * type C = RemoveBlanks<[0, 1, Blank, 3]>; // [0, 1, 3]
 * type D = RemoveBlanks<[0, Blank, Blank, 3]>; // [0, 3]
 * type E = RemoveBlanks<[Blank]>; // []
 * type F = RemoveBlanks<string[]>; // 'ERROR'
 */
export type RemoveBlanks<Given extends Tuple> = RemoveBlanksFn<Given>;

type RemoveBlanksFn<Given extends Tuple, Result extends Tuple = []> = {
    continueWithValue: RemoveBlanksFn<
        Tail<Given>,
        AppendList<Head<Given>, Result>
    >;
    continueWithoutBlank: RemoveBlanksFn<Tail<Given>, Result>;
    finish: Result;
    infinite: {
        ERROR: 'Cannot RemoveBlank on an infinite array';
        TAGS: ['InfiniteArray', 'Infinite', 'RemoveBlank'];
    };
}[IsFinite<Given> extends true
    ? Length<Given> extends 0
        ? 'finish'
        : IsBlank<Head<Given>[0], 'continueWithoutBlank', 'continueWithValue'>
    : 'infinite'];
// #endregion RemoveBlanks
