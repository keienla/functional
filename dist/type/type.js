"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Return the type of the element (add array as a type)
 * @example
 *  type(undefined)     // undefined
 *  type(null)          // null
 *  type('a')           // string
 *  type([])            // array
 *  type({})            // object
 *  type(1)             // number
 *  type(() => {})      // function
 *  type(false)         // boolean
 *  type(BigInt(10))    // bigint
 *  type(Symbol('foo')) // symbol
 *  type(/a/g)          // regexp
 *
 * @param {any} value
 * @returns { 'string' | 'array' | 'object' | 'number' | 'function' | 'boolean' | 'undefined' | 'bigint' | 'symbol' | 'null' | 'regexp' | 'generator' | 'generatorfunction' } the type of the element
 */
function type(value) {
    if (value === null)
        return 'null';
    if (value === undefined)
        return 'undefined';
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}
exports.default = type;
//# sourceMappingURL=type.js.map