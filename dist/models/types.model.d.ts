export declare type TObject = {
    [key: string]: any;
};
export declare type Fn = (...args: any[]) => any;
export declare type Predicate<T> = (value: T) => boolean;
export declare type Params<F extends Function> = F extends ((...args: infer A) => any) ? A : never;
export declare type Head<T extends any[]> = T extends [infer HeadElement, ...any[]] ? HeadElement : never;
export declare type Tail<T extends any[]> = ((...t: T) => any) extends ((_: any, ...tail: infer TailsElement) => any) ? TailsElement : never;
export declare type HasTail<T extends any[]> = T extends ([] | [any]) ? false : true;
export declare type First<T extends any[]> = Head<T> extends never ? never : T extends [first: infer F, ...rest: infer R] ? F : never;
export declare type Last<T extends any[]> = Tail<T> extends never ? never : T extends [...rest: infer U, last: infer L] ? L : never;
export declare type Prepend<Addend, A extends any[]> = ((_: Addend, ..._1: A) => any) extends ((...args: infer Result) => any) ? Result : A;
export declare type Length<T extends any[]> = T['length'];
export declare type Drop<N extends number, T extends any[], I extends any[] = []> = {
    continue: Drop<N, Tail<T>, Prepend<any, I>>;
    return: T;
    infinite: {};
}[Length<I> extends N ? 'return' : IsFinite<T, 'continue', 'infinite'>];
export declare type Before<N extends number, T extends any[], R extends any[] = [], I extends any[] = []> = {
    continue: Before<N, Tail<T>, Prepend<Head<T>, R>, Next<I>>;
    finish: Reverse<R>;
    finishWithHead: Reverse<Prepend<Head<T>, R>>;
    empty: never;
    infinite: {};
}[T extends any[] ? IsFinite<T, Length<I> extends N ? 'finish' : Length<Tail<T>> extends 0 ? 'finishWithHead' : 'continue', 'infinite'> : 'empty'];
export declare type Cast<X, Y> = X extends Y ? X : Y;
export declare type Pos<I extends any[]> = Length<I>;
export declare type Next<I extends any[]> = Prepend<any, I>;
export declare type Prev<I extends any[]> = Tail<I>;
export declare type Iterator<Index extends number = 0, From extends any[] = [], I extends any[] = []> = {
    0: Iterator<Index, Next<From>, Next<I>>;
    1: From;
}[Pos<I> extends Index ? 1 : 0];
export declare type Reverse<A extends any[], Prefix extends any[] = []> = {
    empty: Prefix;
    notEmpty: ((...args: A) => any) extends ((_: infer First, ...next: infer Next) => any) ? Reverse<Next, Prepend<First, Prefix>> : never;
    infinite: {
        ERROR: 'Cannot reverse an infinite array';
        CODENAME: ['InfiniteArray', 'Infinite'];
    };
}[A extends [any, ...any[]] ? IsFinite<A, 'notEmpty', 'infinite'> : 'empty'];
export declare type Concat<Left extends any[], Right extends any[]> = {
    emptyLeft: Right;
    oneLeft: Left extends [infer Unique] ? Prepend<Unique, Right> : never;
    multiLeft: ((..._: Reverse<Left>) => any) extends ((_: infer LeftLast, ..._1: infer ReversedLeftRest) => any) ? Concat<Reverse<ReversedLeftRest>, Prepend<LeftLast, Right>> : never;
    infiniteLeft: {
        ERROR: 'Left is not finite';
        CODENAME: ['InfiniteLeft', 'Infinite'];
    };
}[Left extends [] ? 'emptyLeft' : Left extends [any] ? 'oneLeft' : IsFinite<Left, 'multiLeft', 'infiniteLeft'>];
export declare type Append<E, T extends any[]> = Concat<T, [E]>;
export declare type NotNull<A, B> = A extends undefined ? B : A extends null ? B : A;
export declare type returnedTypes = 'any' | 'string' | 'array' | 'object' | 'number' | 'function' | 'boolean' | 'undefined' | 'bigint' | 'symbol' | 'null' | 'regexp' | 'generator' | 'generatorfunction' | 'unknown';
export declare type TypeName<A> = unknown extends A ? [keyof A] extends [never] ? 'unknown' : 'any' : A extends Array<any> ? 'array' : A extends string ? 'string' : A extends number ? 'number' : A extends Function ? 'function' : A extends boolean ? 'boolean' : A extends undefined ? 'undefined' : A extends Symbol ? 'symbol' : A extends RegExp ? 'regexp' : A extends Generator ? 'generator' : A extends null ? 'null' : A extends bigint ? 'bigint' : A extends object ? 'object' : 'unknown';
export declare type TypeOf<T> = T extends Array<infer U> ? ([U] extends [never] ? any : TypeOf<U>)[] : T extends string ? string : T extends number ? number : T extends (...args: infer A) => infer R ? (...args: A) => R : T extends boolean ? boolean : T extends undefined ? undefined : T extends Symbol ? Symbol : T extends RegExp ? RegExp : T extends Generator ? Generator : T extends null ? null : T extends bigint ? bigint : T extends object ? T : unknown;
export declare type ValueOf<T> = T[keyof T];
declare type Consumer<Value> = (value: Value) => void;
declare type IntersectionFromUnion<T> = (T extends any ? Consumer<T> : never) extends (Consumer<infer ResultIntersection>) ? ResultIntersection : never;
declare type OverloadedConsumerFromUnion<Union> = IntersectionFromUnion<Union extends any ? Consumer<Union> : never>;
export declare type UnionLast<Union> = OverloadedConsumerFromUnion<Union> extends ((a: infer A) => void) ? A : never;
export declare type HeadTruc<T> = T extends (infer HeadElement | any) ? HeadElement : never;
export declare type UnionExcludingLast<Union> = Exclude<Union, UnionLast<Union>>;
export declare type Tuple<A = any> = Array<A>;
export declare type TupleFromUnion<RemainingUnion, CurrentTuple extends any[] = []> = {
    0: TupleFromUnion<UnionExcludingLast<RemainingUnion>, Prepend<UnionLast<RemainingUnion>, CurrentTuple>>;
    1: CurrentTuple;
}[[
    RemainingUnion
] extends [never] ? 1 : 0];
export declare type SameValueInterface<T, R> = {
    [K in keyof T]: R;
};
export declare type IsFinite<A extends any[], Finite, Infinite> = {
    empty: Finite;
    notEmpty: ((...args: A) => any) extends ((_firstArgs: infer First, ...args: infer Rest) => any) ? IsFinite<Rest, Finite, Infinite> : never;
    infinite: Infinite;
}[A extends [] ? 'empty' : A extends (infer Element)[] ? Element[] extends A ? 'infinite' : 'notEmpty' : never];
export {};
//# sourceMappingURL=types.model.d.ts.map