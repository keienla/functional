import type { Pipe } from "./pipe.model"
import type { IsFinite, Tail, Reverse, Length, Fn, Cast, AppendItem, Head } from "./utils"

export type Compose<FNS extends Fn[]> = Pipe<Reverse<FNS>>

type ComposeFns<FNS extends Fn[], Result extends Fn[] = [], NextFn = FNS[1] extends Fn ? FNS[1] : void> = {
    empty: []
    continue: ComposeFns<
        Tail<FNS>,
        AppendItem<
            NextFn extends Fn
            ? (previousResult: ReturnType<NextFn>) => ReturnType<Head<FNS>[0]>
            : Head<FNS>[0],
            Result
        >
    >
    finish: Result,
    infinite: {
        ERROR: 'Cannot compose on an infinite array',
        CODENAME: ['InfiniteArray', 'Infinite']
    }
}[
    IsFinite<FNS> extends true
    ? Length<FNS> extends 0
    ? 'finish'
    : 'continue'
    : 'infinite'
]

export type ComposeArguments<FNS extends Fn[]> = Cast<ComposeFns<FNS>, Fn[]>