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
    | 'unknown'
    | 'error'
    | 'map'
    | 'set'
    | 'weakmap'
    | 'weakset'
    | 'int8array'
    | 'uint8array'
    | 'int16array'
    | 'uint16array'
    | 'int32array'
    | 'uint32array'
    | 'float32array'
    | 'float64array'
    | 'arraybuffer'
    | 'dataview'
    | 'promise'
    | 'math'
    | 'json'
    | 'arguments'
    | 'date';

export type TypeName<A> = unknown extends A
    ? [keyof A] extends [never]
        ? 'unknown'
        : 'any'
    : A extends Array<any>
      ? 'array'
      : A extends WeakMap<any, any>
        ? 'weakmap'
        : A extends WeakSet<any>
          ? 'weakset'
          : A extends Map<any, any>
            ? 'map'
            : A extends Set<any>
              ? 'set'
              : A extends Int8Array
                ? 'int8array'
                : A extends Uint8Array
                  ? 'uint8array'
                  : A extends Int16Array
                    ? 'int16array'
                    : A extends Uint16Array
                      ? 'uint16array'
                      : A extends Int32Array
                        ? 'int32array'
                        : A extends Uint32Array
                          ? 'uint32array'
                          : A extends Float32Array
                            ? 'float32array'
                            : A extends Float64Array
                              ? 'float64array'
                              : A extends ArrayBuffer
                                ? 'arraybuffer'
                                : A extends DataView
                                  ? 'dataview'
                                  : A extends Promise<any>
                                    ? 'promise'
                                    : A extends Date
                                      ? 'date'
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
                                                          : A extends Error
                                                            ? 'error'
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

// Error types
const err = new Error('err');
type testTypeName16 = TypeName<typeof err>; // 'error'

// Collection types
const map = new Map();
type testTypeName17 = TypeName<typeof map>; // 'map'
const set = new Set();
type testTypeName18 = TypeName<typeof set>; // 'set'
const weakMap = new WeakMap();
type testTypeName19 = TypeName<typeof weakMap>; // 'weakmap'
const weakSet = new WeakSet();
type testTypeName20 = TypeName<typeof weakSet>; // 'weakset'

// Typed array types
const int8Array = new Int8Array();
type testTypeName21 = TypeName<typeof int8Array>; // 'int8array'
const uint8Array = new Uint8Array();
type testTypeName22 = TypeName<typeof uint8Array>; // 'uint8array'
const int16Array = new Int16Array();
type testTypeName23 = TypeName<typeof int16Array>; // 'int16array'
const uint16Array = new Uint16Array();
type testTypeName24 = TypeName<typeof uint16Array>; // 'uint16array'
const int32Array = new Int32Array();
type testTypeName25 = TypeName<typeof int32Array>; // 'int32array'
const uint32Array = new Uint32Array();
type testTypeName26 = TypeName<typeof uint32Array>; // 'uint32array'
const float32Array = new Float32Array();
type testTypeName27 = TypeName<typeof float32Array>; // 'float32array'
const float64Array = new Float64Array();
type testTypeName28 = TypeName<typeof float64Array>; // 'float64array'

// Binary data types
const arrayBuffer = new ArrayBuffer(8);
type testTypeName29 = TypeName<typeof arrayBuffer>; // 'arraybuffer'
const dataView = new DataView(arrayBuffer);
type testTypeName30 = TypeName<typeof dataView>; // 'dataview'

// Promise type
const promise = Promise.resolve();
type testTypeName31 = TypeName<typeof promise>; // 'promise'

// Date type
const date = new Date();
type testTypeName32 = TypeName<typeof date>; // 'date'
