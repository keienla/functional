"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("../curry/curry");
exports.default = (0, curry_1.default)(function pick(obj, props = []) {
    var newObj = {};
    for (let key of props) {
        newObj[key] = obj[key];
    }
    return newObj;
});
//# sourceMappingURL=_pick.js.map