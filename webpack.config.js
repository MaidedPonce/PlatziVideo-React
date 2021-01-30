const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
// partir por la entrada que es nuestro archivo principal y se encuentra dentro de src, es decir, index.js
  entry: './src/index.js',
  // donde vamos a guardar nuestros archivos resultantes cuando hagamos la compilacion
  output: {
    // path para decirle donde se va guardar. resolve para detectar el directorio donde nos encontramosy pasandole un directorio donde le vamos a pasar los archivos
    path: path.resolve(__dirname, 'dist'),
    // filename es para ponerle un nombre a nuestro archivo principal
    filename: 'bundle.js'
  },
  // resolver las extenciones que vamos a utilizar para nuestro proyecto
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // modulo con reglas necesarias para nuestro proyecto
  module: {
    rules: [
      {
        // La principal identificacion de nuestros archivos js y jsx. Expresion regular para identificarlos si son js o jsx
        test: /\.(js|jsx)$/,
        // exclusion de node_modules
        exclude: /node_modules/,
        use: {
          // loader que instalamos de babel
          loader: 'babel-loader'
        }
      },
      {
        // otra regla para trabajar con archivos de html
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          // loader de css y sass
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  // plugins que necesitamos
  plugins: [
    // nueva referencia del html plugin y le vamos a pasar un objeto con la configuracion que tenemos
    new HtmlWebPackPlugin({
      // los primeros elementos que necesitamos es el template, es decir, donde esta buscado el template que tenemos y luego el filename que va a tener
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      // cómo voy a llamar el archivo resultante
      filename: 'assets/[name].css'
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    port: 3000 // <--- Add this line and choose your own port number
  }
}
