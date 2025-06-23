import curry from './curry';

describe('CURRY', () => {
    test('When called with multiple curry steps', () => {
        const add4numbers = (a: number, b: number, c: number, d: number) =>
            a + b + c + d;
        const curriedAd4numbers = curry(add4numbers);

        const firstStep = curriedAd4numbers(1, 2);
        const secondStep = firstStep(3);

        expect(secondStep(4)).toEqual(10);
    });

    test('When called with zero arguments must return the default function', () => {
        const concat = (s1: string, s2: string) => s1 + s2;
        const curriedConcat = curry(concat);

        const firstStep = curriedConcat();

        expect(firstStep('a', 'b')).toBe('ab');
        expect(firstStep('a')('b')).toBe('ab');
        expect(firstStep()('a')('b')).toBe('ab');
    });

    test.todo('CURRY WITH DEFAULT PARAMS');
    test.todo('CURRY WITH _BLANK');
    // const t = curry((a: number, b: string, c: boolean) => 0, [BLANK, 'Hello'])(5)()(true)
});
