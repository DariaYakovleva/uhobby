const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const env = process.env.NODE_ENV;

const config = {
  name: "hobby",
  entry: './src/uhobby/hobby.jsx',
  output: {
    publicPath: '/dist/uhobby/',
    path: path.join(__dirname, './dist/uhobby/')
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./src/uhobby/hobby.html",
    filename: "../../hobby.html"
  })],

  mode: env === 'production' ? 'production' : 'development',
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/,
    }, {
      test: /\.css$/, use: ['style-loader', 'css-loader'],
    }, {
      test: /\.svg/,
      type: 'asset/resource'
    }, {
      test: /\.ttf/,
      use: 'file-loader'
    }]
  },
  resolve: {
    extensions: ['.jsx', '.js']
  }
};

module.exports = config;
