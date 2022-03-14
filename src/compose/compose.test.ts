import compose from './compose';
import map from '../map/map';

describe('COMPOSE', () => {
    test('pipe should execute each functions', () => {
        const add = (n1: number) => (n2: number) => n1 + n2;
        const multiply = (n1: number) => (n2: number) => n1 * n2;

        const result = compose(
            map(add(1)),
            map(multiply(2))
        )([1,2,3])

        expect(result).toEqual([3,5,7]);
    })

    test('compose with first fn with multiple args', () => {
        const add = (n1: number, n2: number): number => n1 + n2;
        const multiply = (n: number): number => n * 2;

        const result = compose(
            multiply,
            add
        )(2,1)

        expect(result).toEqual(6);
    })
})
