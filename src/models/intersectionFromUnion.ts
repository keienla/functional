// Check if it's a Union or not
// If not return the value else return never
export type Consumer<Value> = (value: Value) => void;

export type IntersectionFromUnion<T> =
    (T extends any ? Consumer<T> : never) extends Consumer<
        infer ResultIntersection
    >
        ? ResultIntersection
        : never;

type testIntersectionFromUnion1 = IntersectionFromUnion<
    'test1' | 'test2' | 'test3'
>; // never
type testIntersectionFromUnion2 = IntersectionFromUnion<string | number>; // never
type testIntersectionFromUnion3 = IntersectionFromUnion<string>; // string
