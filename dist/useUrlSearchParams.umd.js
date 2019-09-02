(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.useUrlSearchParams = {}, global.React));
}(this, function (exports, React) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var SUPPORTED_PARAMS_TYPES = [Number, String, Boolean, Date];
  /**
   *
   * @param {object} params
   * @returns {URL}
   */

  function setQueryToCurrentUrl(params) {
    var url = new URL(window ? window.location.href : "");
    Object.keys(params).forEach(function (key) {
      var value = params[key];

      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          url.searchParams.delete(key);
          value.forEach(function (valueItem) {
            url.searchParams.append(key, valueItem);
          });
        } else if (value instanceof Date) {
          if (!isNaN(value.getTime())) {
            url.searchParams.set(key, value.toISOString());
          }
        } else if (_typeof(value) === "object") {
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
    return Array.isArray(input) && input.length > 0 && input.every(function (item) {
      return typeof item === "number" || typeof item === "string" || typeof item === "boolean";
    });
  }

  function validateTypes() {
    var types = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var isValidTypes = Object.values(types).every(function (type) {
      return SUPPORTED_PARAMS_TYPES.includes(type) || isNoneEmptyPrimitiveArray(type) || typeof type === "function";
    });

    if (!isValidTypes) {
      throw new Error("Unsupported param types. Must be one of [".concat(SUPPORTED_PARAMS_TYPES.map(function (item) {
        return item.name;
      }).join(", "), "]"));
    }
  }

  function useUrlSearchParams() {
    var initial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var types = arguments.length > 1 ? arguments[1] : undefined;
    if (types) validateTypes(types);
    /**
     * The main idea of this hook is to make things response to change of `window.location.search`,
     * so no need for introducing new state (in the mean time).
     * Whenever `window.location.search` is changed but  not cause re-render, call `forceUpdate()`.
     * Whenever the component - user of this hook - re-render, this hook should return
     * the query object that corresponse to the current `window.location.search`
     */

    var _React$useState = React.useState(),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        forceUpdate = _React$useState2[1];
    /**
     * @type {URLSearchParams}
     */


    var urlSearchParams = React.useMemo(function () {
      return new URLSearchParams(window ? window.location.href : "");
    }, [window ? window.location.search : null]);
    var params = React.useMemo(function () {
      var result = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = urlSearchParams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;
          result.push({
            key: item[0],
            value: item[1]
          });
        } //group by key

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      result = result.reduce(function (acc, val) {
        (acc[val.key] = acc[val.key] || []).push(val);
        return acc;
      }, {});
      result = Object.keys(result).map(function (key) {
        var valueGroup = result[key];

        if (valueGroup.length === 1) {
          return [key, valueGroup[0].value];
        } else {
          return [key, valueGroup.map(function (_ref) {
            var value = _ref.value;
            return value;
          })];
        }
      });
      var params = initial;
      result.forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        params[key] = parseValue(key, value, types, initial);
      });
      return params;
    }, [urlSearchParams]);

    function redirectToNewSearchParams(params) {
      var url = setQueryToCurrentUrl(params);
      window && window.history.pushState({}, "", url);

      if (urlSearchParams.toString() !== url.searchParams.toString()) {
        forceUpdate({});
      }
    }

    React.useEffect(function () {
      redirectToNewSearchParams(_objectSpread2({}, initial, {}, params));
    }, [params]);

    var setParams = function setParams(params) {
      redirectToNewSearchParams(params);
    };

    React.useEffect(function () {
      var onPopState = function onPopState() {
        forceUpdate({});
      };

      window && window.addEventListener("popstate", onPopState);
      return function () {
        window && window.removeEventListener("popstate", onPopState);
      };
    }, []);
    return [params, setParams];
  }
  var booleanValues = {
    true: true,
    false: false
  };

  function parseValue(key, _value, types, defaultParams) {
    if (!types) return _value;
    var type = types[key];
    var value = _value === undefined ? defaultParams[key] : _value;

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
      return type.find(function (item) {
        return item == value;
      }) || defaultParams[key];
    }

    if (typeof type === "function") {
      return type(value);
    }

    return value;
  }

  exports.useUrlSearchParams = useUrlSearchParams;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
