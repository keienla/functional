"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const not_1 = require("../not/not");
const is_1 = require("../is/is");
const curry_1 = require("../curry/curry");
const uncurry_1 = require("../uncurry/uncurry");
exports.default = (0, curry_1.default)(function isnt(el1, el2) {
    return (0, not_1.default)((0, uncurry_1.default)(is_1.default))(el1, el2);
});
//# sourceMappingURL=_isnt.js.map