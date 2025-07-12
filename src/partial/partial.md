[Home](./../../README.md)

# PARTIAL

The "**partial**" function allow to prefill some arguments of a function.
So it complete the x first arguments of a function.

---

#### Example:

```typescript
import partial from '@keienla/functional/partial';

// Some function with multiple arguments
function add(a: number, b: number) {
    return a + b;
}
const add3: (b: number) => number = partial(add, 3);

add(5, 9); // 14
add3(5); // 8
```
