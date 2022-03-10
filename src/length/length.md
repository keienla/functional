[Home](./../../README.md)

# LENGTH

The "**length**" function get the size of differents element:
- If the element is an array: return the length of it.
- If the element is a string: return the number of characters.
- If the element is a function: return the number of required arguments.
- If the element is an object: return the number of keys.
- If the element is a regexp: return the number of characters.
- else return null

--------------
#### Example:
``` typescript
import { length } from '@keienla/functional';

const el1: string = 'abc';
const el2: string[] = ['a', 'b'];
const el3: (a: string, b: string) => any = (a: string, b: string) => { return; };
const el4: { a: string, b: string, c: string } = { a: 'a', b: 'b', c: 'c' };
const el5: number = 10;
const el6: boolean = true;
const el7: undefined = undefined;
const el8: Symbol = Symbol('foo');
const el9: BigInt = BigInt(10);

console.log(length(el1);)       // 3
console.log(length(el2);)       // 2
console.log(length(el3);)       // 2
console.log(length(el4);)       // 3
console.log(length(el5);)       // null
console.log(length(el6);)       // null
console.log(length(el7);)       // null
console.log(length(el8);)       // null
console.log(length(el9);)       // null
```
