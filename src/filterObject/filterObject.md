[Home](./../../README.md)

# FILTER OBJECT

The "**filterObject**" function creates a new object with all elements that pass the test implemented by the provided function.

--------------
#### Example:
``` typescript
import { filterObject } from '@keienla/functional';

function filterOdd(x: number): boolean { return x % 2 === 1 };
const filtered = filterObject(filterOdd, {a: 1, b: 5, c: 8});

console.log(filtered) // {a: 1, b: 5}
```
