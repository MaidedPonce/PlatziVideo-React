const path = require('path')
const webpack = require('webpack')
// const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
require('dotenv').config()

const isDev = (process.env.ENV === 'development')
const entry = ['./src/frontend/index.js']

if (isDev) {
  entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true')
}

module.exports = {
  entry,
  mode: process.env.ENV,
  output: {
    path: path.resolve(__dirname, 'src/server/public'),
    // filename: 'bundle.js'
    filename: isDev ? 'assets/app.js' : 'assets/app-[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'async',
      name: true,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          filename: isDev ? 'assets/vendor.js' : 'assets/vendor-[hash].js',
          enforce: true,
          test (module, chunks) {
            // buscando y validando estrictamente que exista. Luego de que exista lo ejecutamos y traemos el nombre del chunk que estamos trayendo
            const name = module.nameForCondition && module.nameForCondition()
            // luego, con una expresion regular estamos validando que sea diferente de vendors y que esté dentro de node modules
            return chunks.some(chunks => chunks.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name))
          }
        }
      }
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    isDev ? new webpack.HotModuleReplacementPlugin()
      : () => { },
    isDev ? () => {}
      : new CompressionWebpackPlugin({
        test: /\.js$|\.css$/,
        filename: '[path][base].gz'
      }),
    isDev ? () => { }
      : new WebpackManifestPlugin(),
    new MiniCssExtractPlugin({
      // filename: 'assets/[name].css
      filename: isDev ? 'assets/app.css' : 'assets/app-[hash].css'
    })
  ]
}
