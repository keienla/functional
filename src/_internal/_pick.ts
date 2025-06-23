import type { TObject } from '../models';
import curry from '../curry/curry';

export default curry(function pick(
    obj: TObject,
    props: string[] = [],
): TObject {
    const newObj: TObject = {};

    for (let key of props) {
        newObj[key] = obj[key];
    }

    return newObj;
});
