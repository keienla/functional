import { _objectFilter } from '../_internal/_filter';
import { FilterObjectReducer } from '../models/filter.model';

/**
 * The filterObject() function creates a new object with all elements that pass the test implemented by the provided function.
 * @example
 *  function filterOdd(x: number): boolean { return x % 2 === 1 };
 *  filterObject(filterOdd, [1,5,8]);        // [1,5]
 *
 * @param { FilterObjectReducer<T> } predicate
 * @param { T } object
 * @returns { Partial<T> }
 */
export default function filterObject<T, R = Partial<T>>(fn: FilterObjectReducer<T>, array: T): R;
export default function filterObject<T, R = Partial<T>>(fn: FilterObjectReducer<T>): (array: T) => R;
export default function filterObject(...args: any): any {
    return _objectFilter(...args);
}
