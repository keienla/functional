import transpoline from './transpoline';

describe('TRANSPOLINE', () => {
    test('Throw error when too much recursion', () => {
        const sumBelow = (number: number, sum: number = 0): number => {
            return number === 0
                ? sum
                : sumBelow(number - 1, sum + number)
        }

        expect(() => { sumBelow(100000) }).toThrow()
    })

    test('Finish the recursive with transpoline', () => {
        const sumBelow = (number: number, sum: number = 0) => {
            return number === 0
                ? sum
                : () => { return sumBelow(number - 1, sum + number) }
        }

        const tSumBelow = transpoline(sumBelow);

        expect(tSumBelow(100000)).toBe(5000050000)
    })
})
