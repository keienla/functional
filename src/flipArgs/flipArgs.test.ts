import flipArgs from './flipArgs';

describe('FLIP_ARGS', () => {
    test('Check if the two first args are fliped', () => {
        function toFlip(a: string, b: string, c: string) {
            return a + b + c;
        }
        const fliped = flipArgs(toFlip);

        expect(toFlip('a', 'b', 'c')).toBe('abc');
        expect(fliped('a', 'b', 'c')).toBe('bac');
    });

    test('Flip a function with only one argument return a function with two arguments and only the second work', () => {
        function toFlip(a: string) {
            return a + '';
        }
        const fliped = flipArgs(toFlip);

        expect(toFlip('a')).toBe('a');
        expect(fliped(undefined, 'b')).toBe('b');
    });
});
