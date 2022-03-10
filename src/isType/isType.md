[Home](./../../README.md)

# IS TYPE

The "**isType**" function check if the element type is the same that the returnedTypes given.

--------------
#### Example:
``` typescript
import { isType } from '@keienla/functional';

console.log(isType('number', 'a'));     // false
console.log(isType('number', 123));     // true
```
