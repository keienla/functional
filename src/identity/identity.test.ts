import identity from './identity';

describe('IDENTITY', () => {
    test('Check if identity return the same element', () => {
        const obj = { a: 0 };
        const idObj = identity(obj);

        expect(idObj).toBe(obj);
    });
});
