import type { Predicate } from '../models';
import curry from '../curry/curry';
import check from './_check';

export default curry(function or<T>(
    predicate1: Predicate<T>,
    predicate2: Predicate<T>,
    value: T,
): boolean {
    return check(
        (a: boolean, v: boolean) => a || v,
        [predicate1, predicate2],
        false,
        value,
        true,
    );
});
