[Home](./../../README.md)

# WHEN ELSE

The "**whenElse**" check a predicate function with a given value. If pass execute a function with the same value, else execute the third function with value as argument.

---

#### Example:

```typescript
import whenElse from '@keienla/functional/whenElse';

function isOdd(x: number): boolean {
    return x % 2 === 1;
}
function addOne(x: number): number {
    return x + 1;
}
function addTwo(x: number): number {
    return x + 2;
}
const transformToEvenOrAddTwo: (x: number) => number = whenElse(
    isOdd,
    addOne,
    addTwo,
);

transformToEvenOrAddTwo(11); // 12
transformToEvenOrAddTwo(6); // 8
```
