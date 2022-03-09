import mapObject from './mapObject';

describe('MAP_OBJECT', () => {
    test('Check if mapObject function work', () => {
        function addOne(x: number): number { return x + 1 }
        const mapped = mapObject(addOne, {a: 1, b: 5, c: 8});

        expect(mapped).toEqual({a: 2, b: 6, c: 9})
    })
})
