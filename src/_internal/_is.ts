import curry from '../curry/curry';
import type from '../type/type';
import arrayIs from '../arrayIs/arrayIs';
import objectIs from '../objectIs/objectIs';

export default curry(function is(el1: any, el2: any): boolean {
    if(type(el1) !== type(el2)) return false;

    switch(type(el1)) {
        case 'array':
            return arrayIs(el1, el2);
        case 'object':
            return objectIs(el1, el2);
        case 'function':
        case 'regexp':
            return el1.toString() === el2.toString();
        default:
            return el1 === el2;
    }
})
