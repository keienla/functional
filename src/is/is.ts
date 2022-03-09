'use strict';

import curry from "./../curry/curry";
import type from './../type/type';
import arrayIs from './../arrayIs/arrayIs';
import objectIs from './../objectIs/objectIs';
import _is from '../_internal/_is';

/**
 * Check if two element are the same. Work for all type of element. For object check all the keys/value, same for array check all element and order.
 * @example
 *  const el1: number[] = [0,1];
 *  const el2: object = { x: 2 };
 *  const el3: string = 'a';
 *  const el4: number = 10;
 *  const el5: RegExp = /a/g;
 *
 *  is(el1, [0,1])      // true
 *  is(el1, [0])        // false
 *  is(el1, [0,2])      // false
 *  is(el2, { x: 2 })   // true
 *  is(el2, { x: 1 })   // false
 *  is(el2, { x: 2, y: 1 })     // false
 *  is(el3, 'a')        // true
 *  is(el3, 'b')        // false
 *  is(el4, 10)         // true
 *  is(el4, 11)         // false
 *  is(el5, /a/g)       // true
 *  is(el5, /b/g)       // false
 *  is(el5, '/b/g')     // false
 *
 * @param {any} el1
 * @param {any} el2
 * @returns { boolean }
 */
export default function is<T extends any>(el1: T, el2: T): boolean;
export default function is<T extends any>(el1: T): (el2: T) => boolean;
export default function is<T extends any>(...args: T[]): any {
    return _is(...args)
}
