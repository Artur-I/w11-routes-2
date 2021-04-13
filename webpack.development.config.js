const path = require('path')
require('dotenv').config()
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const APP_VERSION = 'development'

const config = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './main.js',
    './assets/scss/main.scss'
  ],
  resolve: {
    alias: {
      d3: 'd3/index.js'
    }
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist/assets'),
    publicPath: ''
  },
  mode: 'development',
  context: path.resolve(__dirname, 'client'),
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist/assets'),
    watchContentBase: true,
    host: 'localhost',
    port: 3001,

    historyApiFallback: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: [
      {
        context: ['/api', '/auth'],
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
        ws: false
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        include: [/client/, /server/],
        use: ['eslint-loader']
      },
      {
        test: /\.js$/,
        use: ['react-hot-loader/webpack', 'babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },

          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.txt$/i,
        use: 'raw-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
      chunkFilename: 'css/[id].css',
      ignoreOrder: false
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          { from: 'assets/images', to: 'images' },
          { from: 'assets/fonts', to: 'fonts' },
          { from: 'assets/manifest.json', to: 'manifest.json' },
          { from: 'index.html', to: 'index.html' },

          { from: 'vendors', to: 'vendors' },
          {
            from: 'html.js',
            to: 'html.js',
            transform: (content) => {
              return content.toString().replace(/COMMITHASH/g, APP_VERSION)
            }
          },
        ]
      },
      { parallel: 100 }
    ),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(
      Object.keys(process.env).reduce(
        (res, key) => ({ ...res, [key]: JSON.stringify(process.env[key]) }),
        {
          APP_VERSION: JSON.stringify(APP_VERSION),
          'windows.process': { cwd: () => '' }
        }
      )
    )
  ]
}

module.exports = config
