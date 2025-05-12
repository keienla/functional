export type returnedTypes =
    | 'any'
    | 'string'
    | 'array'
    | 'object'
    | 'number'
    | 'function'
    | 'boolean'
    | 'undefined'
    | 'bigint'
    | 'symbol'
    | 'null'
    | 'regexp'
    | 'generator'
    | 'generatorfunction'
    | 'unknown';

export type TypeName<A> = unknown extends A
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
                            : 'unknown';

const testTypeNameSymbol = Symbol('qzd');
const testTypeNameRegexp = /a/g;
function* testTypeNameGeneratorFunction() {}
const testTypeNameGenerator = testTypeNameGeneratorFunction();

type testTypeName1 = TypeName<[]>; // 'array'
type testTypeName2 = TypeName<[0, 1]>; // 'array'
type testTypeName3 = TypeName<''>; // 'string'
type testTypeName4 = TypeName<0>; // 'number'
type testTypeName5 = TypeName<() => {}>; // 'function'
type testTypeName6 = TypeName<false>; // 'boolean'
type testTypeName7 = TypeName<true>; // 'boolean'
type testTypeName8 = TypeName<undefined>; // 'undefined'
type testTypeName9 = TypeName<typeof testTypeNameSymbol>; // 'symbol'
type testTypeName10 = TypeName<typeof testTypeNameRegexp>; // 'regexp'
type testTypeName11 = TypeName<typeof testTypeNameGenerator>; // 'generator'
type testTypeName12 = TypeName<null>; // 'null'
type testTypeName13 = TypeName<{}>; // 'object'
type testTypeName14 = TypeName<any>; // 'any'
type testTypeName15 = TypeName<unknown>; // 'unknown'
