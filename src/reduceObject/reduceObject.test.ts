import reduceObject from './reduceObject';

describe('REDUCE_OBJECT', () => {
    test('Check if reduceObject work', () => {
        function reducer(x: number, y: number): number { return x + y };
        const reduced = reduceObject(reducer, 0, {a: 8, b: 8, c: 1, d: 3});

        expect(reduced).toBe(20);
    })
})
