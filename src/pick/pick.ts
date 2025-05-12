import _pick from '../_internal/_pick';

/**
 * Return an object with a default object given and an array of key
 *
 * @param {object} obj the object from where the properties will be extracted
 * @param {string[]} propos the keys to extract from the object
 * @typedef {object} A object - the returned object
 * @returns {A} A
 * @example
 *  const obj1 = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 }
 *  const obj2 = pick(obj1, ['1', '5']); // will return { '1': 1, '5': 5 }
 *  const obj3 = pick(obj1, ['6']);  // will return { '6': undefined }
 */
export default function pick<T>(object: T, keys: Array<keyof T>): Partial<T>;
export default function pick<T>(
    object: T,
): (keys: Array<keyof T>) => Partial<T>;
export default function pick(...args: any): any {
    return _pick(...args);
}
