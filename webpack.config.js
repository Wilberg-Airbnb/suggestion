
var path = require('path');

var SRC_DIR = path.join(__dirname,'/client/src');
var DIST_DIR = path.join(__dirname,'/public/dist');

module.exports ={
  entry: `./client/src/index.jsx`,
  output:{
    filename:'bundle.js',
    path:DIST_DIR,
  },
  module:{
    rules:[
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        include:SRC_DIR,
        loader: 'babel-loader',
        options:{
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
};
