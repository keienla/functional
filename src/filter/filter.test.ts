import filter from './filter';

describe('FILTER', () => {
    test('Check if filter work', () => {
        function filterOdd(x: number): boolean { return x % 2 === 1 };
        const filtered = filter(filterOdd, [1,5,8]);

        expect(filtered).toEqual([1,5])
    })
})
