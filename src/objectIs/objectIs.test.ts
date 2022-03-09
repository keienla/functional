import objectIs from './objectIs';

describe('OBJECT_IS', () => {
    test('Check Object Is', () => {
        const obj1: object = { a: 'a', b: 'b' };
        const obj2: object = { a: 'a', b: 'b' };
        const obj3: object = { b: 'b', a: 'a' };
        const obj4: object = { a: 'a' };
        const obj5: object = { a: 'a', b: 'b', c: 'c' }
        const obj6: object = { a: 'b', b: 'a' };

        expect(objectIs(obj1, obj1)).toBe(true)
        expect(objectIs(obj1, obj2)).toBe(true)
        expect(objectIs(obj1, obj3)).toBe(true)
        expect(objectIs(obj1, obj4)).toBe(false)
        expect(objectIs(obj1, obj5)).toBe(false)
        expect(objectIs(obj1, obj6)).toBe(false)
    })
})
