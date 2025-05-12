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
                              : unknown;

const testTypeNameSymbol = Symbol('qzd');
const testTypeNameRegexp = /a/g;
function* testTypeNameGeneratorFunction() {}
const testTypeNameGenerator = testTypeNameGeneratorFunction();

const testTypeOfFunction = (a: string): number => {
    return 0;
};
type testTypeOf1 = TypeOf<[]>; // any[]
type testTypeOf2 = TypeOf<string[]>; // string[]
type testTypeOf3 = TypeOf<[0, 1]>; // number[]
type testTypeOf4 = TypeOf<''>; // string
type testTypeOf5 = TypeOf<string>; // string
type testTypeOf6 = TypeOf<0>; // number
type testTypeOf7 = TypeOf<() => {}>; // () => {}
type testTypeOf8 = TypeOf<typeof testTypeOfFunction>; // (a: string) => number
type testTypeOf9 = TypeOf<false>; // boolean
type testTypeOf10 = TypeOf<true>; // boolean
type testTypeOf11 = TypeOf<undefined>; // undefined
type testTypeOf12 = TypeOf<typeof testTypeNameSymbol>; // Symbol
type testTypeOf13 = TypeOf<typeof testTypeNameRegexp>; // RegExp
type testTypeOf14 = TypeOf<typeof testTypeNameGenerator>; // Generator
type testTypeOf15 = TypeOf<null>; // null
type testTypeOf16 = TypeOf<{}>; // object
type testTypeOf17 = TypeOf<{ a: number; b: string }>; // {a: number, b: string}
