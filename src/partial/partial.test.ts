import partial from './partial';

describe('PARTIAL', () => {
    test('Check if partial add the arguments in the good order', () => {
        const fn = (a: string, b: string, c: string) => a + b + c;
        const pfn0 = partial(fn);
        const pfn1 = partial(fn, 'a');
        const pfn2 = partial(fn, 'a', 'b');
        const pfn3 = partial(fn, 'a', 'b', 'c');

        expect(pfn0('a', 'b', 'c')).toEqual('abc');
        expect(pfn1('b', 'c')).toEqual('abc');
        expect(pfn2('c')).toEqual('abc');
        expect(pfn3()).toEqual('abc');
    });
});
