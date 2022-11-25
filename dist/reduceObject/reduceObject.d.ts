import { ReduceObjectReducer } from './../models/reduce.model';
import { Curry } from '../models/curry.model';
/**
 * Return a single item by itering throught a given object.
 * @example
 *  function reducer(x: number, y: number): number { return x + y };
 *  reduceObject(reducer, 0, {a: 8, b: 8, c: 1, d: 3})  // return 20 -> make 8 + 0 = 8 -> 8 + 8 = 16 -> 16 + 1 = 17 -> 17 + 3 = 20
 *
 * @param {ReduceObjectReducer<T, R>} fn the reducer function
 * @param {A} initialValue the start value if it's not the first cell of the arr parameter
 * @param {T[]} arr The array of value to reduce
 * @returns {never | A}
 */
export default function reduceObject<T extends object, R>(fn: ReduceObjectReducer<T, R>, initialValue: R, object: T): R;
export default function reduceObject<T extends object, R>(fn: ReduceObjectReducer<T, R>, initialValue: R): (object: T) => R;
export default function reduceObject<T extends object, R>(fn: ReduceObjectReducer<T, R>): Curry<(initialValue: R, object: T) => R>;
//# sourceMappingURL=reduceObject.d.ts.map