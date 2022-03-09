[Home]('./../../../README.md)

# NOT SAME LENGTH

The "**notSameLength**" function return the opposite of "[**sameLength**](./../sameLength/sameLength.md)" method.

--------------
#### Example:
``` typescript
import { notSameLength } from '@keienla/functional';

const el1: string = 'a';
const el2: number[] = [0, 1];
const el3: Function = (a: number) => {};
const el4: number = 1;

notSameLength(el1, el1);    // true
notSameLength(el1, el2);    // true
notSameLength(el1, el3);    // false
notSameLength(el1, el4);    // true
```
