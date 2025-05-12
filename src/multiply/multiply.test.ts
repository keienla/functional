import multiply from './multiply';

describe('MULTIPLY', () => {
    test('Check multiply', () => {
        expect(multiply(5, 3)).toBe(15);
        expect(multiply(5)(3)).toBe(15);
    });
});
