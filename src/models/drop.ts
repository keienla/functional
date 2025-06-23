import type { GetItemsBeforeRestItems } from './getItemsBeforeRestItems';
import type { GetTypeRestItems } from './getTypeRestItems';
import type { IsDefinedNumber } from './isDefinedNumber';
import type { IsRestItems } from './isRestItems';
import type { Next } from './iterator';
import type { Length } from './length';
import type { Tail } from './tail';
import type { List } from './types';

/**
 * Get all the arguments after the index given
 * @example
 * type A = Drop<2, ['a', 'b', 'c', 'd']>; // ['c', 'd']
 * type B = Drop<3, ['a', 'b', 'c', 'd']>; // ['d']
 * type C = Drop<any, [0, 1, 2]>; // [0,1,2]
 * type D = Drop<0, [0, 1, 2]>; // [0,1,2]
 * type E = Drop<3, ['a']>; // []
 * type F = Drop<2, [key1: 'a', key2: 'b', key3: 'c', key4: 'd', key5: 'e']>; // [key3: 'c', key4: 'd', key5: 'e']
 * type G = Drop<1, [key1: 1, key2: 2, ...rest: number[]]>; // [key2: 2, ...rest: number[]]
 * type H = Drop<5, [key1: 1, key2: 2, ...rest: number[]]>; // number[]
 */
export type Drop<
    Size extends number,
    Items extends List,
    I extends List = [],
> = {
    continue: Drop<Size, Tail<Items>, Next<I>>;
    return: Items;
    returnRest: GetTypeRestItems<Items>[];
    infinite: {
        ERROR: 'Cannot drop on an infinite array';
        TAGS: ['InfiniteArray', 'Infinite', 'Drop'];
    };
}[Length<I> extends Size
    ? 'return'
    : IsRestItems<Items> extends true
      ? IsDefinedNumber<Length<GetItemsBeforeRestItems<Items>>> extends true
          ? 'continue'
          : 'returnRest'
      : 'continue'];
