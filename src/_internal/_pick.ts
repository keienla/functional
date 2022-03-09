'use strict';

import curry from "../curry/curry";
import { TObject } from "../models/types.model";

export default curry(function pick(obj: TObject, props: string[] = []): TObject {
    var newObj: TObject = {};

    for(let key of props) {
        newObj[key] = obj[key]
    }

    return newObj;
})
