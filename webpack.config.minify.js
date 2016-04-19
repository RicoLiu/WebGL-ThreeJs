/**
 * Created by famer.me on 16-4-19.
 */

module.exports = {
  output: {
    filename: 'app.min.js',
    publicPath: '/public/javascripts/'
  },
  devtool: "#inline-source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
