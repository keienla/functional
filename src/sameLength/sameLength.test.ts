import sameLength from './sameLength';

describe('SAME_LENGTH', () => {
    test('Check if two element have same length', () => {
        const arr: any[] = [0, 1, 2, 3, 4];
        const str: string = 'abcde';
        const reg: RegExp = /ab/g;
        const fn: Function = (a: any, b: any, c: any, d: any, e: any) => {};
        const obj: object = { a: 0, b: 1, c: 2, d: 3, e: 4 };

        expect(sameLength(arr, str)).toBe(true);
        expect(sameLength(arr, reg)).toBe(true);
        expect(sameLength(arr, fn)).toBe(true);
        expect(sameLength(arr, obj)).toBe(true);
        expect(sameLength(str, reg)).toBe(true);
        expect(sameLength(str, fn)).toBe(true);
        expect(sameLength(str, obj)).toBe(true);
        expect(sameLength(reg, fn)).toBe(true);
        expect(sameLength(reg, obj)).toBe(true);
        expect(sameLength(fn, obj)).toBe(true);

        expect(sameLength(arr, arr)).toBe(true);
        expect(sameLength(str, str)).toBe(true);
        expect(sameLength(reg, reg)).toBe(true);
        expect(sameLength(fn, fn)).toBe(true);
        expect(sameLength(obj, obj)).toBe(true);
    });

    test("Check if two element havn't the same length", () => {
        const arr: any = [0, 1, 2];
        const str: string = 'ab';
        const num: number = 3;
        const boo: boolean = true;

        expect(sameLength(arr, str)).toBe(false);
        expect(sameLength(arr, num)).toBe(false);
        expect(sameLength(arr, boo)).toBe(false);
        expect(sameLength(str, num)).toBe(false);
        expect(sameLength(str, boo)).toBe(false);
        expect(sameLength(num, boo)).toBe(false);
    });
});
