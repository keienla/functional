// Check if the element is never type
export type IsNever<T, Never = true, NotNever = false> = [T] extends [never]
    ? Never
    : NotNever;

type testIsNever1 = IsNever<never>; // true
type testIsNever2 = IsNever<any>; // false
type testIsNever3 = IsNever<never, 'IsNever'>; // 'IsNever'
type testIsNever4 = IsNever<string, true, 'NotNever'>; // 'NotNever'
