import type { FilterObjectReducer } from '../filter/filter.model';
import { _objectFilter } from '../_internal/_filter';
import { TObject } from '../models';

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
export default function filterObject<T extends TObject>(
    fn: FilterObjectReducer<T>,
    array: T,
): Partial<T> {
    return _objectFilter(fn, array);
}
