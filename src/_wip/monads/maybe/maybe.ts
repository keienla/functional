const _of = function (value: any) {
    return Maybe(value);
};

function Maybe(value: any) {
    function isNothing() {
        return value === null || value === undefined;
    }
    function join() {
        return value;
    }
    function map(fn) {
        if (isNothing()) return Maybe(null);
        return Maybe(fn(value));
    }
    function chain(fn) {
        return map(fn).join();
    }

    return {
        isNothing,
        map,
        join,
        chain,
        of: _of,
    };
}

Maybe.of = _of;
