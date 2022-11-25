import { FilterArrayReducer, FilterObjectReducer } from '../models/filter.model';
import { TObject } from '../models/types.model';
export declare const _arrayFilter: import("../models/curry.model").Curry<(<T>(fn: FilterArrayReducer<T>, array: T[]) => T[]), 0>;
export declare const _objectFilter: import("../models/curry.model").Curry<(<T extends TObject>(fn: FilterObjectReducer<T>, object: T) => Partial<T>), 0>;
//# sourceMappingURL=_filter.d.ts.map