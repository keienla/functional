import { IsFinite, Tail, Params, Reverse, Last, Length, Fn } from "./types.model";
export type Pipe<FNS extends [Fn, ...Fn[]]> = (...args: Params<FNS[0]>) => ReturnType<Last<FNS> extends Fn ? Last<FNS> : Fn>;
export type PipeArgs<FNS extends Fn[], result extends Fn[] = [], previousFn extends Fn | void = void> = {
    empty: Length<result> extends 0 ? [] : Reverse<result>;
    notEmpty: previousFn extends void ? PipeArgs<Tail<FNS>, [FNS[0]], FNS[0]> : PipeArgs<Tail<FNS>, [(arg: ReturnType<previousFn extends Fn ? previousFn : Fn>) => ReturnType<FNS[0]>, ...result], FNS[0]>;
    infinite: {
        ERROR: 'Cannot pipe on an infinite array';
        CODENAME: ['InfiniteArray', 'Infinite'];
    };
}[FNS extends [Fn, ...Fn[]] ? IsFinite<FNS, 'notEmpty', 'not'> : 'empty'];
//# sourceMappingURL=pipe.model.d.ts.map