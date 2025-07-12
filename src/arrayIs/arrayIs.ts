import notSameLength from '../notSameLength/notSameLength';
import transpoline from '../transpoline/transpoline';
import is from '../is/is';
import type { Transpoline } from '../transpoline/transpoline.model';

/**
 * Check if two arrays are the same.
 *
 * @param {Type[]} array
 * @param {Type[]} arrayToCompare
 * @returns {boolean}
 * @example
 *  const arr1: number[] = [0,1,2,3];
 *  const arr2: number[] = [0,1,2,3];
 *  const arr3: any[] = ['0',1,2,3];
 *  const arr4: number[] = [0];
 *
 *  arrayIs(arr1, arr1);     // true
 *  arrayIs(arr1, arr2);     // true
 *  arrayIs(arr1, arr3);     // false
 *  arrayIs(arr1, arr4);     // false
 */
export default function arrayIs<Type>(
    array: Type[],
    arrayToCompare: Type[],
): boolean {
    if (notSameLength(array, arrayToCompare)) return false;
    if (array === arrayToCompare) return true;

    const checkArrayIs = (
        result: boolean = true,
        index: number = 0,
    ): Transpoline<boolean> => {
        if (!result) return false;
        if (index === array.length) return result;

        return () => {
            return checkArrayIs(
                is(array[index], arrayToCompare[index]),
                index + 1,
            );
        };
    };

    return transpoline(checkArrayIs)();
}
