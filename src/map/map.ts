'use strict';

import { MapArrayReducer } from '../models/map.model';
import { _arrayMap } from './../_internal/_map'

/**
 * The map() function creates a new array with the results of calling a provided function on every element in the calling array.
 * @example
 *  function addOne(x: number): number { return x + 1 };
 *  map(addOne, [1,5,8]);        // [2,6,9]
 *
 * @param { MapArrayReducer<T, R> } fn
 * @param { T[] } array
 * @returns { R[] }
 */
export default function map<T, R>(fn: MapArrayReducer<T,R>, array: T[]): R[];
export default function map<T, R>(fn: MapArrayReducer<T, R>): (array: T[]) => R[];
export default function map(...args: any): any {
    return _arrayMap(...args);
}
