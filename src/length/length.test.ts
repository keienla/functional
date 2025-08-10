import length from './length';

describe('LENGTH', () => {
    test('Return the number of element if the element is an array', () => {
        const arr0: [] = [];
        const arr1: string[] = ['a'];
        const arr2: number[] = new Array(0, 1);

        expect(length(arr0)).toBe(0);
        expect(length(arr1)).toBe(1);
        expect(length(arr2)).toBe(2);
    });

    test('Return the number of caracters if the element is a string', () => {
        const str0: string = '';
        const str1: string = 'a';
        const str2: String = new String('ab');

        expect(length(str0)).toBe(0);
        expect(length(str1)).toBe(1);
        expect(length(str2)).toBe(2);
    });

    test('Return the number of args if the element is a function', () => {
        const fn0: () => void = () => {};
        const fn1: (arg1: string) => void = (arg1: string) => {};
        const fn2: Function = new Function(
            'arg1',
            'arg2',
            'return arg1 + arg2',
        );

        expect(length(fn0)).toBe(0);
        expect(length(fn1)).toBe(1);
        expect(length(fn2)).toBe(2);
    });

    test('Return the number of key if the element is an object', () => {
        const obj0: {} = {};
        const obj1: object = { a: 0 };
        const obj2: object = new Object([
            ['a', 0],
            ['b', 1],
        ]);

        expect(length(obj0)).toBe(0);
        expect(length(obj1)).toBe(1);
        expect(length(obj2)).toBe(2);
    });

    test('Return the number of caracters if the element is a regexp', () => {
        const reg0: RegExp = /a/g;
        const reg1: RegExp = new RegExp('ab', 'g');

        expect(length(reg0)).toBe(4);
        expect(length(reg1)).toBe(5);
    });

    test("Return null if it's not a string/regexp/array/object/function", () => {
        const symb: Symbol = Symbol('a');
        const numb: number = 0;
        const bool: boolean = true;
        const undef: undefined = undefined;
        const none: null = null;

        expect(length(symb)).toBe(null);
        expect(length(numb)).toBe(null);
        expect(length(bool)).toBe(null);
        expect(length(undef)).toBe(null);
        expect(length(none)).toBe(null);
    });
});
