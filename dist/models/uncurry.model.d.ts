import { Concat, Cast, IsFinite, Tuple, Next, Length } from "./types.model";
import { Curry } from './curry.model';
export declare type UncurryArgs<Current extends ((...args: any[]) => any) | Curry<any>, Args extends any[] = [], Limit = 100, I extends any[] = [], Fn extends (...args: any[]) => any = Current extends Curry<infer fn> ? fn : Current, CurrentArgs extends Tuple = Fn extends (...args: infer U) => any ? U : []> = {
    last: Concat<Args, CurrentArgs>;
    deeper: UncurryArgs<ReturnType<Fn>, Cast<Concat<Args, CurrentArgs>, any[]>, Limit, Next<I>>;
    infinite: {
        ERROR: 'Cannot Get All the Args in UncurryArgs';
        CODENAME: 'InfiniteArray' & 'Infinite';
    };
}[ReturnType<Fn> extends (...args: infer Z) => any ? Length<I> extends Limit ? 'infinite' : IsFinite<Z, 'deeper', 'infinite'> : 'last'];
export declare type UncurryFinalType<Current extends (...args: any) => any, Limit = 100, I extends any[] = [], Fn extends (...args: any[]) => any = Current extends Curry<infer fn> ? fn : Current> = {
    last: ReturnType<Fn>;
    deeper: UncurryFinalType<ReturnType<Fn>, Limit, Next<I>>;
    infinite: {
        ERROR: 'Cannot Get the response in UncurryFinalType';
        CODENAME: 'InfiniteArray' & 'Infinite';
    };
}[ReturnType<Fn> extends (...args: any) => any ? Length<I> extends Limit ? 'infinite' : 'deeper' : 'last'];
export declare type Uncurry<Fn extends ((...args: any) => any) | Curry<any>, Args extends Tuple = Cast<UncurryArgs<Fn>, any[]>, Response = UncurryFinalType<Fn>> = (...args: Args) => IsFinite<Tuple<Response>, Response, any>;
//# sourceMappingURL=uncurry.model.d.ts.map