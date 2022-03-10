[Home](./../../README.md)

# IS LENGTH

The "**isLength**" function check and the length of the given element and return true if this length correspond to a number given.

--------------
#### Example:
``` typescript
import { isLength } from '@keienla/functional';

const el: number[] = [0, 1, 2, 3, 4];

isLength(5, el);     // true
isLength(10, 10);    // false
```
