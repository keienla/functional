/**
 * Check if the element is a specific number or just the default number type.
 *
 * - Can add a second parameter to return if the number IS DEFINED
 * - Can add a third parameter to return if the number IS NOT DEFINED
 * @example
 * type A = IsDefinedNumber<number> // false
 * type B = IsDefinedNumber<1> // true
 * type C = IsDefinedNumber<never> // never
 * type D = IsDefinedNumber<2, 'Hello'> // 'Hello'
 * type E = IsDefinedNumber<number, 'Hello', 'World'> // 'World'
 */
export type IsDefinedNumber<
    Number extends number,
    Defined = true,
    Undefined = false,
> = Number extends number
    ? number extends Number
        ? Undefined
        : Defined
    : Undefined;
