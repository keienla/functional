import notSameLength from './notSameLength';
import sameLength from './../sameLength/sameLength';

describe('NOT_SAME_LENGTH', () => {
    test('Compare if not same length', () => {
        const el1: number[] = [0,1];
        const el2: string = 'ab';
        const el3: number = 2;
        const el4: Function = (a: string) => {};

        expect(sameLength(el1, el2)).toBe(true);
        expect(notSameLength(el1, el2)).toBe(false);

        expect(sameLength(el1, el3)).toBe(false);
        expect(notSameLength(el1, el3)).toBe(true);

        expect(sameLength(el1, el4)).toBe(false);
        expect(notSameLength(el1, el4)).toBe(true);

        expect(sameLength(el2, el3)).toBe(false);
        expect(notSameLength(el2, el3)).toBe(true);

        expect(sameLength(el2, el4)).toBe(false);
        expect(notSameLength(el2, el4)).toBe(true);

        expect(sameLength(el3, el4)).toBe(false);
        expect(notSameLength(el3, el4)).toBe(true);

        expect(sameLength(el1, el1)).toBe(true);
        expect(notSameLength(el1, el1)).toBe(false);

        expect(sameLength(el2, el2)).toBe(true);
        expect(notSameLength(el2, el2)).toBe(false);

        expect(sameLength(el3, el4)).toBe(false);
        expect(notSameLength(el3, el4)).toBe(true);

        expect(sameLength(el4, el4)).toBe(true);
        expect(notSameLength(el4, el4)).toBe(false);
    })
})
