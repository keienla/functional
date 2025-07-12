import add from './add';

describe('ADD', () => {
    describe('Basic addition', () => {
        test('should add two positive numbers', () => {
            expect(add(3, 5)).toBe(8);
            expect(add(10, 25)).toBe(35);
        });

        test('should add negative numbers', () => {
            expect(add(-3, -5)).toBe(-8);
            expect(add(-10, -15)).toBe(-25);
        });

        test('should add positive and negative numbers', () => {
            expect(add(10, -5)).toBe(5);
            expect(add(-10, 15)).toBe(5);
        });

        test('should handle zero values', () => {
            expect(add(0, 0)).toBe(0);
            expect(add(5, 0)).toBe(5);
            expect(add(0, 7)).toBe(7);
        });
    });

    describe('Edge cases', () => {
        test('should handle decimal numbers with precise floating-point arithmetic', () => {
            expect(add(1.5, 2.3)).toBe(3.8);
            expect(add(0.1, 0.2)).toBe(0.3); // Should be exactly 0.3, not 0.30000000000000004
            expect(add(0.7, 0.1)).toBe(0.8);
            expect(add(2.22, 0.01)).toBe(2.23);
        });

        test('should handle complex decimal precision cases', () => {
            expect(add(0.1234, 0.5678)).toBe(0.6912);
            expect(add(1.005, 0.006)).toBe(1.011);
            expect(add(9.999, 0.001)).toBe(10);
            expect(add(0.123456789, 0.987654321)).toBe(1.11111111);
        });

        test('should handle very large numbers', () => {
            expect(add(Number.MAX_SAFE_INTEGER, 0)).toBe(Number.MAX_SAFE_INTEGER);
            expect(add(1000000, 2000000)).toBe(3000000);
        });

        test('should handle very small numbers', () => {
            expect(add(Number.MIN_SAFE_INTEGER, 0)).toBe(Number.MIN_SAFE_INTEGER);
            expect(add(-1000000, -2000000)).toBe(-3000000);
        });

        test('should handle infinity', () => {
            expect(add(Infinity, 5)).toBe(Infinity);
            expect(add(5, Infinity)).toBe(Infinity);
            expect(add(-Infinity, 5)).toBe(-Infinity);
            expect(add(Infinity, -Infinity)).toBeNaN();
        });

        test('should handle NaN', () => {
            expect(add(NaN, 5)).toBeNaN();
            expect(add(5, NaN)).toBeNaN();
            expect(add(NaN, NaN)).toBeNaN();
        });
    });
});
