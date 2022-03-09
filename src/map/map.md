[Home]('./../../../README.md)

# MAP

The "**map**" function creates a new array with the results of calling a provided function on every element in the calling array.

--------------
#### Example:
``` typescript
import { map } from '@keienla/functional';

function addOne(x: number): number { return x + 1 };
const mapped = map(addOne, [1,5,8]);
console.log(mapped); // [2,6,9]
```
