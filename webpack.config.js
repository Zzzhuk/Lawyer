const path = require('path'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
  HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html'
  }),
  new HtmlWebpackInlineSVGPlugin({
    runPreEmit: true
  }),
  new MiniCssExtractPlugin({
    filename: './css/index.css',
    ignoreOrder: true
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: './src/icons/',
        to: './icons/'
      },
      {
        from: './src/img/',
        to: './img/'
      },
      {
        from: './src/favicon/',
        to: ''
      },
    ]
  })
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
];
module.exports = (env, options) => {
  const devMode = options.mode === 'development';
  return {
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
      publicPath: "",
      filename: './js/bundle.js'
    },
    devtool: "source-map",
    module: {
      rules: [
        {
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
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: '../',
                useRelativePaths: true
              }
            },
          ],
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
  }
};