/** Configuracion de webpack */
module.exports = {
  entry: './src/app/index.js',
  output: {
    path: __dirname + '/src/public',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.[js|jsx]/,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          
            'file-loader'
          
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
};