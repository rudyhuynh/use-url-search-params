import { renderHook, act } from "@testing-library/react-hooks";
import { useUrlSearchParams } from "./main";
import { setWindow, getWindow } from "./mockWindow";
import { JSDOM } from "jsdom";

xtest("non-browser environment", () => {
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

  test("?checked=true, checked: Boolean", () => {
    const { result } = renderHook(() => useUrlSearchParams({ checked: true }, { checked: Boolean }));

    let [param] = result.current;
    expect(param.checked).toBe(true);
    expect(getWindow().location.search).toBe("?checked=true");

    act(() => {
      const [, setParams] = result.current;
      setParams({ checked: false });
    });

    [param] = result.current;

    expect(param.checked).toBe(false);
    expect(getWindow().location.search).toBe("?checked=false");
  });
});
