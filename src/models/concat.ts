import type { AppendList } from './append';
import type { List } from './types';

/**
 * Merge two arrays
 * @see {@link AppendList}
 * @example
 * type A = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]
 * type B = Concat<[], [1, 2]>; // [1, 2]
 */
export type Concat<Left extends List, Right extends List> = AppendList<
    Right,
    Left
>;
