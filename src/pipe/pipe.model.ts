import type { IsFinite, Tail, Reverse, Last, Length, Fn, AppendItem, Head, Cast } from "../models"

export type Pipe<FNS extends Fn[] = []> = (...args: Parameters<Cast<Head<FNS>[0], Fn>>) => ReturnType<Cast<Last<FNS>[0], Fn>>

type PipeFns<FNS extends Fn[], Result extends Fn[] = [], PreviousFn extends Fn | void = void> = {
    empty: []
    continue: PipeFns<
        Tail<FNS>,
        AppendItem<
            PreviousFn extends Fn
            ? (previousResult: ReturnType<PreviousFn>) => ReturnType<Head<FNS>[0]>
            : Head<FNS>[0],
            Result
        >,
        Head<FNS>[0]
    >
    finish: Result,
    infinite: {
        ERROR: 'Cannot pipe on an infinite array',
        CODENAME: ['InfiniteArray', 'Infinite']
    }
}[
    IsFinite<FNS> extends true
    ? Length<FNS> extends 0
    ? 'finish'
    : 'continue'
    : 'infinite'
]

export type PipeArguments<FNS extends Fn[]> = Cast<PipeFns<FNS>, Fn[]>