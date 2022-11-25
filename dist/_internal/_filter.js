"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._objectFilter = exports._arrayFilter = void 0;
const reduce_1 = require("../reduce/reduce");
const reduceObject_1 = require("../reduceObject/reduceObject");
const curry_1 = require("../curry/curry");
exports._arrayFilter = (0, curry_1.default)(function arrayFilter(fn, array) {
    return (0, reduce_1.default)(function arrayFilterReducer(accumulator, current, index, array) {
        if (fn(current, index, array)) {
            return [...accumulator, current];
        }
        return accumulator;
    }, [], array);
});
exports._objectFilter = (0, curry_1.default)(function objectFilter(fn, object) {
    return (0, reduceObject_1.default)(function objectFilterReducer(accumulator, current, key, object) {
        if (fn(current, key, object)) {
            return Object.assign(Object.assign({}, accumulator), { [key]: object[key] });
        }
        return accumulator;
    }, {}, object);
});
// export function generatorFilter<T extends Generator>(fn: FilterGeneratorReducer<T>, generator: T): FilterGeneratorReturned<T> {
//     return reduce(function generatorFilterReducer(accumulator, current) {
//         if(fn(current)) {
//             // Need to redefined the type because with the [...accumulator] transform the array into any[]
//             return [...accumulator, current] as FilterGeneratorReturned<T>;
//         }
//         return accumulator;
//     }, [] as unknown as FilterGeneratorReturned<T>, generator)
// }
//# sourceMappingURL=_filter.js.map