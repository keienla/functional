import { ValueOf } from './types.model';
export declare type MapArrayReducer<T, R> = (value: T, index: number, array: T[]) => R;
export declare type MapObjectReducer<T, R> = (value: ValueOf<T>, key: string, object: T) => R;
export declare type MapGeneratorReducer<T, R> = (value: T extends Generator<infer U, any, any> ? U : any) => R;
//# sourceMappingURL=map.model.d.ts.map