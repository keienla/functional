import { _ } from '../blank/blank';
import curry from './curry';

describe('CURRY', () => {
    describe('Basic', () => {
        test('Should return original result when all arguments provided at once', () => {
            const add = (a: number, b: number, c: number) => a + b + c;
            const curriedAdd = curry(add);

            expect(curriedAdd(1, 2, 3)).toBe(6);
            expect(add(1, 2, 3)).toBe(6);
        });

        test('Should curry with single argument steps', () => {
            const add = (a: number, b: number, c: number) => a + b + c;
            const curriedAdd = curry(add);

            const result = curriedAdd(1)(2)(3);
            expect(result).toBe(6);
        });

        test('Should curry with mixed argument steps', () => {
            const add4 = (a: number, b: number, c: number, d: number) =>
                a + b + c + d;
            const curriedAdd4 = curry(add4);

            expect(curriedAdd4(1, 2)(3)(4)).toBe(10);
            expect(curriedAdd4(1)(2, 3)(4)).toBe(10);
            expect(curriedAdd4(1)(2)(3, 4)).toBe(10);
        });

        test('Should work with functions of different arities', () => {
            const unary = (x: number) => x * 2;
            const binary = (x: number, y: number) => x + y;
            const ternary = (x: number, y: number, z: number) => x + y + z;

            expect(curry(unary)(5)).toBe(10);
            expect(curry(binary)(5)(3)).toBe(8);
            expect(curry(ternary)(1)(2)(3)).toBe(6);
        });

        test('Should work with different parameter types', () => {
            const mixed = (str: string, num: number, bool: boolean) =>
                bool ? str + num : str;
            const curriedMixed = curry(mixed);

            expect(curriedMixed('test')(42)(true)).toBe('test42');
            expect(curriedMixed('test')(42)(false)).toBe('test');
            expect(curriedMixed('test', 42, true)).toBe('test42');
        });

        test('When called with zero arguments must return the default function', () => {
            const concat = (s1: string, s2: string) => s1 + s2;
            const curriedConcat = curry(concat);

            const firstStep = curriedConcat();

            expect(firstStep('a', 'b')).toBe('ab');
            expect(firstStep('a')('b')).toBe('ab');
            expect(firstStep()('a')('b')).toBe('ab');
        });
    });

    describe('With Default Parameters', () => {
        test('When setted with default params must add params as desired', () => {
            const someFn = (s: string, b: boolean, n: number) =>
                b ? s + n : s;
            const curriedConcat = curry(someFn, 'a');

            expect(curriedConcat(true, 1)).toBe('a1');
            expect(curriedConcat(false, 1)).toBe('a');
        });

        test('Should work with multiple default parameters', () => {
            const multiply = (a: number, b: number, c: number) => a * b * c;
            const curriedWithDefaults = curry(multiply, 2, 3);

            expect(curriedWithDefaults(4)).toBe(24);
        });
    });

    describe('With Rest Parameters', () => {
        test('When called with multiple curry steps', () => {
            const add4numbers = (
                a: number,
                b: number,
                c: number,
                d: number,
                ..._rest: string[]
            ) => a + b + c + d;
            const curriedAd4numbers = curry(add4numbers);

            const firstStep = curriedAd4numbers(1, 2);
            const secondStep = firstStep(3);

            expect(secondStep(4)).toEqual(10);
        });

        test('Should handle rest parameters correctly', () => {
            const sumWithRest = (a: number, b: number, ...rest: number[]) =>
                a + b + rest.reduce((sum, n) => sum + n, 0);
            const curriedSum = curry(sumWithRest);

            expect(curriedSum(1, 2, 3, 4, 5)).toBe(15);
            expect(curriedSum(1)(2, 3, 4, 5)).toBe(15);
        });
    });

    describe('With Blank Parameters', () => {
        test('When set some BLANK default params must after replace it correctly', () => {
            const someFn = (s: string, b: boolean, n: number) =>
                b ? s + n : s;
            const curriedConcat = curry(someFn, _, true);

            expect(curriedConcat('a', 1)).toBe('a1');
        });

        test('Should replace BLANK placeholders in order', () => {
            const subtract = (a: number, b: number, c: number) => a - b - c;
            const curriedWithBlanks = curry(subtract, _, 2, _);

            expect(curriedWithBlanks(10, 3)).toBe(5); // 10 - 2 - 3
        });

        test('Should handle multiple BLANK placeholders', () => {
            const calc = (a: number, b: number, c: number, d: number) =>
                a + b * c - d;
            const curriedWithBlanks = curry(calc, _, _, 3, _);

            expect(curriedWithBlanks(1, 2, 4)).toBe(3); // 1 + 2 * 3 - 4
        });

        test('Should allow BLANK in intermediate curry steps', () => {
            const multiply = (a: number, b: number, c: number) => a * b * c;
            const curriedMultiply = curry(multiply);

            const withBlank = curriedMultiply(_, 3);
            expect(withBlank(2, 4)).toBe(24); // 2 * 3 * 4
        });

        test('Should handle complex BLANK replacement patterns', () => {
            const complex = (a: string, b: number, c: boolean, d: string) =>
                c ? a + d + b : a + d;

            const step1 = curry(complex, _, 42, _, 'end');
            const step2 = step1('start');
            expect(step2(true)).toBe('startend42');
            expect(step2(false)).toBe('startend');
        });

        test('Should work with all BLANK parameters', () => {
            const add3 = (a: number, b: number, c: number) => a + b + c;
            const allBlanks = curry(add3, _, _, _);

            expect(allBlanks(1, 2, 3)).toBe(6);
            expect(allBlanks(1)(2)(3)).toBe(6);
        });
    });

    describe('With Type Assertion', () => {
        test('Should maintain proper TypeScript types', () => {
            const typedFn = (
                str: string,
                num: number,
                bool: boolean,
            ): string => (bool ? str + num : str);

            const curried = curry(typedFn);

            const step1 = curried('test');
            const step2 = step1(42);
            const result: string = step2(true);

            expect(result).toBe('test42');
        });

        test('Should work with generic functions', () => {
            const identity = <T>(x: T): T => x;
            const curriedIdentity = curry(identity);

            expect(curriedIdentity(42)).toBe(42);
            expect(curriedIdentity('test')).toBe('test');
            expect(curriedIdentity(true)).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        test('Should handle empty function calls', () => {
            const add = (a: number, b: number) => a + b;
            const curriedAdd = curry(add);

            const empty1 = curriedAdd();
            const empty2 = empty1();
            expect(empty2(5, 3)).toBe(8);
        });

        test('Should maintain function identity when no currying needed', () => {
            const noArgs = () => 'result';
            const curriedNoArgs = curry(noArgs);

            expect(curriedNoArgs()).toBe('result');
        });

        test('Should work with object methods', () => {
            const obj = {
                value: 10,
                add: function (a: number, b: number) {
                    return this.value + a + b;
                },
            };

            const curriedAdd = curry(obj.add.bind(obj));
            expect(curriedAdd(5)(3)).toBe(18);
        });
    });
});
