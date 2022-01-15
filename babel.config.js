module.exports = function (api) {
  api.cache(false);

  const plugins = [];

  if (process.env.NODE_ENV === "test") {
    plugins.push(require("@babel/plugin-transform-modules-commonjs"));
  }

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            browsers: ["last 2 versions", "safari >= 7"],
          },
          // modules: false,
        },
      ],
      ...(process.env.NODE_ENV === "test" ? ["@babel/preset-typescript"] : []),
    ],
    plugins,
  };
};
