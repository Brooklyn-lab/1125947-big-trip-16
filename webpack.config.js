const path = require('path');

module.exports = {
   entry: './src/main.js',
   output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js'
   },
   devtool: 'source-map',
   devServer: {
      hot: false
   },
   module: {
      rules: [
         {
            test: /\.css$/,
            use: [
               { loader: 'style-loader' },
               {
                  loader: 'css-loader',
                  options: { module: true }
               }
            ]
         }
      ]
   }
};