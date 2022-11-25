"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("../curry/curry");
const _check_1 = require("./_check");
exports.default = (0, curry_1.default)(function or(predicate1, predicate2, value) {
    return (0, _check_1.default)((a, v) => a || v, [predicate1, predicate2], false, value, true);
});
//# sourceMappingURL=_or.js.map