import type { ValueOf } from './types.model';

export type FilterArrayReducer<T> =
    (value: T, index: number, array: T[]) => boolean;

export type FilterObjectReducer<T> =
    (value: ValueOf<T>, key: string, object: T) => boolean;

export type FilterGeneratorReducer<T> =
    (value: T extends Generator<infer U, infer V, any> ? (U | V) : any) => boolean;

export type FilterGeneratorReturned<T> =
    T extends Generator<infer U, infer V, any> ? (U | V)[] : any[];
