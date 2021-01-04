const path = require('path'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html'
  }),
  // new CopyWebpackPlugin({
  //   patterns: [
  // {
  //   from: './src/fonts',
  //   to: './fonts'
  // },
  // {
  //   from: './src/favicon',
  //   to: './favicon'
  // },
  // {
  //   from: './src/img',
  //   to: './img'
  // },
  // {
  //   from: './src/videos',
  //   to: './videos'
  // }
  //   ]
  // }),
]
const devMode = process.env.NODE_ENV !== 'production';
if (!devMode) {
  // enable in production only
  plugins.push(new MiniCssExtractPlugin({
    filename: 'css/index.css',
    ignoreOrder: true
  }));
}
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
  },
  plugins,
  entry: [
    './src/js/index.js',
    './src/styles/index.scss'
  ],
  output: {
    filename: './js/bundle.js'
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src/js'),
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
      {
        test: /\.(sa|sc|c)ss$/,
        include: path.resolve(__dirname, 'src/styles'),
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ]
      },
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
};