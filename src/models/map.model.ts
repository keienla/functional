import { ValueOf, TypeOf } from './types.model';

export type MapArrayReducer<T, R> =
    (value: T, index: number, array: T[]) => R

export type MapObjectReducer<T, R> =
    (value: ValueOf<T>, key: string, object: T) => R

export type MapGeneratorReducer<T, R> =
    (value: T extends Generator<infer U, any, any> ? U : any) => R
