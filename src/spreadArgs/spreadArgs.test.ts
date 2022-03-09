import spreadArgs from './spreadArgs';

describe('SPREAD_ARGS', () => {
    test('Spread args on a function with no argument should return a function with arguments type any', () => {
        function fn() { return '' };
        const gathered = spreadArgs(fn);

        expect(fn()).toBe('');
        expect(gathered()).toBe('')
    })

    test('Spread args on a typed function', () => {
        function fn(words: string[]) { return words.reduce((result, value) => result + value, '' )  };
        const gathered = spreadArgs(fn);

        expect(fn(['a', 'b', 'c'])).toBe('abc');
        expect(gathered('a', 'b', 'c')).toBe('abc');
    })
})
