(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["useUrlSearchParams"] = factory(require("react"));
	else
		root["useUrlSearchParams"] = factory(root[undefined]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: useUrlSearchParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _useUrlSearchParams__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useUrlSearchParams */ \"./src/useUrlSearchParams.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"useUrlSearchParams\", function() { return _useUrlSearchParams__WEBPACK_IMPORTED_MODULE_0__[\"useUrlSearchParams\"]; });\n\n\n\n\n//# sourceURL=webpack://useUrlSearchParams/./src/index.js?");

/***/ }),

/***/ "./src/useUrlSearchParams.js":
/*!***********************************!*\
  !*** ./src/useUrlSearchParams.js ***!
  \***********************************/
/*! exports provided: useUrlSearchParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useUrlSearchParams\", function() { return useUrlSearchParams; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst SUPPORTED_PARAMS_TYPES = [Number, String, Boolean];\n\nfunction setQueryToCurrentUrl(params) {\n  const url = new URL(window.location.href);\n\n  Object.keys(params).forEach(key => {\n    const value = params[key];\n    if (value !== null && value !== undefined) {\n      if (Array.isArray(value)) {\n        url.searchParams.delete(key);\n        value.forEach(valueItem => {\n          url.searchParams.append(key, valueItem);\n        });\n      } else {\n        url.searchParams.set(key, value);\n      }\n    } else {\n      url.searchParams.delete(key);\n    }\n  });\n  return url;\n}\n\nfunction isNoneEmptyPrimitiveArray(input) {\n  return (\n    Array.isArray(input) &&\n    input.length > 0 &&\n    input.every(\n      item =>\n        typeof item === \"number\" ||\n        typeof item === \"string\" ||\n        typeof item === \"boolean\"\n    )\n  );\n}\n\nfunction validateTypes(types = {}) {\n  const isValidTypes = Object.values(types).every(\n    type =>\n      SUPPORTED_PARAMS_TYPES.includes(type) ||\n      isNoneEmptyPrimitiveArray(type) ||\n      typeof type === \"function\"\n  );\n\n  if (!isValidTypes) {\n    throw new Error(\n      `Unsupported param types. Must be one of [${SUPPORTED_PARAMS_TYPES.map(\n        item => item.name\n      ).join(\", \")}]`\n    );\n  }\n}\n\n/**\n *\n * @param {object} initial\n * @param {object} types\n */\nfunction useUrlSearchParams(initial = {}, types) {\n  if (types) validateTypes(types);\n\n  const [forceUpdateSwitch, forceUpdate] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState();\n\n  const urlSearchParams = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(() => {\n    return new URLSearchParams(window.location.search);\n  }, [window.location.search]);\n\n  const params = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(() => {\n    let result = [];\n    for (let item of urlSearchParams) {\n      result.push({\n        key: item[0],\n        value: item[1]\n      });\n    }\n\n    //group by key\n    result = result.reduce((acc, val) => {\n      (acc[val.key] = acc[val.key] || []).push(val);\n      return acc;\n    }, {});\n\n    result = Object.keys(result).map(key => {\n      const valueGroup = result[key];\n      if (valueGroup.length === 1) {\n        return [key, valueGroup[0].value];\n      } else {\n        return [key, valueGroup.map(({ value }) => value)];\n      }\n    });\n\n    const params = {};\n\n    result.forEach(([key, value]) => {\n      params[key] = parseValue(key, value, types, initial);\n    });\n\n    return params;\n  }, [urlSearchParams]);\n\n  function redirectToNewSearchParams(params) {\n    const url = setQueryToCurrentUrl(params);\n    window.history.pushState({}, \"\", url);\n\n    if (urlSearchParams.toString() !== url.searchParams.toString()) {\n      forceUpdate(!forceUpdateSwitch);\n    }\n  }\n\n  react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(() => {\n    redirectToNewSearchParams({\n      ...initial,\n      ...params\n    });\n  }, []);\n\n  const setParams = params => {\n    redirectToNewSearchParams(params);\n  };\n\n  return [params, setParams];\n}\n\nfunction parseValue(key, value, types, defaultParams) {\n  if (!types) return value;\n  const type = types[key];\n  if (type === Number) {\n    return value === undefined ? Number(defaultParams[key]) : Number(value);\n  }\n  if (type === Boolean) {\n    return value === undefined\n      ? getBooleanValue(defaultParams[key])\n      : getBooleanValue(value);\n  }\n  if (Array.isArray(type)) {\n    const defaultValue = defaultParams[key];\n    if (value === undefined) {\n      // eslint-disable-next-line eqeqeq\n      return type.find(item => item == defaultValue);\n    } else {\n      // eslint-disable-next-line eqeqeq\n      return type.find(item => item == value);\n    }\n  }\n  if (typeof type === \"function\") {\n    return type(value);\n  }\n  return value;\n}\n\nfunction getBooleanValue(value) {\n  if (value === \"true\") return true;\n  if (value === \"false\") return false;\n  return undefined;\n}\n\n\n//# sourceURL=webpack://useUrlSearchParams/./src/useUrlSearchParams.js?");

/***/ }),

/***/ "react":
/*!*********************************************************!*\
  !*** external {"commonjs":"react","commonjs2":"react"} ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack://useUrlSearchParams/external_%7B%22commonjs%22:%22react%22,%22commonjs2%22:%22react%22%7D?");

/***/ })

/******/ });
});