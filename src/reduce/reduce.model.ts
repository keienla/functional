import type { ValueOf } from '../models';

export type ReduceArrayReducer<Item, Response> = (
    accumulator: Response,
    current: Item,
    index: number,
    array: Item[],
) => Response;

export type ReduceObjectReducer<Item, Response> = (
    accumulator: Response,
    current: ValueOf<Item>,
    key: string,
    object: Item,
) => Response;

export type ReduceGeneratorReducer<Item, Response> = (
    accumulator: Response,
    current: Item extends Generator<infer U, infer V, any> ? U | V : any,
) => Response;
