import gatherArgs from './gatherArgs';

describe('GATHER_ARGS', () => {
    test('Gather args on a function with no argument should return a function with arguments type any', () => {
        function fn() {
            return '';
        }
        const gathered = gatherArgs(fn);

        expect(fn()).toBe('');
        expect(gathered()).toBe('');
    });

    test('Gather args on a typed function', () => {
        function fn(a: string, b: string, c: string) {
            return a + b + c;
        }
        const gathered = gatherArgs(fn);

        expect(fn('a', 'b', 'c')).toBe('abc');
        expect(gathered(['a', 'b', 'c'])).toBe('abc');
    });

    test('Gather args on a spread function', () => {
        function fn(...args: string[]) {
            return args.reduce((v, c) => v + c, '');
        }
        const gathered = gatherArgs(fn);

        expect(fn('a', 'b', 'c')).toBe('abc');
        expect(gathered(['a', 'b', 'c'])).toBe('abc');
    });
});
