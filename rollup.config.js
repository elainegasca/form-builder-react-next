const external = require("rollup-plugin-peer-deps-external");
const resolve = require("@rollup/plugin-node-resolve").nodeResolve;
const commonjs = require("@rollup/plugin-commonjs").default;
const typescript = require("@rollup/plugin-typescript");
const dts = require("rollup-plugin-dts").default; // do not include
const babel = require("@rollup/plugin-babel").default;
const image = require("@rollup/plugin-image").default;
const postcss = require("rollup-plugin-postcss");
const terser = require("@rollup/plugin-terser").default;
const scss = require("rollup-plugin-scss");
const copy = require("rollup-plugin-copy");
const url = require("postcss-url");
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
      extract: true, // Genera un archivo CSS separado en dist
      modules: false, // Desactiva los módulos de CSS (actívalos si los necesitas)
      use: ["sass"], // Usa sass para compilar los archivos SCSS
      plugins: [
        url({
          url: "inline", // Copia los archivos en la carpeta de salida
          assetsPath: "assets/webfonts", // Define la nueva ubicación
        }),
      ],
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    /* dts(), */
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
    }),
    copy({
      targets: [
        { src: "src/assets/webfonts", dest: "build" }, // Copia la carpeta webfonts a dist/assets
      ],
      flatten: false, // Mantiene la estructura original de carpetas
      verbose: true, // Muestra en la consola los archivos copiados
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
    // si quito uno se incluye en el bundle
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
