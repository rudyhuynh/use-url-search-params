const noop = function () {};

const listeners = {
  popstate: [],
};

let mockWindow = {
  URL: function () {
    this.searchParams = {
      set: noop,
      append: noop,
      delete: noop,
    };
  },
  location: {
    href: "",
    search: "",
  },
  history: {
    pushState: noop,
  },
  fireEvent: function (eventName) {
    listeners[eventName].forEach((listener) => {
      listener();
    });
  },
  addEventListener: function (eventName, listener) {
    listeners[eventName].push(listener);
  },
  removeEventListener: function (eventName, listener) {
    const eventListeners = listeners[eventName];
    const i = eventListeners.findIndex((l) => l === listener);
    eventListeners.splice(i, 1);
  },
};

export function setWindow(w) {
  mockWindow = w;
}

/**
 * @returns {Window}
 */
export function getWindow() {
  if (typeof window !== "undefined") return window;
  return mockWindow;
}
