import { IsFinite } from './isFinite';
import { List } from './types';

// Che
export type IsRestItems<Items extends List, Is = true, Isnt = false> =
    IsFinite<Items> extends true ? Isnt : Is;

type IsRestItems1 = IsRestItems<[...any[]]>; // true
type IsRestItems2 = IsRestItems<any[]>; // true
type IsRestItems3 = IsRestItems<[string]>; // false
type IsRestItems4 = IsRestItems<[string[]]>; // false
type IsRestItems6 = IsRestItems<never>; // false
type IsRestItems7 = IsRestItems<[hello: string, world: number | undefined]>; // false
type IsRestItems8 = IsRestItems<[hello: string, ...world: number[]]>; // true
type IsRestItems9 = IsRestItems<[...hello: string[]]>; // true
type IsRestItems10 = IsRestItems<[hello: string]>; // false
type IsRestItems11 = IsRestItems<[hello: string, world: number[]]>; // false
type IsRestItems12 = IsRestItems<any[], 'Hello'>; // 'Hello'
type IsRestItems13 = IsRestItems<[any], 'Hello', 'World'>; // 'World'
