import type { LastUnion } from './lastUnion';
import type { PopUnion } from './popUnion';
import type { PrependItem } from './prepend';
import type { List } from './types';
import type { IsNever } from './isNever';

/**
 * Transform Union type to Tuple
 *
 * ! Problem with boolean, will try to find a solution in future when this will be used
 * @example
 * type A = TupleFromUnion<'test1' | 'test2' | 'test3'>; // ['test1', 'test2', 'test3']
 * type B = TupleFromUnion<string | number>; // [string, number]
 * type C = TupleFromUnion<number>; // [number]
 */
export type TupleFromUnion<RemainingUnion, CurrentTuple extends List = []> = {
    Continue: TupleFromUnion<
        PopUnion<RemainingUnion>,
        PrependItem<LastUnion<RemainingUnion>, CurrentTuple>
    >;
    Finish: CurrentTuple;
}[IsNever<RemainingUnion, 'Finish', 'Continue'>];
