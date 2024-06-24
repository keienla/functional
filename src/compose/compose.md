[Home](./../../README.md)

# COMPOSE

The "**compose**" function execute multiple functions one after the other, and the argument of each function will be the response of the result of the previous execution function.

Start from the last function to the first given.

--------------
#### Example:
``` typescript
import { compose } from '@kenla/functional';

function addOne(value: number): number { return value + 1 };
function mulTwo(value: number): number { return value * 2 };
function divSix(value: number): number { return value / 6 };
function transformToString(value: number): string { return value + '' }

// Stock the element
const result: string = compose(
    transformToString,
    divSix,
    mulTwo,
    addOne
)(1997) // => 666 - exact same thing that transformToString(divSix(mulTwo(addOne(1997)))) => 1997 + 1 = 1998 => 1998 * 2 = 3996 => 3996 / 6 = 666 => 666 + '' = '666'
```