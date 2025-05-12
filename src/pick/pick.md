[Home](./../../README.md)

# PICK

The "**pick**" function will select some specific key in an object and will return a new object with given key/value.

---

#### Example:

```typescript
import { pick } from '@kenla/functional';

const obj1 = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 };
const obj2 = pick(obj1, ['1', '5']); // will return { '1': 1, '5': 5 }
const obj3 = pick(obj1, ['6']); // will return { '6': undefined }
```
