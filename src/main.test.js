import { renderHook, act } from "@testing-library/react-hooks";
import { useUrlSearchParams } from "./main";
import { setWindow, getWindow } from "./mockWindow";
import { JSDOM } from "jsdom";

test("non-browser environment", () => {
  const error = renderHook(() =>
    useUrlSearchParams(
      {
        a: 1,
        b: true,
        c: new Date(),
        e: [1, 2, 3],
      },
      {
        a: Number,
        b: Boolean,
        c: Date,
        d: ["option1", "option2", "option3"],
        e: Array,
      }
    )
  ).result.error;
  if (error) throw error;
});

describe("browser environment", () => {
  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><p>...</p>`);
    setWindow(dom.window);
  });

  test("?name=value", () => {
    const { result } = renderHook(() => useUrlSearchParams({ name: "value" }));

    let [param] = result.current;

    expect(param.name).toBe("value");
    expect(getWindow().location.search).toBe("?name=value");

    act(() => {
      const [, setParams] = result.current;
      setParams({ name: "newValue" });
    });

    [param] = result.current;

    expect(param.name).toBe("newValue");
    expect(getWindow().location.search).toBe("?name=newValue");
  });

  test("empty initial", () => {
    let { result } = renderHook(() => useUrlSearchParams());

    let [param] = result.current;
    expect(param).toEqual({});
  });

  test("empty initial with types", () => {
    const types = {
      a: String,
      b: Number,
      c: Boolean,
      d: Date,
      e: ["x", "y", "z"],
      f: (x) => JSON.parse(x),
    };
    let { result } = renderHook(() => useUrlSearchParams({}, types));

    let [param] = result.current;
    expect(param).toEqual({});
  });

  test("all supported types", () => {
    const fObj = { f: "f" };
    const initial = {
      a: "a",
      b: 1,
      c: false,
      d: new Date(2019, 0, 1, 1, 1, 1),
      e: "x",
      f: JSON.stringify(fObj),
      g: ["1", "2", "3"],
    };
    const expectedSearch = "?a=a&b=1&c=false&d=2018-12-31T17%3A01%3A01.000Z&e=x&f=%7B%22f%22%3A%22f%22%7D&g=1&g=2&g=3";
    const types = {
      a: String,
      b: Number,
      c: Boolean,
      d: Date,
      e: ["x", "y", "z"],
      f: (x) => JSON.parse(x),
    };
    const { result } = renderHook(() => useUrlSearchParams(initial, types));

    let [param] = result.current;

    expect(param.a).toEqual(initial.a);
    expect(param.b).toEqual(initial.b);
    expect(param.c).toEqual(initial.c);
    expect(param.d.getTime()).toEqual(initial.d.getTime());
    expect(param.e).toEqual(initial.e);
    expect(param.f).toEqual(fObj);
    expect(getWindow().location.search).toBe(expectedSearch);

    const nextFObj = { name: "value" };
    const nextParam = {
      a: "a",
      b: 1,
      c: true,
      d: new Date(2019, 0, 1, 0, 0, 0),
      e: "x",
      f: JSON.stringify(nextFObj),
      g: ["11", "22", "33"],
    };
    const expectNextSearch =
      "?a=a&b=1&c=true&d=2018-12-31T16%3A00%3A00.000Z&e=x&f=%7B%22name%22%3A%22value%22%7D&g=11&g=22&g=33";
    act(() => {
      const [, setParams] = result.current;
      setParams(nextParam);
    });

    [param] = result.current;

    expect(param.a).toEqual(nextParam.a);
    expect(param.b).toEqual(nextParam.b);
    expect(param.c).toEqual(nextParam.c);
    expect(param.d.getTime()).toEqual(nextParam.d.getTime());
    expect(param.e).toEqual(nextParam.e);
    expect(param.f).toEqual(nextFObj);
    expect(getWindow().location.search).toBe(expectNextSearch);
  });

  test("return inital value when set to undefined or null", () => {
    const initial = { name: "value" };
    const { result } = renderHook(() => useUrlSearchParams(initial));

    let [param] = result.current;

    expect(param.name).toBe("value");
    expect(getWindow().location.search).toBe("?name=value");

    act(() => {
      const [, setParams] = result.current;
      setParams({ name: "newValue" });
    });

    [param] = result.current;

    expect(param.name).toBe("newValue");
    expect(getWindow().location.search).toBe("?name=newValue");

    act(() => {
      const [, setParams] = result.current;
      setParams({ name: null });
    });
    [param] = result.current;

    expect(param.name).toBe(initial.name);
  });

  test("go back", () => {
    const { result } = renderHook(() => useUrlSearchParams({ name: "value" }));

    act(() => {
      const [, setParams] = result.current;
      setParams({ name: "newValue" });
    });

    let [param] = result.current;
    expect(param.name).toBe("newValue");

    // is there better way to simulate browser Back button?
    const Event = getWindow().Event;
    act(() => {
      getWindow().dispatchEvent(new Event("popstate"));

      getWindow().addEventListener("popstate", () => {
        [param] = result.current;
        expect(param.name).toBe("value");
      });
    });
  });

  test("track history", () => {
    expect(getWindow().history.length).toBe(1);
    const { result } = renderHook(() => useUrlSearchParams({ name: "value" }));

    expect(getWindow().history.length).toBe(2);

    act(() => {
      const [, setParams] = result.current;
      setParams({ name: "newValue" });
    });

    expect(getWindow().history.length).toBe(3);
  });
});
