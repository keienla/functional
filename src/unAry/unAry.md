[Home](./../../README.md)

# UNARY

The "**unAry**" function is the same that nAry but with only one parameter allowed

see [nAry](./../nAry/nAry.md)

**The function doesn't count spread args or conditional args**

---

#### Example:

```typescript
import { unAry } from '@kenla/functional';

function multipleArgsFn(arg1: number, arg2: string, arg3: number) {
    // Define default value for arg2 && arg3
    // because inference type can't get optional or spread types
    arg2 ??= '';
    arg3 ??= 1;
    return arg1 * arg3 + arg2;
}

const unAryFn = unAry(multipleArgsFn);

unAryFn(2); // '2'

// Note that you can use function as curried
unAryFn()(3); // '3'
```
