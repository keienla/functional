import type { Predicate } from '../models';

export default function _defaultWhenElse<Type, Result>(
    predicate: Predicate<Type>,
    fn: (arg: Type) => Result,
): (arg: Type) => Result | Type;
export default function _defaultWhenElse<Type, Result, ErrorResult>(
    predicate: Predicate<Type>,
    fn: (arg: Type) => Result,
    elseFn: (arg: Type) => ErrorResult,
): (arg: Type) => Result | ErrorResult;
export default function _defaultWhenElse<Type, Result, ErrorResult>(
    predicate: Predicate<Type>,
    fn: (arg: Type) => Result,
    elseFn?: (arg: Type) => ErrorResult,
): (arg: Type) => (Result | Type) | (Result | ErrorResult) {
    return function conditional(arg: Type): Result | Type | ErrorResult {
        if (predicate(arg)) {
            return fn(arg);
        } else if (elseFn) {
            return elseFn(arg);
        }

        return arg;
    };
}
