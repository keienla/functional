[Home](./../../README.md)

# FILTER

The "**filter**" function creates a new array with all elements that pass the test implemented by the provided function.

--------------
#### Example:
``` typescript
import { filter } from '@kenla/functional';

function filterOdd(x: number): boolean { return x % 2 === 1 };
const filtered = filter(filterOdd, [1,5,8]);

console.log(filtered) // [1,5]
```
