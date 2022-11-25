import { Cast, Drop, Length, Tuple } from './types.model';

// ! https://medium.com/codex/currying-in-typescript-ca5226c85b85

export type Curry<F extends (...args: any[]) => any, MinLength extends number = 0> =
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
                    // TODO - Check if here spread args
                    // TODO - If yes check args and minlength
                    // TODO - if >= minLength => ReturnType<F>
                    // TODO - Else => (...args: Cast<G, Tuple>) => ReturnType<F>
                    // Return the function not curried
                    ? (...args: Cast<G, Tuple>) => ReturnType<F>
                    // If more return the curried function
                    : Curry<(...args: Cast<G, Tuple>) => ReturnType<F>, MinLength>
            : never
        : never
