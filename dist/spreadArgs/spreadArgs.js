"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function spreadArgs(fn) {
    return function spread(...args) {
        if (args.length) {
            return fn(args);
        }
        else {
            return fn();
        }
    };
}
exports.default = spreadArgs;
//# sourceMappingURL=spreadArgs.js.map