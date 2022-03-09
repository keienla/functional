import reverseArgs from './reverseArgs';

describe('REVERSE_ARGS', () => {
    test('Check if a function with no argument return a function with no argument', () => {
        const fn = () => { return 0 }
        const reversedFn = reverseArgs(fn);

        expect(reversedFn()).toBe(0);
    })
    test('Check if a normal function have the args reversed', () => {
        const fn = (x: number, y: number) => { return x / y };
        const reversedFn = reverseArgs(fn);

        expect(fn(10,5)).toBe(2);
        expect(reversedFn(5,10)).toBe(2)
    })
})
