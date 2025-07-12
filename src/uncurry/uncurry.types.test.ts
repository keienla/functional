import type { Uncurry } from './uncurry.model';
import type { Curry } from '../curry/curry.model';

// Test cases for the new Uncurry type

// Test 1: Basic function (should remain unchanged)
type UncurryTest1 = Uncurry<(key1: string, key2: number) => boolean>;
const _test1: UncurryTest1 = null as any;
const _test1Check: (key1: string, key2: number) => boolean = _test1;

// Test 2: Manual curried function (should be flattened)
type UncurryTest2 = Uncurry<
    (key1: string) => (key2: number, key3: boolean) => (key4: number) => boolean
>;
const _test2: UncurryTest2 = null as any;
const _test2Check: (key1: string, key2: number, key3: boolean, key4: number) => boolean = _test2;

// Test 3: Function with empty parameter lists (should skip empty functions)
type UncurryTest3 = Uncurry<
    (key1: string) => () => () => (key2: boolean) => number
>;
const _test3: UncurryTest3 = null as any;
const _test3Check: (key1: string, key2: boolean) => number = _test3;

// Test 4: Function with parameter name conflicts (should preserve all parameters)
type UncurryTest4 = Uncurry<
    (key1: string, key2: number) => (key2: string) => Date
>;
const _test4: UncurryTest4 = null as any;
const _test4Check: (key1: string, key2: number, key2_1: string) => Date = _test4;

// Test 5: Function with rest parameters (should preserve rest parameters)
type UncurryTest5 = Uncurry<(key1: number) => (...rest: string[]) => string>;
const _test5: UncurryTest5 = null as any;
const _test5Check: (key1: number, ...rest: string[]) => string = _test5;

// Test 6: Curry wrapper type (should extract original function directly)
type OriginalFunction = (key1: string, key2: number) => boolean;
type CurriedWrapper = Curry<OriginalFunction>;
type UncurryTest7 = Uncurry<CurriedWrapper>;
const _test7: UncurryTest7 = null as any;
const _test7Check: (key1: string, key2: number) => boolean = _test7;

// Test 8: Complex Curry wrapper with rest parameters
type ComplexFunction = (a: string, b: number, ...rest: boolean[]) => Date;
type ComplexCurriedWrapper = Curry<ComplexFunction>;
type UncurryTest8 = Uncurry<ComplexCurriedWrapper>;
const _test8: UncurryTest8 = null as any;
const _test8Check: (a: string, b: number, ...rest: boolean[]) => Date = _test8;

// Test 9: Zero-parameter function
type ZeroParamFunction = () => string;
type UncurryTest9 = Uncurry<ZeroParamFunction>;
const _test9: UncurryTest9 = null as any;
const _test9Check: () => string = _test9;

// Test 10: Single parameter function
type SingleParamFunction = (a: number) => string;
type UncurryTest10 = Uncurry<SingleParamFunction>;
const _test10: UncurryTest10 = null as any;
const _test10Check: (a: number) => string = _test10;

// Test 11: Deeply nested curry
type DeepCurry = (a: string) => (b: number) => (c: boolean) => (d: Date) => (e: symbol) => string;
type UncurryTest11 = Uncurry<DeepCurry>;
const _test11: UncurryTest11 = null as any;
const _test11Check: (a: string, b: number, c: boolean, d: Date, e: symbol) => string = _test11;

// Verify that the tests compile correctly
export {};