export type ParamValueType = string | number | boolean | Date | string[] | Object | undefined;

export type InitialType = Record<string, ParamValueType>;

export type SupportedType = StringConstructor | NumberConstructor | BooleanConstructor | DateConstructor;

export type TypesValue = SupportedType | string[] | Function;

export type TypesType = Record<string, TypesValue>;
