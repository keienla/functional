'use strict';

import length from './../length/length';
import curry from '../curry/curry';

/**
 * Check if two elements have the same length.
 * If one of the element type can't have a length that can be calculated, return false.
 * @example
 *  const el1: string = 'ab';
 *  const el2: number[] = [1, 2];
 *  const el3: number = 2;
 *
 *  sameLength(el1, el1);    // true
 *  sameLength(el1, el2);    // true
 *  sameLength(el1, el3);    // false
 *
 * @param {any} el1
 * @param {any} el2
 * @returns {boolean} boolean
 */
export default curry(function sameLength(el1: any, el2: any): boolean {
    const el1Length: number | null = length(el1);
    const el2Length: number | null = length(el2);

    if(el1Length === null || el2Length === null) return false;

    return el1Length === el2Length;
})
