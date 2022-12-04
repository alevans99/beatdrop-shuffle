const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',

  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: 'auto' // <---- Allows recompiling of the bundle on each save
  },

  plugins: [
    //Creates an index.html with webpack entries injected on build
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
  ],

  module: {
    rules: [
      //Use Babel to compile JS / JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      //Loaders for CSS
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      //Loaders for images
      {
        test: /\.(png|jp(e*)g|svg|gif|mp3|wav)$/,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jpg', '.css', '.jsx', '.mp3', '.wav']
  },
  devServer: {
    host: 'localhost', 
    historyApiFallback: true,
  }
}
