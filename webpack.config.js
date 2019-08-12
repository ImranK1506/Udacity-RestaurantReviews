const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
   rules: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       include: path.join(__dirname, 'src'),
       use: {
         loader: 'babel-loader'
       }
     },
     {
       test: /\.html$/,
       use: [
         {
           loader: 'html-loader',
           options: { minimize: true }
         }
       ]
     },
     {
      test: /\.css$/,
      include: path.join(__dirname, 'src'),
      use: [
         "style-loader",
         'css-loader'
       ]
     },
   ]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new TerserPlugin(),
    new HtmlWebPackPlugin(
      {
        template: "./src/index.html",
        filename: "./index.html"
      }
    ),
    new HtmlWebPackPlugin(
      {
        template: "./src/restaurant.html",
        filename: "./restaurant.html"
      }
    ),
    new CopyWebpackPlugin([
      {
        from: 'src/img', to: 'img'
      }
    ]),
    new ImageminPlugin(
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        jpegtran: { progressive: true }
      }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    })
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin()
    ]
  },
};



