/**
 * An object definition
 */
export type TObject = {
    [key: string]: any;
};

/**
 * An array definition
 */
export type List = any[];

/**
 * A function definition
 */
export type Fn = (...args: any[]) => any;

/**
 * A predicate function definition. It's a function with one argument that return a boolean
 */
export type Predicate<T> = (value: T) => boolean;

/**
 * Tuple is a typed array
 */
export type Tuple<A = any> = Array<A>;

/**
 * Extract the type of each keys
 * @example
 * type A = ValueOf<{ a: string; b: number }>; // string | number
 */
export type ValueOf<T> = T[keyof T];
