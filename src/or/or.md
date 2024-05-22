[Home](./../../README.md)

# OR

The "**or**" function compare the result of multiple predicate functions with same argument and check if at least one function return "**true**".

--------------
#### Example:
``` typescript
import { or } from '@kenla/functional';

// One predicate Function
// Check if a number is superior of 10
function sup10(value: number): boolean { return value > 10 };
// Another predicate Function
// Check if a number is odd number
function odd(value: number): boolean { return value % 2 === 1 };

// The functions need the same argument. Here it's a number so it's good
const oddOrSup10: (value: number) => boolean = or(sup10, odd);

console.log(oddOrSup10(6))     // false
console.log(oddOrSup10(12))    // true
console.log(oddOrSup10(5))     // true
console.log(oddOrSup10(11))    // true
```
