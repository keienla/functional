import curry from '../curry/curry';
import notSameLength from '../notSameLength/notSameLength';
import { Transpoline } from '../models/transpoline.model';
import is from '../is/is';
import transpoline from '../transpoline/transpoline';

export default curry(function arrayIs<T>(array: T[], arrayToCompare: T[]): boolean {
    if(notSameLength(array, arrayToCompare)) return false;
    if(array === arrayToCompare) return true;

    const checkArrayIs = (result: boolean = true, index: number = 0): Transpoline<boolean> => {
        if(!result) return false;
        if(index === array.length) return result;

        return () => {
            return checkArrayIs(is(array[index], arrayToCompare[index]), index + 1);
        }
    }

    return transpoline(checkArrayIs)();
});
