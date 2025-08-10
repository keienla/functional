import type { MapObjectReducer } from '../map/map.model';
import { SameValueInterface } from '../models';
import { _objectMap } from './../_internal/_map';

/**
 * The mapObject() function creates a new object with the results of calling a provided function on every element in the calling object.
 *
 * @param { MapObjectReducer<T,R> } fn (value: any, index?: number, array?: any[]) => any
 * @param { any[] } array any[]
 * @returns { any[] } any[]
 * @example
 *  function addOne(x: number): number { return x + 1 };
 *  map(addOne, {a: 1, b: 5, c: 8});        // {a: 2, b: 6, c: 9}
 */
export default function mapObject<T extends object, R>(
    fn: MapObjectReducer<T, R>,
    object: T,
): SameValueInterface<T, R> {
    return _objectMap(fn, object);
}
