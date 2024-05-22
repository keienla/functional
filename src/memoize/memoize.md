[Home](./../../README.md)

# MEMOIZE

The "**memoize**" function accept a function as argument. Each time the new memoized function will be call, if the arguments have already been passed, return the cached result. Else execute the method and stock the result.

--------------
#### Example:
``` typescript
import { memoize } from '@kenla/functional';

function sum(x: number, y: number): number { return x + y };
const memoizedSum: (x: number, y: number) => number = memoize(sum);

memoizedSum(3,8);        // 11 => not stocked so calcul the result
memoizedSum(4,1);        // 5 => not stocked so calcul the result
memoizedSum(3,8);        // 11 => the args has already been passed so calcul the result !
memoizedSum(8,3);        // 11 => not stocked because the args are not in the same order.
```
