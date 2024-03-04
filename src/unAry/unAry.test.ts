import unAry from './unAry';

describe('UNARY', () => {
    function multipleArgsFn(arg1: number, arg2: string, arg3: number) {
        // Define default value for arg2 && arg3
        // because inference type can't get optional or spread types
        arg2 ??= ''
        arg3 ??= 1
        return (arg1 * arg3) + arg2
    }

    test('Check unAry', () => {
        const unAryFn = unAry(multipleArgsFn)
        expect(typeof unAryFn()).toBe('function')
        expect(unAryFn(5)).toBe('5')
    })
})
