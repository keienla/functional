import type { FilterArrayReducer } from './filter.model';
import { _arrayFilter } from '../_internal/_filter';

/**
 * The filter() function creates a new array with all elements that pass the test implemented by the provided function.
 *
 * @param { FilterArrayReducer<T> } predicate
 * @param { T[] } array
 * @returns { T[] }
 * @example
 *  function filterOdd(x: number): boolean { return x % 2 === 1 };
 *  filter(filterOdd, [1,5,8]);        // [1,5]
 */
export default function filter<T>(fn: FilterArrayReducer<T>, array: T[]): T[];
export default function filter<T>(
    fn: FilterArrayReducer<T>,
): (array: T[]) => T[];
export default function filter(...args: any): any {
    return _arrayFilter(...args);
}
