import compose from './compose';
import map from '../map/map';
import curry from '../curry/curry';

describe('COMPOSE', () => {
    test('pipe should execute each functions', () => {
        const add = (n1: number) => (n2: number) => n1 + n2;
        const multiply = (n1: number) => (n2: number) => n1 * n2;
        const curryMap = curry(map<number, number>);

        const result = compose(
            curryMap(add(1)),
            curryMap(multiply(2)),
        )([1, 2, 3]);

        expect(result).toEqual([3, 5, 7]);
    });

    test('compose with first fn with multiple args', () => {
        const add = (n1: number, n2: number): number => n1 + n2;
        const stringify = (n: number): string => n + '';

        const result = compose(stringify, add)(2, 1);

        expect(result).toEqual('3');
    });
});
