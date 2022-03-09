import is from './is';

describe('IS', () => {
    test('Check if same two values', () => {
        expect(is(1, 1)).toBe(true)
    })

    test('Check if not same two values', () => {
        expect(is(1, 2)).toBe(false)
    })

    test('Check if same two values (array)', () => {
        expect(is([1], [1])).toBe(true)
    })

    test('Check if not same two values (array)', () => {
        expect(is([1], [2])).toBe(false)
    })

    test('Check if same two values (object)', () => {
        expect(is({a: 1}, {a: 1})).toBe(true)
    })

    test('Check if not same two values (object)', () => {
        expect(is({a: 1}, {a: 2})).toBe(false)
        expect(is({a: 1}, {b: 1})).toBe(false)
    })
})
