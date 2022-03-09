import memoize from './memoize';

describe('MEMOIZE', () => {
    test('Check memoize function', () => {
        // This function will return a random number between 1 and XXX
        function rollDice(faces: number) { return Math.round(Math.random() * (faces - 1)) + 1 }

        // By memoizing the function, each time we will call it with the same number of faces, will return the same result
        const memoizedRollDice = memoize(rollDice);

        const rolls: number[] = [];
        const responses: number[] = [];
        let firstValue: number = 0;
        for(let i = 0; i < 100; i++) {
            rolls.push(memoizedRollDice(100));
            if(i === 0) {
                firstValue = rolls[0];
            }
            responses.push(firstValue)
        }

        expect(rolls).toEqual(responses);
    })
})
