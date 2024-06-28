import type { IsFinite, Tuple, Next, Length, Concat, Fn } from "../models";
import type { Curry } from '../curry/curry.model';

export type Uncurry<Current extends Fn | Curry<any>, Params extends Tuple = [], Index extends any[] = [], F extends Fn = Current extends Curry<infer fn> ? fn : Current> = {
    continue: Uncurry<
        ReturnType<F>,
        Concat<Params, Parameters<F>>,
        Next<Index>
    >
    finish: (...args: Concat<Params, Parameters<F>>) => ReturnType<F>
    infinite: {
        ERROR: 'Cannot continue on an infinite function',
        TAGS: ['InfiniteFn', 'Infinite', 'Uncurry']
    }
}[
    Length<Index> extends 100
    ? 'infinite'
    : ReturnType<F> extends Fn
    ? IsFinite<Parameters<F>> extends true
    ? 'continue'
    : 'infinite'
    : 'finish'
]

type fn1 = Uncurry<(key1: string, key2: number) => boolean>                                         // (key1: string, key2: number) => boolean
type fn2 = Uncurry<(key1: string) => (key2: number, key3: boolean) => (key4: number) => boolean>    // (key1: string, key2: number, key3: boolean, key4: number) => boolean
type fn3 = Uncurry<(key1: string) => () => () => (key2: boolean) => number>                         // (key1: string, key2: boolean) => number
type fn4 = Uncurry<(key1: string, key2: number) => (key2: string) => Date>                          // (key1: string, key2: number, key2_1: string) => Date
type fn5 = Uncurry<(key1: number) => (...rest: string[]) => string>                                 // (key1: number, ...rest: string[]) => string
type fn6 = Uncurry<(key1: string) => (...rest: string[]) => (key3: boolean) => string>              // ERROR
type fn7 = Uncurry<Curry<(key1: string, key2: number) => boolean>>                                  // (key1: string, key2: number) => boolean