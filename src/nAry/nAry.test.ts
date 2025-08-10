import nAry from './nAry';

describe('N_ARY', () => {
    function multipleArgsFn(arg1: number, arg2: string, arg3: number) {
        // Define default value for arg2 && arg3
        // because inference type can't get optional or spread types
        arg2 ??= '';
        arg3 ??= 1;
        return arg1 * arg3 + arg2;
    }

    test('Check nAry', () => {
        const nAry0 = nAry(multipleArgsFn, 0);
        const nAry1 = nAry(multipleArgsFn, 1);
        const nAry2 = nAry(multipleArgsFn, 2);
        const nAry3 = nAry(multipleArgsFn, 3);
        expect(nAry0()).toBe('NaN');
        expect(nAry1(2)).toBe('2');
        expect(nAry2(3, 'n')).toBe('3n');
        expect(nAry3(4, 'n', 3)).toBe('12n');
    });
});
