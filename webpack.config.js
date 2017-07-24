const webpack = require('webpack');


module.exports = {
  entry: './src/index.js',
  // Place output files in `./dist/js/cognito-auth.bundle.js`
  output: {
    path: __dirname + "./dist/js",
    filename: 'cognito-auth.bundle.js'
  },

  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ],

  externals: [
      'aws-sdk'
  ]
};