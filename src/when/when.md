[Home](./../../README.md)

# WHEN

The "**when**" check a predicate function with a given value. If pass execute a function with the same value, else just return the value.

---

#### Example:

```typescript
import when from '@keienla/functional/when';

function isOdd(x: number): boolean {
    return x % 2 === 1;
}
function addOne(x: number): number {
    return x + 1;
}
const transformToEven: (x: number) => number = when(isOdd, addOne);

transformEven(11); // 12
transformEven(6); // 6
```
