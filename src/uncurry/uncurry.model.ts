import type { Cast, IsFinite, Tuple, Next, Length, Concat, Fn } from "../models";
import type { Curry } from '../curry/curry.model';

export type UncurryArgs<
    Current extends (Fn) | Curry<any>,
    Args extends any[] = [],
    Limit = 100,
    I extends any[] = [],
    F extends Fn = Current extends Curry<infer fn> ? fn : Current,
    CurrentArgs extends Tuple = F extends (...args: infer U) => any ? U : [],
> = {
    last: Concat<Args, CurrentArgs>,
    deeper: UncurryArgs<
        ReturnType<F>,
        Cast<Concat<Args, CurrentArgs>, any[]>,
        Limit,
        Next<I>
    >,
    infinite: {
        ERROR: 'Cannot Get All the Args in UncurryArgs',
        CODENAME: 'InfiniteArray' & 'Infinite'
    }
}[
    ReturnType<F> extends (...args: infer Z) => any
    ? Length<I> extends Limit
    ? 'infinite'
    : IsFinite<Z, 'deeper', 'infinite'> // The IsFinite is a hack to evade probleme with infinite loop
    : 'last'
    ]

export type UncurryFinalType<
    Current extends (...args: any) => any,
    Limit = 100,
    I extends any[] = [],
    F extends Fn = Current extends Curry<infer fn> ? fn : Current,
> = {
    last: ReturnType<F>,
    deeper: UncurryFinalType<ReturnType<F>, Limit, Next<I>>,
    infinite: {
        ERROR: 'Cannot Get the response in UncurryFinalType',
        CODENAME: 'InfiniteArray' & 'Infinite'
    }
}[
    ReturnType<F> extends (...args: any) => any
    ? Length<I> extends Limit
    ? 'infinite'
    : 'deeper'
    : 'last'
    ]

export type Uncurry<
    F extends ((...args: any) => any) | Curry<any>,
    Args extends Tuple = Cast<UncurryArgs<F>, any[]>,
    Response = UncurryFinalType<F>
> = (...args: Args) => IsFinite<Tuple<Response>, Response, any> // The last IsFinite is a hack to evade fact that sometimes there is an error with infinite loop
