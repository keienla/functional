import type { returnedTypes } from './../models';
import typeFn from './../type/type';

/**
 * Check if the element given is the same type that the returnedTypes given
 *
 * @param {returnedTypes} typeToTest
 * @param {any} element
 * @returns {boolean}
 * @example
 *  isType('boolean', false) // true
 */
export default function isType(
    typeToTest: returnedTypes,
    element: unknown,
): boolean {
    return typeFn(element) === typeToTest;
}

export function isArray(element: unknown): element is any[] {
    return isType('array', element);
}

export function isGenerator(element: unknown): element is Generator {
    return isType('generator', element);
}

export function isGeneratorFunction(element: unknown): element is Generator {
    return isType('generatorfunction', element);
}

export function isObject(element: unknown): element is object {
    return isType('object', element);
}

export function isString(element: unknown): element is string {
    return isType('string', element);
}

export function isNumber(element: unknown): element is number {
    return isType('number', element);
}

export function isBoolean(element: unknown): element is boolean {
    return isType('boolean', element);
}

export function isSymbol(element: unknown): element is Symbol {
    return isType('symbol', element);
}

export function isBigint(element: unknown): element is bigint {
    return isType('bigint', element);
}

export function isFunction(element: unknown): element is Function {
    return isType('function', element);
}

export function isRegexp(element: unknown): element is RegExp {
    return isType('regexp', element);
}

export function isUndefined(element: unknown): element is undefined {
    return isType('undefined', element);
}

export function isNull(element: unknown): element is null {
    return isType('null', element);
}
