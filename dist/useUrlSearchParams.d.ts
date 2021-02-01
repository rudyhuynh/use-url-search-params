type InitialType = {
  [key: string]: string | number | boolean | Date | string[] | Object;
};

type TypesType = {
  [key: string]: any;
};

declare module "use-url-search-params" {
  /**
   *
   * @param initial initial value for query object
   * @param types help to resolve value from URL query before map to query object
   * @param replace wether URL is replaced or not
   * @returns `[queries, setQueries]`
   */
  export function useUrlSearchParams(
    initial: InitialType,
    types: TypesType,
    replace?: boolean
  ): [InitialType, (nextQuery: InitialType) => void];
}
