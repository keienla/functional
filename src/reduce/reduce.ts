import type { ReduceArrayReducer } from './../models/reduce.model';
import type { Curry } from '../models/curry.model';
import { _arrayReduce } from '../_internal/_reduce';

/**
 * Return a single item by itering throught a given list.
 * @example
 *  function reducer(x: number, y: number): number { return x + y };
 *  reduce(reducer, 0, [8,8,1,3])  // return 20 -> make 8 + 0 = 8 -> 8 + 8 = 16 -> 16 + 1 = 17 -> 17 + 3 = 20
 *
 * @param {ReduceArrayReducer<T, R>} fn the reducer function
 * @param {A} initialValue the start value if it's not the first cell of the arr parameter
 * @param {T[]} arr The array of value to reduce
 * @returns {never | A}
 */
export default function reduce<T,R>(fn: ReduceArrayReducer<T, R>, initialValue: R, array: T[]): R;
export default function reduce<T,R>(fn: ReduceArrayReducer<T, R>, initialValue: R): (array: T[]) => R;
export default function reduce<T,R>(fn: ReduceArrayReducer<T, R>): Curry<(initialValue: R, array: T[]) => R>;
export default function reduce<T, R>(...args: any): any {
    return _arrayReduce(...args);
}
