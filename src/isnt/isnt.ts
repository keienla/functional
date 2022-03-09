'use strict';

import _isnt from '../_internal/_isnt';

/**
 * Return the opposite of [is()]{@link ./is.ts}.
 */
export default function isnt<T extends any>(el1: T, el2: T): boolean;
export default function isnt<T extends any>(el1: T): (el2: T) => boolean;
export default function isnt<T extends any>(...args: any): any {
    return _isnt(...args);
}
