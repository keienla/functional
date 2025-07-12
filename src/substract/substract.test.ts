import substract from './substract';
import add from '../add/add';

jest.mock('../add/add');

const mockAdd = add as jest.MockedFunction<typeof add>;

describe('SUBSTRACT', () => {
    beforeEach(() => {
        mockAdd.mockClear();
    });

    test('should call add with first number and negative second number', () => {
        mockAdd.mockReturnValue(2);

        const result = substract(5, 3);

        expect(mockAdd).toHaveBeenCalledWith(5, -3);
        expect(mockAdd).toHaveBeenCalledTimes(1);
        expect(result).toBe(2);
    });

    test('should call add with correct arguments for negative numbers', () => {
        mockAdd.mockReturnValue(-2);

        const result = substract(-5, -3);

        expect(mockAdd).toHaveBeenCalledWith(-5, 3);
        expect(mockAdd).toHaveBeenCalledTimes(1);
        expect(result).toBe(-2);
    });

    test('should call add with correct arguments for zero values', () => {
        mockAdd.mockReturnValue(0);

        const result = substract(0, 0);

        expect(mockAdd).toHaveBeenCalledWith(0, -0);
        expect(mockAdd).toHaveBeenCalledTimes(1);
        expect(result).toBe(0);
    });
});
