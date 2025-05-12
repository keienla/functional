[Home](./../../README.md)

# ISNT

The "**isnt**" function check if two element are different. Work for all type of element. For object check all the keys/value, same for array check all element and order.

So do the opposite of [is()](./../is/is.md)

---

#### Example:

```typescript
import { isnt } from '@kenla/functional';

const el1: number[] = [0, 1];
const el2: object = { x: 2 };
const el3: string = 'a';
const el4: number = 10;
const el5: RegExp = /a/g;

isnt(el1, [0, 1]); // false
isnt(el1, [0]); // true
isnt(el1, [0, 2]); // true
isnt(el2, { x: 2 }); // false
isnt(el2, { x: 1 }); // true
isnt(el2, { x: 2, y: 1 }); // true
isnt(el3, 'a'); // false
isnt(el3, 'b'); // true
isnt(el4, 10); // false
isnt(el4, 11); // true
isnt(el5, /a/g); // false
isnt(el5, /b/g); // true
isnt(el5, '/b/g'); // true
```
