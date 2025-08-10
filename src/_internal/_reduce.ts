import type {
    ReduceArrayReducer,
    ReduceGeneratorReducer,
    ReduceObjectReducer,
} from '../reduce/reduce.model';
import type { Transpoline } from '../transpoline/transpoline.model';
import type { TObject } from '../models';
import freeze from '../freeze/freeze';
import transpoline from '../transpoline/transpoline';

export const _arrayReduce = function arrayReduce<T, R>(
    fn: ReduceArrayReducer<T, R>,
    initialValue: R,
    array: T[],
): R {
    if (!array || array.length === 0) {
        return initialValue;
    }

    function arrayReducer(
        accumulator: R,
        index: number,
        fullArray: T[],
    ): Transpoline<R> {
        if (index >= fullArray.length) {
            return accumulator;
        }

        return () => {
            return arrayReducer(
                fn(accumulator, fullArray[index], index, freeze(fullArray)),
                index + 1,
                fullArray,
            );
        };
    }

    return transpoline(arrayReducer)(
        initialValue !== undefined ? initialValue : (array[0] as unknown as R),
        initialValue !== undefined ? 0 : 1,
        array,
    );
};

export const _objectReduce = function objectReduce<T extends TObject, R>(
    fn: ReduceObjectReducer<T, R>,
    initialValue: R,
    object: T,
): R {
    const keys: string[] = Object.keys(object);

    if (!object || keys.length === 0) {
        return initialValue;
    }

    function objectReducer(
        accumulator: R,
        index: number,
        keys: string[],
        object: T,
    ): Transpoline<R> {
        if (index >= keys.length) {
            return accumulator;
        }

        return () => {
            return objectReducer(
                fn(
                    accumulator,
                    object[keys[index]],
                    keys[index],
                    freeze(object),
                ),
                index + 1,
                keys,
                object,
            );
        };
    }

    return transpoline(objectReducer)(
        initialValue !== undefined ? initialValue : (object[keys[0]] as R),
        initialValue !== undefined ? 0 : 1,
        keys,
        object,
    );
};

export const _generatorReduce = function generatorReduce<
    T extends Generator,
    R,
>(fn: ReduceGeneratorReducer<T, R>, initialValue: R, generator: T): R {
    if (!generator) {
        return initialValue;
    }

    if (initialValue === undefined) {
        const generatorFirstIteration = generator.next();

        if (generatorFirstIteration.done) {
            return initialValue;
        }

        initialValue = generatorFirstIteration.value as R;
    }

    function generatorReducer(accumulator: R, fnGenerator: T): Transpoline<R> {
        const iteration = fnGenerator.next();

        if (iteration.done) {
            return accumulator;
        }

        return () => {
            return generatorReducer(
                fn(accumulator, iteration.value as any),
                fnGenerator,
            );
        };
    }

    return transpoline(generatorReducer)(initialValue, generator);
};
