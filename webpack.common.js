module.exports = {
  entry: "./src/index.tsx",

  module: {
    rules: [
      //babel loader -> JSX into JS
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript", "@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      // TS Loader
      // {
      //   test:/\.(ts|tsx)$/,
      //   exclude: /node_modules/,
      //   resolve: {
      //     extensions: [".ts", ".tsx"],
      //   },
      //   use: 'ts-loader',
      // },
      //CSS style loader
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.module?\.(s[ac]ss)$/i,
        use: [
          // Creates `style` nodes from JS strings
          { loader: "style-loader" },
          // Translates CSS into CommonJS
          { loader: "css-loader" },
          {
            loader: "postcss-loader", // Run postcss actions
            options: {
              postcssOptions: {
                plugins: function () {
                  // postcss plugins, can be exported to postcss.config.js
                  return [require("autoprefixer")];
                },
              },
            },
          },
          // Compiles Sass to CSS
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/",
            },
          },
        ],
      },
    ],
  },

  stats: {
    errorDetails: true,
  },
  plugins: [],
};
