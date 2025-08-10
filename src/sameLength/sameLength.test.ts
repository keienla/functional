import sameLength from './sameLength';

// Mock the length module
jest.mock('../length/length', () => {
    const mockFn = jest.fn((el: any) => {
        // Mock implementation that simulates the length function behavior
        if (el === null || el === undefined) return null;
        if (typeof el === 'string') return el.length;
        if (Array.isArray(el)) return el.length;
        if (typeof el === 'function') return el.length;
        if (typeof el === 'object') return Object.keys(el).length;
        return null; // For numbers, booleans, etc.
    });
    return {
        __esModule: true,
        default: mockFn,
    };
});

import length from '../length/length';

describe('SAME_LENGTH', () => {
    const mockLength = length as jest.MockedFunction<typeof length>;

    beforeEach(() => {
        mockLength.mockClear();
    });

    test('Should call length function with both arguments', () => {
        const el1 = 'hello';
        const el2 = [1, 2, 3, 4, 5];

        sameLength(el1, el2);

        expect(mockLength).toHaveBeenCalledTimes(2);
        expect(mockLength).toHaveBeenNthCalledWith(1, el1);
        expect(mockLength).toHaveBeenNthCalledWith(2, el2);
    });

    test('Should return true when both elements have same length', () => {
        const el1 = 'abc';
        const el2 = [1, 2, 3];

        mockLength.mockReturnValueOnce(3).mockReturnValueOnce(3);

        const result = sameLength(el1, el2);

        expect(result).toBe(true);
        expect(mockLength).toHaveBeenCalledWith(el1);
        expect(mockLength).toHaveBeenCalledWith(el2);
    });

    test('Should return false when elements have different lengths', () => {
        const el1 = 'hello';
        const el2 = [1, 2];

        mockLength.mockReturnValueOnce(5).mockReturnValueOnce(2);

        const result = sameLength(el1, el2);

        expect(result).toBe(false);
        expect(mockLength).toHaveBeenCalledWith(el1);
        expect(mockLength).toHaveBeenCalledWith(el2);
    });

    test('Should return false when first element has null length', () => {
        const el1 = 42;
        const el2 = 'hello';

        mockLength.mockReturnValueOnce(null).mockReturnValueOnce(5);

        const result = sameLength(el1, el2);

        expect(result).toBe(false);
        expect(mockLength).toHaveBeenCalledWith(el1);
        expect(mockLength).toHaveBeenCalledWith(el2);
    });

    test('Should return false when second element has null length', () => {
        const el1 = 'world';
        const el2 = true;

        mockLength.mockReturnValueOnce(5).mockReturnValueOnce(null);

        const result = sameLength(el1, el2);

        expect(result).toBe(false);
        expect(mockLength).toHaveBeenCalledWith(el1);
        expect(mockLength).toHaveBeenCalledWith(el2);
    });

    test('Should return false when both elements have null length', () => {
        const el1 = 123;
        const el2 = false;

        mockLength.mockReturnValueOnce(null).mockReturnValueOnce(null);

        const result = sameLength(el1, el2);

        expect(result).toBe(false);
        expect(mockLength).toHaveBeenCalledWith(el1);
        expect(mockLength).toHaveBeenCalledWith(el2);
    });

    test('Should handle zero length elements', () => {
        const el1 = '';
        const el2: any[] = [];

        mockLength.mockReturnValueOnce(0).mockReturnValueOnce(0);

        const result = sameLength(el1, el2);

        expect(result).toBe(true);
        expect(mockLength).toHaveBeenCalledWith(el1);
        expect(mockLength).toHaveBeenCalledWith(el2);
    });

    test('Should handle same element compared to itself', () => {
        const el = 'test';

        mockLength.mockReturnValue(4);

        const result = sameLength(el, el);

        expect(result).toBe(true);
        expect(mockLength).toHaveBeenCalledTimes(2);
        expect(mockLength).toHaveBeenCalledWith(el);
    });

    test('Should handle different data types with same length', () => {
        const string = 'hello';
        const array = [1, 2, 3, 4, 5];
        const object = { a: 1, b: 2, c: 3, d: 4, e: 5 };

        // Test string vs array
        mockLength.mockReturnValueOnce(5).mockReturnValueOnce(5);
        expect(sameLength(string, array)).toBe(true);

        mockLength.mockClear();

        // Test string vs object
        mockLength.mockReturnValueOnce(5).mockReturnValueOnce(5);
        expect(sameLength(string, object)).toBe(true);

        mockLength.mockClear();

        // Test array vs object
        mockLength.mockReturnValueOnce(5).mockReturnValueOnce(5);
        expect(sameLength(array, object)).toBe(true);
    });

    test('Should handle function arguments', () => {
        const fn1 = (_a: number, _b: string) => {};
        const string = 'ab';

        mockLength.mockReturnValueOnce(2).mockReturnValueOnce(2);

        const result = sameLength(fn1, string);

        expect(result).toBe(true);
        expect(mockLength).toHaveBeenCalledWith(fn1);
        expect(mockLength).toHaveBeenCalledWith(string);
    });

    test('Should preserve function call order', () => {
        const el1 = 'first';
        const el2 = 'second';

        mockLength.mockReturnValueOnce(5).mockReturnValueOnce(6);

        sameLength(el1, el2);

        expect(mockLength).toHaveBeenNthCalledWith(1, el1);
        expect(mockLength).toHaveBeenNthCalledWith(2, el2);
    });

    test('Should handle undefined and null values', () => {
        const el1 = undefined;
        const el2 = null;
        const el3 = 'hello';

        // undefined vs null
        mockLength.mockReturnValueOnce(null).mockReturnValueOnce(null);
        expect(sameLength(el1, el2)).toBe(false);

        mockLength.mockClear();

        // undefined vs string
        mockLength.mockReturnValueOnce(null).mockReturnValueOnce(5);
        expect(sameLength(el1, el3)).toBe(false);

        mockLength.mockClear();

        // null vs string
        mockLength.mockReturnValueOnce(null).mockReturnValueOnce(5);
        expect(sameLength(el2, el3)).toBe(false);
    });

    test('Should handle edge case with large numbers', () => {
        const largeArray = new Array(1000).fill(0);
        const largeString = 'a'.repeat(1000);

        mockLength.mockReturnValueOnce(1000).mockReturnValueOnce(1000);

        const result = sameLength(largeArray, largeString);

        expect(result).toBe(true);
        expect(mockLength).toHaveBeenCalledWith(largeArray);
        expect(mockLength).toHaveBeenCalledWith(largeString);
    });

    test('Should handle mixed valid and invalid length types', () => {
        const validElement = [1, 2, 3];
        const invalidElement = 42;

        // Valid first, invalid second
        mockLength.mockReturnValueOnce(3).mockReturnValueOnce(null);
        expect(sameLength(validElement, invalidElement)).toBe(false);

        mockLength.mockClear();

        // Invalid first, valid second
        mockLength.mockReturnValueOnce(null).mockReturnValueOnce(3);
        expect(sameLength(invalidElement, validElement)).toBe(false);
    });

    test('Should call length function exactly twice per call', () => {
        const el1 = 'test1';
        const el2 = 'test2';

        mockLength.mockReturnValue(5);

        sameLength(el1, el2);

        expect(mockLength).toHaveBeenCalledTimes(2);

        // Call again to ensure it's called twice more
        sameLength(el1, el2);

        expect(mockLength).toHaveBeenCalledTimes(4);
    });

    test('Should handle complex objects', () => {
        const obj1 = { a: 1, b: { nested: true }, c: [1, 2, 3] };
        const obj2 = { x: 'string', y: 42, z: null };

        mockLength.mockReturnValueOnce(3).mockReturnValueOnce(3);

        const result = sameLength(obj1, obj2);

        expect(result).toBe(true);
        expect(mockLength).toHaveBeenCalledWith(obj1);
        expect(mockLength).toHaveBeenCalledWith(obj2);
    });

    test('Should work with mock returning different values', () => {
        const el1 = 'element1';
        const el2 = 'element2';

        // Test with different return values from mock
        mockLength.mockReturnValueOnce(10).mockReturnValueOnce(20);
        expect(sameLength(el1, el2)).toBe(false);

        mockLength.mockReturnValueOnce(15).mockReturnValueOnce(15);
        expect(sameLength(el1, el2)).toBe(true);

        mockLength.mockReturnValueOnce(0).mockReturnValueOnce(1);
        expect(sameLength(el1, el2)).toBe(false);
    });

    test('Should handle when length function throws error', () => {
        const el1 = 'normal';
        const el2 = 'error';

        mockLength.mockReturnValueOnce(6).mockImplementationOnce(() => {
            throw new Error('Length calculation failed');
        });

        expect(() => sameLength(el1, el2)).toThrow('Length calculation failed');
        expect(mockLength).toHaveBeenCalledWith(el1);
        expect(mockLength).toHaveBeenCalledWith(el2);
    });
});
