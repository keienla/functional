'use strict';

import curry from "./../curry/curry";
import notSameLength from './../notSameLength/notSameLength';
import isnt from './../isnt/isnt';
import { TObject } from "../models/types.model";

/**
 * Check if two objects are the same. For this check the length of each object, keys and values.
 * @example
 *  const obj1: object = { a: 'a', b: 'b' };
 *  const obj2: object = { a: 'a', b: 'b' };
 *  const obj3: object = { a: 'a' };
 *  const obj4: object = { a: 'a', b: 'b', c: 'c' }
 *  const obj5: object = { a: 'b', b: 'a' };
 *  const obj6: object = { b: 'b', a: 'a' };
 *
 *  objectIs(obj1, obj1);        // true
 *  objectIs(obj1, obj2);        // true
 *  objectIs(obj1, obj3);        // false
 *  objectIs(obj1, obj4);        // false
 *  objectIs(obj1, obj5);        // false
 *  objectIs(obj1, obj6);        // false
 *
 * @param {object} object
 * @param {object} objectToCompare
 * @returns {boolean}
 */
const objectIs = curry(function objectIs(object: TObject, objectToCompare: TObject): boolean {
    if(notSameLength(object, objectToCompare)) return false;
    if(object === objectToCompare) return true;

    const keys: string[] = Object.keys(object);

    for(let key of keys) {
        if(
            !(key in objectToCompare) ||
            isnt(object[key], objectToCompare[key])
        ) {
            return false;
        }
    }

    return true;
})

export default objectIs;
