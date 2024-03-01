[Home](./../../README.md)

# N_ARY

The "**nAry**" function will limit the number of arguments of a function. So if a function have 5 necessary arguments, you can decide to limite to X <= 5.

**The function doesn't count spread args or conditional args**

It mean that ```nAry(function t(arg1: any, ...args) {})``` or ```nAry(function t(arg1: any, arg2?: any) {})``` will always be limited to 1 argument.

--------------
#### Example:
``` typescript
import { nAry } from '@keienla/functional';

function multipleArgsFn(arg1: number, arg2: string, arg3: number) {
    // Define default value for arg2 && arg3
    // because inference type can't get optional or spread types
    arg2 ??= ''
    arg3 ??= 1
    return (arg1 * arg3) + arg2
}

const nAry0 = nAry(multipleArgsFn, 0)
const nAry1 = nAry(multipleArgsFn, 1)
const nAry2 = nAry(multipleArgsFn, 2)
const nAry3 = nAry(multipleArgsFn, 3)

nAry0()             // 'NaN'
nAry1(2)            // '2'
nAry2(3, 'n')       // '3n'
nAry3(4, 'n', 3)    // '12n'

// Note that you can use function as curried
nAry2(3)('n')       // '3n'
```

``` typescript
// Doesn't working example

function multipleArgsFn(arg1?: any, arg2?: any): any {}

// Even 1 is passed as argument
// the number of argument permitted is 0
// because multipleArgsFn.length = 0
const nAry1 = nAry(multipleArgsFn, 1)

// Doesn't work
nAry1('test')
// Work
nAry1()
```