export type Consumer<Value> = (value: Value) => void;

/**
 * Check if there is an union or not. If not return the value else return never
 * @example
 * type A = IntersectionFromUnion<'test1' | 'test2' | 'test3'>; // never
 * type B = IntersectionFromUnion<string | number>; // never
 * type C = IntersectionFromUnion<string>; // string
 * type D = IntersectionFromUnion<any>; // any
 * type E = IntersectionFromUnion<boolean>; // boolean
 */
export type IntersectionFromUnion<T> = boolean extends T
    ? UnionToIntersectionHelper<Exclude<T, boolean>> & boolean
    : UnionToIntersectionHelper<T>;

type UnionToIntersectionHelper<U> =
    (U extends unknown ? Consumer<U> : never) extends Consumer<
        infer ResultIntersection
    >
        ? ResultIntersection
        : never;
