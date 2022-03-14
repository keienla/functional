import pipe from './pipe';
import map from '../map/map';

describe('PIPE', () => {
    test('pipe should execute each functions', () => {
        const add = (n1: number) => (n2: number) => n1 + n2;
        const multiply = (n1: number) => (n2: number) => n1 * n2;

        const result = pipe(
            map(add(1)),
            map(multiply(2))
        )([1,2,3])

        expect(result).toEqual([4,6,8]);
    })

    test('pipe with first fn with multiple args', () => {
        const add = (n1: number, n2: number): number => n1 + n2;
        const multiply = (n: number): number => n * 2;

        const result = pipe(
            add,
            multiply
        )(1, 2)

        expect(result).toEqual(6);
    })
})
