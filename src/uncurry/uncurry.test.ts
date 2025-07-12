import uncurry from './uncurry';
import curry from '../curry/curry';

describe('UNCURRY', () => {
    test('Uncurry a curried function', () => {
        const curried = (a: string) => (b: string) => a + b;
        const uncurried = uncurry(curried);

        expect(uncurried('a', 'b')).toBe('ab');
        expect(() => {
            // @ts-ignore: should throw because first arg doesn't return a function
            uncurried('a')('b');
        }).toThrow();

        expect(uncurried('a', 'b')).toBe('ab');
    });

    test('Uncurry a function with multiple parameters', () => {
        const curried = curry(
            (a: string, b: number, c: boolean) => a + b + (c ? '1' : '0'),
        );
        const uncurried = uncurry(curried);

        expect(uncurried('a', 1, true)).toBe('a11');
        expect(uncurried('b', 2, false)).toBe('b20');
    });

    test('Uncurry a function with default parameters', () => {
        const curried = curry(
            (a: string, b: number, c: boolean) => a + b + (c ? '1' : '0'),
            'foo',
            5,
        );
        const uncurried = uncurry(curried);

        expect(uncurried(true)).toBe('foo51');
        expect(uncurried(false)).toBe('foo50');
    });

    test('Uncurry a function with setted parameters', () => {
        const curried = curry(
            (a: string, b: number, c: boolean) => a + b + (c ? '1' : '0'),
        );
        const uncurried = uncurry(curried('test'));

        expect(uncurried(3, false)).toBe('test30');
        expect(uncurried(4, true)).toBe('test41');
    });
});
