import { IsDefinedNumber } from './isDefinedNumber';
import { Length } from './length';
import { List } from './types';

// Check if the given array has a finite length
export type IsFinite<A extends List, Finite = true, Infinite = false> =
    IsDefinedNumber<Length<A>> extends true ? Finite : Infinite;

type testIsFinite1 = IsFinite<[string, number], true, false>; // true
type testIsFinite2 = IsFinite<any[], true, false>; // false
type testIsFinite3 = IsFinite<[], true, false>; // true
type testIsFinite4 = IsFinite<never, true, false>; // true
