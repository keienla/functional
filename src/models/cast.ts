/**
 * If same type return first type else return second type
 * @example
 * type A = Cast<number, any> // number
 * type B = Cast<number, string> // string
 * type C = Cast<boolean, boolean> // boolean
 */
export type Cast<X, Y> = X extends Y ? X : Y;
