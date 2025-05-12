[Home](./../../README.md)

# SAME LENGTH

The "**sameLength**" function check if two elements have the same length. This not depend of the type of element.

If one of the element type can't have a length that can be calculated (i.e type different of string, function, object, array), return false.

---

#### Example:

```typescript
import { sameLength } from '@kenla/functional';

const el1: string = 'ab';
const el2: number[] = [1, 2];
const el3: number = 10;

sameLength(el1, el1); // true
sameLength(el1, el2); // true
sameLength(el1, el3); // false
```
