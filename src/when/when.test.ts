import when from './when';

// Mock the internal _when module
jest.mock('../_internal/_when', () => {
    const mockFn = jest.fn((predicate, fn) => {
        return (arg: any) => {
            if (predicate(arg)) {
                return fn(arg);
            }
            return arg;
        };
    });
    return {
        __esModule: true,
        default: mockFn,
    };
});

import _defaultWhenElse from '../_internal/_when';

describe('WHEN', () => {
    const mockWhenElse = _defaultWhenElse as jest.MockedFunction<
        typeof _defaultWhenElse
    >;

    beforeEach(() => {
        mockWhenElse.mockClear();
    });

    test('Should call _defaultWhenElse with correct arguments', () => {
        const predicate = jest.fn((x: number) => x > 5);
        const fn = jest.fn((x: number) => x * 2);

        when(predicate, fn);

        expect(mockWhenElse).toHaveBeenCalledTimes(1);
        expect(mockWhenElse).toHaveBeenCalledWith(predicate, fn);
    });

    test('Should call _defaultWhenElse once for each when call', () => {
        const predicate1 = (x: number) => x > 0;
        const fn1 = (x: number) => x + 1;
        const predicate2 = (x: string) => x.length > 3;
        const fn2 = (x: string) => x.toUpperCase();

        when(predicate1, fn1);
        when(predicate2, fn2);

        expect(mockWhenElse).toHaveBeenCalledTimes(2);
        expect(mockWhenElse).toHaveBeenNthCalledWith(1, predicate1, fn1);
        expect(mockWhenElse).toHaveBeenNthCalledWith(2, predicate2, fn2);
    });

    test('Should pass predicate and function with correct types', () => {
        const stringPredicate = (s: string) => s.startsWith('test');
        const stringTransform = (s: string) => s.length;

        when(stringPredicate, stringTransform);

        expect(mockWhenElse).toHaveBeenCalledWith(
            stringPredicate,
            stringTransform,
        );
    });

    test('Should handle different predicate types', () => {
        const booleanPredicate = (b: boolean) => b === true;
        const booleanTransform = (b: boolean) => !b;

        when(booleanPredicate, booleanTransform);

        expect(mockWhenElse).toHaveBeenCalledWith(
            booleanPredicate,
            booleanTransform,
        );
    });

    test('Should handle complex objects as arguments', () => {
        interface TestObject {
            id: number;
            name: string;
        }

        const objectPredicate = (obj: TestObject) => obj.id > 10;
        const objectTransform = (obj: TestObject) => ({
            ...obj,
            name: obj.name.toUpperCase(),
        });

        when(objectPredicate, objectTransform);

        expect(mockWhenElse).toHaveBeenCalledWith(
            objectPredicate,
            objectTransform,
        );
    });

    test('Should return the result from _defaultWhenElse', () => {
        const mockResult = jest.fn();
        mockWhenElse.mockReturnValue(mockResult);

        const predicate = (x: number) => x > 5;
        const fn = (x: number) => x * 2;
        const result = when(predicate, fn);

        expect(result).toBe(mockResult);
        expect(mockWhenElse).toHaveBeenCalledWith(predicate, fn);
    });

    test('Should not call _defaultWhenElse with undefined arguments', () => {
        const predicate = (x: number) => x > 0;
        const fn = (x: number) => x + 1;

        when(predicate, fn);

        const call = mockWhenElse.mock.calls[0];
        expect(call[0]).toBeDefined();
        expect(call[1]).toBeDefined();
        expect(call[2]).toBeUndefined(); // elseFn should be undefined for when()
    });
});
