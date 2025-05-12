import { _BLANK, isBlank, replaceBlank } from './_blank';

describe('IS_BLANK', () => {
    test('isBlank - Check if the given element is the _BLANK element or not', () => {
        expect(isBlank(_BLANK)).toBeTruthy();
        expect(isBlank('blank')).toBeFalsy();
        expect(isBlank(Symbol('BLANK'))).toBeFalsy();
    });

    test('replaceBlank - Check if merge correctly the two arrays and replace _BLANK when possible', () => {
        expect(replaceBlank(['Hello'], [])).toEqual(['Hello']);
        expect(replaceBlank([], ['World'])).toEqual(['World']);
        expect(replaceBlank([0, 1, 2], [3, 4])).toEqual([0, 1, 2, 3, 4]);
        expect(replaceBlank([0, _BLANK, 2, 3], [1, 4])).toEqual([
            0, 1, 2, 3, 4,
        ]);
        expect(replaceBlank([_BLANK, _BLANK], ['a'])).toEqual(['a', _BLANK]);
        expect(replaceBlank(['a', _BLANK, _BLANK, 'd'], [_BLANK, 'c'])).toEqual(
            ['a', _BLANK, 'c', 'd'],
        );
    });
});
