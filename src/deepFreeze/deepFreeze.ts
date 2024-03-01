import freeze from '../freeze/freeze';
import when from '../when/when';
import or from '../or/or';
import { isArray, isObject } from '../isType/isType';
import mapObject from '../mapObject/mapObject';

/**
 * Deep Freeze the object. Like this all it's level can't be changer.
 *
 * @param {object} value
 * @returns {object}
 * @example
 *  const obj: { key: any } = deepFreeze<{ key: any }>({key: { a: 0, b: 1 }});
 *  obj.key.a = 2; // doesn't work
 *  console.log(obj.key.a); // 0
 */
export default function deepFreeze<A extends any[] | object>(value: A): A {
    return freeze(mapObject(
        when(
            or(isArray, isObject),
            freeze
        ), value));
}
