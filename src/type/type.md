[Home]('./../../../README.md)

# TYPE

The "**type**" function check the element and return a specific type in string element. The types are :
- 'string'
- 'array'
- 'object'
- 'number'
- 'function'
- 'boolean'
- 'undefined'
- 'bigint'
- 'symbol'
- 'null'
- 'regexp'
- 'generator'
- 'generatorfunction'

--------------
#### Example:
``` typescript
import { type } from '@keienla/functional';

type(undefined)     // undefined
type(null)          // null
type('a')           // string
type([])            // array
type({})            // object
type(1)             // number
type(() => {})      // function
type(false)         // boolean
type(BigInt(10))    // bigint
type(Symbol('foo')) // symbol
type(/a/g)          // regexp
```
