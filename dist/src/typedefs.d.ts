export declare type ParamValueType = string | number | boolean | Date | string[] | Object | undefined;
export declare type InitialType = Record<string, ParamValueType>;
export declare type SupportedType = StringConstructor | NumberConstructor | BooleanConstructor | DateConstructor;
export declare type TypesValue = SupportedType | string[] | Function;
export declare type TypesType = Record<string, TypesValue>;
