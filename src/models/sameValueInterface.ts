/**
 * Update all keys to set the same type
 * @example
 * type A = SameValueInterface<{ a: string, b: number, c: boolean }, string>; // { a: string, b: string, c: string }
 */
export type SameValueInterface<T, R> = {
    [K in keyof T]: R;
};
