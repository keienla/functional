"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNull = exports.isUndefined = exports.isRegexp = exports.isFunction = exports.isBigint = exports.isSymbol = exports.isBoolean = exports.isNumber = exports.isString = exports.isObject = exports.isGeneratorFunction = exports.isGenerator = exports.isArray = void 0;
const type_1 = require("./../type/type");
const curry_1 = require("../curry/curry");
/**
 * Check if the element given is the same type that the returnedTypes given
 * @param {returnedTypes} typeToTest
 * @param {any} element
 * @returns {boolean}
 */
const isType = (0, curry_1.default)(function isType(typeToTest, element) {
    return (0, type_1.default)(element) === typeToTest;
});
exports.default = isType;
function isArray(element) {
    return isType('array', element);
}
exports.isArray = isArray;
function isGenerator(element) {
    return isType('generator', element);
}
exports.isGenerator = isGenerator;
function isGeneratorFunction(element) {
    return isType('generatorfunction', element);
}
exports.isGeneratorFunction = isGeneratorFunction;
function isObject(element) {
    return isType('object', element);
}
exports.isObject = isObject;
function isString(element) {
    return isType('string', element);
}
exports.isString = isString;
function isNumber(element) {
    return isType('number', element);
}
exports.isNumber = isNumber;
function isBoolean(element) {
    return isType('boolean', element);
}
exports.isBoolean = isBoolean;
function isSymbol(element) {
    return isType('symbol', element);
}
exports.isSymbol = isSymbol;
function isBigint(element) {
    return isType('bigint', element);
}
exports.isBigint = isBigint;
function isFunction(element) {
    return isType('function', element);
}
exports.isFunction = isFunction;
function isRegexp(element) {
    return isType('regexp', element);
}
exports.isRegexp = isRegexp;
function isUndefined(element) {
    return isType('undefined', element);
}
exports.isUndefined = isUndefined;
function isNull(element) {
    return isType('null', element);
}
exports.isNull = isNull;
//# sourceMappingURL=isType.js.map