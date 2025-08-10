import type { Fn } from '../models';

/**
 * Uncurry type utility that extracts the original function signature from a Curry wrapper.
 *
 * This type is designed to be the exact inverse of the Curry type. It properly handles:
 * - Curry wrapper types (extracts the original function)
 * - Regular curried functions (attempts to flatten them)
 * - Functions with rest parameters
 * - BLANK placeholder system compatibility
 *
 * The type works by:
 * 1. First checking if the input is a Curry<F> wrapper and extracting F directly
 * 2. For manual curried functions, recursively flattening the nested structure
 * 3. Preserving the original function signature as much as possible
 *
 * @template T - The curried function type or Curry wrapper to uncurry
 *
 * @example
 * ```typescript
 * // Curry wrapper type (preferred case)
 * type OriginalFn = (a: string, b: number) => boolean;
 * type CurriedWrapper = Curry<OriginalFn>;
 * type UncurriedFn = Uncurry<CurriedWrapper>; // (a: string, b: number) => boolean
 *
 * // Manual curried function
 * type ManualCurried = (a: string) => (b: number) => boolean;
 * type UncurriedManual = Uncurry<ManualCurried>; // (a: string, b: number) => boolean
 *
 * // Already uncurried function
 * type RegularFn = (a: string, b: number) => boolean;
 * type StillRegular = Uncurry<RegularFn>; // (a: string, b: number) => boolean
 *
 * // Complex nested function
 * type ComplexCurried = (a: string) => (b: number, c: boolean) => (d: number) => Date;
 * type FlattenedFn = Uncurry<ComplexCurried>; // (a: string, b: number, c: boolean, d: number) => Date
 * ```
 */
export type Uncurry<T> = T extends { readonly __curryCurrentFn: infer F }
    ? F // If it's a Curry wrapper, extract the original function from phantom property
    : T extends Fn
      ? UncurryManual<T> // If it's a regular function, try to flatten it
      : never;

/**
 * Internal helper type for manually uncurrying nested function types.
 *
 * This handles the case where someone manually created a curried function type
 * instead of using the Curry wrapper. It recursively flattens the structure.
 *
 * @template Current - Current function being processed
 * @template Params - Accumulated parameters (internal)
 * @template Depth - Recursion depth counter (internal)
 *
 * @internal
 */
type UncurryManual<
    Current extends Fn,
    Params extends readonly unknown[] = [],
    Depth extends readonly unknown[] = [],
> = Depth['length'] extends 50
    ? {
          ERROR: 'Maximum recursion depth exceeded';
          TAGS: ['InfiniteFn', 'Infinite', 'Uncurry'];
      }
    : ReturnType<Current> extends Fn
      ? UncurryManual<
            ReturnType<Current>,
            [...Params, ...Parameters<Current>],
            [...Depth, unknown]
        >
      : (...args: [...Params, ...Parameters<Current>]) => ReturnType<Current>;
