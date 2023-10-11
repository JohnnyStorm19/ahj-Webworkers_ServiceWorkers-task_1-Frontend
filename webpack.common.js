/* eslint-disable no-undef */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  // devServer: {
  //   port: 9000,
  // },
  devtool: 'source-map',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  cache: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new HtmlWebPackPlugin({
      template: './src/offline.html',
      filename: './offline.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/js/service-worker.js',
      exclude: [/offline\.html$/, /\.js$/, /\.html$/],
    }),
  ],
};
