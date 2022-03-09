'use strict';

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
export default function freeze<A>(value: A): A {
    return Object.freeze(value);
}
