# `useUrlSearchParams()`.

A React Hook to use [URL query string](https://en.wikipedia.org/wiki/Query_string) as a state management

[Demo](http://)

## Installation

```
npm install use-url-search-params
```

or

```
yarn add use-url-search-params
```

## How to use

For most of the time you will do something like this:

```js
import React from "react";
import { useUrlSearchParams } from "use-url-search-params";

function App() {
  // Your page URL will be like this by default: http://my.page?checked=true
  const [params, setParams] = useUrlSearchParams({ checked: true });

  React.useEffect(() => {
    // do something when `params.checked` is updated.
  }, [params.checked]);

  return (
    <div>
      <input
        type="checkbox"
        checked={params.checked}
        onChange={e => setParams({ checked: e.target.checked })}
      />
    </div>
  );
}
```

## How to control the value parsed from URL query

```js
const [params, setParams] = useUrlSearchParams(
  {},
  { x: Number, y: ["option1", "option2", "option3"], z: Boolean }
);
// `params.x` will always be number (or NaN)
// `params.y` will be either empty or one of ["option1", "option2", "option3"]
// `params.z` will be one of [undefined, true, false]
```

## Complex data structure

Although you can use `JSON.parse()` and `JSON.stringify()` to get/set arbitrary serializable data to URL query, it is not recommended. URL query is a good place to store and persist page settings as a key/value pair (ex: table filter, sorting, paging, etc.), and we should keep it that way for simplicity. _For complex data structure, you should consider using other state management for better performance and flexibility._

But if you still insist, here is an example:

```js
function App() {
  const [params, setParams] = useUrlSearchParams(
    {},
    {
      complexData: dataString => {
        try {
          return JSON.parse(dataString);
        } catch (e) {
          return {};
        }
      }
    }
  );

  const onSetParams = data => {
    setParams({ complexData: JSON.stringify(data) });
  };

  return <div>{/*...*/}</div>;
}
```

## API

- **useUrlSearchParams([initial, types])**
  - `initial` (optional | Object): To set default values for URL query string.
  - `types` (optional | Object): Has similar shape with `initial`, help to resolve values from URL query string. Supported types:
    - `String` (default)
    - `Number`
    - `Bool`
    - Array of available values (similar to enum)
    - A custom resolver function

## Read more

This library is built base on [URLSearchParams interface](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

## License

MIT
