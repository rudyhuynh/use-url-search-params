import { TypesType, InitialType } from "./typedefs";
export declare function useUrlSearchParams<S extends InitialType>(initial?: S, types?: TypesType, replace?: boolean): [S, (nextQuery: Partial<S>) => void];
