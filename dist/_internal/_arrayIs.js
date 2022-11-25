"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("../curry/curry");
const notSameLength_1 = require("../notSameLength/notSameLength");
const is_1 = require("../is/is");
const transpoline_1 = require("../transpoline/transpoline");
exports.default = (0, curry_1.default)(function arrayIs(array, arrayToCompare) {
    if ((0, notSameLength_1.default)(array, arrayToCompare))
        return false;
    if (array === arrayToCompare)
        return true;
    const checkArrayIs = (result = true, index = 0) => {
        if (!result)
            return false;
        if (index === array.length)
            return result;
        return () => {
            return checkArrayIs((0, is_1.default)(array[index], arrayToCompare[index]), index + 1);
        };
    };
    return (0, transpoline_1.default)(checkArrayIs)();
});
//# sourceMappingURL=_arrayIs.js.map