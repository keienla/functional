import filterObject from './filterObject';

describe('FILTER_OBJECT', () => {
    test('Check if filterObject work', () => {
        function filterOdd(x: number): boolean { return x % 2 === 1 };
        const filtered = filterObject(filterOdd, {a: 1, b: 5, c: 8});

        expect(filtered).toEqual({a: 1, b: 5})
    })
})
