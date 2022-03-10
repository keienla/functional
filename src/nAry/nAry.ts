/**
 * Return a function with multiples properties in object parameter as a function with only less properties in it's object
 * @example
 *  function fn1(arg1, arg2, arg3, ..., argN) { ... }
 *  const fn2 = unary(fn1, ['arg2', 'argN']); // So when i'll call fn2 now i'll can set only two arguments, 'arg2' and 'argN'
 *  fn2(arg2, argN) // will execute the function with only arg2
 *
 * @param { (...args: any[]) => R } fn (args: any) => R
 * @param { number } length number
 * @typedef {object} A object - the object with arguments of the given method (when call for the last time)
 * @typedef {any} R any - the result of the fn given
 * @returns { (args: A) => R } (args: A) => R
 */
export default function nAry<A extends object = object, R = any>(fn: (...args: any[]) => R, length: number): (args: A) => R {
    return function limite(...args: any[]): R {
        const limitArgs: any[] = args.slice(0, length)
        return fn(...limitArgs)
    }
}
