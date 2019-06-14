import React from "react";
import "./App.css";
import { useUrlSearchParams } from "use-url-search-params";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App({ history }) {
  const initial = { checked: true, date: new Date(2019, 6, 1) };
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
      <button
        onClick={() => {
          history.push("/about?checked=true");
        }}
      >
        Change Route By React Router
      </button>
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

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Link to /</Link>
            </li>
            <li>
              <Link to="/about/">Link to /about</Link>
            </li>
            <li>
              <Link to="/users/?checked=false">
                Link to /users/?checked=false
              </Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={App} />
        <Route path="/about/" component={App} />
        <Route path="/users/" component={App} />
      </div>
    </Router>
  );
}

export default AppRouter;
