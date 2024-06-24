[Home](./../../README.md)

# FREEZE

The "**freeze**" function freeze an element. Like this, this element can't be changed.

This operation only work on first level.

--------------
#### Example:
``` typescript
import { freeze } from '@kenla/functional';

const freezedEl = freeze({ a: 1 });
freezedEl['a'] = 2;

console.log(freezedEl['a'])     // 1
```
