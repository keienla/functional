import is from '../is/is';
import not from '../not/not';

/**
 * Return the opposite of [is()]{@link ./../is/is.ts}.
 */
export default function isnt<Type>(el1: Type, el2: Type): boolean {
    return not(is)(el1, el2);
}
