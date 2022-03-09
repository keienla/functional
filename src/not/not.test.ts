import not from './not';

describe('NOT', () => {
    test('Check if return the opposite of a function', () => {
        function returnTrue() { return true }
        const returnFalse = not(returnTrue);

        expect(returnFalse()).toBe(!returnTrue())
    })
})
