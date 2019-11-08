const path = require("path");
module.exports = {
  devtool: "source-map",
  entry: {
    orders: ["@babel/polyfill", "./src/orders.js"],
    allorders: ["@babel/polyfill", "./src/allorders.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
