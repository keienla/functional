[Home](./../../README.md)

# REDUCE OBJECT

The "**reduceObject**" function return a single item by itering throught a given object.

---

#### Example:

```typescript
import { reduceObject } from '@kenla/functional';

function reducer(x: number, y: number): number {
    return x + y;
}
const reduced = reduceObject(reducer, 0, { a: 8, b: 8, c: 1, d: 3 });
console.log(reduced); // return 20 -> make 8 + 0 = 8 -> 8 + 8 = 16 -> 16 + 1 = 17 -> 17 + 3 = 20
```
