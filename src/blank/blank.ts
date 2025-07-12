/**
 * The BLANK constant is used to move an argument in a curry function
 */
export const _ = Symbol('BLANK');

export type Blank = typeof _;

/**
 * Check if the item is a blank item
 * @param {unknown} item The item to check
 * @returns {boolean} True if the item is a blank item, false otherwise
 */
export function isBlank(item: unknown): item is Blank {
    return item === _;
}

/**
 * Merge two array. If the first array have some BLANK items, there will be replace if possible by items of second group. Else will push it
 * @param {any[]} items The default list with some items that can be BLANK item
 * @param {any[]} addItems The items to add. If there is a BLANK in items, those first addItems will take the position of items
 * @returns any[]
 */
export function replaceBlank<Type>(
    items: (Type | Blank)[],
    addItems: (Type | Blank)[],
): (Type | Blank)[] {
    if (!addItems?.length) {
        if (!items?.length) {
            return [];
        }
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
