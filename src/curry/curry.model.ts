import type { Cast, Drop, Fn, Head, Length, Tail, Tuple } from '../models';
import type { ExtractBlanks, ReplaceBlanks } from '../utils/_blank.model';
import { BLANK, type Blank } from '../utils/_blank';

// ! https://medium.com/codex/currying-in-typescript-ca5226c85b85

// TODO REFACTO
export type Curry<F extends Fn> =
    // T is the given arguments at least
    // If no arguments get the parameters of the function
    <T extends Tuple>(
        ...args: Cast<Partial<Parameters<F>>, T>
    ) => // Get the remaining arguments
    Drop<Length<T>, Parameters<F>> extends infer G
        ? // Get the length of remaining arguments
          Length<Cast<G, Tuple>> extends infer L
            ? // If L == 0 so there is no more arguments
              L extends 0
                ? // Return the return type of the function
                  ReturnType<F>
                : // Else if at least one argument
                  L extends 1
                  ? // Return the function not curried
                    (...args: Cast<G, Tuple>) => ReturnType<F>
                  : // If more return the curried function
                    Curry<(...args: Cast<G, Tuple>) => ReturnType<F>>
            : never
        : never;

// TODO: REFACTO CURRY

function curry<
    F extends Fn,
    DefaultArgs extends CurryPartialParameters<Parameters<F>>,
>(fn: F, ...args: DefaultArgs): Curry2<F, DefaultArgs> {
    return null as any;
}

/**
 * Transform the parameters of the function to make it optional or Blank.
 * @example
 * type MyFn = (key1: string, key2: number) => boolean;
 * type MyFnCurryParameters = CurryPartialParameters<Parameters<MyFn>> // [key1?: string | Blank | undefined, key2?: number | Blank | undefined]
 */
export type CurryPartialParameters<P extends Tuple> = {
    [K in keyof P]?: P[K] | boolean | Blank;
} extends infer T
    ? Cast<T, Tuple>
    : never;

/**
 * Get the remaining parameters of the function and work with Blank to keep the good params
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
 * The Curry2 function that should replace the curry function type
 * This type accept BLANK parameters and replace it until the function is completed.
 * @param {Fn} F The function to curried
 * @param {Tuple} ProvidedArgs The arguments provided by the user
 * @param {ReturnType<F>} Result The return type of the function
 */
type Curry2<
    F extends Fn,
    ProvidedArgs extends Tuple,
    Result = ReturnType<F>,
> = <
    // It's the args given during each partial call of the function
    NewArgs extends CurryPartialParameters<
        CurryRemainingParameters<ProvidedArgs, Parameters<F>>
    >,
>(
    ...args: NewArgs
) => ExtractBlanks<ProvidedArgs, Parameters<F>> extends infer RemainingArgs
    ? ReplaceBlanks<ProvidedArgs, NewArgs> extends infer NewProvidedArgs
        ? Length<Cast<RemainingArgs, Tuple>> extends infer LengthRemainingArgs
            ? LengthRemainingArgs extends Length<NewArgs>
                ? Result
                : Curry2<
                      (...args: Cast<RemainingArgs, Tuple>) => Result,
                      Cast<NewProvidedArgs, Tuple>
                  >
            : never
        : never
    : never;

const t = curry(
    (a: number, b: string, c: boolean): number => 0,
    BLANK,
    'Hello',
);
