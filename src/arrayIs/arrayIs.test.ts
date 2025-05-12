import arrayIs from './arrayIs';

describe('ARRAY_IS', () => {
    test("Return true if it's array with sames values", () => {
        const o = { a: 1 };

        expect(arrayIs([1], [1])).toBe(true);
        expect(arrayIs([1, o], [1, o])).toBe(true);
    });

    test('Return false if not same order', () => {
        const o = { a: 1 };

        expect(arrayIs([1, o], [o, 1])).toBe(false);
    });

    test('Return false if not same elements', () => {
        expect(arrayIs([1], [2])).toBe(false);
    });
});
