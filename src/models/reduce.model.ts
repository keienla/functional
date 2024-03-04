import type { ValueOf } from './types.model';

export type ReduceArrayReducer<T, R> =
    (accumulator: R, current: T, index: number, array: T[]) => R;

export type ReduceObjectReducer<T, R> =
    (accumulator: R, current: ValueOf<T>, key: string, object: T) => R;

export type ReduceGeneratorReducer<T, R> =
    (accumulator: R, current: T extends Generator<infer U, infer V, any> ? (U | V) : any) => R;
