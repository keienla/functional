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

    test('pipe with no argument throw', () => {
        expect(() => { pipe() }).toThrow()
    })
})
