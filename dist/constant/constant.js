"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Return a function, when executed, return the given value
 * @example
 *  const c: () => number = constant(9);
 *  c()      // => return 9
 *
 * @param {T} v
 * @returns { () => T }
 */
function constant(v) {
    return function value() {
        return v;
    };
}
exports.default = constant;
//# sourceMappingURL=constant.js.map