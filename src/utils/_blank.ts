/**
 * The BLANK constant is used to move an argument in a curry function
 */
export const BLANK = Symbol('BLANK');

export type Blank = typeof BLANK;

/**
 * Check if the item is a blank item
 * @param {any} item
 * @returns {boolean}
 */
export function isBlank(item: unknown): item is Blank {
    return item === BLANK;
}

/**
 * Merge two array. If the first array have some BLANK items, there will be replace if possible by items of second group. Else will push it
 * @param {any[]} items The default list with some items that can be BLANK item
 * @param {any[]} addItems The items to add. If there is a BLANK in items, those first addItems will take the position of items
 * @returns any[]
 */
export function replaceBlank<T>(
    items: (T | Blank)[],
    addItems: (T | Blank)[],
): (T | Blank)[] {
    if (!addItems?.length) {
        if (!items?.length) return [];
        return [...items];
    }

    if (!items?.length) {
        return [...addItems];
    }

    const [firstItem, ...restItems] = items;

    if (isBlank(items[0])) {
        const [, ...restAddItems] = addItems;
        return [addItems[0], ...replaceBlank(restItems, restAddItems)];
    }

    return [firstItem, ...replaceBlank(restItems, addItems)];
}
