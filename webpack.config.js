const path = require('path');

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    ignore: '/node_modules/',
  },
};

module.exports = {
  mode: 'development',
  entry:'./src/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  cache: false,
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          cssLoader,
        ],
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          cssLoader,
          'stylus-loader',
        ],
      },    
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
  }
};
