import freeze from './freeze';

describe('FREEZE', () => {
    test('Check if first level array is Freezed', () => {
        const freezedArr = freeze([0,1,2,3,4]);

        expect(() => { freezedArr[0] = 5; }).toThrowError();
        expect(freezedArr[0]).toBe(0);
    })

    test('Check if second level array is not freezed', () => {
        const freezedArr = freeze([['a','b','c','d'],1,2,3,4]);

        expect(() => { freezedArr[0][0] = 'e'; }).not.toThrowError();
        expect(freezedArr[0][0]).toBe('e');
    })

    test('Check a first level object is freezed', () => {
        const freezedObj = freeze({ a: 0, b: 1, c: 2 })

        expect(() => { freezedObj.a = 5; }).toThrowError();
        expect(freezedObj.a).toBe(0);
    })

    test('Check if second level object is not freezed', () => {
        const freezedObj = freeze({ a: {d: 0, e: 1}, b: 1, c: 2 })

        expect(() => { freezedObj.a.d = 5; }).not.toThrowError();
        expect(freezedObj.a.d).toBe(5);
    })
})
