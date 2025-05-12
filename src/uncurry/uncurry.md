[Home](./../../README.md)

# UNCURRY

The **uncurry** function transform a curried function into a one that is not curried.

See also: [curry](./../curry/curry.md)

---

#### Example:

```typescript
import { uncurry } from '@keienla/functional';

function sum(x: number): (y: number) => number {
    return function add(y: number): number {
        return x + y;
    };
}
const uncurriedSum = uncurry(sum);

console.log(uncurriedSum(2, 5)); // 7
// Will throw an error
uncurriedSum(8)(3);
```
