"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const curry_1 = require("./../curry/curry");
const notSameLength_1 = require("./../notSameLength/notSameLength");
const isnt_1 = require("./../isnt/isnt");
/**
 * Check if two objects are the same. For this check the length of each object, keys and values.
 * @example
 *  const obj1: object = { a: 'a', b: 'b' };
 *  const obj2: object = { a: 'a', b: 'b' };
 *  const obj3: object = { a: 'a' };
 *  const obj4: object = { a: 'a', b: 'b', c: 'c' }
 *  const obj5: object = { a: 'b', b: 'a' };
 *  const obj6: object = { b: 'b', a: 'a' };
 *
 *  objectIs(obj1, obj1);        // true
 *  objectIs(obj1, obj2);        // true
 *  objectIs(obj1, obj3);        // false
 *  objectIs(obj1, obj4);        // false
 *  objectIs(obj1, obj5);        // false
 *  objectIs(obj1, obj6);        // false
 *
 * @param {object} object
 * @param {object} objectToCompare
 * @returns {boolean}
 */
const objectIs = (0, curry_1.default)(function objectIs(object, objectToCompare) {
    if ((0, notSameLength_1.default)(object, objectToCompare))
        return false;
    if (object === objectToCompare)
        return true;
    const keys = Object.keys(object);
    for (let key of keys) {
        if (!(key in objectToCompare) ||
            (0, isnt_1.default)(object[key], objectToCompare[key])) {
            return false;
        }
    }
    return true;
});
exports.default = objectIs;
//# sourceMappingURL=objectIs.js.map