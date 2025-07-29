import unAry from './unAry';

// Mock the nAry module
jest.mock('../nAry/nAry', () => {
    const mockFn = jest.fn((fn, length) => {
        // Return a simple mock that simulates nAry behavior
        return (...args: any[]) => {
            const limitedArgs = args.slice(0, length);
            return fn(...limitedArgs);
        };
    });
    return {
        __esModule: true,
        default: mockFn,
    };
});

import _nAry from '../nAry/nAry';

describe('UNARY', () => {
    const mockNAry = _nAry as jest.MockedFunction<typeof _nAry>;

    beforeEach(() => {
        mockNAry.mockClear();
    });

    function multipleArgsFn(arg1: number, arg2: string, arg3: number) {
        // Define default value for arg2 && arg3
        // because inference type can't get optional or spread types
        arg2 ??= '';
        arg3 ??= 1;
        return arg1 * arg3 + arg2;
    }

    test('Check unAry functionality', () => {
        const unAryFn = unAry(multipleArgsFn);
        // With mock, unAryFn(5) calls multipleArgsFn with only first argument
        // multipleArgsFn(5, undefined, undefined) = 5 * 1 + '' = '5'
        expect(unAryFn(5)).toBe('5');

        // Verify the mock was called correctly
        expect(mockNAry).toHaveBeenCalledWith(multipleArgsFn, 1);
    });

    test('Should call _nAry with correct arguments', () => {
        const testFn = jest.fn((x: number) => x * 2);

        unAry(testFn);

        expect(mockNAry).toHaveBeenCalledTimes(1);
        expect(mockNAry).toHaveBeenCalledWith(testFn, 1);
    });

    test('Should call _nAry once for each unAry call', () => {
        const fn1 = (x: number) => x + 1;
        const fn2 = (x: string) => x.toUpperCase();
        const fn3 = (x: boolean) => !x;

        unAry(fn1);
        unAry(fn2);
        unAry(fn3);

        expect(mockNAry).toHaveBeenCalledTimes(3);
        expect(mockNAry).toHaveBeenNthCalledWith(1, fn1, 1);
        expect(mockNAry).toHaveBeenNthCalledWith(2, fn2, 1);
        expect(mockNAry).toHaveBeenNthCalledWith(3, fn3, 1);
    });

    test('Should always pass 1 as the second argument to _nAry', () => {
        const functions = [
            (a: number, b: number, c: number) => a + b + c,
            (x: string, y: string, z: string, w: string) => x + y + z + w,
            (p: boolean) => p,
            (...args: any[]) => args.length,
        ];

        functions.forEach((fn) => {
            unAry(fn);
        });

        expect(mockNAry).toHaveBeenCalledTimes(4);
        mockNAry.mock.calls.forEach((call) => {
            expect(call[1]).toBe(1); // Second argument should always be 1
        });
    });

    test('Should pass function with different parameter types', () => {
        const stringFn = (s: string) => s.length;
        const numberFn = (n: number) => n * 2;
        const booleanFn = (b: boolean) => !b;
        const objectFn = (obj: { key: string }) => obj.key;

        unAry(stringFn);
        unAry(numberFn);
        unAry(booleanFn);
        unAry(objectFn);

        expect(mockNAry).toHaveBeenNthCalledWith(1, stringFn, 1);
        expect(mockNAry).toHaveBeenNthCalledWith(2, numberFn, 1);
        expect(mockNAry).toHaveBeenNthCalledWith(3, booleanFn, 1);
        expect(mockNAry).toHaveBeenNthCalledWith(4, objectFn, 1);
    });

    test('Should handle functions with spread parameters', () => {
        const spreadFn = (...args: number[]) => args.reduce((a, b) => a + b, 0);

        unAry(spreadFn);

        expect(mockNAry).toHaveBeenCalledWith(spreadFn, 1);
    });

    test('Should handle functions with no parameters', () => {
        const noParamFn = () => 'constant';

        unAry(noParamFn);

        expect(mockNAry).toHaveBeenCalledWith(noParamFn, 1);
    });

    test('Should handle functions with optional parameters', () => {
        const optionalParamFn = (a: number, b?: string, c?: boolean) =>
            `${a}-${b || 'default'}-${c || false}`;

        unAry(optionalParamFn);

        expect(mockNAry).toHaveBeenCalledWith(optionalParamFn, 1);
    });

    test('Should return the result from _nAry', () => {
        const mockResult = jest.fn() as any;
        mockNAry.mockReturnValue(mockResult);

        const testFn = (x: number) => x * 2;
        const result = unAry(testFn);

        expect(result).toBe(mockResult);
        expect(mockNAry).toHaveBeenCalledWith(testFn, 1);
    });

    test('Should preserve function identity when passed to _nAry', () => {
        const originalFn = (a: number, b: string, c: boolean) =>
            `${a}-${b}-${c}`;

        unAry(originalFn);

        const [calledFn, calledLength] = mockNAry.mock.calls[0];
        expect(calledFn).toBe(originalFn); // Exact same function reference
        expect(calledLength).toBe(1);
    });

    test('Should handle complex function signatures', () => {
        interface ComplexObject {
            id: number;
            name: string;
            nested: { value: boolean };
        }

        const complexFn = (
            obj: ComplexObject,
            callback: (x: number) => string,
            ...rest: any[]
        ) => callback(obj.id) + obj.name + rest.length;

        unAry(complexFn);

        expect(mockNAry).toHaveBeenCalledWith(complexFn, 1);
    });

    test('Should not call _nAry with undefined arguments', () => {
        const testFn = (x: number) => x + 1;

        unAry(testFn);

        const call = mockNAry.mock.calls[0];
        expect(call[0]).toBeDefined();
        expect(call[1]).toBeDefined();
        expect(call[1]).toBe(1);
        expect(call.length).toBe(2); // Only two arguments should be passed
    });

    test('Should handle arrow functions', () => {
        const arrowFn = (x: number, y: number) => x + y;

        unAry(arrowFn);

        expect(mockNAry).toHaveBeenCalledWith(arrowFn, 1);
    });

    test('Should handle function expressions', () => {
        const functionExpr = function (a: string, b: number) {
            return a.repeat(b);
        };

        unAry(functionExpr);

        expect(mockNAry).toHaveBeenCalledWith(functionExpr, 1);
    });

    test('Should handle methods', () => {
        const obj = {
            method: function (x: number, y: number) {
                return x * y;
            },
        };

        unAry(obj.method);

        expect(mockNAry).toHaveBeenCalledWith(obj.method, 1);
    });
});
