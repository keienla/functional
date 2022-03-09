[Home]('./../../../README.md)

# SPREAD ARGS

The "**spreadArgs**" function transform a function with only one array type argument into a function with N arguments to replace the previous array.

--------------
#### Example:
``` typescript
import { spreadArgs } from '@keienla/functional';

function sum(numbers: number[]): number { return numbers.reduce((result, value) => result + value, 0 ) };
const spreadedSum: (...args: number[]): number = spreadArgs(sum);

const number1: number = sum([1, 2, 3, 4, 5, 6, 7, 8, 9]);      // 45
const number2: number = spreadedSum(1, 2, 3, 4, 5, 6, 7, 8, 9);  // 45

number1 === number2;     // true
```
