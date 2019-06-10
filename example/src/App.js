import React from "react";
import "./App.css";
import { useUrlSearchParams } from "use-url-search-params";

function App() {
  const initial = { checked: true, date: new Date() };
  const types = {
    selectedOption: ["option1", "option2", "option3"],
    checked: Boolean,
    date: Date,
    obj: data => {
      try {
        return JSON.parse(data);
      } catch (e) {
        return {};
      }
    }
  };
  const [queries, setQueries] = useUrlSearchParams(initial, types);

  React.useEffect(() => {
    console.log("queries changed", queries);
  }, [queries]);

  return (
    <div className="App">
      <h2>
        Example of{" "}
        <a href="https://github.com/rudyhuynh/use-url-search-params">
          use-url-search-params
        </a>
      </h2>
      <div>
        See{" "}
        <a href="https://github.com/rudyhuynh/use-url-search-params/blob/master/example/src/App.js">
          source code here
        </a>
      </div>
      <main>
        <label>
          <input
            type="checkbox"
            checked={queries.checked === true}
            onChange={e => setQueries({ checked: e.target.checked })}
          />{" "}
          Check me!
        </label>
        <select
          value={queries.selectedOption}
          onChange={e => setQueries({ selectedOption: e.target.value })}
        >
          <option />
          <option value="option1">option 1</option>
          <option value="option2">option 2</option>
          <option value="option3">option 3</option>
        </select>
        <button
          onClick={() => {
            setQueries({ date: new Date() });
          }}
        >
          Set date object
        </button>
        <button onClick={() => setQueries({ arr: [1, 2, 3] })}>
          Set an array to URL query
        </button>
        <button
          onClick={() =>
            setQueries({ obj: JSON.stringify({ x: { y: { z: 1 } } }) })
          }
        >
          Set a JSON object to URL query
        </button>
        <button onClick={() => setQueries({ obj: null })}>
          Delete `obj` query
        </button>

        <div style={{ textAlign: "left" }}>
          Queries:
          <pre>
            <code>{JSON.stringify(queries, null, 2)}</code>
          </pre>
        </div>
      </main>
    </div>
  );
}

export default App;
