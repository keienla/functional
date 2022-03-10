[Home](./../../README.md)

# DEEP FREEZE

The "**deepFreeze**" function freeze an element and all it's childs.

--------------
#### Example:
``` typescript
import { deepFreeze } from '@keienla/functional';

const freezedEl = deepFreeze({ a: { b: 0, c: 1 } });
freezedEl.a.b = 2;

console.log(freezedEl.a.b)     // 0
```
