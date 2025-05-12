import type { Cast, Drop, Fn, Length, Tuple } from '../models';
import type { BLANK, ExtractBlank, IsBlank } from '../utils/_blank.model';

// ! https://medium.com/codex/currying-in-typescript-ca5226c85b85

// TODO REFACTO
export type Curry<F extends Fn> =
    // T is the given arguments at least
    // If no arguments get the parameters of the function
    // originaly: Cast<T, Partial<Parameters<F>>> and not Cast<Partial<Parameters<F>>, T>
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

// Prendre exemple sur le Before pour la gestion de l'infini
type Curry2<F extends Fn> = <
    Params extends Parameters<F>,
    Result extends any = ReturnType<F>,
>(
    ...args: Parameters<F> | Params
) => ExtractBlank<Params, Parameters<F>> extends infer G ? G : Result;

export default function curry<F extends Fn>(
    fn: F,
    args: Parameters<F>[] = [],
): Curry2<F> {
    return null as any;
}

const fn1 = (key1: string, key2: number, key3: boolean): boolean => {
    return true;
};
// ! SHOULD BE ERROR
const curriedFn1 = curry(fn1)('hello');
const curriedFn2 = curry(fn1)(1)('2');

// REFACTO CURRY

// export type Curry2<F extends Fn> = Curry2Fn<F>

// type Curry2Fn<F extends Fn, Decomposed extends any[] = Decompose<Parameters<F>>, Result extends any = F> = {
//     continue: Curry2Fn<
//         F,
//         Tail<Decomposed>,
//         Result | ((...args: Head<Decomposed>) => ReturnType<F>)
//     >
//     finish: Result
//     infinite: 'INFINITE'
// }[
//     Decomposed extends DecomposeInfinite
//     ? 'infinite'
//     :
//     Length<Decomposed> extends 0
//     ? 'finish'
//     : 'continue'
// ]

// type DecomposeInfinite = {
//     ERROR: 'Cannot Decompose on an infinite array',
//     TAGS: ['InfiniteArray', 'Infinite', 'Decompose']
// }

// type Decompose<Args extends Tuple> = {
//     continue: []
//     finish: Args
//     infinite: DecomposeInfinite
// }[
//     'continue'
// ]

// type CurryTest1 = Curry2<(key1: string) => boolean>                                 // (key1: string) => boolean
// type CurryTest2 = Curry2<(key1: string, key2: number) => boolean>                   // (key1: string, key2: number) => boolean | (key1: string) => (key2: number) => boolean
// type CurryTest3 = Curry2<(key1: boolean, key2: string, key3: number) => Date>       // (key1: boolean, key2: string, key3: number) => Date | (key1: boolean) => (key2: string, key3: number) => Date | (key1: boolean, key2: string) => (key3: number) => Date | (key1: boolean) => (key2: string) => (key3: number) => Date
// type CurryTest4 = Curry2<(key1: number, key2?: number) => string>                   // (key1: number, key2?: number) => string | (key1: number) => string
// type CurryTest5 = Curry2<(key1: number, key2: number, ...rest: string[]) => string> // (key1: number, key2: number, ...rest: string[]) => string | (key1: number) => (key2: number, ...rest: string[]) => string | (key1: number, key2: number) => string | (key1: number) => (key2: number) => string
