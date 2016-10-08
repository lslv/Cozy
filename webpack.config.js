module.exports = {
  entry: [
    './Public/src/index.js'
  ],
  output: {
    path: __dirname + '/Public/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
        //   {
        // test: /\.css$/,
        // loader:'style!css!'
        // },
      {
        test: /\.scss$/,
        loaders:['style', 'css', 'sass']
      },

    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
