
var path = require('path');
var webpack = require('webpack');

var outputPath = path.join(__dirname, '/client');

module.exports = {
  entry: './client/app.js',
  output: { path: outputPath, filename: 'bundle.js' },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /typings/],
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
};