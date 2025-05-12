import when from './when';

describe('WHEN', () => {
    function isOdd(x: number): boolean {
        return x % 2 === 1 || x % 2 === -1;
    }
    function addOne(x: number): number {
        return x + 1;
    }
    const transformToEven: (x: number) => number = when(isOdd, addOne);

    test('Check if do nothing if the element is an even number', () => {
        expect(transformToEven(10)).toBe(10);
        expect(transformToEven(0)).toBe(0);
        expect(transformToEven(-6)).toBe(-6);
    });

    test('Check if transform into an even number if the given element is an odd number', () => {
        expect(transformToEven(9)).toBe(10);
        expect(transformToEven(1)).toBe(2);
        expect(transformToEven(-5)).toBe(-4);
    });
});
