import type { ValueOf } from '../models';

export type FilterArrayReducer<Item> =
    (value: Item, index: number, array: Item[]) => boolean;

export type FilterObjectReducer<Item> =
    (value: ValueOf<Item>, key: string, object: Item) => boolean;

export type FilterGeneratorReducer<Item> =
    (value: Item extends Generator<infer U, infer V, any> ? (U | V) : any) => boolean;

export type FilterGeneratorReturned<Item> =
    Item extends Generator<infer U, infer V, any> ? (U | V)[] : any[];
