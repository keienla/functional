[Home](./../../README.md)

# ARITY

The "**arity**" function create a new function with a given number of arguments. It can be usefull for functions with spread args to create a function with limited args

---

#### Example:

```typescript
import arity from '@keienla/functional/arity';

function textAndNumbersSum(text: string, ...numbers: number[]) {
    return text + ': ' + numbers.reduce((acc, n) => n + acc, 0);
}
const arityTextAndNumbersSum5 = arity(textAndNumbersSum, 5);
console.log(arityTextAndNumbersSum5('Hello', 1, 2, 3, 4)); // "Hello: 10"

// Will have a type error because of too much arguments
// If ignore the error will output the response limited to the number of arguments desired
// So here the 5 firsts
console.log(arityTextAndNumbersSum5('World', 2, 4, 6, 8, 10, 12)); // "World: 20"

// Will have a type error because of not enough arguments
// Will throw an error because first argument is undefined
console.log(arityTextAndNumbersSum5()); // Throw error
```
