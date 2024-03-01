/**
 * Freeze the object. Like this it can't be changed.
 *
 * @param {object} value
 * @returns {object}
 * @example
 *  const obj: { key: string } = freeze<{ key: string }>({key: 'value'});
 *  obj['key'] = 'test'; // doesn't work
 *  obj['newKey'] = 'test';  // doesn't work too
 *  console.log(obj['key']); // 'value'
 */
export default function freeze<A>(value: A): A {
    return Object.freeze(value);
}
