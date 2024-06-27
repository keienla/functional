import type { Predicate } from '../models';
import curry from '../curry/curry';
import _check from './_check';

export default curry(function and<T>(predicate1: Predicate<T>, predicate2: Predicate<T>, value: T): boolean {
    return _check(
        (accumulator: boolean, current: boolean) => accumulator && current,
        [predicate1, predicate2],
        true,
        value,
        false
    )
})
