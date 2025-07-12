[Home](./../../README.md)

# PIPE

The "**pipe**" function execute multiple functions one after the other, and the argument of each function will be the response of the result of the previous execution function.

Start from the first function given to the last

---

#### Example:

```typescript
import pipe from '@keienla/functional/pipe';

function addOne(value: number): number {
    return value + 1;
}
function mulTwo(value: number): number {
    return value * 2;
}
function divSix(value: number): number {
    return value / 6;
}
function transformToString(value: number): string {
    return value + '';
}

// Stock the element
const result: string = pipe(addOne, mulTwo, divSix, transformToString)(1997); // => 666 - exact same thing that transformToString(divSix(mulTwo(addOne(1997)))) => 1997 + 1 = 1998 => 1998 * 2 = 3996 => 3996 / 6 = 666 => 666 + '' = '666'
```

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#higher-order-type-inference-from-generic-functions
