import type from './type';

describe('TYPE', () => {
    test('Check string type', () => {
        expect(type('')).toBe('string');
        expect(type('a')).toBe('string');
        expect(type(new String('qzd'))).toBe('string');
    })

    test('Check array type', () => {
        expect(type([])).toBe('array');
        expect(type(['a'])).toBe('array');
        expect(type(new Array())).toBe('array');
    })

    test('Check object type', () => {
        expect(type({})).toBe('object');
        expect(type({a: 0})).toBe('object');
        expect(type(new Object({'a': 0}))).toBe('object');
    })

    test('Check number type', () => {
        expect(type(0)).toBe('number');
        expect(type(1)).toBe('number');
        expect(type(-1)).toBe('number');
        expect(type(0.5)).toBe('number');
    })

    test('Check function type', () => {
        expect(type(() => {})).toBe('function');
        expect(type(function fn() {})).toBe('function');
        expect(type(new Function('a', 'b', 'return a + b'))).toBe('function');
    })

    test('Check boolean type', () => {
        expect(type(true)).toBe('boolean');
        expect(type(false)).toBe('boolean');
    })

    test('Check undefined type', () => {
        expect(type(undefined)).toBe('undefined');
    })

    test('Check symbol type', () => {
        expect(type(Symbol('a'))).toBe('symbol');
    })

    test('Check null type', () => {
        expect(type(null)).toBe('null');
    })

    test('Check regexp type', () => {
        expect(type(/a/g)).toBe('regexp');
        expect(type(new RegExp('a', 'g'))).toBe('regexp');
    })

    test('Check generator function type', () => {
        expect(type(function* a() {yield 0})).toBe('generatorfunction');
    })

    test('Check generator type', () => {
        function* a() {yield 0}
        expect(type(a())).toBe('generator');
    })
})
