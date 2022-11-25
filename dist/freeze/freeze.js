"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Freeze the object. Like this it can't be changed.
 * @example
 *  const obj: { key: string } = freeze<{ key: string }>({key: 'value'});
 *  obj['key'] = 'test'; // doesn't work
 *  obj['newKey'] = 'test';  // doesn't work too
 *  console.log(obj['key']); // 'value'
 *
 * @param {object} value
 * @returns {object}
 */
function freeze(value) {
    return Object.freeze(value);
}
exports.default = freeze;
//# sourceMappingURL=freeze.js.map