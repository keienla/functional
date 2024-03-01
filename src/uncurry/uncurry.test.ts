import uncurry from './uncurry';

describe('UNCURRY', () => {
    test('Uncurry a curried function', () => {
        const curried = (a: string) => (b: string) => a + b;
        const uncurried = uncurry(curried);

        expect(uncurried('a', 'b')).toBe('ab')
        // @ts-ignore
        expect(() => { uncurried('a')('b') }).toThrow()
    })
})
