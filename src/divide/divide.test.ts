import divide from './divide';

describe('DIVIDE', () => {
    test('Check divide', () => {
        expect(divide(50, 100)).toBe(0.5);
        expect(() => {
            divide(50, 0);
        }).toThrow();
    });
});
