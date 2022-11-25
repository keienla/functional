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
export default function deepFreeze<A extends any[] | object>(value: A): A;
//# sourceMappingURL=deepFreeze.d.ts.map