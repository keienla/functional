import curry from './curry';

describe('CURRY', () => {
    test('When called with multiple curry steps', () => {
        const add4numbers = (a: number, b: number, c: number, d: number) => a + b + c + d;
        const curriedAd4numbers = curry(add4numbers);

        const firstStep = curriedAd4numbers(1,2);
        const secondStep = firstStep(3);

        expect(secondStep(4)).toEqual(10)
    })

    test('When called with zero arguments must return the default function', () => {
        const concat = (s1: string, s2: string) => s1 + s2;
        const curriedConcat = curry(concat);

        const firstStep = curriedConcat();

        expect(firstStep('a','b')).toBe('ab');
    })

    test('Curry with spread args or optional parameters', () => {
        const concat = (...args: string[]) => args.join('')
        const curriedConcat = curry(concat, 2)

        expect(typeof curriedConcat()).toBe('function')
        expect(typeof curriedConcat('a')).toBe('function')
        expect(curriedConcat('a')('b')).toBe('ab')
    })
})
