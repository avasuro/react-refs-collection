declare type TRefHandler<TRefObject = any> = {
  current: TRefObject;
  refHandler(refObject: TRefObject): void
};

declare class RefsCollection<TRefObject = any, TKey = any> {
  clear(): void;

  getRefHandler(key: TKey): TRefHandler<TRefObject>;

  getRef(key: TKey): TRefObject | undefined;

  getKeysByRef(ref: TRefObject): Array<TKey>;

  getKeyByRef(ref: TRefObject): TKey|undefined;
}

declare function useRefsCollection<
  TRefObject = any,
  TKey = any
  >(): RefsCollection<TRefObject, TKey>;

export {
  RefsCollection,
  useRefsCollection
};
