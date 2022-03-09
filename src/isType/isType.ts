'use strict';

import type from './../type/type';
import { returnedTypes } from './../models/types.model';
import curry from '../curry/curry';

/**
 * Check if the element given is the same type that the returnedTypes given
 * @param {returnedTypes} typeToTest
 * @param {any} element
 * @returns {boolean}
 */
const isType = curry(function isType(typeToTest: returnedTypes, element: any): boolean {
    return type(element) === typeToTest;
})

export default isType;

export function isArray(element: any): element is any[] {
    return isType('array', element);
}

export function isGenerator(element: any): element is Generator {
    return isType('generator', element);
}

export function isGeneratorFunction(element: any): element is Generator {
    return isType('generatorfunction', element);
}

export function isObject(element: any): element is object {
    return isType('object', element);
}

export function isString(element: any): element is string {
    return isType('string', element);
}

export function isNumber(element: any): element is number {
    return isType('number', element);
}

export function isBoolean(element: any): element is boolean {
    return isType('boolean', element);
}

export function isSymbol(element: any): element is Symbol {
    return isType('symbol', element);
}

export function isBigint(element: any): element is bigint {
    return isType('bigint', element);
}

export function isFunction(element: any): element is Function {
    return isType('function', element);
}

export function isRegexp(element: any): element is RegExp {
    return isType('regexp', element);
}

export function isUndefined(element: any): element is undefined {
    return isType('undefined', element);
}

export function isNull(element: any): element is null {
    return isType('null', element);
}
