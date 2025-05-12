// Check if the element is a specific number or just the default number type
export type IsDefinedNumber<
    Number extends number,
    Defined = true,
    Undefined = false,
> = Number extends number
    ? number extends Number
        ? Undefined
        : Defined
    : Undefined;

type IsDefinedNumber1 = IsDefinedNumber<number>; // false
type IsDefinedNumber2 = IsDefinedNumber<1>; // true
type IsDefinedNumber3 = IsDefinedNumber<never>; // never
type IsDefinedNumber4 = IsDefinedNumber<2, 'Hello'>; // 'Hello'
type IsDefinedNumber5 = IsDefinedNumber<number, 'Hello', 'World'>; // 'World'
