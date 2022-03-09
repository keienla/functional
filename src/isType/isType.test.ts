import isType, {isArray, isObject, isBigint, isBoolean, isFunction, isGenerator, isGeneratorFunction, isNull, isNumber, isRegexp, isString, isSymbol, isUndefined} from './isType';

describe('IS_TYPE', () => {
    test('Check is array', () => {
        const arr = [];
        const obj = {};

        expect(isType('array', arr)).toBe(true);
        expect(isArray(arr)).toBe(true);

        expect(isType('array', obj)).toBe(false);
        expect(isArray(obj)).toBe(false);
    })

    test('Check is object', () => {
        const obj = {};
        const arr = [];

        expect(isType('object', obj)).toBe(true);
        expect(isObject(obj)).toBe(true);

        expect(isType('object', arr)).toBe(false);
        expect(isObject(arr)).toBe(false);
    })

    test('Check is boolean', () => {
        expect(isType('boolean', true)).toBe(true);
        expect(isBoolean(true)).toBe(true);
        expect(isType('boolean', false)).toBe(true);
        expect(isBoolean(false)).toBe(true);

        expect(isType('boolean', 1)).toBe(false);
        expect(isBoolean(1)).toBe(false);
    })

    test('Check is function', () => {
        const fn0 = () => {};
        const fn1 = function () {};
        const fn2 = new Function('a', 'b', 'return a + b')
        const arr = [];

        expect(isType('function', fn0)).toBe(true);
        expect(isFunction(fn0)).toBe(true);
        expect(isType('function', fn1)).toBe(true);
        expect(isFunction(fn1)).toBe(true);
        expect(isType('function', fn2)).toBe(true);
        expect(isFunction(fn2)).toBe(true);

        expect(isType('function', arr)).toBe(false);
        expect(isFunction(arr)).toBe(false);
    })

    test('Check is generator function', () => {
        const fn = function* () {};
        const arr = [];

        expect(isType('generatorfunction', fn)).toBe(true);
        expect(isGeneratorFunction(fn)).toBe(true);

        expect(isType('generatorfunction', arr)).toBe(false);
        expect(isGeneratorFunction(arr)).toBe(false);
    })

    test('Check is generator', () => {
        const fn = function* () {};
        const arr = [];

        expect(isType('generator', fn())).toBe(true);
        expect(isGenerator(fn())).toBe(true);

        expect(isType('generator', arr)).toBe(false);
        expect(isGenerator(arr)).toBe(false);
    })

    test('Check is null', () => {
        expect(isType('null', null)).toBe(true);
        expect(isNull(null)).toBe(true);

        expect(isType('null', undefined)).toBe(false);
        expect(isNull(undefined)).toBe(false);
        expect(isType('null', 1)).toBe(false);
        expect(isNull(1)).toBe(false);
    })

    test('Check is undefined', () => {
        expect(isType('undefined', undefined)).toBe(true);
        expect(isUndefined(undefined)).toBe(true);

        expect(isType('undefined', null)).toBe(false);
        expect(isUndefined(null)).toBe(false);
        expect(isType('undefined', 0)).toBe(false);
        expect(isUndefined(0)).toBe(false);
    })

    test('Check is number', () => {
        expect(isType('number', 1)).toBe(true);
        expect(isNumber(1)).toBe(true);
        expect(isType('number', 0)).toBe(true);
        expect(isNumber(0)).toBe(true);
        expect(isType('number', -1)).toBe(true);
        expect(isNumber(-1)).toBe(true);
        expect(isType('number', 0.5)).toBe(true);
        expect(isNumber(0.5)).toBe(true);

        expect(isType('number', '1')).toBe(false);
        expect(isNumber('1')).toBe(false);
    })

    test('Check is string', () => {
        expect(isType('string', '')).toBe(true);
        expect(isString('')).toBe(true);
        expect(isType('string', 'a')).toBe(true);
        expect(isString('a')).toBe(true);

        expect(isType('string', 1)).toBe(false);
        expect(isString(1)).toBe(false);
    })

    test('Check is regexp', () => {
        expect(isType('regexp', /a/g)).toBe(true);
        expect(isRegexp(/a/g)).toBe(true);
        expect(isType('regexp', new RegExp('a', 'g'))).toBe(true);
        expect(isRegexp(new RegExp('a', 'g'))).toBe(true);

        expect(isType('regexp', 1)).toBe(false);
        expect(isRegexp(1)).toBe(false);
    })

    test('Check is symbol', () => {
        expect(isType('symbol', Symbol())).toBe(true);
        expect(isSymbol(Symbol())).toBe(true);
        expect(isType('symbol', Symbol('a'))).toBe(true);
        expect(isSymbol(Symbol('a'))).toBe(true);

        expect(isType('symbol', 1)).toBe(false);
        expect(isSymbol(1)).toBe(false);
    })
})
