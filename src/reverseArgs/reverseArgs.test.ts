import reverseArgs from './reverseArgs';

describe('REVERSE_ARGS', () => {
    // Mock Array.prototype.reverse to test that it's called
    let originalReverse: typeof Array.prototype.reverse;
    let mockReverse: jest.SpyInstance;

    beforeEach(() => {
        originalReverse = Array.prototype.reverse;
        mockReverse = jest
            .spyOn(Array.prototype, 'reverse')
            .mockImplementation(function () {
                // Call the original reverse method
                return originalReverse.call(this);
            });
    });

    afterEach(() => {
        mockReverse.mockRestore();
    });

    test('Check if a function with no argument return a function with no argument', () => {
        const fn = () => {
            return 0;
        };
        const reversedFn = reverseArgs(fn);

        expect(reversedFn()).toBe(0);
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Check if a normal function have the args reversed', () => {
        const fn = (x: number, y: number) => {
            return x / y;
        };
        const reversedFn = reverseArgs(fn);

        expect(fn(10, 5)).toBe(2);
        expect(reversedFn(5, 10)).toBe(2);
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Should call Array.prototype.reverse on arguments', () => {
        const fn = (a: string, b: number, c: boolean) => `${a}-${b}-${c}`;
        const reversedFn = reverseArgs(fn);

        reversedFn(true, 42, 'hello');

        expect(mockReverse).toHaveBeenCalledTimes(1);
        expect(mockReverse).toHaveBeenCalledWith();
    });

    test('Should reverse arguments for three parameter function', () => {
        const fn = (first: string, second: number, third: boolean) => {
            return { first, second, third };
        };
        const reversedFn = reverseArgs(fn);

        const result = reversedFn(true, 42, 'hello');

        expect(result).toEqual({ first: 'hello', second: 42, third: true });
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Should reverse arguments for four parameter function', () => {
        const fn = (a: number, b: string, c: boolean, d: object) => [
            a,
            b,
            c,
            d,
        ];
        const reversedFn = reverseArgs(fn);

        const obj = { test: true };
        const result = reversedFn(obj, false, 'world', 123);

        expect(result).toEqual([123, 'world', false, obj]);
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Should handle single parameter function', () => {
        const fn = (value: string) => value.toUpperCase();
        const reversedFn = reverseArgs(fn);

        const result = reversedFn('hello');

        expect(result).toBe('HELLO');
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Should preserve function return type', () => {
        const fn = (x: number, y: number) => ({ sum: x + y, product: x * y });
        const reversedFn = reverseArgs(fn);

        const result = reversedFn(3, 5);

        expect(result).toEqual({ sum: 8, product: 15 });
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Should handle functions with mixed parameter types', () => {
        const fn = (
            str: string,
            num: number,
            bool: boolean,
            arr: any[],
            obj: object,
        ) => {
            return { str, num, bool, arr, obj };
        };
        const reversedFn = reverseArgs(fn);

        const testObj = { key: 'value' };
        const testArr = [1, 2, 3];
        const result = reversedFn(testObj, testArr, true, 42, 'test');

        expect(result).toEqual({
            str: 'test',
            num: 42,
            bool: true,
            arr: testArr,
            obj: testObj,
        });
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Should work with arrow functions', () => {
        const fn = (a: number, b: number) => a - b;
        const reversedFn = reverseArgs(fn);

        expect(fn(10, 3)).toBe(7);
        expect(reversedFn(3, 10)).toBe(7);
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Should work with function expressions', () => {
        const fn = function (x: string, y: string) {
            return x + y;
        };
        const reversedFn = reverseArgs(fn);

        expect(fn('hello', 'world')).toBe('helloworld');
        expect(reversedFn('world', 'hello')).toBe('helloworld');
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Should handle functions with undefined arguments', () => {
        const fn = (a: any, b: any, c: any) => [a, b, c];
        const reversedFn = reverseArgs(fn);

        const result = reversedFn(undefined, null, 'defined');

        expect(result).toEqual(['defined', null, undefined]);
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Should handle functions that throw errors', () => {
        const fn = (shouldThrow: boolean, message: string) => {
            if (shouldThrow) throw new Error(message);
            return 'success';
        };
        const reversedFn = reverseArgs(fn);

        expect(reversedFn('error', false)).toBe('success');

        expect(() => reversedFn('test error', true)).toThrow('test error');
        expect(mockReverse).toHaveBeenCalledTimes(2);
    });

    test('Should handle large number of arguments', () => {
        const fn = (...args: number[]) => args.reduce((sum, n) => sum + n, 0);
        const reversedFn = reverseArgs(fn);

        const args = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        // @ts-ignore: Testing with spread arguments
        const result = reversedFn(...args);

        expect(result).toBe(55); // Sum of 1-10
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Should handle functions returning functions', () => {
        const fn = (x: number, y: number) => (z: number) => x + y + z;
        const reversedFn = reverseArgs(fn);

        const innerFn = reversedFn(5, 10);
        const result = innerFn(3);

        expect(result).toBe(18); // 10 + 5 + 3
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Should maintain argument order correctness with complex example', () => {
        const fn = (
            name: string,
            age: number,
            active: boolean,
            tags: string[],
        ) => {
            return `${name} (${age}) is ${active ? 'active' : 'inactive'} with tags: ${tags.join(', ')}`;
        };
        const reversedFn = reverseArgs(fn);

        const result = reversedFn(['dev', 'senior'], true, 30, 'John');

        expect(result).toBe('John (30) is active with tags: dev, senior');
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Should work when reverse method is mocked to return different order', () => {
        // Override mock to test custom reverse behavior
        mockReverse.mockImplementation(function () {
            // Return the array as-is (no reversal) to test mock effectiveness
            return this;
        });

        const fn = (a: string, b: string) => a + b;
        const reversedFn = reverseArgs(fn);

        const result = reversedFn('world', 'hello');

        // With no reversal, it should be 'world' + 'hello'
        expect(result).toBe('worldhello');
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Should handle when reverse method throws error', () => {
        mockReverse.mockImplementation(function () {
            throw new Error('Reverse failed');
        });

        const fn = (a: number, b: number) => a + b;
        const reversedFn = reverseArgs(fn);

        expect(() => reversedFn(1, 2)).toThrow('Reverse failed');
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Should call reverse exactly once per function call', () => {
        const fn = (a: number, b: number, c: number) => a + b + c;
        const reversedFn = reverseArgs(fn);

        reversedFn(1, 2, 3);
        expect(mockReverse).toHaveBeenCalledTimes(1);

        reversedFn(4, 5, 6);
        expect(mockReverse).toHaveBeenCalledTimes(2);

        reversedFn(7, 8, 9);
        expect(mockReverse).toHaveBeenCalledTimes(3);
    });

    test('Should preserve argument types through reversal', () => {
        const fn = (str: string, num: number, bool: boolean) => {
            return {
                strType: typeof str,
                numType: typeof num,
                boolType: typeof bool,
                values: [str, num, bool],
            };
        };
        const reversedFn = reverseArgs(fn);

        const result = reversedFn(true, 42, 'hello');

        expect(result).toEqual({
            strType: 'string',
            numType: 'number',
            boolType: 'boolean',
            values: ['hello', 42, true],
        });
        expect(mockReverse).toHaveBeenCalledTimes(1);
    });

    test('Should work with functions that modify their arguments', () => {
        const fn = (arr: number[], multiplier: number) => {
            return arr.map((x) => x * multiplier);
        };
        const reversedFn = reverseArgs(fn);

        const testArray = [1, 2, 3];
        const result = reversedFn(2, testArray);

        expect(result).toEqual([2, 4, 6]);
        expect(mockReverse).toHaveBeenCalledTimes(1);
        // Original array should be unchanged
        expect(testArray).toEqual([1, 2, 3]);
    });
});
