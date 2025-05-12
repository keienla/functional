import whenElse from './whenElse';

describe('WHEN_ELSE', () => {
    function isOdd(x: number): boolean {
        return x % 2 === 1 || x % 2 === -1;
    }
    function addOne(x: number): number {
        return x + 1;
    }
    function addTwo(x: number): number {
        return x + 2;
    }
    const transformToEvenOrAdd: (x: number) => number = whenElse(
        isOdd,
        addOne,
        addTwo,
    );

    test('Check if add 2 if the element is an even number', () => {
        expect(transformToEvenOrAdd(10)).toBe(12);
        expect(transformToEvenOrAdd(0)).toBe(2);
        expect(transformToEvenOrAdd(-6)).toBe(-4);
    });

    test('Check if transform into an even number if the given element is an odd number', () => {
        expect(transformToEvenOrAdd(9)).toBe(10);
        expect(transformToEvenOrAdd(1)).toBe(2);
        expect(transformToEvenOrAdd(-5)).toBe(-4);
    });
});
