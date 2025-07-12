/**
 * Advanced Curry Type System with BLANK Placeholder Support
 *
 * This module implements a sophisticated currying system that extends traditional
 * currying with BLANK placeholder support. The type system ensures complete
 * type safety while allowing flexible partial application patterns.
 *
 * Key concepts:
 * - BLANK: A special placeholder symbol that can be used to skip arguments
 * - Partial Application: Providing some arguments and getting back a new function
 * - Type-level Computation: All logic is computed at the type level for zero runtime cost
 *
 * The system works by:
 * 1. Tracking which arguments have been provided (including BLANK placeholders)
 * 2. Calculating which parameters still need to be filled
 * 3. Merging new arguments with existing ones, filling BLANK placeholders
 * 4. Determining whether to return the final result or continue currying
 *
 * Architecture:
 * - CurryPartialParameters: Makes function parameters optional and allows BLANK
 * - CurryRemainingParameters: Calculates what parameters are still needed
 * - Curry: Main export type that users interact with
 * - CurryFn: Internal recursive type that handles the currying logic
 */

import type {
    Cast,
    Concat,
    Fn,
    GetItemsBeforeRestItems,
    GetTypeRestItems,
    IsNever,
    Length,
    Tuple,
} from '../models';
import type {
    ExtractBlanks,
    RemoveBlanks,
    ReplaceBlanks,
} from '../blank/blank.model';
import { Blank } from '../blank/blank';

/**
 * Transform function parameters to allow partial application with BLANK placeholders
 *
 * This type takes a function's parameter list and transforms it so that:
 * - Each parameter becomes optional (can be omitted)
 * - Each parameter can be a BLANK placeholder
 * - Each parameter can be its original type
 *
 * This enables flexible partial application where users can provide:
 * - Some arguments: curry(fn)(arg1)
 * - BLANK placeholders: curry(fn)(_, arg2)
 * - Mixed patterns: curry(fn)(arg1, _, arg3)
 *
 * @template P - The original function's parameter tuple
 *
 * @example
 * type MyFn = (key1: string, key2: number) => boolean;
 * type MyFnCurryParameters = CurryPartialParameters<Parameters<MyFn>>
 * // Result: [key1?: string | Blank | undefined, key2?: number | Blank | undefined]
 *
 * // This allows calling patterns like:
 * curry(fn)('hello', 42)     // Both args provided
 * curry(fn)('hello')         // First arg provided
 * curry(fn)(_, 42)           // Second arg provided, first is BLANK
 * curry(fn)('hello', _)      // First arg provided, second is BLANK
 */
export type CurryPartialParameters<P extends Tuple> = {
    [K in keyof P]?: P[K] | Blank;
} extends infer T
    ? Cast<T, Tuple>
    : never;

/**
 * Calculate the remaining parameters needed for a curried function
 *
 * This type analyzes what arguments have been provided so far (including BLANK placeholders)
 * and determines which parameters still need to be filled.
 *
 * @template Provided - Arguments provided so far (may contain BLANK placeholders)
 * @template Expected - All parameters of the original function
 *
 * @example
 * type MyFn = (key1: string, key2: number) => boolean;
 * type remainingParameters1 = CurryRemainingParameters<[Blank, number], Parameters<MyFn>> // [key1: string]
 * type remainingParameters2 = CurryRemainingParameters<[], Parameters<MyFn>> // [key1: string, key2: number]
 * type remainingParameters3 = CurryRemainingParameters<['Foo'], Parameters<MyFn>> // [key2: number]
 * type remainingParameters4 = CurryRemainingParameters<['Foo', number], Parameters<MyFn>> // []
 */
type CurryRemainingParameters<
    Provided extends Tuple,
    Expected extends Tuple,
> = Cast<ExtractBlanks<Provided, Expected>, Tuple>;

/**
 * Main Curry type that transforms a function into a curried version with BLANK support
 *
 * This type creates a curried function that can be called with partial arguments,
 * supporting BLANK placeholders for advanced partial application patterns.
 *
 * Features:
 * - Partial application: curry(fn)(arg1)(arg2)...
 * - BLANK placeholders: curry(fn)(_, arg2)(arg1)
 * - Mixed patterns: curry(fn)(arg1, _)(arg2)
 * - Type-safe: Full TypeScript inference at every step
 *
 * @template F - The function to be curried
 * @template ProvidedArgs - Arguments already provided (used internally for recursion)
 *
 * @example
 * declare function add(a: number, b: number, c: number): number;
 * const curriedAdd = curry(add);
 *
 * // Traditional currying
 * const result1 = curriedAdd(1)(2)(3); // number
 *
 * // With BLANK placeholders
 * const result2 = curriedAdd(_, 2, _)(1, 3); // number
 *
 * // Mixed patterns
 * const result3 = curriedAdd(1, _)(2, 3); // number
 */
export type Curry<F extends Fn, ProvidedArgs extends Tuple = []> = CurryFn<
    F,
    ProvidedArgs
>;

type CurryFn<
    // The function to curry
    Function extends Fn,
    // The given arguments to the function so far (may contain BLANK placeholders)
    ProvidedArgs extends Tuple = [],
    // All the parameters of the original function (used as reference)
    OriginalParameters extends Tuple = GetItemsBeforeRestItems<
        Parameters<Function>
    >,
    RestItemType = GetTypeRestItems<Parameters<Function>>,
> = <
    // New arguments provided in this partial call
    // Must match the structure of remaining parameters (allowing BLANK placeholders)
    NewArgs extends Concat<
        CurryPartialParameters<
            CurryRemainingParameters<ProvidedArgs, OriginalParameters>
        >,
        IsNever<RestItemType, [], [...RestItemType[]]>
    >,
>(
    // ...args: NewArgs
    ...args: NewArgs
) => // Step 1: Calculate which parameters are still needed
// ExtractBlanks gives us the parameters that haven't been filled yet
ExtractBlanks<ProvidedArgs, OriginalParameters> extends infer RemainingArgs
    ? // Step 2: Merge the new arguments with existing ones
      // ReplaceBlanks fills BLANK placeholders and appends remaining args
      ReplaceBlanks<ProvidedArgs, NewArgs, true> extends infer NewProvidedArgs
        ? // Step 3: Count how many real arguments we have now
          // RemoveBlanks strips out BLANK placeholders, Length counts them
          Length<
              Cast<RemoveBlanks<Cast<NewProvidedArgs, Tuple>>, Tuple>
          > extends infer LengthProvidedArgs
            ? // Step 4: Check if we have enough arguments to call the function
              LengthProvidedArgs extends Length<OriginalParameters>
                ? // ✅ We have all arguments - return the function result
                  ReturnType<Function>
                : // ❌ Still need more arguments - return another curried function
                  // Create a new function signature with remaining parameters
                  CurryFn<
                      (
                          ...args: Concat<
                              Cast<RemainingArgs, Tuple>,
                              IsNever<RestItemType, [], [...RestItemType[]]>
                          >
                      ) => ReturnType<Function>,
                      Cast<NewProvidedArgs, Tuple>,
                      OriginalParameters,
                      RestItemType
                  >
            : never // Type calculation failed
        : never // ReplaceBlanks failed
    : never; // ExtractBlanks failed
