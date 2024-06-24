import arity from './arity';

describe('ARITY', () => {
    function multipleArgsFn(arg1: number, arg2: string, arg3: number) {
        // Define default value for arg2 && arg3
        // because inference type can't get optional or spread types
        arg2 ??= ''
        arg3 ??= 1
        return (arg1 * arg3) + arg2
    }

    function add(...args: number[]) {
        return args.reduce((acc, n) => n + acc)
    }

    function textAndNumber(text: string, ...numbers: number[]) {
        return `${text}: ` + add(...numbers)
    }

    test('Check that arity apply the good args', () => {
        const arity1 = arity(multipleArgsFn, 1)
        const arity2 = arity(multipleArgsFn, 2)
        expect(arity1(1)).toBe('1')
        expect(arity1.length).toBe(1)
        expect(arity2(2, 'n')).toBe('2n')
        expect(arity2.length).toBe(2)
    })

    test('Check that arity work with spread args too', () => {
        const arity5 = arity(add, 5)
        const arityTextAndNumbersSum5 = arity(textAndNumber, 5)
        expect(arity5.length).toBe(5)
        expect(arity5(1, 1, 1, 1, 1)).toBe(5)
        // @ts-ignore
        expect(arity5(1, 1, 1, 1, 1, 1, 1, 1)).toBe(5)
        // TODO FIX
        expect(arity(textAndNumber, 3)('Hello', 2, 8)).toBe('Hello: 10')

        // @ts-ignore
        expect(() => { arityTextAndNumbersSum5() }).toThrow()
        // @ts-ignore
        expect(arityTextAndNumbersSum5('World', '1')).toBe('World: 1')
    })
})
