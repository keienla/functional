import { Pipe } from "./pipe.model";
import { IsFinite, Tail, Reverse, Length } from "./types.model";
export declare type Fn = (...args: any) => any;
export declare type Compose<FNS extends [Fn, ...Fn[]], ReversedFNS extends [Fn, ...Fn[]] = Reverse<FNS> extends [Fn, ...Fn[]] ? Reverse<FNS> : never> = Pipe<ReversedFNS>;
export declare type ComposeArgs<FNS extends Fn[], result extends Fn[] = [], previousFn extends Fn | void = void, reversedFNS extends Fn[] = Reverse<FNS>> = {
    empty: Length<result> extends 0 ? [] : result;
    notEmpty: previousFn extends void ? ComposeArgs<Tail<reversedFNS>, [reversedFNS[0]], reversedFNS[0]> : ComposeArgs<Tail<FNS>, [(arg: ReturnType<previousFn extends Fn ? previousFn : Fn>) => ReturnType<FNS[0]>, ...result], FNS[0]>;
    infinite: {
        ERROR: 'Cannot pipe on an infinite array';
        CODENAME: ['InfiniteArray', 'Infinite'];
    };
}[FNS extends [Fn, ...Fn[]] ? IsFinite<FNS, 'notEmpty', 'not'> : 'empty'];
//# sourceMappingURL=compose.model.d.ts.map