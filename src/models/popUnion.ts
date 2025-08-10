import type { LastUnion } from './lastUnion';

/**
 * Remove the last union in the list
 *
 * ! Problem with boolean, will try to find a solution in future when this will be used
 * @example
 * type A = PopUnion<'test1' | 'test2' | 'test3'>; // 'test1' | 'test2'
 * type B = PopUnion<A>; // 'test1'
 * type C = PopUnion<B>; // never
 */
export type PopUnion<Union> = Exclude<Union, LastUnion<Union>>;
