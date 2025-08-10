import whenElse from './whenElse';

// Mock the internal _when module
jest.mock('../_internal/_when', () => {
    const mockFn = jest.fn((predicate, fn, elseFn) => {
        return (arg: any) => {
            if (predicate(arg)) {
                return fn(arg);
            } else if (elseFn) {
                return elseFn(arg);
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

describe('WHEN_ELSE', () => {
    const mockWhenElse = _defaultWhenElse as jest.MockedFunction<
        typeof _defaultWhenElse
    >;

    beforeEach(() => {
        mockWhenElse.mockClear();
    });

    test('Should call _defaultWhenElse with correct arguments', () => {
        const predicate = jest.fn((x: number) => x > 5);
        const fn = jest.fn((x: number) => x * 2);
        const elseFn = jest.fn((x: number) => x / 2);

        whenElse(predicate, fn, elseFn);

        expect(mockWhenElse).toHaveBeenCalledTimes(1);
        expect(mockWhenElse).toHaveBeenCalledWith(predicate, fn, elseFn);
    });

    test('Should call _defaultWhenElse once for each whenElse call', () => {
        const predicate1 = (x: number) => x > 0;
        const fn1 = (x: number) => x + 1;
        const elseFn1 = (x: number) => x - 1;
        const predicate2 = (x: string) => x.length > 3;
        const fn2 = (x: string) => x.toUpperCase();
        const elseFn2 = (x: string) => x.toLowerCase();

        whenElse(predicate1, fn1, elseFn1);
        whenElse(predicate2, fn2, elseFn2);

        expect(mockWhenElse).toHaveBeenCalledTimes(2);
        expect(mockWhenElse).toHaveBeenNthCalledWith(
            1,
            predicate1,
            fn1,
            elseFn1,
        );
        expect(mockWhenElse).toHaveBeenNthCalledWith(
            2,
            predicate2,
            fn2,
            elseFn2,
        );
    });

    test('Should pass all three functions with correct types', () => {
        const stringPredicate = (s: string) => s.startsWith('test');
        const stringTransform = (s: string) => s.length;
        const stringElse = (_s: string) => 0;

        whenElse(stringPredicate, stringTransform, stringElse);

        expect(mockWhenElse).toHaveBeenCalledWith(
            stringPredicate,
            stringTransform,
            stringElse,
        );
    });

    test('Should handle different predicate and function types', () => {
        const booleanPredicate = (b: boolean) => b === true;
        const booleanTransform = (b: boolean) => !b;
        const booleanElse = (b: boolean) => b;

        whenElse(booleanPredicate, booleanTransform, booleanElse);

        expect(mockWhenElse).toHaveBeenCalledWith(
            booleanPredicate,
            booleanTransform,
            booleanElse,
        );
    });

    test('Should handle complex objects with different return types', () => {
        interface TestObject {
            id: number;
            name: string;
        }

        const objectPredicate = (obj: TestObject) => obj.id > 10;
        const objectTransform = (obj: TestObject) => ({
            ...obj,
            name: obj.name.toUpperCase(),
        });
        const objectElse = (obj: TestObject) => ({
            ...obj,
            name: obj.name.toLowerCase(),
        });

        whenElse(objectPredicate, objectTransform, objectElse);

        expect(mockWhenElse).toHaveBeenCalledWith(
            objectPredicate,
            objectTransform,
            objectElse,
        );
    });

    test('Should return the result from _defaultWhenElse', () => {
        const mockResult = jest.fn();
        mockWhenElse.mockReturnValue(mockResult);

        const predicate = (x: number) => x > 5;
        const fn = (x: number) => x * 2;
        const elseFn = (x: number) => x / 2;
        const result = whenElse(predicate, fn, elseFn);

        expect(result).toBe(mockResult);
        expect(mockWhenElse).toHaveBeenCalledWith(predicate, fn, elseFn);
    });

    test('Should call _defaultWhenElse with all three defined arguments', () => {
        const predicate = (x: number) => x > 0;
        const fn = (x: number) => x + 1;
        const elseFn = (x: number) => x - 1;

        whenElse(predicate, fn, elseFn);

        const call = mockWhenElse.mock.calls[0];
        expect(call[0]).toBeDefined();
        expect(call[1]).toBeDefined();
        expect(call[2]).toBeDefined(); // elseFn should be defined for whenElse()
        expect(call.length).toBe(3);
    });

    test('Should handle functions with different return types', () => {
        const predicate = (x: number) => x > 0;
        const numberFn = (x: number) => x.toString();
        const stringElseFn = (_x: number) => 'negative';

        whenElse(predicate, numberFn, stringElseFn);

        expect(mockWhenElse).toHaveBeenCalledWith(
            predicate,
            numberFn,
            stringElseFn,
        );
    });

    test('Should preserve function identity', () => {
        const predicate = (x: number) => x > 0;
        const fn = (x: number) => x + 1;
        const elseFn = (x: number) => x - 1;

        whenElse(predicate, fn, elseFn);

        const [calledPredicate, calledFn, calledElseFn] =
            mockWhenElse.mock.calls[0];
        expect(calledPredicate).toBe(predicate);
        expect(calledFn).toBe(fn);
        expect(calledElseFn).toBe(elseFn);
    });
});
