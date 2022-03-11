import { IsFinite, Tail, Params, TypeName, Next, Pos } from "./types.model"

type Fn = (...args: any) => any

export type Pipe<
    FNS extends Fn[],
    previousFn extends Fn | void = void,
    initialParams extends any[] = any[],
    returnType = any,
    passed extends any[] = []
> = {
    empty: (...args: initialParams) => returnType
    notEmpty: Tail<FNS> extends Fn[]
        // Check if the first function
        ? previousFn extends void
            // If yes just continue with good params
            // and set initialParams
            ? Pipe<Tail<FNS>, FNS[0], Params<FNS[0]>, ReturnType<FNS[0]>, Next<passed>>
            // if no check if the return type is the same type than the first argument of current Fn
            : returnType extends Params<FNS[0]>[0]
                // If true so continue
                ? Pipe<Tail<FNS>, FNS[0], initialParams, ReturnType<FNS[0]>, Next<passed>>
                // Else check if previous return type is any, because like this will continue
                : TypeName<returnType> extends 'any'
                    ? Pipe<Tail<FNS>, FNS[0], initialParams, ReturnType<FNS[0]>, Next<passed>>
                    : {
                        ERROR: ['The function at position ', Pos<passed>, ' must have arguments type ', returnType, ' but is ', Params<FNS[0]>]
                        CODENAME: ['Pipe', 'Invalid args']
                    }
        : never
    infinite: {
        ERROR: 'Cannot pipe on an infinite array',
        CODENAME: ['InfiniteArray', 'Infinite']
    }
} [
    FNS extends [any, ...any[]]
        ? IsFinite<FNS, 'notEmpty', 'infinite'>
        : 'empty'
]