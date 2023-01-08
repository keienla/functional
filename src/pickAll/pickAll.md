[Home](./../../README.md)

# PICK ALL

The "**pickAll**" function will select all keys in an object and will return a new object with all the key/values.

--------------
#### Example:
``` typescript
import { pickAll } from '@kenla/functional';

const obj1 = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 }
const obj2 = pickAll(obj1); // will return obj1 but as a new object.
```
