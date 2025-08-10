import pipe from './pipe';
import map from '../map/map';
import curry from '../curry/curry';

describe('PIPE', () => {
    test('pipe should execute each functions', () => {
        const add = (n1: number) => (n2: number) => n1 + n2;
        const multiply = (n1: number) => (n2: number) => n1 * n2;
        const curryMap = curry(map<number, number>);

        const result = pipe(curryMap(add(1)), curryMap(multiply(2)))([1, 2, 3]);

        expect(result).toEqual([4, 6, 8]);
    });

    test('pipe with first fn with multiple args', () => {
        const add5 = (n1: string): number => Number(n1) + 5;
        const multiply = (n: number): number => n * 2;
        const concat = (n1: number, n2: number) => n1 + '' + n2;

        const result = pipe(concat, add5, multiply)(1, 2);

        expect(result).toEqual(34);
    });
});
