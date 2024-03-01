/**
 * Return a function, when executed, return the given value
 *
 * @param {T} v
 * @returns { () => T }
 * @example
 *  const c: () => number = constant(9);
 *  c()      // => return 9
 */
export default function constant<T = any>(v: T): () => T {
    return function value(): T {
        return v
    }
}
