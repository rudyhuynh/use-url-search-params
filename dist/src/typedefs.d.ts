export declare type InitialType = {
    [key: string]: string | number | boolean | Date | string[] | Object | undefined;
};
export declare type SupportedType = StringConstructor | NumberConstructor | BooleanConstructor | DateConstructor;
export declare type TypesValue = SupportedType | string[] | Function;
export declare type TypesType = {
    [key: string]: TypesValue;
};
export declare type UseUrlSearchParamsResults = [InitialType, (nextQuery: InitialType) => void];
