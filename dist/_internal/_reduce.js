"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._generatorReduce = exports._objectReduce = exports._arrayReduce = void 0;
const freeze_1 = require("../freeze/freeze");
const transpoline_1 = require("../transpoline/transpoline");
const curry_1 = require("../curry/curry");
exports._arrayReduce = (0, curry_1.default)(function arrayReduce(fn, initialValue, array) {
    if (!array || array.length === 0)
        return initialValue;
    function arrayReducer(accumulator, index, fullArray) {
        if (index >= fullArray.length)
            return accumulator;
        return () => {
            return arrayReducer(fn(accumulator, fullArray[index], index, (0, freeze_1.default)(fullArray)), index + 1, fullArray);
        };
    }
    return (0, transpoline_1.default)(arrayReducer)(initialValue !== undefined ? initialValue : array[0], initialValue !== undefined ? 0 : 1, array);
});
exports._objectReduce = (0, curry_1.default)(function objectReduce(fn, initialValue, object) {
    const keys = Object.keys(object);
    if (!object || keys.length === 0)
        return initialValue;
    function objectReducer(accumulator, index, keys, object) {
        if (index >= keys.length)
            return accumulator;
        return () => {
            return objectReducer(fn(accumulator, object[keys[index]], keys[index], (0, freeze_1.default)(object)), index + 1, keys, object);
        };
    }
    return (0, transpoline_1.default)(objectReducer)(initialValue !== undefined ? initialValue : object[keys[0]], initialValue !== undefined ? 0 : 1, keys, object);
});
exports._generatorReduce = (0, curry_1.default)(function generatorReduce(fn, initialValue, generator) {
    if (!generator)
        return initialValue;
    if (initialValue === undefined) {
        const generatorFirstIteration = generator.next();
        if (generatorFirstIteration.done)
            return initialValue;
        initialValue = generatorFirstIteration.value;
    }
    function generatorReducer(accumulator, fnGenerator) {
        const iteration = fnGenerator.next();
        if (iteration.done)
            return accumulator;
        return () => {
            return generatorReducer(fn(accumulator, iteration.value), fnGenerator);
        };
    }
    return (0, transpoline_1.default)(generatorReducer)(initialValue, generator);
});
//# sourceMappingURL=_reduce.js.map