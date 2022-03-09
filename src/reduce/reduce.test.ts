import reduce from './reduce';

describe('REDUCE', () => {
    test('Check if reduce work', () => {
        function reducer(x: number, y: number): number { return x + y };
        const reduced = reduce(reducer, 0, [8,8,1,3]);

        expect(reduced).toBe(20);
    })
})
