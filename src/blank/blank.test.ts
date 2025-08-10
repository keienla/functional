import { _, isBlank, replaceBlank } from './blank';

describe('ISBLANK', () => {
    test('isBlank - Check if the given element is the BLANK element or not', () => {
        expect(isBlank(_)).toBeTruthy();
        expect(isBlank('blank')).toBeFalsy();
        expect(isBlank(Symbol('BLANK'))).toBeFalsy();
    });

    test('replaceBlank - Check if merge correctly the two arrays and replace BLANK when possible', () => {
        expect(replaceBlank(['Hello'], [])).toEqual(['Hello']);
        expect(replaceBlank([], ['World'])).toEqual(['World']);
        expect(replaceBlank([0, 1, 2], [3, 4])).toEqual([0, 1, 2, 3, 4]);
        expect(replaceBlank([0, _, 2, 3], [1, 4])).toEqual([0, 1, 2, 3, 4]);
        expect(replaceBlank([_, _], ['a'])).toEqual(['a', _]);
        expect(replaceBlank(['a', _, _, 'd'], [_, 'c'])).toEqual([
            'a',
            _,
            'c',
            'd',
        ]);
    });
});
