import { _ } from '../blank/blank';
import curry from './curry';
import type { Curry } from './curry.model';

describe('CURRY - TypeScript Types', () => {
    test('Should infer correct return types for basic currying', () => {
        const add = (a: number, b: number): number => a + b;
        const curriedAdd = curry(add);

        const step1 = curriedAdd(5);
        const result: number = step1(3);

        expect(typeof result).toBe('number');
        expect(result).toBe(8);
    });

    test('Should maintain parameter types through curry chain', () => {
        const concat3 = (a: string, b: number, c: boolean): string =>
            a + b + (c ? '!' : '');

        const curriedConcat = curry(concat3);

        const step1 = curriedConcat('hello');
        const step2 = step1(42);
        const result: string = step2(true);

        expect(result).toBe('hello42!');
    });

    test('Should work with complex parameter types', () => {
        interface User {
            name: string;
            age: number;
        }

        const processUser = (
            user: User,
            prefix: string,
            multiplier: number,
        ): string => {
            return `${prefix}${user.name}-${user.age * multiplier}`;
        };

        const curriedProcess = curry(processUser);
        const user: User = { name: 'John', age: 30 };

        const step1 = curriedProcess(user);
        const step2 = step1('Mr. ');
        const result: string = step2(2);

        expect(result).toBe('Mr. John-60');
    });

    test('Should handle BLANK placeholders with correct types', () => {
        const subtract = (a: number, b: number, c: number): number => a - b - c;

        // Test with BLANK in default parameters
        const withBlanks = curry(subtract, _, 5, _);
        const result: number = withBlanks(10, 2);

        expect(result).toBe(3); // 10 - 5 - 2
    });

    test('Should allow BLANK in intermediate steps with type safety', () => {
        const combine = (a: string, b: number, c: boolean): string =>
            c ? a + b : a;

        const curriedCombine = curry(combine);
        const withBlank = curriedCombine(_, 42);
        const result: string = withBlank('test', true);

        expect(result).toBe('test42');
    });

    test('Should handle rest parameters with correct typing', () => {
        const sumAll = (
            base: number,
            multiplier: number,
            ...nums: number[]
        ): number => base + multiplier * nums.reduce((sum, n) => sum + n, 0);

        const curriedSum = curry(sumAll);

        const result = curriedSum(10, 2, 1, 2, 3, 4);

        expect(result).toBe(30); // 10 + 2 * (1+2+3+4)
    });

    test('Should work with generic functions', () => {
        const identity = <T>(x: T): T => x;

        const curriedIdentity = curry(identity);

        const numberResult = curriedIdentity(42) as number;
        const stringResult = curriedIdentity('hello') as string;
        const booleanResult = curriedIdentity(true) as boolean;

        expect(numberResult).toBe(42);
        expect(stringResult).toBe('hello');
        expect(booleanResult).toBe(true);
    });

    test('Should handle functions with optional parameters', () => {
        const greet = (name: string, greeting: string = 'Hello'): string =>
            `${greeting} ${name}`;

        const curriedGreet = curry(greet);

        const result1: string = curriedGreet('John', 'Hi');
        const result2: string = curriedGreet('Jane', 'Hello');

        expect(result1).toBe('Hi John');
        expect(result2).toBe('Hello Jane');
    });

    test('Should handle function with no parameters', () => {
        const getValue = (): number => 42;
        const curriedGetValue = curry(getValue);

        const result: number = curriedGetValue();
        expect(result).toBe(42);
    });

    test('Should handle function with single parameter', () => {
        const double = (x: number): number => x * 2;
        const curriedDouble = curry(double);

        const result: number = curriedDouble(5);
        expect(result).toBe(10);
    });

    test('Should work with explicit Curry type annotation', () => {
        const multiply = (a: number, b: number, c: number): number => a * b * c;

        const curriedMultiply: Curry<typeof multiply> = curry(multiply);

        const step1 = curriedMultiply(2);
        const step2 = step1(3);
        const result: number = step2(4);

        expect(result).toBe(24);
    });

    test('Should handle union types correctly', () => {
        const process = (value: string | number, flag: boolean): string =>
            flag ? String(value).toUpperCase() : String(value).toLowerCase();

        const curriedProcess = curry(process);

        const result1: string = curriedProcess('Hello')(true);
        const result2: string = curriedProcess(123)(false);

        expect(result1).toBe('HELLO');
        expect(result2).toBe('123');
    });

    test('Type assertions for compile-time validation', () => {
        const testFn = (a: string, b: number, c: boolean): string => a + b + c;
        const curried = curry(testFn);

        const correctResult: string = curried('test')(42)(true);
        expect(typeof correctResult).toBe('string');

        expect(correctResult).toBe('test42true');
    });
});
