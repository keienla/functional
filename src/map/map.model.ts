import type { ValueOf } from '../models';

export type MapArrayReducer<Item, Response> =
    (value: Item, index: number, array: Item[]) => Response

export type MapObjectReducer<Item, Response> =
    (value: ValueOf<Item>, key: string, object: Item) => Response

export type MapGeneratorReducer<Item, Response> =
    (value: Item extends Generator<infer U, any, any> ? U : any) => Response
