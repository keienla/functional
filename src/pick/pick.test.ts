import pick from './pick';

describe('PICK', () => {
    const o = { a: 'a', b: 'b', c: 'c', d: 'd' };

    test('Pick with an array', () => {
        const result = { a: 'a', b: 'b' }

        expect(pick(o, ['a','b'])).toEqual(result);
    })

    test('Pick with empty array', () => {
        expect(pick(o, [])).toEqual({})
    })
})
