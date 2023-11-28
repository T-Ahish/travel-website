//name of the webpac webpack.config.js is very important.
const path = require("path");
const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("autoprefixer"),
];

//we are telling the webpack module to export from the entry of specified directory
module.exports = {
  entry: "./app/assets/scripts/App.js",
  //output sets the desired values for the bundled files
  //webpack requires an absolute path, so we are using an node library called path
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app"),
  },
  devServer: {
    watchFiles: ["app/**/*.html"],
    static: {
      directory: path.join(__dirname, "app"),
      watch: false,
    },
    //hot injects the css and js updates directly to browser without needing reload
    hot: true,
    port: 3000,
    //liveReload: false
  },
  //mode specifies the type of mode we are currently in (we are using this currently for development)
  mode: "development",
  //instead of running the bundler again and again to resave, we can add watch which makes the bundler run whenever change is made to the entry
  //watch: true,
  //module specifies the webpack what to do when it encounters certain type of files
  module: {
    rules: [
      {
        //regular expression to tell the files that end with .css (we trying to use postCSS)
        test: /\.css$/i,
        //css-loader helps the style to be bundled in the webpack, style-loader helps the bundled style to render in website
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: postCSSPlugins,
              },
            },
          },
        ],
      },
    ],
  },
};

//just Module.export and entry saves the bundled files in the /dist/main.file path. inorder to change it we need to add additinal data to module.export
