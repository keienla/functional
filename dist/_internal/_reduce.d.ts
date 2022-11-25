import { ReduceArrayReducer, ReduceGeneratorReducer, ReduceObjectReducer } from '../models/reduce.model';
import { TObject } from '../models/types.model';
export declare const _arrayReduce: import("../models/curry.model").Curry<(<T, R>(fn: ReduceArrayReducer<T, R>, initialValue: R, array: T[]) => R)>;
export declare const _objectReduce: import("../models/curry.model").Curry<(<T extends TObject, R>(fn: ReduceObjectReducer<T, R>, initialValue: R, object: T) => R)>;
export declare const _generatorReduce: import("../models/curry.model").Curry<(<T extends Generator<unknown, any, unknown>, R>(fn: ReduceGeneratorReducer<T, R>, initialValue: R, generator: T) => R)>;
//# sourceMappingURL=_reduce.d.ts.map