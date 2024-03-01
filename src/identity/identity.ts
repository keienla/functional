/**
 * Return the given value
 *
 * @param {T} v
 * @returns {T}
 * @example
 *  identity<number>(9)      // => return 9
 */
export default function identity<T>(v: T): T {
    return v
}
