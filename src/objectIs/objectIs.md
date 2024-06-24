[Home](./../../README.md)

# OBJECT IS

The "**objectIs**" function check if two objects are the same. For this check the length of each object, keys and values.

--------------
#### Example:
``` typescript
import { not } from '@kenla/functional';

const obj1: object = { a: 'a', b: 'b' };
const obj2: object = { a: 'a', b: 'b' };
const obj3: object = { a: 'a' };
const obj4: object = { a: 'a', b: 'b', c: 'c' }
const obj5: object = { a: 'b', b: 'a' };
const obj6: object = { b: 'b', a: 'a' };

objectIs(obj1, obj1);        // true
objectIs(obj1, obj2);        // true
objectIs(obj1, obj3);        // false
objectIs(obj1, obj4);        // false
objectIs(obj1, obj5);        // false
objectIs(obj1, obj6);        // false
```
