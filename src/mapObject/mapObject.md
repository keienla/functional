[Home](./../../README.md)

# MAP OBJECT

The "**mapObject**" function creates a new object with the results of calling a provided function on every element in the calling object.

---

#### Example:

```typescript
import { mapObject } from '@kenla/functional';

function addOne(x: number): number {
    return x + 1;
}
const mapped = mapObject(addOne, { a: 1, b: 5, c: 8 });
console.log(mapped); // {a: 2, b: 6, c: 9}
```
