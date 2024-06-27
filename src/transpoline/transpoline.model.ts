export type Transpoline<Item> = Item | (() => Transpoline<Item>);
export type TranspolineResult<Item> = Exclude<Transpoline<Item>, (() => Transpoline<Item>)>;
