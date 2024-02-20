export type Transpoline<T> = T | (() => Transpoline<T>);
export type TranspolineResult<T> = Exclude<Transpoline<T>, (() => Transpoline<T>)>;
//# sourceMappingURL=transpoline.model.d.ts.map