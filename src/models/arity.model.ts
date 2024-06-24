import { Before, Cast, Concat, First, IsNever, Iterator, Last, Length, Pop, Tail, Tuple } from "./types.model";

export type Arity<F extends (...args: any[]) => any, Size extends number> =
    Parameters<F> extends infer Params extends any[]
    // Check if there is a first argument
    // If no, (F = () => any) || (F = (...args: any[]) => any)
    ? IsNever<First<Params>> extends false
    // Check if Params have a length
    ? Length<Params> extends 0
    // If no it mean that F doesn't have any argument
    ? ArityArguments<[], ReturnType<F>, Size>

    // If yes so there is a rest parameter
    : Tail<Params> extends (infer T)[]
    ? ArityArguments<[], ReturnType<F>, Size, T>
    : ArityArguments<[], ReturnType<F>, Size>
    // Check if there is a last argument
    : IsNever<Last<Params>> extends true
    // If no, it mean that F has a rest parameter
    ? Tail<Params> extends (infer T)[]
    ? ArityArguments<Pop<Params>, ReturnType<F>, Size, T>
    : ArityArguments<Pop<Params>, ReturnType<F>, Size>
    // If yes so F has a defined number of arguments
    : ArityArguments<Params, ReturnType<F>, Size>
    // TODO HERE
    : never

type ArityArguments<Params extends any[], Return, Size extends number, RestType = any> =
    Before<Size, Params> extends infer B
    ? Length<Cast<B, any[]>> extends infer ParamsSize extends number
    // Check if ParamsSize && Size are the same
    ? ParamsSize extends Size
    // If yes don't need to generate some arguments
    ? (...args: Cast<B, Tuple>) => Return
    // If no need to generate some typed parameters to supply
    : Iterator<ParamsSize> extends infer StartSize extends any[]
    ? Iterator<Size, RestType, [], StartSize> extends infer IteratorsArgs extends any[]
    // ? (...args: Concat<Cast<B, Tuple>, IteratorsArgs>) => Return
    ? (...args: Concat<Cast<B, Tuple>, IteratorsArgs>) => Return
    : never
    : never
    : never
    : never