[Home](./../../README.md)

# AND

The "**and**" function compare the result of multiple predicate functions with same argument and check if all the functions return "**true**".

---

#### Example:

```typescript
import and from '@keienla/functional/and';
import curry from '@keienla/functional/curry';

// One predicate Function
// Check if a number is superior of 10
function sup10(value: number): boolean {
    return value > 10;
}
// Another predicate Function
// Check if a number is odd number
function odd(value: number): boolean {
    return value % 2 === 1;
}

// The functions need the same argument. Here it's a number so it's good
const oddAndSup10: (value: number) => boolean = curry(and<number>)(sup10, odd);

console.log(oddAndSup10(6)); // false
console.log(oddAndSup10(12)); // false
console.log(oddAndSup10(5)); // false
console.log(oddAndSup10(11)); // true
```
