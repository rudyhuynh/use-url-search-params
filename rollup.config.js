import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";
import packageJson from "./package.json";

const { name, version, dependencies = {}, peerDependencies = {} } = packageJson;

const input = "src/main.ts";
const external = Object.keys(Object.assign({}, dependencies, peerDependencies));
const banner = `// ${name}@${version} - ${new Date().toISOString()}`;

export default [
  // browser-friendly UMD build
  {
    input,
    external,
    output: {
      name: "useUrlSearchParams",
      file: pkg.browser,
      format: "umd",
      banner,
      globals: {
        react: "React",
      },
    },
    plugins: [resolve(), commonjs(), typescript()],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input,
    external,
    output: [
      { file: pkg.main, format: "cjs", banner },
      { file: pkg.module, format: "es", banner },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  },
];
