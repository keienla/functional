import { returnedTypes } from './../models/types.model';
/**
 * Check if the element given is the same type that the returnedTypes given
 * @param {returnedTypes} typeToTest
 * @param {any} element
 * @returns {boolean}
 */
declare const isType: import("../models/curry.model").Curry<(typeToTest: returnedTypes, element: any) => boolean>;
export default isType;
export declare function isArray(element: any): element is any[];
export declare function isGenerator(element: any): element is Generator;
export declare function isGeneratorFunction(element: any): element is Generator;
export declare function isObject(element: any): element is object;
export declare function isString(element: any): element is string;
export declare function isNumber(element: any): element is number;
export declare function isBoolean(element: any): element is boolean;
export declare function isSymbol(element: any): element is Symbol;
export declare function isBigint(element: any): element is bigint;
export declare function isFunction(element: any): element is Function;
export declare function isRegexp(element: any): element is RegExp;
export declare function isUndefined(element: any): element is undefined;
export declare function isNull(element: any): element is null;
//# sourceMappingURL=isType.d.ts.map