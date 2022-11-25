"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._objectMap = exports._arrayMap = void 0;
const reduce_1 = require("../reduce/reduce");
const reduceObject_1 = require("../reduceObject/reduceObject");
const curry_1 = require("../curry/curry");
exports._arrayMap = (0, curry_1.default)(function arrayMap(fn, element) {
    if (!element || element.length === 0)
        return [];
    return (0, reduce_1.default)(function arrayMapped(accumulator, currentValue, index, element) {
        return [...accumulator, fn(currentValue, index, element)];
    }, [], element);
});
exports._objectMap = (0, curry_1.default)(function objectMap(fn, element) {
    if (!element)
        return {};
    const keys = Object.keys(element);
    if (keys.length === 0)
        return {};
    return (0, reduceObject_1.default)(function objectMapped(accumulator, current, key, object) {
        return Object.assign(Object.assign({}, accumulator), { [key]: fn(current, key, object) });
    }, (0, reduce_1.default)(function defineDefaultObject(acc, key) { return Object.assign(Object.assign({}, acc), { [key]: undefined }); }, {}, keys), element);
});
// export function generatorMap<T extends Generator, R>(fn: MapGeneratorReducer<T, R>, element: T): R[] {
//     if(!element) return [];
//     return reduce(function generatorMapped(accumulator: R[], current: T extends Generator<infer U, any, any> ? U : any){
//         return [...accumulator, fn(current)]
//     }, [], element)
// }
// export default curry(_map);
//# sourceMappingURL=_map.js.map