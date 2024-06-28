import type { Cast, Drop, Fn, IsDefinedNumber, Length, List, Tail, Tuple } from '../models';

// ! https://medium.com/codex/currying-in-typescript-ca5226c85b85

// TODO REFACTO
export type Curry<F extends Fn> =
    // T is the given arguments at least
    // If no arguments get the parameters of the function
    // originaly: Cast<T, Partial<Parameters<F>>> and not Cast<Partial<Parameters<F>>, T>
    <T extends Tuple>(...args: Cast<Partial<Parameters<F>>, T>) =>
        // Get the remaining arguments
        Drop<Length<T>, Parameters<F>> extends infer G
        // Get the length of remaining arguments
        ? Length<Cast<G, Tuple>> extends infer L
        // If L == 0 so there is no more arguments
        ? L extends 0
        // Return the return type of the function
        ? ReturnType<F>
        // Else if at least one argument
        : L extends 1
        // Return the function not curried
        ? (...args: Cast<G, Tuple>) => ReturnType<F>
        // If more return the curried function
        : Curry<(...args: Cast<G, Tuple>) => ReturnType<F>>
        : never
        : never

// Prendre exemple sur le Before pour la gestion de l'infini

export type Curry2<F extends Fn> = {

    finish: 'FINISH',
}[]