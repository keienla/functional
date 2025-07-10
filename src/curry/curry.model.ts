import type { Cast, Fn, Length, Tuple } from '../models';
import type {
    ExtractBlanks,
    RemoveBlanks,
    ReplaceBlanks,
} from '../utils/_blank.model';
import { type Blank } from '../utils/_blank';

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
 * The Curry function that should replace the curry function type
 * This type accept BLANK parameters and replace it until the function is completed.
 * @param {Fn} F The function to curried
 * @param {Tuple} ProvidedArgs The arguments provided by the user
 */
export type Curry<F extends Fn, ProvidedArgs extends Tuple> = CurryFn<
    F,
    ProvidedArgs
>;

type CurryFn<
    // The function to curry
    F extends Fn,
    // The given arguments to the function
    ProvidedArgs extends Tuple = [],
    // All the parameters of the original function
    OriginalParameters extends Tuple = Parameters<F>,
> = <
    // It's the args given during each partial call of the function
    NewArgs extends CurryPartialParameters<
        CurryRemainingParameters<ProvidedArgs, Parameters<F>>
    >,
>(
    ...args: NewArgs
) => ExtractBlanks<ProvidedArgs, OriginalParameters> extends infer RemainingArgs
    ? ReplaceBlanks<ProvidedArgs, NewArgs, true> extends infer NewProvidedArgs
        ? Length<
              Cast<RemoveBlanks<Cast<NewProvidedArgs, Tuple>>, Tuple>
          > extends infer LengthProvidedArgs
            ? LengthProvidedArgs extends Length<OriginalParameters>
                ? ReturnType<F>
                : CurryFn<
                      (...args: Cast<RemainingArgs, Tuple>) => ReturnType<F>,
                      Cast<NewProvidedArgs, Tuple>,
                      OriginalParameters
                  >
            : never
        : never
    : never;

// ! PROBLEM
function curry<
    F extends Fn,
    DefaultArgs extends CurryPartialParameters<Parameters<F>>,
>(fn: F, ...args: DefaultArgs): Curry<F, DefaultArgs> {
    return null as any;
}

const add4numbers = (a: number, b: number, c: number, d: number) =>
    a + b + c + d;
const curriedAd4numbers = curry(add4numbers);

const firstStep = curriedAd4numbers(1, 2);
const secondStep = firstStep(3);
const thridStep = secondStep(4);
