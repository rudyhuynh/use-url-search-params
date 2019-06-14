import React from "react";

const SUPPORTED_PARAMS_TYPES = [Number, String, Boolean, Date];

function setQueryToCurrentUrl(params) {
  const url = new URL(window.location.href);

  Object.keys(params).forEach(key => {
    const value = params[key];
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        url.searchParams.delete(key);
        value.forEach(valueItem => {
          url.searchParams.append(key, valueItem);
        });
      } else if (value instanceof Date) {
        if (!isNaN(value.getTime())) {
          url.searchParams.set(key, value.toISOString());
        }
      } else if (typeof value === "object") {
        url.searchParams.set(key, JSON.stringify(value));
      } else {
        url.searchParams.set(key, value);
      }
    } else {
      url.searchParams.delete(key);
    }
  });
  return url;
}

function isNoneEmptyPrimitiveArray(input) {
  return (
    Array.isArray(input) &&
    input.length > 0 &&
    input.every(
      item =>
        typeof item === "number" ||
        typeof item === "string" ||
        typeof item === "boolean"
    )
  );
}

function validateTypes(types = {}) {
  const isValidTypes = Object.values(types).every(
    type =>
      SUPPORTED_PARAMS_TYPES.includes(type) ||
      isNoneEmptyPrimitiveArray(type) ||
      typeof type === "function"
  );

  if (!isValidTypes) {
    throw new Error(
      `Unsupported param types. Must be one of [${SUPPORTED_PARAMS_TYPES.map(
        item => item.name
      ).join(", ")}]`
    );
  }
}

export function useUrlSearchParams(initial = {}, types) {
  if (types) validateTypes(types);

  const [, forceUpdate] = React.useState();

  console.log("window.location.search!!", window.location.search);

  const urlSearchParams = React.useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, [window.location.search]);

  const params = React.useMemo(() => {
    let result = [];
    for (let item of urlSearchParams) {
      result.push({
        key: item[0],
        value: item[1]
      });
    }

    //group by key
    result = result.reduce((acc, val) => {
      (acc[val.key] = acc[val.key] || []).push(val);
      return acc;
    }, {});

    result = Object.keys(result).map(key => {
      const valueGroup = result[key];
      if (valueGroup.length === 1) {
        return [key, valueGroup[0].value];
      } else {
        return [key, valueGroup.map(({ value }) => value)];
      }
    });

    const params = initial;

    result.forEach(([key, value]) => {
      params[key] = parseValue(key, value, types, initial);
    });

    return params;
  }, [urlSearchParams]);

  function redirectToNewSearchParams(params) {
    const url = setQueryToCurrentUrl(params);
    window.history.pushState({}, "", url);

    if (urlSearchParams.toString() !== url.searchParams.toString()) {
      forceUpdate({});
    }
  }

  React.useState(() => {
    redirectToNewSearchParams({
      ...initial,
      ...params
    });
  }, [params]);

  const setParams = params => {
    redirectToNewSearchParams(params);
  };

  React.useEffect(() => {
    const onPopState = event => {
      forceUpdate({});
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  return [params, setParams];
}

const booleanValues = {
  true: true,
  false: false
};

function parseValue(key, _value, types, defaultParams) {
  if (!types) return _value;
  const type = types[key];
  const value = _value === undefined ? defaultParams[key] : _value;

  if (type === Number) {
    return Number(value);
  }
  if (type === Boolean) {
    return booleanValues[value];
  }
  if (type === Date) {
    return new Date(value);
  }
  if (Array.isArray(type)) {
    // eslint-disable-next-line eqeqeq
    return type.find(item => item == value) || defaultParams[key];
  }
  if (typeof type === "function") {
    return type(value);
  }

  return value;
}
