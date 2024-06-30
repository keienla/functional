export type TObject = {
    [key: string]: any
}

export type List = any[]

export type Fn = (...args: any[]) => any

export type Predicate<T> = (value: T) => boolean

export type Tuple<A = any> = Array<A>

export type ValueOf<T> = T[keyof T];
type testValueOf = ValueOf<{ a: string, b: number }>      // string | number