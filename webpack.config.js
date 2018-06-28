const webpack = require('webpack');

module.exports = {
  devServer: {
    historyApiFallback: true,
    inline: true,
    contentBase: './src',
    port: 3000,
  },
  devtool: 'cheap-module-eval-source-map',
  entry: './dev/js/index.jsx',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader',
      },
    ],
  },
  output: {
    path: 'src',
    filename: 'js/bundle.min.js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
  ],
};
