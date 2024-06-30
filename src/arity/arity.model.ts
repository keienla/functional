import { Before, Cast, Fn, IsDefinedNumber } from "../models";

export type Arity<F extends Fn, Size extends number> = (...args: Cast<Before<Size, Parameters<F>>, any[]>) => ReturnType<F>