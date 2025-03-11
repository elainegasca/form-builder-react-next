const external = require("rollup-plugin-peer-deps-external");
const resolve = require("@rollup/plugin-node-resolve").nodeResolve;
const commonjs = require("@rollup/plugin-commonjs").default;
const typescript = require("@rollup/plugin-typescript");
const dts = require("rollup-plugin-dts").default;
const babel = require("@rollup/plugin-babel").default;
const image = require("@rollup/plugin-image").default;
const postcss = require("rollup-plugin-postcss");
const terser = require("@rollup/plugin-terser").default;
const scss = require("rollup-plugin-scss");
var bundle = {
  input: "./src/App.tsx",
  output: [
    {
      dir: "./build",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    external(),

    commonjs(),
    resolve({
      extensions: [".jsx", ".js", ".tsx"],
    }),
    image(),
    postcss({
      include: ["./src/**"],
      extract: true, // Genera un archivo CSS separado en dist
      modules: false, // Desactiva los módulos de CSS (actívalos si los necesitas)
      use: ["sass"], // Usa sass para compilar los archivos SCSS
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    dts(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
    }),
    process.env.NODE_ENV === "production" && terser(),
  ],
  onwarn(warning, warn) {
    // Suppress "Module level directives cause errors when bundled" warnings
    if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
      return;
    }
    warn(warning);
  },
  external: [
    "react",
    "react-dom",
    // "redux",
    "react-redux",
    "@reduxjs/toolkit",
    // estilos
    "@mui/material",
    "@mui/icons-material",
    "@emotion/react",
    "@emotion/styled",
    "@mui/x-date-pickers",

    // Librerías utilitarias
    "lodash",
    "moment",

    // Evitamos incluir types y librerías de test en el bundle
    "@types/react",
    "@types/react-dom",
    "@types/jest",
    "@testing-library/react",
    "@testing-library/jest-dom",
    "@testing-library/user-event",
    "web-vitals",
  ], // Evita incluir React y Redux en el bundle
  watch: {
    exclude: ["node_modules"],
  },
};

export default bundle;
