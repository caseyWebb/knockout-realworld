'use strict'

const os = require('os')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  DefinePlugin,
  NamedModulesPlugin
} = require('webpack')

const PRODUCTION = process.env.NODE_ENV === 'production'
const AVAILABLE_CPUS = Math.max(os.cpus().length - 2, 2) // leave 2 CPUS free

module.exports = {
  mode: PRODUCTION ? 'production' : 'development',
  context: __dirname,
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    publicPath: PRODUCTION
      ? '/knockout-realworld/'  // gh-pages
      : '/'                     // development server
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve(__dirname, '.cache/ts')
            }
          },
          {
            loader: 'thread-loader',
            options: {
              workers: Math.min(Math.floor(AVAILABLE_CPUS / 2), 4)
            }
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
        options: {
          minimize: PRODUCTION,
          ignoreCustomComments: [ /^\s*\/?ko/ ]
        }
      },
    ]
  },
  resolve: {
    alias: {
      'src': path.join(__dirname, 'src/')
    },
    extensions: [
      '.ts',
      '.js'
    ]
  },
  plugins: [
    // provide DEBUG constant to app, will be statically analyzable so `if (DEBUG)` statements
    // will be stripped out by the minifier in production builds
    new DefinePlugin({
      DEBUG: !PRODUCTION
    }),

    new ForkTsCheckerWebpackPlugin({
      async: false,
      workers: Math.min(Math.floor(AVAILABLE_CPUS / 2), 4),
      checkSyntacticErrors: true
    }),

    // generate dist/index.html, injecting entry bundles into `src/index.html`
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    ...(PRODUCTION
      ? []
      : [
        // readable HMR output
        new NamedModulesPlugin()
      ]
    )
  ]
}