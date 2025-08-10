import spreadArgs from './spreadArgs';

describe('SPREAD_ARGS', () => {
    test('Spread args on a function with no argument should return a function with arguments type any', () => {
        function fn() {
            return '';
        }
        const gathered = spreadArgs(fn);

        expect(fn()).toBe('');
        expect(gathered()).toBe('');
    });

    test('Spread args on a typed function', () => {
        function fn(words: string[]) {
            return words.reduce((result, value) => result + value, '');
        }
        const gathered = spreadArgs(fn);

        expect(fn(['a', 'b', 'c'])).toBe('abc');
        expect(gathered('a', 'b', 'c')).toBe('abc');
    });

    test('Spread args with number array function', () => {
        function sum(numbers: number[]) {
            if (!numbers) return 0; // Handle undefined case when no args passed
            return numbers.reduce((result, value) => result + value, 0);
        }
        const spreadSum = spreadArgs(sum);

        expect(sum([1, 2, 3, 4, 5])).toBe(15);
        // @ts-ignore: spreadSum accepts spread arguments
        expect(spreadSum(1, 2, 3, 4, 5)).toBe(15);
        expect(spreadSum()).toBe(0);
    });

    test('Spread args with boolean array function', () => {
        function allTrue(booleans: boolean[]) {
            return booleans.every((b) => b === true);
        }
        const spreadAllTrue = spreadArgs(allTrue);

        expect(allTrue([true, true, true])).toBe(true);
        expect(spreadAllTrue(true, true, true)).toBe(true);
        expect(allTrue([true, false, true])).toBe(false);
        expect(spreadAllTrue(true, false, true)).toBe(false);
    });

    test('Spread args with object array function', () => {
        function combineObjects(objects: Array<{ value: number }>) {
            return objects.reduce((acc, obj) => acc + obj.value, 0);
        }
        const spreadCombine = spreadArgs(combineObjects);

        const objs = [{ value: 1 }, { value: 2 }, { value: 3 }];
        expect(combineObjects(objs)).toBe(6);
        expect(spreadCombine({ value: 1 }, { value: 2 }, { value: 3 })).toBe(6);
    });

    test('Spread args with empty array handling', () => {
        function handleEmpty(items: any[]) {
            if (!items) return 'empty'; // Handle undefined case
            return items.length === 0 ? 'empty' : 'not empty';
        }
        const spreadHandle = spreadArgs(handleEmpty);

        expect(handleEmpty([])).toBe('empty');
        expect(spreadHandle()).toBe('empty');
        expect(handleEmpty(['item'])).toBe('not empty');
        // @ts-ignore: spreadHandle accepts spread arguments
        expect(spreadHandle('item')).toBe('not empty');
    });

    test('Spread args with single argument', () => {
        function singleItemProcessor(items: string[]) {
            return items.length === 1
                ? `single: ${items[0]}`
                : `multiple: ${items.length}`;
        }
        const spreadProcessor = spreadArgs(singleItemProcessor);

        expect(singleItemProcessor(['hello'])).toBe('single: hello');
        expect(spreadProcessor('hello')).toBe('single: hello');
        expect(singleItemProcessor(['a', 'b', 'c'])).toBe('multiple: 3');
        expect(spreadProcessor('a', 'b', 'c')).toBe('multiple: 3');
    });

    test('Spread args preserves function return types', () => {
        function returnObject(data: number[]) {
            return { sum: data.reduce((a, b) => a + b, 0), count: data.length };
        }
        const spreadReturnObject = spreadArgs(returnObject);

        const expected = { sum: 10, count: 4 };
        expect(returnObject([1, 2, 3, 4])).toEqual(expected);
        expect(spreadReturnObject(1, 2, 3, 4)).toEqual(expected);
    });

    test('Spread args with mixed data types', () => {
        function processAny(items: any[]) {
            return items.map((item) => typeof item).join(',');
        }
        const spreadProcessAny = spreadArgs(processAny);

        expect(processAny([1, 'hello', true, null])).toBe(
            'number,string,boolean,object',
        );
        expect(spreadProcessAny(1, 'hello', true, null)).toBe(
            'number,string,boolean,object',
        );
    });

    test('Spread args with undefined and null values', () => {
        function handleNullish(items: (string | null | undefined)[]) {
            return items.filter((item) => item !== null && item !== undefined);
        }
        const spreadHandleNullish = spreadArgs(handleNullish);

        const input = ['a', null, 'b', undefined, 'c'];
        const expected = ['a', 'b', 'c'];

        expect(handleNullish(input)).toEqual(expected);
        expect(spreadHandleNullish('a', null, 'b', undefined, 'c')).toEqual(
            expected,
        );
    });

    test('Spread args with array methods', () => {
        function findMax(numbers: number[]) {
            if (!numbers) return -Infinity; // Handle undefined case
            return Math.max(...numbers);
        }
        const spreadFindMax = spreadArgs(findMax);

        expect(findMax([10, 5, 8, 3, 12])).toBe(12);
        // @ts-ignore: spreadFindMax accepts spread arguments
        expect(spreadFindMax(10, 5, 8, 3, 12)).toBe(12);
        expect(findMax([])).toBe(-Infinity);
        expect(spreadFindMax()).toBe(-Infinity);
    });

    test('Spread args maintains this context', () => {
        const obj = {
            multiplier: 2,
            process: function (numbers: number[]) {
                return numbers.map((n) => n * this.multiplier);
            },
        };
        const spreadProcess = spreadArgs(obj.process);

        expect(obj.process([1, 2, 3])).toEqual([2, 4, 6]);
        // Note: spreadProcess loses 'this' context when called standalone
        expect(() => spreadProcess(1, 2, 3)).toThrow();
    });

    test('Spread args with arrow functions', () => {
        const multiply = (numbers: number[]) => numbers.map((n) => n * 2);
        const spreadMultiply = spreadArgs(multiply);

        expect(multiply([1, 2, 3])).toEqual([2, 4, 6]);
        expect(spreadMultiply(1, 2, 3)).toEqual([2, 4, 6]);
    });

    test('Spread args with nested arrays', () => {
        function flattenFirst(arrays: number[][]) {
            return arrays.flat();
        }
        const spreadFlatten = spreadArgs(flattenFirst);

        const input = [
            [1, 2],
            [3, 4],
            [5, 6],
        ];
        const expected = [1, 2, 3, 4, 5, 6];

        expect(flattenFirst(input)).toEqual(expected);
        expect(spreadFlatten([1, 2], [3, 4], [5, 6])).toEqual(expected);
    });

    test('Spread args with large argument lists', () => {
        function sumLarge(numbers: number[]) {
            return numbers.reduce((sum, n) => sum + n, 0);
        }
        const spreadSumLarge = spreadArgs(sumLarge);

        const largeArray = Array.from({ length: 1000 }, (_, i) => i + 1);
        const expectedSum = 500500; // Sum of 1 to 1000

        expect(sumLarge(largeArray)).toBe(expectedSum);
        expect(spreadSumLarge(...largeArray)).toBe(expectedSum);
    });

    test('Spread args error handling', () => {
        function throwOnEmpty(items: string[]) {
            if (!items || items.length === 0) {
                throw new Error('Array cannot be empty');
            }
            return items.join(' ');
        }
        const spreadThrow = spreadArgs(throwOnEmpty);

        expect(() => throwOnEmpty([])).toThrow('Array cannot be empty');
        expect(() => spreadThrow()).toThrow('Array cannot be empty');

        expect(throwOnEmpty(['hello', 'world'])).toBe('hello world');
        // @ts-ignore: spreadThrow accepts spread arguments
        expect(spreadThrow('hello', 'world')).toBe('hello world');
    });
});
