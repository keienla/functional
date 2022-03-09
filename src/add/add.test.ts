import add from './add';

describe('ADD', () => {

    test('Check if add make a sum', () => {
        expect(add(3,5)).toBe(8);
        expect(add(2)(7)).toBe(9);
    })
})
