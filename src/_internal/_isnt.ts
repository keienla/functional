import not from '../not/not';
import is from '../is/is';
import curry from '../curry/curry';
import uncurry from '../uncurry/uncurry';

export default curry(function isnt<T>(el1: T, el2: T): boolean {
    return not(uncurry(is))(el1, el2);
});
