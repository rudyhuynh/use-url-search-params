import React from "react";
import "./App.css";
import { useUrlSearchParams } from "use-url-search-params";
console.log("useUrlSearchParams", useUrlSearchParams);
function App() {
  const initial = { checked: true };
  const types = {
    selectedOption: ["option1", "option2", "option3"],
    checked: Boolean,
    obj: data => {
      try {
        return JSON.parse(data);
      } catch (e) {
        return {};
      }
    }
  };
  const [queries, setQueries] = useUrlSearchParams(initial, types);

  return (
    <div className="App">
      <button
        onClick={() =>
          setQueries({ obj: JSON.stringify({ x: { y: { z: 1 } } }) })
        }
      >
        Set a JSON object to URL query
      </button>
      <button onClick={() => setQueries({ arr: [1, 2, 3] })}>
        Set an array to URL query
      </button>
      <select
        value={queries.selectedOption}
        onChange={e => setQueries({ selectedOption: e.target.value })}
      >
        <option />
        <option value="option1">option 1</option>
        <option value="option2">option 2</option>
        <option value="option3">option 3</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={queries.checked === true}
          onChange={e => setQueries({ checked: e.target.checked })}
        />{" "}
        Check me!
      </label>
      <div style={{ textAlign: "left" }}>
        Queries:
        <pre>
          <code>{JSON.stringify(queries, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}

export default App;
