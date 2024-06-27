// If same type return first type else return second type
export type Cast<X, Y> =
    X extends Y
    ? X
    : Y

type testCast1 = Cast<[string], any>    // [string]
type testCast2 = Cast<[string], number> // number