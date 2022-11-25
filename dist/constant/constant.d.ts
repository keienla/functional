/**
 * Return a function, when executed, return the given value
 * @example
 *  const c: () => number = constant(9);
 *  c()      // => return 9
 *
 * @param {T} v
 * @returns { () => T }
 */
export default function constant<T = any>(v: T): () => T;
//# sourceMappingURL=constant.d.ts.map