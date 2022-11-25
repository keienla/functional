"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("../curry/curry");
const type_1 = require("../type/type");
const arrayIs_1 = require("../arrayIs/arrayIs");
const objectIs_1 = require("../objectIs/objectIs");
exports.default = (0, curry_1.default)(function is(el1, el2) {
    if ((0, type_1.default)(el1) !== (0, type_1.default)(el2))
        return false;
    switch ((0, type_1.default)(el1)) {
        case 'array':
            return (0, arrayIs_1.default)(el1, el2);
        case 'object':
            return (0, objectIs_1.default)(el1, el2);
        case 'function':
        case 'regexp':
            return el1.toString() === el2.toString();
        default:
            return el1 === el2;
    }
});
//# sourceMappingURL=_is.js.map