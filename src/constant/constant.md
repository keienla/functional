[Home](./../../README.md)

# CONSTANT

The "**contant**" function stock a given value and restitute it when called.

---

#### Example:

```typescript
import { constant } from '@kenla/functional';

// Stock the element
const three: () => number = constant(3);

console.log(three()); // 3
```
