declare let F: F.Static;

declare namespace F {
    interface Static {
        when<T, R>(predicate: (arg: T) => boolean, fn: (arg: T) => R): (arg: T) => R | T;
        when<T, R>(predicate: (arg: T) => boolean): (fn: (arg: T) => R) => (arg: T) => R | T;
    }
}

export = F;
export as namespace F;
