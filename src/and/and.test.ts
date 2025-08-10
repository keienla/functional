import and from './and';
import _check from '../_internal/_check';

jest.mock('../_internal/_check');

const mockCheck = _check as jest.MockedFunction<typeof _check>;

describe('AND', () => {
    const mockPredicate1 = jest.fn();
    const mockPredicate2 = jest.fn();

    beforeEach(() => {
        mockCheck.mockClear();
        mockPredicate1.mockClear();
        mockPredicate2.mockClear();
    });

    test('should call _check with correct arguments', () => {
        mockCheck.mockReturnValue(true);

        const value = 'test';
        const result = and(mockPredicate1, mockPredicate2, value);

        expect(mockCheck).toHaveBeenCalledWith(
            expect.any(Function),
            [mockPredicate1, mockPredicate2],
            true,
            value,
            false,
        );
        expect(mockCheck).toHaveBeenCalledTimes(1);
        expect(result).toBe(true);
    });

    test('should pass correct reducer function to _check', () => {
        mockCheck.mockReturnValue(false);

        const result = and(mockPredicate1, mockPredicate2, 42);

        expect(mockCheck).toHaveBeenCalledTimes(1);

        // Get the reducer function passed to _check
        const reducerFn = mockCheck.mock.calls[0][0];

        // Test the reducer function logic
        expect(reducerFn(true, true)).toBe(true);
        expect(reducerFn(true, false)).toBe(false);
        expect(reducerFn(false, true)).toBe(false);
        expect(reducerFn(false, false)).toBe(false);

        expect(result).toBe(false);
    });

    test('should call _check with predicates array in correct order', () => {
        const predicate1 = () => true;
        const predicate2 = () => false;

        and(predicate1, predicate2, 'value');

        expect(mockCheck).toHaveBeenCalledWith(
            expect.any(Function),
            [predicate1, predicate2],
            true,
            'value',
            false,
        );
    });

    test('should call _check with initial value true and fallback false', () => {
        const testValue = { test: 'object' };

        and(mockPredicate1, mockPredicate2, testValue);

        expect(mockCheck).toHaveBeenCalledWith(
            expect.any(Function),
            [mockPredicate1, mockPredicate2],
            true, // initial value
            testValue,
            false, // fallback value
        );
    });
});
