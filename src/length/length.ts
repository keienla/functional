import type from './../type/type';

/**
 * Return the length of the element.
 *
 * If the element is an array: return the length of it.
 * If the element is a string: return the number of characters.
 * If the element is a function: return the number of arguments.
 * If the element is an object: return the number of keys.
 * If the element is a regexp: return the number of characters.
 * else return null
 *
 * @example
 *  const el1: string = 'abc';
 *  const el2: string[] = ['a', 'b'];
 *  const el3: (a: string, b: string) => any = (a: string, b: string) => { return; };
 *  const el4: { a: string, b: string, c: string } = { a: 'a', b: 'b', c: 'c' };
 *  const el5: number = 10;
 *  const el6: boolean = true;
 *  const el7: undefined = undefined;
 *  const el8: Symbol = Symbol('foo');
 *  const el9: BigInt = BigInt(10);
 *
 *  length(el1);         // 3
 *  length(el2);         // 2
 *  length(el3);         // 2
 *  length(el4);         // 3
 *  length(el5);         // null
 *  length(el6);         // null
 *  length(el7);         // null
 *  length(el8);         // null
 *  length(el9);         // null
 *
 * @param {any} el
 * @returns { number | null } number | null
 */
export default function length(el: any): number | null {
    switch(type(el)) {
        case 'array':
        case 'function':
        case 'string':
            return (el as unknown as string).length;
        case 'object':
            return Object.keys(el).length;
        case 'regexp':
            return (el as unknown as RegExp).toString().length;
        default:
            return null;
    }
}
