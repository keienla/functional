[Home](./../../README.md)

# CURRY

The "**curry**" function transforms a function into a curried version with advanced BLANK placeholder support. It enables flexible partial application patterns including traditional currying, BLANK placeholders, and preset defaults.

---

## Features

- **Traditional Currying**: Apply arguments one at a time or in groups
- **BLANK Placeholders**: Skip arguments using `_` and fill them later
- **Preset Defaults**: Set default arguments with optional BLANK placeholders
- **Type Safety**: Full TypeScript inference at every step
- **Flexible Patterns**: Mix and match different application styles

---

## Usage

### Basic Currying

```typescript
import curry from '@keienla/functional/curry';

function sum(x: number, y: number, z: number): number {
    return x + y + z;
}

const sumCurry = curry(sum);

console.log(sum(1, 2, 3)); // 6
console.log(sumCurry(1, 2, 3)); // 6
console.log(sumCurry(1)(2)(3)); // 6
console.log(sumCurry(1, 2)(3)); // 6
console.log(sumCurry(1)(2, 3)); // 6
```

### BLANK Placeholder Support

```typescript
import curry from '@keienla/functional/curry';
import { _ } from '@keienla/functional/blank';

function greet(greeting: string, name: string, punctuation: string): string {
    return `${greeting} ${name}${punctuation}`;
}

const greetCurry = curry(greet);

// Skip the middle argument
const helloWith = greetCurry('Hello', _);
console.log(helloWith('World', '!')); // "Hello World!"

// Skip multiple arguments
const withExclamation = greetCurry(_, _, '!');
console.log(withExclamation('Hi', 'Alice')); // "Hi Alice!"

// Mixed patterns
const hiName = greetCurry('Hi', _)('Bob');
console.log(hiName('.')); // "Hi Bob."
```

### Preset Defaults

```typescript
import curry from '@keienla/functional/curry';
import { _ } from '@keienla/functional/blank';

function multiply(a: number, b: number, c: number): number {
    return a * b * c;
}

// Set first argument as default
const multiplyBy10 = curry(multiply, 10);
console.log(multiplyBy10(2, 3)); // 60

// Mix defaults with BLANK placeholders
const multiplyWith10AndBlank = curry(multiply, 10, _, 2);
console.log(multiplyWith10AndBlank(5)); // 100 (10 * 5 * 2)
```

---

## Advanced Examples

### Function Composition with Placeholders

```typescript
import curry from '@keienla/functional/curry';
import { _ } from '@keienla/functional/blank';

function replace(search: string, replacement: string, text: string): string {
    return text.replace(search, replacement);
}

const replaceCurry = curry(replace);

// Create reusable text processors
const removeSpaces = replaceCurry(' ', '');
const addPrefix = replaceCurry(_, 'PREFIX: ');

console.log(removeSpaces('hello world')); // "helloworld"
console.log(addPrefix('hello', 'hello')); // "PREFIX: hello"
```
