import type { MapArrayReducer, MapObjectReducer } from '../map/map.model';
import type { SameValueInterface, Tuple, ValueOf } from '../models';
import reduce from '../reduce/reduce';
import reduceObject from '../reduceObject/reduceObject';

export const _arrayMap = function arrayMap<T, R>(
    fn: MapArrayReducer<T, R>,
    element: Tuple<T>,
): R[] {
    if (!element || element.length === 0) {
        return [];
    }

    return reduce(
        function arrayMapped(
            accumulator: R[],
            currentValue: T,
            index: number,
            element: T[],
        ): R[] {
            return [...accumulator, fn(currentValue, index, element)];
        },
        [] as R[],
        element,
    ) as R[];
};

export const _objectMap = function objectMap<T extends object, R>(
    fn: MapObjectReducer<T, R>,
    element: T,
): SameValueInterface<T, R> {
    if (!element) {
        return {} as SameValueInterface<T, R>;
    }

    const keys: string[] = Object.keys(element);

    if (keys.length === 0) {
        return {} as SameValueInterface<T, R>;
    }

    return reduceObject(
        function objectMapped(
            accumulator: SameValueInterface<T, R>,
            current: ValueOf<T>,
            key: string,
            object: T,
        ) {
            return { ...accumulator, [key]: fn(current, key, object) };
        },
        reduce(
            function defineDefaultObject(
                acc: any = {},
                key: string | undefined,
            ) {
                return { ...acc, [key as string]: undefined };
            },
            {},
            keys,
        ),
        element,
    ) as SameValueInterface<T, R>;
};

// export function generatorMap<T extends Generator, R>(fn: MapGeneratorReducer<T, R>, element: T): R[] {
//     if(!element) return [];

//     return reduce(function generatorMapped(accumulator: R[], current: T extends Generator<infer U, any, any> ? U : any){
//         return [...accumulator, fn(current)]
//     }, [], element)
// }

// export default curry(_map);
