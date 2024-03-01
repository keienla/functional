import type { FilterArrayReducer, FilterObjectReducer } from '../models/filter.model';
import type { TObject } from '../models/types.model';
import reduce from '../reduce/reduce';
import reduceObject from '../reduceObject/reduceObject';
import curry from '../curry/curry';

export const _arrayFilter = curry(function arrayFilter<T>(fn: FilterArrayReducer<T>, array: T[]): T[] {
    return reduce(function arrayFilterReducer(accumulator: T[], current, index, array){
        if(fn(current, index, array)) {
            return [...accumulator, current]
        }

        return accumulator;
    }, [], array)
})

export const _objectFilter = curry(function objectFilter<T extends TObject>(fn: FilterObjectReducer<T>, object: T): Partial<T> {
    return reduceObject(function objectFilterReducer(accumulator, current, key, object) {
        if(fn(current, key, object)) {
            return {...accumulator, [key]: object[key]}
        }

        return accumulator
    }, {}, object)
})

// export function generatorFilter<T extends Generator>(fn: FilterGeneratorReducer<T>, generator: T): FilterGeneratorReturned<T> {
//     return reduce(function generatorFilterReducer(accumulator, current) {
//         if(fn(current)) {
//             // Need to redefined the type because with the [...accumulator] transform the array into any[]
//             return [...accumulator, current] as FilterGeneratorReturned<T>;
//         }

//         return accumulator;
//     }, [] as unknown as FilterGeneratorReturned<T>, generator)
// }
