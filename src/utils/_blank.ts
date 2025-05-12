/**
 * The _BLANK constant is used to move an argument in a curry function
 */
export const _BLANK = Symbol('BLANK');

/**
 * Check if the item is a blank item
 * @param  {any} item
 */
export function isBlank(item: any) {
    return item === _BLANK;
}

/**
 * Merge two array. If the first array have some _BLANK items, there will be replace if possible by items of second group. Else will push it
 * @param  {any[]} items The default list with some items that can be _BLANK item
 * @param  {any[]} addItems The items to add. If there is a _BLANK in items, those first addItems will take the position of items
 * @returns any[]
 */
export function replaceBlank(items: any[], addItems: any[]): any[] {
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
