var path = require('path');

module.exports = {

  devtool: "inline-source-map",

  entry: "./src/index.js",

  output: {
    filename: "bundle.js",
    path: __dirname + "/build",
    publicPath: "/build/"
  },
  devServer: {
    contentBase: './'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test:
        /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test:
        /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      {
        test:
        /\.(woff|woff2)$/,
        loader: "url-loader?prefix=font/&limit=5000"
      },
      {
        test:
        /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test:
        /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
    ]
  }
};