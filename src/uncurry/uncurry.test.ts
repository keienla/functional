import uncurry from './uncurry';
import curry from '../curry/curry';

describe('UNCURRY', () => {
    test('Uncurry a curried function', () => {
        const curried = (a: string) => (b: string) => a + b;
        const uncurried = uncurry(curried);

        expect(uncurried('a', 'b')).toBe('ab');
        expect(() => {
            // @ts-ignore: should throw because first arg doesn't return a function
            uncurried('a')('b');
        }).toThrow();

        expect(uncurried('a', 'b')).toBe('ab');
    });

    test('Uncurry a function with multiple parameters', () => {
        const curried = curry(
            (a: string, b: number, c: boolean) => a + b + (c ? '1' : '0'),
        );
        const uncurried = uncurry(curried);

        expect(uncurried('a', 1, true)).toBe('a11');
        expect(uncurried('b', 2, false)).toBe('b20');
    });

    test('Uncurry a function with default parameters', () => {
        const curried = curry(
            (a: string, b: number, c: boolean) => a + b + (c ? '1' : '0'),
            'foo',
            5,
        );
        const uncurried = uncurry(curried);

        expect(uncurried(true)).toBe('foo51');
        expect(uncurried(false)).toBe('foo50');
    });

    test('Uncurry a function with setted parameters', () => {
        const curried = curry(
            (a: string, b: number, c: boolean) => a + b + (c ? '1' : '0'),
        );
        const uncurried = uncurry(curried('test'));

        expect(uncurried(3, false)).toBe('test30');
        expect(uncurried(4, true)).toBe('test41');
    });

    test('Uncurry a single parameter function', () => {
        const curried = (x: number) => x * 2;
        const uncurried = uncurry(curried);

        expect(uncurried(5)).toBe(10);
        expect(uncurried(0)).toBe(0);
        expect(uncurried(-3)).toBe(-6);
    });

    test('Uncurry a deeply nested curried function', () => {
        const deepCurried =
            (a: number) => (b: number) => (c: number) => (d: number) =>
                a + b + c + d;
        const uncurried = uncurry(deepCurried);

        expect(uncurried(1, 2, 3, 4)).toBe(10);
        expect(uncurried(10, 20, 30, 40)).toBe(100);
    });

    test('Uncurry function returning objects', () => {
        const curried = (name: string) => (age: number) => ({ name, age });
        const uncurried = uncurry(curried);

        expect(uncurried('John', 25)).toEqual({ name: 'John', age: 25 });
        expect(uncurried('Jane', 30)).toEqual({ name: 'Jane', age: 30 });
    });

    test('Uncurry function returning arrays', () => {
        const curried = (a: number) => (b: number) => [a, b, a + b];
        const uncurried = uncurry(curried);

        expect(uncurried(2, 3)).toEqual([2, 3, 5]);
        expect(uncurried(10, 5)).toEqual([10, 5, 15]);
    });

    test('Uncurry with no arguments returns the original function', () => {
        const curried = (a: string) => (b: string) => a + b;
        const uncurried = uncurry(curried);

        // @ts-ignore: testing edge case with no arguments
        const result = uncurried();
        expect(typeof result).toBe('object');
        expect(result[0]).toBe(curried);
    });

    test('Uncurry handles excess arguments properly', () => {
        const curried = (a: number) => (b: number) => a + b;
        const uncurried = uncurry(curried);

        // The function should process only the required arguments
        expect(() => {
            // @ts-ignore: testing with extra arguments that cause issues
            uncurried(1, 2, 3, 4, 5);
        }).toThrow();
    });

    test('Uncurry with mixed parameter types', () => {
        const curried =
            (str: string) =>
            (num: number) =>
            (bool: boolean) =>
            (obj: { key: string }) =>
                `${str}-${num}-${bool}-${obj.key}`;
        const uncurried = uncurry(curried);

        expect(uncurried('test', 42, true, { key: 'value' })).toBe(
            'test-42-true-value',
        );
    });

    test('Uncurry preserves function behavior with different return types', () => {
        const numberCurried = (a: number) => (b: number) => a * b;
        const stringCurried = (a: string) => (b: string) => a.concat(b);
        const booleanCurried = (a: boolean) => (b: boolean) => a && b;

        const numberUncurried = uncurry(numberCurried);
        const stringUncurried = uncurry(stringCurried);
        const booleanUncurried = uncurry(booleanCurried);

        expect(numberUncurried(6, 7)).toBe(42);
        expect(stringUncurried('hello', 'world')).toBe('helloworld');
        expect(booleanUncurried(true, false)).toBe(false);
    });

    test('Uncurry round-trip with curry should work', () => {
        const original = (a: number, b: number, c: number) => a + b + c;
        const curried = curry(original);
        const uncurried = uncurry(curried);

        expect(uncurried(1, 2, 3)).toBe(6);
        expect(uncurried(10, 20, 30)).toBe(60);
    });

    test('Uncurry with partially applied curry function', () => {
        const original = (a: string, b: number, c: boolean, d: string) =>
            `${a}-${b}-${c}-${d}`;
        const curried = curry(original);
        const partiallyApplied = curried('start', 100);
        const uncurried = uncurry(partiallyApplied);

        expect(uncurried(true, 'end')).toBe('start-100-true-end');
        expect(uncurried(false, 'finish')).toBe('start-100-false-finish');
    });

    test('Uncurry with null and undefined values', () => {
        const curried = (a: any) => (b: any) => [a, b];
        const uncurried = uncurry(curried);

        expect(uncurried(null, undefined)).toEqual([null, undefined]);
        expect(uncurried(undefined, null)).toEqual([undefined, null]);
    });

    test('Uncurry maintains function identity through multiple calls', () => {
        const curried = (x: number) => (y: number) => x + y;
        const uncurried1 = uncurry(curried);
        const uncurried2 = uncurry(curried);

        expect(uncurried1(1, 2)).toBe(3);
        expect(uncurried2(1, 2)).toBe(3);
        expect(uncurried1).not.toBe(uncurried2); // Different function instances
    });
});
