/**
 * Will return a new object that have the same properties and values
 *
 * @param { A } obj the object given that will be return as a new object
 * @typedef { object } A the element must be an object
 * @returns {A} A
 * @example
 *  const obj1 = { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 }
 *  const obj2 = pickAll(obj1); // will return { '1': 1, '2': 2, '3': 3, '4': 4, '5': 5 } as new object
 */
export default function pickAll<A extends object>(obj: A): A {
    return { ...obj };
}
