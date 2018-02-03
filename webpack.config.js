'use strict'

const path = require('path')
const HappyPack = require('happypack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const { DefinePlugin } = require('webpack')

const PRODUCTION = process.env.NODE_ENV === 'production'

const config = {
  context: __dirname,
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    filename: 'entry.js',
    chunkFilename: '[id].[chunkhash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: PRODUCTION
      ? '/knockout-realworld/' // gh-pages
      : '/'                   // development server
  },
  devtool: PRODUCTION
    ? 'source-map'
    : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'happypack/loader?id=ts'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'lib': path.join(__dirname, 'src/lib/')
    },
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HappyPack({
      id: 'ts',
      threads: 2,
      loaders: [
        {
          path: 'ts-loader',
          query: {
            happyPackMode: true,
            compilerOptions: {
              target: 'es5'
            }
          }
        }
      ]
    }),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inlineSource: 'entry.js$'
    }),
    new DefinePlugin({
      PRODUCTION
    })
    
  ]
}

if (PRODUCTION) {
  config.plugins.push(new HtmlWebpackInlineSourcePlugin())
}

module.exports = config