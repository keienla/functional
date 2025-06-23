import objectIs from './objectIs';

describe('OBJECT_IS', () => {
    test.each([
        [{ a: 'a', b: 'b' }, { a: 'a', b: 'b' }, true],
        [{ a: 'a', b: 'b' }, { b: 'b', a: 'a' }, true],
        [{ a: 'a', b: 'b' }, { a: 'a' }, false],
        [{ a: 'b', b: 'b' }, { a: 'a', b: 'b', c: 'c' }, false],
        [{ a: 'a', b: 'b' }, { a: 'b', b: 'b' }, false],
    ])('Check object %j, %j to be %j', (value1, value2, expected) => {
        expect(objectIs(value1, value2)).toBe(expected);
    });
});
