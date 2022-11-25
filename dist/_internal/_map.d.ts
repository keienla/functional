import { MapArrayReducer, MapObjectReducer } from '../models/map.model';
import { SameValueInterface } from '../models/types.model';
export declare const _arrayMap: import("../models/curry.model").Curry<(<T extends any[], R>(fn: MapArrayReducer<T, R>, element: T[]) => R[])>;
export declare const _objectMap: import("../models/curry.model").Curry<(<T extends object, R>(fn: MapObjectReducer<T, R>, element: T) => SameValueInterface<T, R>)>;
//# sourceMappingURL=_map.d.ts.map