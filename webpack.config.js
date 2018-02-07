'use strict'

const PRODUCTION = process.env.NODE_ENV === 'production'

const path = require('path')
const HappyPack = require('happypack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtPlugin = require('script-ext-html-webpack-plugin')
const {
  DefinePlugin,
  NamedModulesPlugin
} = require('webpack')
const { KnockoutContribFrameworkWebpackPlugin } = require('@profiscience/knockout-contrib-framework/webpack')

module.exports = {
  context: __dirname,
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    filename: 'entry.[hash].js',
    chunkFilename: 'chunk.[id].[chunkhash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: PRODUCTION
      ? '/knockout-realworld/'  // gh-pages
      : '/'                     // development server
  },
  devtool: PRODUCTION
    ? 'source-map'
    : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [
          /node_modules/,
          /manifest\.ts/  // handled by val-loader below
        ],
        loader: 'happypack/loader?id=ts' // see plugins
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
      // resolve 'lib/*' imports, like 'lib/models/user'
      'lib': path.join(__dirname, 'src/lib/')
    },
    extensions: [
      '.ts',
      '.js'
    ]
  },
  plugins: [
    // magic.
    new KnockoutContribFrameworkWebpackPlugin(),

    // provide PRODUCTION constant to app, will be statically analyzable so !PRODUCTION if statements
    // will be stripped out by the minifier in production builds
    new DefinePlugin({ PRODUCTION }),

    // happypack + ts-loader only transpiles, so fork a type-checker process as well
    new HappyPack({
      id: 'ts',
      threads: 1,
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

    // generate dist/index.html, injecting entry bundles into `src/index.html`
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    ...(PRODUCTION
      ? [
        // add resource hints in production for optimal performance
        new ScriptExtPlugin({
          async: ['entry.*.js'],
          prefetch: {
            test: /\.js$/,
            chunks: 'async'
          }
        })
      ]
      : [
        // readable HMR output
        new NamedModulesPlugin()
      ]
    )
  ]
}