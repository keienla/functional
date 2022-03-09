import or from './or';

describe('OR', () => {
    function sup10(value: number): boolean { return value > 10 };
    function odd(value: number): boolean { return value % 2 === 1 };
    const oddOrSup10: (value: number) => boolean = or(sup10, odd);
    let number: number = 0;

    test('All predicate function return false should return false', () => {
        expect(sup10(number)).toBe(false);
        expect(odd(number)).toBe(false);
        expect(oddOrSup10(number)).toBe(false);
    })

    test('One result false and one result true and all return true', () => {
        number = 1;

        expect(sup10(number)).toBe(false);
        expect(odd(number)).toBe(true);
        expect(oddOrSup10(number)).toBe(true);
    })

    test('All result true should return true', () => {
        number = 11;

        expect(sup10(number)).toBe(true);
        expect(odd(number)).toBe(true);
        expect(oddOrSup10(number)).toBe(true);
    })
})
