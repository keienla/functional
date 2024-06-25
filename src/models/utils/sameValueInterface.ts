export type SameValueInterface<T, R> = {
    [K in keyof T]: R
}

interface svi1 {
    a: string,
    b: number,
    c: boolean
}

interface svi2 {
    d: () => {}
}

type testSameValueInterface1 = SameValueInterface<svi1, string>         // { a: string, b: string, c: string }
type testSameValueInterface2 = SameValueInterface<svi2, boolean>        // { d: boolean }
type testSameValueInterface3 = SameValueInterface<svi1 & svi2, number>  // { a: number, b: number, c: number, d: number }