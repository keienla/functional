import { GetItemsBeforeRestItems } from './getItemsBeforeRestItems';
import { GetTypeRestItems } from './getTypeRestItems';
import { IsDefinedNumber } from './isDefinedNumber';
import { IsRestItems } from './isRestItems';
import { Next } from './iterator';
import { Length } from './length';
import { Tail } from './tail';
import { List } from './types';

// Get all the arguments after the index given
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

type testDrop1 = Drop<2, ['a', 'b', 'c', 'd']>; // ['c', 'd']
type testDrop2 = Drop<3, ['a', 'b', 'c', 'd']>; // ['d']
type testDrop3 = Drop<any, [0, 1, 2]>; // [0,1,2]
type testDrop4 = Drop<0, [0, 1, 2]>; // [0,1,2]
type testDrop5 = Drop<3, ['a']>; // []
type testDrop6 = Drop<
    2,
    [key1: 'a', key2: 'b', key3: 'c', key4: 'd', key5: 'e']
>; // [key3: 'c', key4: 'd', key5: 'e']
type testDrop7 = Drop<1, [key1: 1, key2: 2, ...rest: number[]]>; // [key2: 2, ...rest: number[]]
type testDrop8 = Drop<5, [key1: 1, key2: 2, ...rest: number[]]>; // number[]
