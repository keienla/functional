import type { FilterObjectReducer } from '../filter/filter.model';
import { _objectFilter } from '../_internal/_filter';

/**
 * The filterObject() function creates a new object with all elements that pass the test implemented by the provided function.
 *
 * @param { FilterObjectReducer<T> } predicate
 * @param { T } object
 * @returns { Partial<T> }
 * @example
 *  function filterOdd(x: number): boolean { return x % 2 === 1 };
 *  filterObject(filterOdd, [1,5,8]);        // [1,5]
 */
export default function filterObject<T, R = Partial<T>>(fn: FilterObjectReducer<T>, array: T): R;
export default function filterObject<T, R = Partial<T>>(fn: FilterObjectReducer<T>): (array: T) => R;
export default function filterObject(...args: any): any {
    return _objectFilter(...args);
}
