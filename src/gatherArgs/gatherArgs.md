[Home](./../../README.md)

# GATHER ARGS

The "**gatherArgs**" function transform a function multiple arguments to a function with only one array arguments.

---

#### Example:

```typescript
import gatherArgs from '@keienla/functional/gatherArgs';

function sum(...args: number[]): number { return numbers.reduce((result, value) => result + value, 0 ) };
const gatheredSum: (n: number[]): number = gatherArgs(sum);

const number1: number = sum(1, 2, 3, 4, 5, 6, 7, 8, 9);      // 45
const number2: number = gatheredSum([1, 2, 3, 4, 5, 6, 7, 8, 9]);  // 45

number1 === number2;     // true
```
