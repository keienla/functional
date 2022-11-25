"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const freeze_1 = require("../freeze/freeze");
const when_1 = require("../when/when");
const or_1 = require("../or/or");
const isType_1 = require("../isType/isType");
const mapObject_1 = require("../mapObject/mapObject");
/**
 * Deep Freeze the object. Like this all it's level can't be changer.
 * @example
 *  const obj: { key: any } = deepFreeze<{ key: any }>({key: { a: 0, b: 1 }});
 *  obj.key.a = 2; // doesn't work
 *  console.log(obj.key.a); // 0
 *
 * @param {object} value
 * @returns {object}
 */
function deepFreeze(value) {
    return (0, freeze_1.default)((0, mapObject_1.default)((0, when_1.default)((0, or_1.default)(isType_1.isArray, isType_1.isObject), freeze_1.default), value));
}
exports.default = deepFreeze;
//# sourceMappingURL=deepFreeze.js.map