[Home](./../../README.md)

# NOT

The "**not**" function create a new function than original but return the opposite result of the original function.

--------------
#### Example:
``` typescript
import { not } from '@kenla/functional';

function isTrue(value: boolean): boolean { return value === true };
const isFalse: (value: boolean) => boolean = not(isTrue);

isTrue(false);       // return false;
isFalse(false);      // return true;
```
