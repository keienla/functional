import deepFreeze from './deepFreeze';

describe('FREEZE', () => {
    test('Check if first level array is Freezed', () => {
        const freezedArr = deepFreeze([0,1,2,3,4]);

        expect(() => { freezedArr[0] = 5; }).toThrowError();
        expect(freezedArr[0]).toBe(0);
    })

    test('Check if second level array is freezed too', () => {
        const freezedArr = deepFreeze([['a','b','c','d'],1,2,3,4]);

        expect(() => { freezedArr[0][0] = 'e'; }).toThrowError();
        expect(freezedArr[0][0]).toBe('a');
    })

    test('Check a first level object is freezed', () => {
        const freezedObj = deepFreeze({ a: 0, b: 1, c: 2 })

        expect(() => { freezedObj.a = 5; }).toThrowError();
        expect(freezedObj.a).toBe(0);
    })

    test('Check if second level object is freezed too', () => {
        const freezedObj = deepFreeze({ a: {d: 0, e: 1}, b: 1, c: 2 })

        expect(() => { freezedObj.a.d = 5; }).toThrowError();
        expect(freezedObj.a.d).toBe(0);
    })
})
