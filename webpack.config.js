const path = require('path');

module.exports = {
  entry: './index.js', 
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'), 
  },
  mode: 'production', 
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/, 
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]', 
            },
          },
        ],
      },
    ],
  },
};