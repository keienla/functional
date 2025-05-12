import type { Predicate } from '../models';
import curry from '../curry/curry';

export const _when = curry(function when<T, R>(
    predicate: Predicate<T>,
    fn: (arg: T) => R,
): (arg: T) => R | T {
    return _defaultWhenElse(predicate, fn);
});

export const _whenElse = curry(function whenElse<T, R, ER>(
    predicate: Predicate<T>,
    fn: (arg: T) => R,
    elseFn: (arg: T) => ER,
): (arg: T) => R | T | ER {
    return _defaultWhenElse(predicate, fn, elseFn);
});

function _defaultWhenElse<T, R, ER>(
    predicate: Predicate<T>,
    fn: (arg: T) => R,
    elseFn?: (arg: T) => ER,
): (arg: T) => R | T | ER {
    return function conditional(arg: T): R | T | ER {
        if (predicate(arg)) {
            return fn(arg);
        } else if (elseFn) {
            return elseFn(arg);
        }

        return arg;
    };
}
