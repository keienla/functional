"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._whenElse = exports._when = void 0;
const curry_1 = require("../curry/curry");
exports._when = (0, curry_1.default)(function when(predicate, fn) {
    return _defaultWhenElse(predicate, fn);
});
exports._whenElse = (0, curry_1.default)(function whenElse(predicate, fn, elseFn) {
    return _defaultWhenElse(predicate, fn, elseFn);
});
function _defaultWhenElse(predicate, fn, elseFn) {
    return function conditional(arg) {
        if (predicate(arg)) {
            return fn(arg);
        }
        else if (elseFn) {
            return elseFn(arg);
        }
        return arg;
    };
}
//# sourceMappingURL=_when.js.map