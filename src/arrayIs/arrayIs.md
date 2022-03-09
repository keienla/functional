[Home]('./../../../README.md)

# ArrayIs

The "**arrayIs**" function compare two array and check if the arrays have the same values and so are equals.

--------------
#### Example:
``` typescript
import { arrayIs } from '@keienla/functional';

const arr1: number[] = [0,1,2,3];
const arr2: number[] = [0,1,2,3];
const arr3: any[] = ['0',1,2,3];
const arr4: number[] = [0];

arrayIs(arr1, arr1);     // true
arrayIs(arr1, arr2);     // true
arrayIs(arr1, arr3);     // false
arrayIs(arr1, arr4);     // false
```
