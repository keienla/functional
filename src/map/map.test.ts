import map from './map';

describe('MAP', () => {
    test('Check if map function work', () => {
        function addOne(x: number): number {
            return x + 1;
        }
        const mapped = map(addOne, [1, 5, 8]);

        expect(mapped).toEqual([2, 6, 9]);
    });
});
