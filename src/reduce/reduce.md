[Home](./../../README.md)

# REDUCE

The "**reduce**" function return a single item by itering throught a given list.

--------------
#### Example:
``` typescript
import { reduce } from '@kenla/functional';

function reducer(x: number, y: number): number { return x + y };
const reduced = reduce(reducer, 0, [8,8,1,3]);
console.log(reduced); // return 20 -> make 8 + 0 = 8 -> 8 + 8 = 16 -> 16 + 1 = 17 -> 17 + 3 = 20
```
