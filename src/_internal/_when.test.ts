import _defaultWhenElse from './_when';

describe('_defaultWhenElse', () => {
    const mockPredicate = jest.fn();
    const mockFn = jest.fn();
    const mockElseFn = jest.fn();

    beforeEach(() => {
        mockPredicate.mockClear();
        mockFn.mockClear();
        mockElseFn.mockClear();
    });

    describe('when predicate is true', () => {
        test('should call fn and return its result', () => {
            mockPredicate.mockReturnValue(true);
            mockFn.mockReturnValue('result');

            const conditional = _defaultWhenElse(mockPredicate, mockFn);
            const result = conditional('input');

            expect(mockPredicate).toHaveBeenCalledWith('input');
            expect(mockFn).toHaveBeenCalledWith('input');
            expect(result).toBe('result');
        });

        test('should call fn and return its result even when elseFn is provided', () => {
            mockPredicate.mockReturnValue(true);
            mockFn.mockReturnValue('result');
            mockElseFn.mockReturnValue('else result');

            const conditional = _defaultWhenElse(
                mockPredicate,
                mockFn,
                mockElseFn,
            );
            const result = conditional('input');

            expect(mockPredicate).toHaveBeenCalledWith('input');
            expect(mockFn).toHaveBeenCalledWith('input');
            expect(mockElseFn).not.toHaveBeenCalled();
            expect(result).toBe('result');
        });
    });

    describe('when predicate is false', () => {
        test('should return original argument when no elseFn provided', () => {
            mockPredicate.mockReturnValue(false);

            const conditional = _defaultWhenElse(mockPredicate, mockFn);
            const result = conditional('input');

            expect(mockPredicate).toHaveBeenCalledWith('input');
            expect(mockFn).not.toHaveBeenCalled();
            expect(result).toBe('input');
        });

        test('should call elseFn and return its result when provided', () => {
            mockPredicate.mockReturnValue(false);
            mockElseFn.mockReturnValue('else result');

            const conditional = _defaultWhenElse(
                mockPredicate,
                mockFn,
                mockElseFn,
            );
            const result = conditional('input');

            expect(mockPredicate).toHaveBeenCalledWith('input');
            expect(mockFn).not.toHaveBeenCalled();
            expect(mockElseFn).toHaveBeenCalledWith('input');
            expect(result).toBe('else result');
        });
    });

    describe('integration tests', () => {
        test('should work with real predicate and functions', () => {
            const isPositive = (n: number) => n > 0;
            const double = (n: number) => n * 2;
            const negate = (n: number) => -n;

            const conditional = _defaultWhenElse(isPositive, double, negate);

            expect(conditional(5)).toBe(10); // positive: doubled
            expect(conditional(-3)).toBe(3); // negative: negated
            expect(conditional(0)).toBe(-0); // zero: negated
        });

        test('should work without elseFn', () => {
            const isString = (val: any) => typeof val === 'string';
            const toUpperCase = (str: string) => str.toUpperCase();

            const conditional = _defaultWhenElse(isString, toUpperCase);

            expect(conditional('hello')).toBe('HELLO');
            expect(conditional('42')).toBe('42');
        });
    });
});
