import { Before, Cast, Concat, Fn, Head, IsDefinedNumber, IsNever, Iterator, Last, Length, Pop, Tail, Tuple } from "./utils";

export type Arity<F extends Fn, Size extends number> =
    IsDefinedNumber<Size> extends true
    ? (...args: Cast<Before<Size, Parameters<F>>, any[]>) => ReturnType<F>
    : () => ReturnType<F>