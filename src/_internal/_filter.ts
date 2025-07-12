import type {
    FilterArrayReducer,
    FilterObjectReducer
} from '../filter/filter.model';
import type { TObject } from '../models';
import reduce from '../reduce/reduce';
import reduceObject from '../reduceObject/reduceObject';

export const _arrayFilter = function arrayFilter<Type>(
    fn: FilterArrayReducer<Type>,
    array: Type[]
): Type[] {
    return reduce(
        function arrayFilterReducer(
            accumulator: Type[],
            current,
            index,
            array
        ) {
            if (fn(current, index, array)) {
                return [...accumulator, current];
            }

            return accumulator;
        },
        [],
        array
    );
};

export const _objectFilter = function objectFilter<Type extends TObject>(
    fn: FilterObjectReducer<Type>,
    object: Type
): Partial<Type> {
    return reduceObject(
        function objectFilterReducer(accumulator, current, key, object) {
            if (fn(current, key, object)) {
                return { ...accumulator, [key]: object[key] };
            }

            return accumulator;
        },
        {},
        object
    );
};

// export function generatorFilter<T extends Generator>(fn: FilterGeneratorReducer<T>, generator: T): FilterGeneratorReturned<T> {
//     return reduce(function generatorFilterReducer(accumulator, current) {
//         if(fn(current)) {
//             // Need to redefined the type because with the [...accumulator] transform the array into any[]
//             return [...accumulator, current] as FilterGeneratorReturned<T>;
//         }

//         return accumulator;
//     }, [] as unknown as FilterGeneratorReturned<T>, generator)
// }
