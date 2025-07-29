import transpoline from './transpoline';

describe('TRANSPOLINE', () => {
    test('Throw error when too much recursion', () => {
        const sumBelow = (number: number, sum: number = 0): number => {
            return number === 0 ? sum : sumBelow(number - 1, sum + number);
        };

        expect(() => {
            sumBelow(100000);
        }).toThrow();
    });

    test('Finish the recursive with transpoline', () => {
        const sumBelow = (number: number, sum: number = 0) => {
            return number === 0
                ? sum
                : () => {
                      return sumBelow(number - 1, sum + number);
                  };
        };

        const tSumBelow = transpoline(sumBelow);

        expect(tSumBelow(100000)).toBe(5000050000);
    });

    test('Handle base case without recursion', () => {
        const alwaysReturn42 = () => 42;
        const tAlwaysReturn42 = transpoline(alwaysReturn42);

        expect(tAlwaysReturn42()).toBe(42);
    });

    test('Handle single level of recursion', () => {
        const singleRecursion = (n: number) => {
            return n === 0 ? 'done' : () => 'single step';
        };

        const tSingleRecursion = transpoline(singleRecursion);

        expect(tSingleRecursion(1)).toBe('single step');
        expect(tSingleRecursion(0)).toBe('done');
    });

    test('Handle factorial calculation', () => {
        const factorial = (n: number, acc: number = 1) => {
            return n <= 1 ? acc : () => factorial(n - 1, acc * n);
        };

        const tFactorial = transpoline(factorial);

        expect(tFactorial(5)).toBe(120);
        expect(tFactorial(0)).toBe(1);
        expect(tFactorial(1)).toBe(1);
        expect(tFactorial(10)).toBe(3628800);
    });

    test('Handle Fibonacci sequence', () => {
        const fib = (n: number, a: number = 0, b: number = 1) => {
            return n === 0 ? a : () => fib(n - 1, b, a + b);
        };

        const tFib = transpoline(fib);

        expect(tFib(0)).toBe(0);
        expect(tFib(1)).toBe(1);
        expect(tFib(5)).toBe(5);
        expect(tFib(10)).toBe(55);
    });

    test('Handle multiple parameters', () => {
        const multiParam = (a: number, b: string, c: boolean) => {
            return a === 0 ? `${b}-${c}` : () => multiParam(a - 1, b + '!', !c);
        };

        const tMultiParam = transpoline(multiParam);

        expect(tMultiParam(3, 'test', true)).toBe('test!!!-false');
        expect(tMultiParam(0, 'base', false)).toBe('base-false');
    });

    test('Handle deep nested recursion', () => {
        const countdown = (n: number, result: string = '') => {
            return n === 0
                ? result + '0'
                : () => countdown(n - 1, result + n.toString());
        };

        const tCountdown = transpoline(countdown);

        expect(tCountdown(5)).toBe('543210');
        expect(tCountdown(1000)).toHaveLength(2894); // Length of concatenated string from 1000 down to 0
    });

    test('Handle function returning objects', () => {
        const buildObject = (depth: number, obj: any = {}) => {
            return depth === 0
                ? obj
                : () =>
                      buildObject(depth - 1, {
                          ...obj,
                          [`key${depth}`]: depth,
                      });
        };

        const tBuildObject = transpoline(buildObject);

        const result = tBuildObject(3);
        expect(result).toEqual({ key3: 3, key2: 2, key1: 1 });
    });

    test('Handle function returning arrays', () => {
        const buildArray = (n: number, arr: number[] = []) => {
            return n === 0 ? arr : () => buildArray(n - 1, [n, ...arr]);
        };

        const tBuildArray = transpoline(buildArray);

        expect(tBuildArray(5)).toEqual([1, 2, 3, 4, 5]);
        expect(tBuildArray(0)).toEqual([]);
    });

    test('Handle function with no parameters that recurses', () => {
        let counter = 0;
        const recursiveCounter = () => {
            counter++;
            return counter >= 5 ? counter : () => recursiveCounter();
        };

        const tRecursiveCounter = transpoline(recursiveCounter);

        counter = 0; // Reset counter
        expect(tRecursiveCounter()).toBe(5);
    });

    test('Handle very large recursion that would normally cause stack overflow', () => {
        const largeRecursion = (n: number, acc: number = 0) => {
            return n === 0 ? acc : () => largeRecursion(n - 1, acc + 1);
        };

        const tLargeRecursion = transpoline(largeRecursion);

        // This would cause stack overflow without transpoline
        expect(tLargeRecursion(500000)).toBe(500000);
    });
});
