/**
 * Check if the element is never type
 *
 * - Can add a second parameter to return if the element IS NEVER
 * - Can add a third parameter to return if the element IS NOT NEVER
 * @example
 * type A = IsNever<never> // true
 * type B = IsNever<any> // false
 * type C = IsNever<never, 'IsNever'> // 'IsNever'
 * type D = IsNever<string, true, 'NotNever'> // 'NotNever'
 */
export type IsNever<T, Never = true, NotNever = false> = [T] extends [never]
    ? Never
    : NotNever;
