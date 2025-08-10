import constant from './constant';

interface IValue {
    a: number;
    b: number;
}

describe('CONSTANT', () => {
    test('Check if return same object', () => {
        const value: IValue = { a: 0, b: 1 };
        const stocked: () => IValue = constant(value);

        expect(value === stocked()).toBe(true);
    });

    test('Check if return same object after object modification', () => {
        const value: IValue = { a: 0, b: 1 };
        const stocked: () => IValue = constant(value);
        value.b = 2;

        expect(value === stocked()).toBe(true);
    });
});
