import type { MapArrayReducer, MapObjectReducer } from '../models/map.model';
import type { SameValueInterface, ValueOf } from '../models/types.model';
import reduce from '../reduce/reduce';
import reduceObject from '../reduceObject/reduceObject';
import curry from '../curry/curry';

export const _arrayMap = curry(function arrayMap<T extends any[], R>(fn: MapArrayReducer<T, R>, element: T[]): R[] {
    if(!element || element.length === 0) return [];

    return reduce(function arrayMapped(accumulator: R[], currentValue: T, index: number, element: T[]) {
        return [...accumulator, fn(currentValue, index, element)]
    }, [] as R[], element)
})

export const _objectMap = curry(function objectMap<T extends object, R>(fn: MapObjectReducer<T, R>, element: T): SameValueInterface<T, R> {
    if(!element) return {} as SameValueInterface<T, R>;

    const keys: string[] = Object.keys(element);

    if(keys.length === 0) return {} as SameValueInterface<T, R>;

    return reduceObject(function objectMapped(accumulator: SameValueInterface<T, R>, current: ValueOf<T>, key: string, object: T) {
        return {...accumulator, [key]: fn(current, key, object)}
    }, reduce(function defineDefaultObject(acc: any, key: string) { return {...acc, [key]: undefined} }, {}, keys), element)
})

// export function generatorMap<T extends Generator, R>(fn: MapGeneratorReducer<T, R>, element: T): R[] {
//     if(!element) return [];

//     return reduce(function generatorMapped(accumulator: R[], current: T extends Generator<infer U, any, any> ? U : any){
//         return [...accumulator, fn(current)]
//     }, [], element)
// }

// export default curry(_map);
