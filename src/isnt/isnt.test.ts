import isnt from './isnt';

describe('ISNT', () => {
    test('Check if same two values', () => {
        expect(isnt(1, 1)).toBe(false)
    })

    test('Check if not same two values', () => {
        expect(isnt(1, 2)).toBe(true)
    })

    test('Check if same two values (array)', () => {
        expect(isnt([1], [1])).toBe(false)
    })

    test('Check if not same two values (array)', () => {
        expect(isnt([1], [2])).toBe(true)
    })

    test('Check if same two values (object)', () => {
        expect(isnt({a: 1}, {a: 1})).toBe(false)
    })

    test('Check if not same two values (object)', () => {
        expect(isnt({a: 1}, {a: 2})).toBe(true)
        expect(isnt({a: 1}, {b: 1})).toBe(true)
    })
})