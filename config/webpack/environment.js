const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

environment.plugins.set(
  'Uglify',
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false
    }
  })
)

module.exports = environment
