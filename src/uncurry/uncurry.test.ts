import uncurry from './uncurry';

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
});
