import pickAll from './pickAll';

describe('PICK_ALL', () => {
    test('Pick all Key', () => {
        const o = {a: 'a', b: 'b', c: 'c'};

        expect(pickAll(o)).toEqual({a: 'a', b: 'b', c: 'c'})
    })
})
