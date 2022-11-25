/**
 * Check if two arrays are the same.
 * @example
 *  const arr1: number[] = [0,1,2,3];
 *  const arr2: number[] = [0,1,2,3];
 *  const arr3: any[] = ['0',1,2,3];
 *  const arr4: number[] = [0];
 *
 *  arrayIs(arr1, arr1);     // true
 *  arrayIs(arr1, arr2);     // true
 *  arrayIs(arr1, arr3);     // false
 *  arrayIs(arr1, arr4);     // false
 *
 * @param {any[]} array
 * @param {any[]} arrayToCompare
 * @returns {boolean}
 */
export default function arrayIs<T extends any[]>(array1: T, array2: T): boolean;
export default function arrayIs<T extends any[]>(array1: T): (array2: T) => boolean;
//# sourceMappingURL=arrayIs.d.ts.map