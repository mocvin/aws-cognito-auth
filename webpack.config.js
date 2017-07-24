const webpack = require('webpack');


module.exports = {
  entry: ['./src/signup.js'],

  output: {
    path: __dirname + "./dist/js/",
    filename: 'cognito-[name].bundle.js'
  },

  externals: [
      'aws-sdk'
  ]
};