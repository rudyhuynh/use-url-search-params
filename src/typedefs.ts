export type InitialType = {
  [key: string]: string | number | boolean | Date | string[] | Object | undefined;
};

export type SupportedType = StringConstructor | NumberConstructor | BooleanConstructor | DateConstructor;

export type TypesValue = SupportedType | string[] | Function;

export type TypesType = {
  [key: string]: TypesValue;
};

export type UseUrlSearchParamsResults = [InitialType, (nextQuery: InitialType) => void];
