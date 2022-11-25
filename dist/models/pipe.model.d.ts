import { IsFinite, Tail, Params, TypeName, Next, Pos } from "./types.model";
declare type Fn = (...args: any) => any;
export declare type Pipe<FNS extends Fn[], previousFn extends Fn | void = void, initialParams extends any[] = any[], returnType = any, passed extends any[] = []> = {
    empty: (...args: initialParams) => returnType;
    notEmpty: Tail<FNS> extends Fn[] ? previousFn extends void ? Pipe<Tail<FNS>, FNS[0], Params<FNS[0]>, ReturnType<FNS[0]>, Next<passed>> : returnType extends Params<FNS[0]>[0] ? Pipe<Tail<FNS>, FNS[0], initialParams, ReturnType<FNS[0]>, Next<passed>> : TypeName<returnType> extends 'any' ? Pipe<Tail<FNS>, FNS[0], initialParams, ReturnType<FNS[0]>, Next<passed>> : {
        ERROR: ['The function at position ', Pos<passed>, ' must have arguments type ', returnType, ' but is ', Params<FNS[0]>];
        CODENAME: ['Pipe', 'Invalid args'];
    } : never;
    infinite: {
        ERROR: 'Cannot pipe on an infinite array';
        CODENAME: ['InfiniteArray', 'Infinite'];
    };
}[FNS extends [any, ...any[]] ? IsFinite<FNS, 'notEmpty', 'infinite'> : 'empty'];
export {};
//# sourceMappingURL=pipe.model.d.ts.map