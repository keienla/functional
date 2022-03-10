/**
 * Return the given value
 * @example
 *  identity<number>(9)      // => return 9
 *
 * @param {T} v
 * @returns {T}
 */
export default function identity<T>(v: T): T {
    return v
}
