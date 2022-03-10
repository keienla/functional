[Home](./../../README.md)

# REVERSE ARGS

The "**reverseArgs**" function take as parameter a function and return a function with the same arguments but inversed.

/!\ The function with spread arguments can't be reversed!

--------------
#### Example:
``` typescript
import { reverseArgs } from '@keienla/functional';

function divide(x: number, y: number): number { return x / y }
const inversedDivide: (y: number, x: number) => number = reverseArgs(divide);

const number1 = divide(10, 5);           // 2
const number2 = inversedDivide(10, 5);   // 0.5

number1 !== number2
```
