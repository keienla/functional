import arity from './arity';

describe('ARITY', () => {
    function multipleArgsFn(arg1: number, arg2: string, arg3: number) {
        // Define default value for arg2 && arg3
        // because inference type can't get optional or spread types
        arg2 ??= '';
        arg3 ??= 1;
        return arg1 * arg3 + arg2;
    }

    function add(...args: number[]) {
        return args.reduce((acc, n) => n + acc);
    }

    function textAndNumber(text: string, ...numbers: number[]) {
        return `${text}: ` + add(...numbers);
    }

    test('Check that arity apply the good args', () => {
        const arity1 = arity(multipleArgsFn, 1);
        const arity2 = arity(multipleArgsFn, 2);
        expect(arity1(1)).toBe('1');
        expect(arity1.length).toBe(1);
        expect(arity2(2, 'n')).toBe('2n');
        expect(arity2.length).toBe(2);
    });

    test('Check that arity work with spread args too', () => {
        const arity5 = arity(add, 5);
        const arityTextAndNumbersSum5 = arity(textAndNumber, 5);
        expect(arity5.length).toBe(5);
        expect(arity5(1, 1, 1, 1, 1)).toBe(5);

        // @ts-ignore: for tests, to check if stop with good number of parameters
        expect(arity5(1, 1, 1, 1, 1, 1, 1, 1)).toBe(5);

        expect(arity(textAndNumber, 3)('Hello', 2, 8)).toBe('Hello: 10');

        expect(() => {
            // @ts-ignore: for test to check if throw
            arityTextAndNumbersSum5();
        }).toThrow();

        // @ts-ignore: for test to check if args are goods
        expect(arityTextAndNumbersSum5('World', '1')).toBe('World: 1');
    });

    test('Check arity with zero length', () => {
        const arity0 = arity(multipleArgsFn, 0);
        expect(arity0.length).toBe(0);
        expect(arity0()).toBe('NaN');
    });

    test('Check arity truncates extra arguments', () => {
        const arity2 = arity(multipleArgsFn, 2);
        // @ts-ignore: testing excess arguments
        expect(arity2(5, 'test', 10, 20, 30)).toBe('5test');
    });

    test('Check arity preserves this context', () => {
        const obj = {
            value: 42,
            getValue: function (multiplier: number) {
                return this.value * multiplier;
            },
        };

        const arity1GetValue = arity(obj.getValue, 1);
        expect(arity1GetValue.call(obj, 2)).toBe(84);
    });

    test('Check arity with different numeric lengths', () => {
        const testLengths = [0, 1, 2, 3, 10];

        testLengths.forEach((length) => {
            const arityFn = arity(add, length);
            expect(arityFn.length).toBe(length);
        });
    });

    test('Check arity function.length property is configurable', () => {
        const arity3 = arity(add, 3);
        const descriptor = Object.getOwnPropertyDescriptor(arity3, 'length');
        expect(descriptor?.configurable).toBe(true);
    });

    test('Check arity with undefined/null arguments', () => {
        function testFn(a: any, b: any, c: any) {
            return [a, b, c];
        }

        const arity2 = arity(testFn, 2);
        expect(arity2(undefined, null)).toEqual([undefined, null]);
    });

    test('Check arity with complex return types', () => {
        function objectReturner(name: string, age: number, active: boolean) {
            return { name, age, active };
        }

        const arity2 = arity(objectReturner, 2);
        const result = arity2('John', 30);
        expect(result).toEqual({ name: 'John', age: 30, active: undefined });
    });
});
