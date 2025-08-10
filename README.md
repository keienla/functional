# Functional

Functional is just a library for Functional Programming in TypeScript with optimal tree-shaking support.

## Installation

```bash
npm install @keienla/functional
```

## Usage

This library is designed with optimal tree-shaking in mind. You can import functions in two ways:

### Tree-Shaking Optimized (Recommended)

Import only the functions you need for the smallest possible bundle size:

```typescript
// Individual imports (best for tree-shaking)
import curry from '@keienla/functional/curry';
import add from '@keienla/functional/add';
import pipe from '@keienla/functional/pipe';

// Usage
const addCurried = curry(add);
const result = pipe(
  addCurried(1),
  addCurried(2)
)(5); // 8
```

### Barrel Import

Import multiple functions from the main entry point:

```typescript
// Multiple imports from main entry
import { curry, add, pipe, map, filter } from '@keienla/functional';

// Usage
const numbers = [1, 2, 3, 4, 5];
const result = pipe(
  filter((x: number) => x > 2),
  map(add(10))
)(numbers); // [13, 14, 15]
```

### Available Import Paths

For optimal tree-shaking, you can import any function directly:

```typescript
// Direct function imports
import curry from '@keienla/functional/curry';
import compose from '@keienla/functional/compose';
import map from '@keienla/functional/map';
import filter from '@keienla/functional/filter';
import { _ } from '@keienla/functional/blank';

// Type utilities
import { isString, isNumber } from '@keienla/functional/isType';
```

## Tree-Shaking Benefits

This library is configured with:
- ✅ **ESM modules** for optimal bundler support
- ✅ **`"sideEffects": false`** to ensure safe tree-shaking  
- ✅ **Individual exports** for direct function imports
- ✅ **TypeScript declarations** with proper type inference

When using individual imports, bundlers like Webpack, Rollup, and Vite will only include the functions you actually use, resulting in significantly smaller bundle sizes.

# Methods

- [add](./src/add/add.md)
- [and](./src/and/and.md)
- [arity](./src/arity/arity.md)
- [arrayIs](./src/arrayIs/arrayIs.md)
- [compose](./src/compose/compose.md)
- [constant](./src/constant/constant.md)
- [curry](./src/curry/curry.md)
- [deepFreeze](./src/deepFreeze/deepFreeze.md)
- [divide](./src/divide/divide.md)
- [filter](./src/filter/filter.md)
- [filterObject](./src/filterObject/filterObject.md)
- [flipArgs](./src/flipArgs/flipArgs.md)
- [freeze](./src/freeze/freeze.md)
- [gatherArgs](./src/gatherArgs/gatherArgs.md)
- [identity](./src/identity/identity.md)
- [is](./src/is/is.md)
- [isLength](./src/isLength/isLength.md)
- [isnt](./src/isnt/isnt.md)
- [isType](./src/isType/isType.md)
- [length](./src/length/length.md)
- [map](./src/map/map.md)
- [mapObject](./src/mapObject/mapObject.md)
- [memoize](./src/memoize/memoize.md)
- [multiply](./src/multiply/multiply.md)
- [nAry](./src/nAry/nAry.md)
- [not](./src/not/not.md)
- [notSameLength](./src/notSameLength/notSameLength.md)
- [objectIs](./src/objectIs/objectIs.md)
- [or](./src/or/or.md)
- [partial](./src/partial/partial.md)
- [pick](./src/pick/pick.md)
- [pickAll](./src/pickAll/pickAll.md)
- [pipe](./src/pipe/pipe.md)
- [reduce](./src/reduce/reduce.md)
- [reduceObject](./src/reduceObject/reduceObject.md)
- [reverseArgs](./src/reverseArgs/reverseArgs.md)
- [sameLength](./src/sameLength/sameLength.md)
- [spreadArgs](./src/spreadArgs/spreadArgs.md)
- [substract](./src/substract/substract.md)
- [transpoline](./src/transpoline/transpoline.md)
- [type](./src/type/type.md)
- [unAry](./src/unAry/unAry.md)
- [uncurry](./src/uncurry/uncurry.md)
- [when](./src/when/when.md)
- [whenElse](./src/whenElse/whenElse.md)

# Maybe todo one day

- [ ] Monades
- [ ] Map/Filter function with Transducers?
  <!--

## Build

After npm run build, if want to create a pack folder, go to the dist folder and run "npm pack"
-->
