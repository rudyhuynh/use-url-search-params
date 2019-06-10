(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,function(module,exports,__webpack_require__){var factory;window,factory=function(__WEBPACK_EXTERNAL_MODULE_react__){return function(e){var n={};function r(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)r.d(t,a,function(n){return e[n]}.bind(null,a));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s="./src/index.js")}({"./src/index.js":function srcIndexJs(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _useUrlSearchParams__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useUrlSearchParams */ "./src/useUrlSearchParams.js");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useUrlSearchParams", function() { return _useUrlSearchParams__WEBPACK_IMPORTED_MODULE_0__["useUrlSearchParams"]; });\n\n\n\n\n//# sourceURL=webpack://useUrlSearchParams/./src/index.js?')},"./src/useUrlSearchParams.js":function srcUseUrlSearchParamsJs(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useUrlSearchParams", function() { return useUrlSearchParams; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst SUPPORTED_PARAMS_TYPES = [Number, String, Boolean, Date];\n\nfunction setQueryToCurrentUrl(params) {\n  const url = new URL(window.location.href);\n\n  Object.keys(params).forEach(key => {\n    const value = params[key];\n    if (value !== null && value !== undefined) {\n      if (Array.isArray(value)) {\n        url.searchParams.delete(key);\n        value.forEach(valueItem => {\n          url.searchParams.append(key, valueItem);\n        });\n      } else if (value instanceof Date) {\n        if (!isNaN(value.getTime())) {\n          url.searchParams.set(key, value.toISOString());\n        }\n      } else if (typeof value === "object") {\n        url.searchParams.set(key, JSON.stringify(value));\n      } else {\n        url.searchParams.set(key, value);\n      }\n    } else {\n      url.searchParams.delete(key);\n    }\n  });\n  return url;\n}\n\nfunction isNoneEmptyPrimitiveArray(input) {\n  return (\n    Array.isArray(input) &&\n    input.length > 0 &&\n    input.every(\n      item =>\n        typeof item === "number" ||\n        typeof item === "string" ||\n        typeof item === "boolean"\n    )\n  );\n}\n\nfunction validateTypes(types = {}) {\n  const isValidTypes = Object.values(types).every(\n    type =>\n      SUPPORTED_PARAMS_TYPES.includes(type) ||\n      isNoneEmptyPrimitiveArray(type) ||\n      typeof type === "function"\n  );\n\n  if (!isValidTypes) {\n    throw new Error(\n      `Unsupported param types. Must be one of [${SUPPORTED_PARAMS_TYPES.map(\n        item => item.name\n      ).join(", ")}]`\n    );\n  }\n}\n\nfunction useUrlSearchParams(initial = {}, types) {\n  if (types) validateTypes(types);\n\n  const [locationSearch, setLocationSearch] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState("");\n\n  const urlSearchParams = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(() => {\n    return new URLSearchParams(window.location.search);\n  }, [locationSearch]);\n\n  const params = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(() => {\n    let result = [];\n    for (let item of urlSearchParams) {\n      result.push({\n        key: item[0],\n        value: item[1]\n      });\n    }\n\n    //group by key\n    result = result.reduce((acc, val) => {\n      (acc[val.key] = acc[val.key] || []).push(val);\n      return acc;\n    }, {});\n\n    result = Object.keys(result).map(key => {\n      const valueGroup = result[key];\n      if (valueGroup.length === 1) {\n        return [key, valueGroup[0].value];\n      } else {\n        return [key, valueGroup.map(({ value }) => value)];\n      }\n    });\n\n    const params = initial;\n\n    result.forEach(([key, value]) => {\n      params[key] = parseValue(key, value, types, initial);\n    });\n\n    return params;\n  }, [urlSearchParams]);\n\n  function redirectToNewSearchParams(params) {\n    const url = setQueryToCurrentUrl(params);\n    window.history.pushState({}, "", url);\n\n    if (urlSearchParams.toString() !== url.searchParams.toString()) {\n      setLocationSearch(window.location.search);\n    }\n  }\n\n  react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(() => {\n    redirectToNewSearchParams({\n      ...initial,\n      ...params\n    });\n  }, []);\n\n  const setParams = params => {\n    redirectToNewSearchParams(params);\n  };\n\n  react__WEBPACK_IMPORTED_MODULE_0___default.a.useEffect(() => {\n    const onPopState = event => {\n      setLocationSearch(window.location.search);\n    };\n    window.addEventListener("popstate", onPopState);\n    return () => {\n      window.removeEventListener("popstate", onPopState);\n    };\n  }, []);\n\n  return [params, setParams];\n}\n\nconst booleanValues = {\n  true: true,\n  false: false\n};\n\nfunction parseValue(key, _value, types, defaultParams) {\n  if (!types) return _value;\n  const type = types[key];\n  const value = _value === undefined ? defaultParams[key] : _value;\n\n  if (type === Number) {\n    return Number(value);\n  }\n  if (type === Boolean) {\n    return booleanValues[value];\n  }\n  if (type === Date) {\n    return new Date(value);\n  }\n  if (Array.isArray(type)) {\n    // eslint-disable-next-line eqeqeq\n    return type.find(item => item == value) || defaultParams[key];\n  }\n  if (typeof type === "function") {\n    return type(value);\n  }\n\n  return value;\n}\n\n\n//# sourceURL=webpack://useUrlSearchParams/./src/useUrlSearchParams.js?')},react:function react(module,exports){eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack://useUrlSearchParams/external_%7B%22commonjs%22:%22react%22,%22commonjs2%22:%22react%22%7D?")}})},module.exports=factory(__webpack_require__(0))},,function(e,n,r){e.exports=r(13)},,,,,,function(e,n,r){},function(e,n,r){},function(e,n,r){"use strict";r.r(n);var t=r(0),a=r.n(t),o=r(2),u=r.n(o),c=(r(11),r(4)),s=(r(12),r(3));var l=function(){var e={checked:!0,date:new Date},n={selectedOption:["option1","option2","option3"],checked:Boolean,date:Date,obj:function(e){try{return JSON.parse(e)}catch(n){return{}}}},r=Object(s.useUrlSearchParams)(e,n),t=Object(c.a)(r,2),o=t[0],u=t[1];return a.a.useEffect(function(){console.log("queries changed",o)},[o]),a.a.createElement("div",{className:"App"},a.a.createElement("h2",null,"Example of"," ",a.a.createElement("a",{href:"https://github.com/rudyhuynh/use-url-search-params"},"use-url-search-params")),a.a.createElement("div",null,"See"," ",a.a.createElement("a",{href:"https://github.com/rudyhuynh/use-url-search-params/blob/master/example/src/App.js"},"source code here")),a.a.createElement("main",null,a.a.createElement("label",null,a.a.createElement("input",{type:"checkbox",checked:!0===o.checked,onChange:function(e){return u({checked:e.target.checked})}})," ","Check me!"),a.a.createElement("select",{value:o.selectedOption,onChange:function(e){return u({selectedOption:e.target.value})}},a.a.createElement("option",null),a.a.createElement("option",{value:"option1"},"option 1"),a.a.createElement("option",{value:"option2"},"option 2"),a.a.createElement("option",{value:"option3"},"option 3")),a.a.createElement("button",{onClick:function(){u({date:new Date})}},"Set date object"),a.a.createElement("button",{onClick:function(){return u({arr:[1,2,3]})}},"Set an array to URL query"),a.a.createElement("button",{onClick:function(){return u({obj:JSON.stringify({x:{y:{z:1}}})})}},"Set a JSON object to URL query"),a.a.createElement("button",{onClick:function(){return u({obj:null})}},"Delete `obj` query"),a.a.createElement("div",{style:{textAlign:"left"}},"Queries:",a.a.createElement("pre",null,a.a.createElement("code",null,JSON.stringify(o,null,2))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(a.a.createElement(l,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[5,1,2]]]);
//# sourceMappingURL=main.33d032df.chunk.js.map