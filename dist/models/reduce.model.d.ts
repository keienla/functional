import { ValueOf } from './types.model';
export declare type ReduceArrayReducer<T, R> = (accumulator: R, current: T, index: number, array: T[]) => R;
export declare type ReduceObjectReducer<T, R> = (accumulator: R, current: ValueOf<T>, key: string, object: T) => R;
export declare type ReduceGeneratorReducer<T, R> = (accumulator: R, current: T extends Generator<infer U, infer V, any> ? (U | V) : any) => R;
//# sourceMappingURL=reduce.model.d.ts.map