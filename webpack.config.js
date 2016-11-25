const webpack = require('webpack');
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: './client/index.jsx',
  html: './client/index.html',
  dist: path.join(__dirname, 'dist'),
};

module.exports = {
  entry: {
    javascript: PATHS.app,
    html: PATHS.html,
  },
  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    proxy: {
      '**': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
    contentBase: PATHS.dist,
  },
  eslint: {
    emitWarning: true,
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, {
      test: /\.(css|scss)$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.html$/,
      loader: 'file?name=[name].[ext]',
    }
    ],
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  // plugins: [
  //   // Auto generate our html page https://www.npmjs.com/package/html-webpack-plugin
  //   new HtmlWebpackPlugin({
  //     template: path.join(__dirname, 'client/index.html'),
  //     appMountId: 'App',
  //     title: 'Index',
  //   })
  // ]
};
