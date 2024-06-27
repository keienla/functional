import type { Predicate } from '../models';
import curry from '../curry/curry';
import _check from './_check';

export default curry(function or<T>(predicate1: Predicate<T>, predicate2: Predicate<T>, value: T): boolean {
    return _check(
        (a: boolean, v: boolean) => a || v,
        [predicate1, predicate2],
        false,
        value,
        true
    )
})
