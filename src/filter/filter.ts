'use strict';

import { _arrayFilter } from '../_internal/_filter';
import { FilterArrayReducer } from '../models/filter.model';

/**
 * The filter() function creates a new array with all elements that pass the test implemented by the provided function.
 * @example
 *  function filterOdd(x: number): boolean { return x % 2 === 1 };
 *  filter(filterOdd, [1,5,8]);        // [1,5]
 *
 * @param { FilterArrayReducer<T> } predicate
 * @param { T[] } array
 * @returns { T[] }
 */
export default function filter<T>(fn: FilterArrayReducer<T>, array: T[]): T[];
export default function filter<T>(fn: FilterArrayReducer<T>): (array: T[]) => T[];
export default function filter(...args: any): any {
    return _arrayFilter(...args);
}
