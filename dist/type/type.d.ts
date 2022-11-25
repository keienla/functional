import { returnedTypes } from './../models/types.model';
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
export default function type(value: any): returnedTypes;
//# sourceMappingURL=type.d.ts.map