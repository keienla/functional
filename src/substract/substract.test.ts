import substract from './substract';

describe('SUBSTRACT', () => {
    test('Check substract', () => {
        expect(substract(5, 3)).toBe(2);
        expect(substract(5)(1)).toBe(4);
    });
});
