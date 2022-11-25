import { ValueOf } from './types.model';
export declare type FilterArrayReducer<T> = (value: T, index: number, array: T[]) => boolean;
export declare type FilterObjectReducer<T> = (value: ValueOf<T>, key: string, object: T) => boolean;
export declare type FilterGeneratorReducer<T> = (value: T extends Generator<infer U, infer V, any> ? (U | V) : any) => boolean;
export declare type FilterGeneratorReturned<T> = T extends Generator<infer U, infer V, any> ? (U | V)[] : any[];
//# sourceMappingURL=filter.model.d.ts.map