import isLength from './isLength';

describe('IS_LENGTH', () => {
    test('Check if the element length correspond to a given number', () => {
        const str: string = 'abc';
        const arr: number[] = [0,1,2,3,4];

        expect(isLength(3, str)).toBe(true)
        expect(isLength(5, arr)).toBe(true)

        expect(isLength(3, arr)).toBe(false)
        expect(isLength(5, str)).toBe(false)
    })
})
