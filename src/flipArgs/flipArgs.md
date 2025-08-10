[Home](./../../README.md)

# FLIP ARGS

The "**flipArgs**" function return the order of the two first parameters. So like this the first argument become the second and the second the first. The other arguments don't move.

---

#### Example:

```typescript
import flipArgs from '@keienla/functional/flipArgs';

function calc(x: number, y: number, z: number): number {
    return x / y + z;
}
const flippedCalc: (z: number, y: number, x: number) => number = flipArgs(calc);

const number1 = calc(10, 5, 8); // 10
const number2 = flippedCalc(10, 5, 8); // 8.5

number1 !== number2;
```
