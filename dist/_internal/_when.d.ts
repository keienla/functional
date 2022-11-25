import { Predicate } from '../models/types.model';
export declare const _when: import("../models/curry.model").Curry<(<T, R>(predicate: Predicate<T>, fn: (arg: T) => R) => (arg: T) => T | R), 0>;
export declare const _whenElse: import("../models/curry.model").Curry<(<T, R, ER>(predicate: Predicate<T>, fn: (arg: T) => R, elseFn: (arg: T) => ER) => (arg: T) => T | R | ER), 0>;
//# sourceMappingURL=_when.d.ts.map